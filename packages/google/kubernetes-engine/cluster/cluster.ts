import { Construct } from "constructs";
import { containerCluster, containerNodePool } from "@cdktf/provider-google";
import { Region, ServiceAccount } from "@terraform-cdk-constructs/google-compute-engine";
import { IProject, Project } from "@terraform-cdk-constructs/google-project";
import { ClusterMode } from "../cluster-mode";

export interface ClusterConfig {
  readonly name: string;
  readonly region: Region;
  readonly nodes: number;
  readonly mode: ClusterMode;
}

export class Cluster extends Construct {
  public readonly grantMember: string;

  private readonly resource: containerCluster.ContainerCluster;
  protected readonly project: IProject;

  constructor(scope: Construct, id: string, config: ClusterConfig) {
    super(scope, id);

    this.project = Project.fromProjectAttributes(this, "project");
    this.grantMember = new ServiceAccount(this, "compute-engine-service-account", {
      projectNumber: Project.fromProjectAttributes(this, "project").number,
    }).grantMember;

    // Workaround for this bug: https://github.com/hashicorp/terraform-provider-google/issues/10782.
    let ipAllocationPolicy: containerCluster.ContainerClusterIpAllocationPolicy | undefined;
    if (config.mode === ClusterMode.AUTOPILOT) {
      ipAllocationPolicy = {
        clusterIpv4CidrBlock: "",
        servicesIpv4CidrBlock: "",
      };
    }

    this.resource = new containerCluster.ContainerCluster(this, "cluster-resource", {
      enableAutopilot: config.mode === ClusterMode.AUTOPILOT,
      initialNodeCount: config.mode === ClusterMode.AUTOPILOT ? undefined : 1,
      location: config.region,
      name: config.name,
      removeDefaultNodePool: config.mode === ClusterMode.AUTOPILOT ? undefined : true,
      ipAllocationPolicy: ipAllocationPolicy,
    });

    if (config.mode === ClusterMode.STANDARD) {
      new containerNodePool.ContainerNodePool(this, "node-pool-resource", {
        cluster: this.resource.name,
        location: config.region,
        nodeCount: config.nodes,
      });
    }
  }
}

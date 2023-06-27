import { Construct } from "constructs";
import { containerCluster, containerNodePool } from "@cdktf/provider-google";
import { ISubnet, IVpc, Region, ServiceAccount } from "@terraform-cdk-constructs/google-compute-engine";
import { IProject, Project } from "@terraform-cdk-constructs/google-project";
import { ClusterMode } from "../cluster-mode";
import { ClusterAccess } from "../cluster-access";

export interface ClusterConfig {
  readonly name: string;
  readonly mode: ClusterMode;
  readonly access: ClusterAccess;
  readonly nodes: number;
  readonly region: Region;
  readonly vpc?: IVpc;
  readonly subnet?: ISubnet;
}

export class Cluster extends Construct {
  public readonly grantMember: string;

  protected readonly project: IProject;

  private readonly resource: containerCluster.ContainerCluster;

  constructor(scope: Construct, id: string, config: ClusterConfig) {
    super(scope, id);

    this.project = Project.fromProjectAttributes(this, "project");
    this.grantMember = new ServiceAccount(this, "compute-engine-service-account", {
      projectNumber: this.project.number,
    }).grantMember;

    // Workaround for this bug: https://github.com/hashicorp/terraform-provider-google/issues/10782.
    let ipAllocationPolicy: containerCluster.ContainerClusterIpAllocationPolicy | undefined;
    if (config.mode === ClusterMode.AUTOPILOT) {
      ipAllocationPolicy = {
        clusterIpv4CidrBlock: "",
        servicesIpv4CidrBlock: "",
      };
    }

    let privateClusterConfig: containerCluster.ContainerClusterPrivateClusterConfig | undefined;
    if (config.access === ClusterAccess.PRIVATE) {
      privateClusterConfig = {
        enablePrivateEndpoint: true,
        enablePrivateNodes: true,
      };
    }

    this.resource = new containerCluster.ContainerCluster(this, "cluster-resource", {
      enableAutopilot: config.mode === ClusterMode.AUTOPILOT,
      initialNodeCount: config.mode === ClusterMode.AUTOPILOT ? undefined : 1,
      location: config.region,
      name: config.name,
      network: config.vpc?.id,
      removeDefaultNodePool: config.mode === ClusterMode.AUTOPILOT ? undefined : true,
      subnetwork: config.subnet?.id,
      ipAllocationPolicy: ipAllocationPolicy,
      privateClusterConfig: privateClusterConfig,
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

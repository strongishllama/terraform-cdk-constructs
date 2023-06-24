import { ITerraformDependable } from "cdktf";
import { Construct } from "constructs";
import { cloudRunV2Service, cloudRunV2ServiceIamMember } from "@cdktf/provider-google";
import { Region } from "@terraform-cdk-constructs/google-compute-engine";
import { DockerImage } from "@terraform-cdk-constructs/google-artifact-registry-assets";
import { CloudRunRoles, GrantConfig, IGrantable } from "@terraform-cdk-constructs/google-iam";

export interface ServiceConfig {
  readonly name: string;
  readonly containers: ContainerConfig[];
  readonly location: Region;
  /**
   * The minimum number of serving instances that this resource should have.
   *
   * @default 0
   */
  readonly minimumInstanceCount?: number;
  /**
   * The maximum number of serving instances that this resource should have.
   *
   * @default 100
   */
  readonly maximumInstanceCount?: number;
  /**
   * Allows unauthenticated invocations of the service. Use this when creating a public API or website.
   *
   * @default false
   */
  readonly allowUnauthenticatedInvocations?: boolean;
}

export class Service extends Construct {
  public readonly resource: cloudRunV2Service.CloudRunV2Service;
  private readonly location: Region;

  constructor(scope: Construct, id: string, config: ServiceConfig) {
    super(scope, id);

    const allowUnauthenticatedInvocations = config.allowUnauthenticatedInvocations ?? false;
    const minimumInstanceCount = config.minimumInstanceCount ?? 0;
    const maximumInstanceCount = config.maximumInstanceCount ?? 100;

    if (minimumInstanceCount > maximumInstanceCount) {
      throw new Error(`google-cloud-run.ServiceConfig.minimumInstanceCount cannot be larger than google-cloud-run.ServiceConfig.maximumInstanceCount, minimum is ${config.minimumInstanceCount}, maximum is ${config.maximumInstanceCount}`);
    }

    this.location = config.location;

    const containers: cloudRunV2Service.CloudRunV2ServiceTemplateContainers[] = [];
    const dependsOn: ITerraformDependable[] = [];

    config.containers.forEach((c) => {
      if (c.imageUri && c.imageAsset) {
        throw new Error("Only google-cloud-run.ContainerConfig.imageUri or google-cloud-run.ContainerConfig.imageAsset may be defined, both are.");
      }

      let container: cloudRunV2Service.CloudRunV2ServiceTemplateContainers;
      if (c.imageUri) {
        container = {
          image: c.imageUri,
        };
      } else if (c.imageAsset) {
        container = {
          image: c.imageAsset.uri,
        };
        dependsOn.push(c.imageAsset.resource);
      } else {
        throw new Error("Either google-cloud-run.ContainerConfig.imageUri or google-cloud-run.ContainerConfig.imageAsset must be defined, neither are.");
      }

      containers.push(container);
    });

    this.resource = new cloudRunV2Service.CloudRunV2Service(this, "resource", {
      location: this.location,
      name: config.name,
      template: {
        containers: containers,
        scaling: {
          maxInstanceCount: maximumInstanceCount,
          minInstanceCount: minimumInstanceCount,
        },
      },
      dependsOn: dependsOn,
    });

    if (allowUnauthenticatedInvocations) {
      this.grantInvoker("all-users", {
        grantMember: "allUsers",
      });
    }
  }

  public grantInvoker(id: string, grantee: IGrantable): cloudRunV2ServiceIamMember.CloudRunV2ServiceIamMember {
    return this.grant(id, grantee, {
      id: this.resource.name,
      role: CloudRunRoles.INVOKER,
    });
  }

  private grant(id: string, grantee: IGrantable, config: GrantConfig): cloudRunV2ServiceIamMember.CloudRunV2ServiceIamMember {
    return new cloudRunV2ServiceIamMember.CloudRunV2ServiceIamMember(this, id, {
      location: this.location,
      member: grantee.grantMember,
      name: config.id,
      role: config.role,
    });
  }
}

export interface ContainerConfig {
  /**
   * An Artifact Registry or Container Registry Docker image URI.
   *
   * If provided, 'imageAsset', must be 'undefined'.
   */
  readonly imageUri?: string;
  /**
   * A Docker image asset that is located either in Artifact Registry or Container Registry.
   *
   * If provided, 'imageUri', must be 'undefined'.
   */
  readonly imageAsset?: DockerImage;
}

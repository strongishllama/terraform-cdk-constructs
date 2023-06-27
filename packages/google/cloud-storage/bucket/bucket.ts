import { Construct } from "constructs";
import { kmsCryptoKeyIamMember, storageBucket, storageBucketIamMember } from "@cdktf/provider-google";
import { id as random } from "@cdktf/provider-random";
import * as kms from "@terraform-cdk-constructs/google-cloud-kms";
import { Region } from "@terraform-cdk-constructs/google-compute-engine";
import * as eventarc from "@terraform-cdk-constructs/google-eventarc";
import * as destinations from "@terraform-cdk-constructs/google-eventarc-destinations";
import * as iam from "@terraform-cdk-constructs/google-iam";
import { Project } from "@terraform-cdk-constructs/google-project";
import { ServiceAgent } from "../service-agent";

export interface BucketConfig {
  readonly name: string;
  readonly location: Region;
  readonly cryptoKey?: kms.CryptoKey;
}

export class Bucket extends Construct {
  private readonly resource: storageBucket.StorageBucket;
  private readonly cryptoKey?: kms.CryptoKey;
  private readonly location: Region;

  constructor(scope: Construct, id: string, config: BucketConfig) {
    super(scope, id);

    this.location = config.location;

    let encryption: storageBucket.StorageBucketEncryption | undefined = undefined;
    let grant: kmsCryptoKeyIamMember.KmsCryptoKeyIamMember | undefined = undefined;

    this.cryptoKey = config.cryptoKey;
    if (this.cryptoKey) {
      encryption = {
        defaultKmsKeyName: this.cryptoKey.id,
      };

      const serviceAgent = new ServiceAgent(this, "service-agent", {
        projectNumber: Project.fromProjectAttributes(this, "project").number,
      });
      grant = this.cryptoKey.grantEncrypterDecrypter(`${id}-service-agent`, serviceAgent);
    }

    this.resource = new storageBucket.StorageBucket(this, "resource", {
      location: this.location,
      name: config.name,
      encryption: encryption,
      dependsOn: grant ? [grant] : undefined,
    });
  }

  public onObjectFinalized(id: string, destination: destinations.ITriggerDestination): eventarc.Trigger {
    return this.onEvent(id, {
      triggerType: eventarc.TriggerType.CLOUD_STORAGE_OBJECT_V1_FINALIZED,
      destination: destination,
    });
  }

  public onEvent(id: string, config: OnEventConfig): eventarc.Trigger {
    let name = config.name;
    if (!name) {
      const suffix = new random.Id(this, `${id}-suffix`, {
        byteLength: 6,
      });
      name = `${id}-${suffix.id}`;
    }

    return new eventarc.Trigger(this, id, {
      location: config.location ?? this.location,
      name: name,
      destination: config.destination,
      matchingCriteria: [
        {
          attribute: "bucket",
          value: this.resource.name,
        },
        {
          attribute: "type",
          value: config.triggerType,
        },
      ],
    });
  }

  public get id(): string {
    return this.resource.id;
  }

  public get name(): string {
    return this.resource.name;
  }

  public grantAdmin(id: string, grantee: iam.IGrantable): storageBucketIamMember.StorageBucketIamMember {
    return this.grant(id, grantee, {
      id: this.resource.name,
      role: iam.StorageRoles.OBJECT_ADMIN,
    });
  }

  public grantCreator(id: string, grantee: iam.IGrantable): storageBucketIamMember.StorageBucketIamMember {
    return this.grant(id, grantee, {
      id: this.resource.name,
      role: iam.StorageRoles.OBJECT_CREATOR,
    });
  }

  public grantViewer(id: string, grantee: iam.IGrantable): storageBucketIamMember.StorageBucketIamMember {
    return this.grant(id, grantee, {
      id: this.resource.name,
      role: iam.StorageRoles.OBJECT_VIEWER,
    });
  }

  private grant(id: string, grantee: iam.IGrantable, config: iam.GrantConfig): storageBucketIamMember.StorageBucketIamMember {
    this.cryptoKey?.grantEncrypterDecrypter(id, grantee);

    return new storageBucketIamMember.StorageBucketIamMember(this, id, {
      bucket: config.id,
      member: grantee.grantMember,
      role: config.role,
    });
  }
}

export interface OnEventConfig {
  /**
   * The type of trigger that will invoke the Eventarc trigger.
   */
  readonly triggerType: eventarc.TriggerType;
  /**
   * The destination that the Eventarc trigger will route the event to.
   */
  readonly destination: destinations.ITriggerDestination;
  /**
   * The name of the Eventarc trigger that will be created. This name must be unique within the location.
   *
   * @default If left 'undefined', a random name will be generated.
   */
  readonly name?: string;
  /**
   * The region the Eventarc trigger will be created in.
   *
   * @default If left 'undefined', the region of the Cloud Storage bucket will be used.
   */
  readonly location?: Region;
}

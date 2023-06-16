import { Construct } from "constructs";
import { kmsCryptoKeyIamMember, storageBucket, storageBucketIamMember } from "@cdktf/provider-google";
import { Region } from "@terraform-cdk-constructs/google-compute-engine";
import { GrantConfig, IGrantable, StorageRoles } from "@terraform-cdk-constructs/google-iam";
import { CryptoKey } from "@terraform-cdk-constructs/google-cloud-kms";
import { Project } from "@terraform-cdk-constructs/google-project";
import { StorageBucketEncryption } from "@cdktf/provider-google/lib/storage-bucket";
import { ServiceAgent } from "../service-agent";

export interface BucketConfig {
  readonly name: string;
  readonly location: Region;
  readonly cryptoKey?: CryptoKey;
}

export class Bucket extends Construct {
  public readonly name: string;

  private readonly resource: storageBucket.StorageBucket;
  private readonly cryptoKey?: CryptoKey;

  constructor(scope: Construct, id: string, config: BucketConfig) {
    super(scope, id);

    let encryption: StorageBucketEncryption | undefined = undefined;
    let grant: kmsCryptoKeyIamMember.KmsCryptoKeyIamMember | undefined = undefined;

    this.cryptoKey = config.cryptoKey;
    if (this.cryptoKey !== undefined) {
      encryption = {
        defaultKmsKeyName: this.cryptoKey.id,
      };

      const storageServiceAgent = new ServiceAgent(this, "storage-service-agent", {
        projectNumber: Project.fromProjectAttributes(this, "project").number,
      });
      grant = this.cryptoKey.grantEncrypterDecrypter(storageServiceAgent);
    }

    this.resource = new storageBucket.StorageBucket(this, "resource", {
      location: config.location,
      name: config.name,
      encryption: encryption,
      dependsOn: grant !== undefined ? [grant] : undefined,
    });

    this.name = this.resource.name;
  }

  public grantAdmin(grantee: IGrantable): storageBucketIamMember.StorageBucketIamMember {
    return this.grant(grantee, {
      id: this.resource.name,
      role: StorageRoles.OBJECT_ADMIN,
    });
  }

  public grantCreate(grantee: IGrantable): storageBucketIamMember.StorageBucketIamMember {
    return this.grant(grantee, {
      id: this.resource.name,
      role: StorageRoles.OBJECT_CREATOR,
    });
  }

  public grantView(grantee: IGrantable): storageBucketIamMember.StorageBucketIamMember {
    return this.grant(grantee, {
      id: this.resource.name,
      role: StorageRoles.OBJECT_VIEWER,
    });
  }

  private grant(grantee: IGrantable, config: GrantConfig): storageBucketIamMember.StorageBucketIamMember {
    if (this.cryptoKey !== undefined) {
      this.cryptoKey.grantEncrypterDecrypter(grantee);
    }

    return new storageBucketIamMember.StorageBucketIamMember(this, "member", {
      bucket: config.id,
      member: grantee.grantMember,
      role: config.role,
    });
  }
}

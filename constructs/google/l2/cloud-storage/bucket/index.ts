import { Construct } from "constructs";
import { storageBucket, storageBucketIamMember } from "@cdktf/provider-google";
import { Region } from "../../../core/region";
import { GrantConfig, IGrantable } from "../../iam/grantable";
import { StorageRoles } from "../../iam";
import { CryptoKey } from "../../kms";

export interface BucketConfig {
  readonly location: Region;
  readonly name: string;
  readonly cryptoKey?: CryptoKey;
}

export class Bucket extends Construct {
  private readonly resource: storageBucket.StorageBucket;

  constructor(scope: Construct, name: string, config: BucketConfig) {
    super(scope, name);

    this.resource = new storageBucket.StorageBucket(this, "Resource", {
      location: config.location,
      name: config.name,
      // TODO: Clean up, looks messy.
      encryption:
        config.cryptoKey !== undefined
          ? {
              defaultKmsKeyName: config.cryptoKey.name,
            }
          : undefined,
    });
  }

  public grantAdmin(grantee: IGrantable): void {
    this.grant(grantee, {
      name: this.resource.name,
      role: StorageRoles.OBJECT_ADMIN,
    });
  }

  public grantCreate(grantee: IGrantable): void {
    this.grant(grantee, {
      name: this.resource.name,
      role: StorageRoles.OBJECT_CREATOR,
    });
  }

  public grantView(grantee: IGrantable): void {
    this.grant(grantee, {
      name: this.resource.name,
      role: StorageRoles.OBJECT_VIEWER,
    });
  }

  private grant(grantee: IGrantable, config: GrantConfig): void {
    new storageBucketIamMember.StorageBucketIamMember(this, "member", {
      bucket: config.name,
      member: grantee.grantMember,
      role: config.role,
    });
  }
}

import { Construct } from "constructs";
import { storageBucket, storageBucketIamMember } from "@cdktf/provider-google";
import { Region } from "../../../core/region";
import { GrantConfig, IGrantable } from "../../iam/grantable";
import { StorageRoles } from "../../iam";
import { CryptoKey } from "../../cloud-kms";

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
      encryption:
        config.cryptoKey === undefined
          ? undefined
          : {
              defaultKmsKeyName: config.cryptoKey.name,
            },
    });
  }

  public grantAdmin(grantee: IGrantable): void {
    this.grant(grantee, {
      id: this.resource.name,
      role: StorageRoles.OBJECT_ADMIN,
    });
  }

  public grantCreate(grantee: IGrantable): void {
    this.grant(grantee, {
      id: this.resource.name,
      role: StorageRoles.OBJECT_CREATOR,
    });
  }

  public grantView(grantee: IGrantable): void {
    this.grant(grantee, {
      id: this.resource.name,
      role: StorageRoles.OBJECT_VIEWER,
    });

    // TODO: Add encryption grant if defined.
  }

  private grant(grantee: IGrantable, config: GrantConfig): void {
    new storageBucketIamMember.StorageBucketIamMember(this, "member", {
      bucket: config.id,
      member: grantee.grantMember,
      role: config.role,
    });
  }
}

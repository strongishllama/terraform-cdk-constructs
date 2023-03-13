import { Construct } from "constructs";
import { storageBucket, storageBucketIamMember } from "@cdktf/provider-google";
import { Region } from "../../../core/region";
import { GrantConfig, IGrantable } from "../../iam/grantable";
import { StorageRoles } from "../../iam";
import { CryptoKey } from "../../cloud-kms";
import { StorageBucketEncryption } from "@cdktf/provider-google/lib/storage-bucket";

export interface BucketConfig {
  readonly cryptoKey?: CryptoKey;
  readonly location: Region;
  readonly name: string;
}

export class Bucket extends Construct {
  private readonly cryptoKey?: CryptoKey;
  private readonly resource: storageBucket.StorageBucket;

  constructor(scope: Construct, name: string, config: BucketConfig) {
    super(scope, name);

    let encryption: StorageBucketEncryption | undefined = undefined;
    if (config.cryptoKey !== undefined) {
      this.cryptoKey = this.cryptoKey;
      encryption = {
        defaultKmsKeyName: config.cryptoKey.name,
      };
    }

    this.resource = new storageBucket.StorageBucket(this, "Resource", {
      location: config.location,
      name: config.name,
      encryption: encryption,
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
  }

  private grant(grantee: IGrantable, config: GrantConfig): void {
    new storageBucketIamMember.StorageBucketIamMember(this, "member", {
      bucket: config.id,
      member: grantee.grantMember,
      role: config.role,
    });

    if (this.cryptoKey !== undefined) {
      this.cryptoKey.grantEncrypterDecrypter(grantee);
    }
  }
}

import { Construct } from "constructs";
import { storageBucket } from "@cdktf/provider-google";
import { Region } from "@terraform-cdk-constructs/google-compute-engine";
import { GrantConfig, IGrantable } from "../../iam";
import { StorageRoles } from "@terraform-cdk-constructs/google-iam";
import { CryptoKey } from "../../cloud-kms";
import { StorageBucketEncryption } from "@cdktf/provider-google/lib/storage-bucket";
import { ITerraformDependable } from "cdktf/lib/terraform-dependable";
import { BucketGrant } from "./grant";

export interface BucketConfig {
  readonly name: string;
  readonly location: Region;
  readonly cryptoKey?: CryptoKey;
  readonly dependsOn?: ITerraformDependable[];
  readonly labels?: {
    [key: string]: string;
  };
}

export class Bucket extends Construct {
  private readonly cryptoKey?: CryptoKey;
  private readonly resource: storageBucket.StorageBucket;

  constructor(scope: Construct, id: string, config: BucketConfig) {
    super(scope, id);

    let encryption: StorageBucketEncryption | undefined = undefined;
    if (config.cryptoKey !== undefined) {
      this.cryptoKey = this.cryptoKey;
      encryption = {
        defaultKmsKeyName: config.cryptoKey.id,
      };
    }

    this.resource = new storageBucket.StorageBucket(this, "resource", {
      location: config.location,
      name: config.name,
      encryption: encryption,
      dependsOn: config.dependsOn,
      labels: config.labels,
    });
  }

  public grantAdmin(grantee: IGrantable): BucketGrant {
    return this.grant(grantee, {
      id: this.resource.name,
      role: StorageRoles.OBJECT_ADMIN,
    });
  }

  public grantCreate(grantee: IGrantable): BucketGrant {
    return this.grant(grantee, {
      id: this.resource.name,
      role: StorageRoles.OBJECT_CREATOR,
    });
  }

  public grantView(grantee: IGrantable): BucketGrant {
    return this.grant(grantee, {
      id: this.resource.name,
      role: StorageRoles.OBJECT_VIEWER,
    });
  }

  private grant(grantee: IGrantable, config: GrantConfig): BucketGrant {
    let cryptoKeyGrant = undefined;
    if (this.cryptoKey !== undefined) {
      cryptoKeyGrant = this.cryptoKey.grantEncrypterDecrypter(grantee);
    }

    return new BucketGrant(this, "grant", {
      bucket: config.id,
      member: grantee.grantMember,
      role: config.role,
      cryptoKeyMember: cryptoKeyGrant?.member,
    });
  }
}

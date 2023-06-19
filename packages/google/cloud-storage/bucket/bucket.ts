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
  private readonly resource: storageBucket.StorageBucket;
  private readonly cryptoKey?: CryptoKey;

  constructor(scope: Construct, id: string, config: BucketConfig) {
    super(scope, id);

    let encryption: StorageBucketEncryption | undefined = undefined;
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
      location: config.location,
      name: config.name,
      encryption: encryption,
      dependsOn: grant ? [grant] : undefined,
    });
  }

  public get id(): string {
    return this.resource.id;
  }

  public get name(): string {
    return this.resource.name;
  }

  public grantAdmin(id: string, grantee: IGrantable): storageBucketIamMember.StorageBucketIamMember {
    return this.grant(id, grantee, {
      id: this.resource.name,
      role: StorageRoles.OBJECT_ADMIN,
    });
  }

  public grantCreate(id: string, grantee: IGrantable): storageBucketIamMember.StorageBucketIamMember {
    return this.grant(id, grantee, {
      id: this.resource.name,
      role: StorageRoles.OBJECT_CREATOR,
    });
  }

  public grantView(id: string, grantee: IGrantable): storageBucketIamMember.StorageBucketIamMember {
    return this.grant(id, grantee, {
      id: this.resource.name,
      role: StorageRoles.OBJECT_VIEWER,
    });
  }

  private grant(id: string, grantee: IGrantable, config: GrantConfig): storageBucketIamMember.StorageBucketIamMember {
    this.cryptoKey?.grantEncrypterDecrypter(id, grantee);

    return new storageBucketIamMember.StorageBucketIamMember(this, id, {
      bucket: config.id,
      member: grantee.grantMember,
      role: config.role,
    });
  }
}

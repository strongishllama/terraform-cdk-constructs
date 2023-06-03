import { Construct } from "constructs";
import { kmsCryptoKeyIamMember, storageBucketIamMember } from "@cdktf/provider-google";

export interface BucketGrantConfig {
  bucket: string;
  member: string;
  role: string;
  cryptoKeyMember?: kmsCryptoKeyIamMember.KmsCryptoKeyIamMember;
}

export class BucketGrant {
  public readonly bucketMember: storageBucketIamMember.StorageBucketIamMember;
  public readonly cryptoKeyMember?: kmsCryptoKeyIamMember.KmsCryptoKeyIamMember;

  constructor(scope: Construct, id: string, config: BucketGrantConfig) {
    this.bucketMember = new storageBucketIamMember.StorageBucketIamMember(scope, id, {
      bucket: config.bucket,
      member: config.member,
      role: config.role,
    });
    this.cryptoKeyMember = config.cryptoKeyMember;
  }
}

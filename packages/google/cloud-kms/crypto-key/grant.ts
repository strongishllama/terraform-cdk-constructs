import { Construct } from "constructs";
import { kmsCryptoKeyIamMember } from "@cdktf/provider-google";

export interface CryptoKeyGrantConfig {
  cryptoKeyId: string;
  member: string;
  role: string;
}

export class CryptoKeyGrant {
  public readonly member: kmsCryptoKeyIamMember.KmsCryptoKeyIamMember;

  constructor(scope: Construct, id: string, config: CryptoKeyGrantConfig) {
    this.member = new kmsCryptoKeyIamMember.KmsCryptoKeyIamMember(scope, id, {
      cryptoKeyId: config.cryptoKeyId,
      member: config.member,
      role: config.role,
    });
  }
}

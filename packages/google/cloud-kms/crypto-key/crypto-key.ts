import { Construct } from "constructs";
import { kmsCryptoKey, kmsCryptoKeyIamMember } from "@cdktf/provider-google";
import { id as _id } from "@cdktf/provider-random";
import { IKeyRing } from "../key-ring/key-ring";
import { GrantConfig, IGrantable } from "@terraform-cdk-constructs/google-iam";
import { CloudKMSRoles } from "@terraform-cdk-constructs/google-iam";

export interface CryptoKeyConfig {
  readonly keyRing: IKeyRing;
  readonly name: string;
}

export class CryptoKey extends Construct {
  private readonly resource: kmsCryptoKey.KmsCryptoKey;

  constructor(scope: Construct, id: string, config: CryptoKeyConfig) {
    super(scope, id);

    const suffix = new _id.Id(this, "suffix", {
      byteLength: 6,
    });
    this.resource = new kmsCryptoKey.KmsCryptoKey(this, "resource", {
      keyRing: config.keyRing.id,
      name: `${config.name}-${suffix.id}`,
    });
  }

  public get name(): string {
    return this.resource.name;
  }

  public get id(): string {
    return this.resource.id;
  }

  public grantAdmin(grantee: IGrantable): kmsCryptoKeyIamMember.KmsCryptoKeyIamMember {
    return this.grant(grantee, {
      id: this.resource.id,
      role: CloudKMSRoles.ADMIN,
    });
  }

  public grantEncrypterDecrypter(grantee: IGrantable): kmsCryptoKeyIamMember.KmsCryptoKeyIamMember {
    return this.grant(grantee, {
      id: this.resource.id,
      role: CloudKMSRoles.ENCRYPTER_DECRYPTER,
    });
  }

  public grantViewer(grantee: IGrantable): kmsCryptoKeyIamMember.KmsCryptoKeyIamMember {
    return this.grant(grantee, {
      id: this.resource.id,
      role: CloudKMSRoles.VIEWER,
    });
  }

  private grant(grantee: IGrantable, config: GrantConfig): kmsCryptoKeyIamMember.KmsCryptoKeyIamMember {
    return new kmsCryptoKeyIamMember.KmsCryptoKeyIamMember(this, "member", {
      cryptoKeyId: config.id,
      member: grantee.grantMember,
      role: config.role,
    });
  }
}

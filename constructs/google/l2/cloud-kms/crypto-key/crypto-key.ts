import { Construct } from "constructs";
import { kmsCryptoKey, kmsCryptoKeyIamMember } from "@cdktf/provider-google";
import { IKeyRing } from "../key-ring/key-ring";
import { GrantConfig, IGrantable } from "../../iam";
import { CloudKMSRoles } from "../../../core/iam";

export interface CryptoKeyConfig {
  readonly keyRing: IKeyRing;
  readonly name: string;
  readonly labels?: {
    [key: string]: string;
  };
}

export class CryptoKey extends Construct {
  private readonly resource: kmsCryptoKey.KmsCryptoKey;

  constructor(scope: Construct, id: string, config: CryptoKeyConfig) {
    super(scope, id);

    this.resource = new kmsCryptoKey.KmsCryptoKey(this, "resource", {
      keyRing: config.keyRing.id,
      name: config.name,
      labels: config.labels,
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

import { Construct } from "constructs";
import { kmsCryptoKey, kmsCryptoKeyIamMember } from "@cdktf/provider-google";
import { KeyRing } from "../key-ring";
import { CloudKMSRoles, GrantConfig, IGrantable } from "../../iam";

export interface CryptoKeyConfig {
  // TODO: Change to IKeyRing interface so existing key rings can be pulled down using data blocks.
  readonly keyRing: KeyRing;
  readonly name: string;
}

export class CryptoKey extends Construct {
  private readonly resource: kmsCryptoKey.KmsCryptoKey;

  constructor(scope: Construct, name: string, config: CryptoKeyConfig) {
    super(scope, name);

    this.resource = new kmsCryptoKey.KmsCryptoKey(this, "crypto-key", {
      keyRing: config.keyRing.name,
      name: config.name,
    });
  }

  public get name(): string {
    return this.resource.name;
  }

  public grantAdmin(grantee: IGrantable): void {
    this.grant(grantee, {
      id: this.resource.id,
      role: CloudKMSRoles.ADMIN,
    });
  }

  public grantEncrypterDecrypter(grantee: IGrantable): void {
    this.grant(grantee, {
      id: this.resource.id,
      role: CloudKMSRoles.ENCRYPTER_DECRYPTER,
    });
  }

  public grantViewer(grantee: IGrantable): void {
    this.grant(grantee, {
      id: this.resource.id,
      role: CloudKMSRoles.VIEWER,
    });
  }

  private grant(grantee: IGrantable, config: GrantConfig): void {
    new kmsCryptoKeyIamMember.KmsCryptoKeyIamMember(this, "member", {
      cryptoKeyId: config.id,
      member: grantee.grantMember,
      role: config.role,
    });
  }
}

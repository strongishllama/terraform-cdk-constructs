import { Construct } from "constructs";
import { kmsCryptoKey } from "@cdktf/provider-google";
import { IKeyRing } from "../key-ring/key-ring";
import { GrantConfig, IGrantable } from "../../iam";
import { CloudKMSRoles } from "@terraform-cdk-constructs/google-iam";
import { CryptoKeyGrant } from "./grant";

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

  public grantAdmin(grantee: IGrantable): CryptoKeyGrant {
    return this.grant(grantee, {
      id: this.resource.id,
      role: CloudKMSRoles.ADMIN,
    });
  }

  public grantEncrypterDecrypter(grantee: IGrantable): CryptoKeyGrant {
    return this.grant(grantee, {
      id: this.resource.id,
      role: CloudKMSRoles.ENCRYPTER_DECRYPTER,
    });
  }

  public grantViewer(grantee: IGrantable): CryptoKeyGrant {
    return this.grant(grantee, {
      id: this.resource.id,
      role: CloudKMSRoles.VIEWER,
    });
  }

  private grant(grantee: IGrantable, config: GrantConfig): CryptoKeyGrant {
    return new CryptoKeyGrant(this, "grant", {
      cryptoKeyId: config.id,
      member: grantee.grantMember,
      role: config.role,
    });
  }
}

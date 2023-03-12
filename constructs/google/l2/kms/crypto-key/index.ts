import { Construct } from "constructs";
import { kmsCryptoKey } from "@cdktf/provider-google";
import { KeyRing } from "../key-ring";

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

  // TODO: Add grant method.
}

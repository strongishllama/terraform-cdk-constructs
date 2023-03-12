import { Construct } from "constructs";
import { kmsKeyRing } from "@cdktf/provider-google";

export interface KeyRingConfig {
  // TODO: Change to enum, see gcloud kms locations list
  readonly location: string;
  readonly name: string;
}

export class KeyRing extends Construct {
  private readonly resource: kmsKeyRing.KmsKeyRing;

  constructor(scope: Construct, name: string, config: KeyRingConfig) {
    super(scope, name);

    this.resource = new kmsKeyRing.KmsKeyRing(this, "key-ring", {
      location: config.location,
      name: config.name,
    });
  }

  public get name(): string {
    return this.resource.name;
  }
}

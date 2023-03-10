import { Construct } from "constructs";
import { kmsKeyRing } from "@cdktf/provider-google";
import { DataGoogleKmsKeyRing } from "@cdktf/provider-google/lib/data-google-kms-key-ring";

export interface KeyRingConfig {
  // TODO: Change to enum, see gcloud kms locations list
  readonly location: string;
  readonly name: string;
}

export class KeyRing extends Construct implements IKeyRing {
  public readonly id: string;
  private readonly resource: kmsKeyRing.KmsKeyRing;

  public static fromKeyRingAttributes(scope: Construct, id: string, attributes: KeyRingAttributes): IKeyRing {
    class Import implements IKeyRing {
      private readonly data: DataGoogleKmsKeyRing;

      constructor() {
        this.data = new DataGoogleKmsKeyRing(scope, id, {
          location: attributes.location,
          name: attributes.name,
        });
      }

      public get id(): string {
        return this.data.id;
      }

      public get name(): string {
        return this.data.name;
      }
    }

    return new Import();
  }

  constructor(scope: Construct, name: string, config: KeyRingConfig) {
    super(scope, name);

    this.resource = new kmsKeyRing.KmsKeyRing(this, "key-ring", {
      location: config.location,
      name: config.name,
    });

    this.id = this.resource.id;
  }

  public get name(): string {
    return this.resource.name;
  }
}

export interface IKeyRing {
  readonly id: string;
  readonly name: string;
}

export interface KeyRingAttributes {
  readonly location: string;
  readonly name: string;
}

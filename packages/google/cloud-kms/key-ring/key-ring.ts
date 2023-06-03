import { Construct } from "constructs";
import { kmsKeyRing } from "@cdktf/provider-google";
import { DataGoogleKmsKeyRing } from "@cdktf/provider-google/lib/data-google-kms-key-ring";
import { Location } from "../location";

export interface KeyRingConfig {
  readonly location: Location;
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

  constructor(scope: Construct, id: string, config: KeyRingConfig) {
    super(scope, id);

    this.resource = new kmsKeyRing.KmsKeyRing(this, "resource", {
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

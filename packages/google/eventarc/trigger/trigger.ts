import { Construct } from "constructs";
import { eventarcTrigger } from "@cdktf/provider-google";
import { Region } from "@terraform-cdk-constructs/google-compute-engine";

export interface TriggerConfig {
  readonly location: Region;
  readonly name: string;
}

export class Trigger extends Construct {
  private readonly resource: eventarcTrigger.EventarcTrigger;

  constructor(scope: Construct, id: string, config: TriggerConfig) {
    super(scope, id);

    this.resource = new eventarcTrigger.EventarcTrigger(this, "resource", {
      location: config.location,
      name: config.name,
      destination: {},
      matchingCriteria: [
        {
          attribute: "",
          value: "",
        },
      ],
    });

    if (this.resource) {
    }
  }
}

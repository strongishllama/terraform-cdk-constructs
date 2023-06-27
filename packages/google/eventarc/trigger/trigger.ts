import { Construct } from "constructs";
import { eventarcTrigger } from "@cdktf/provider-google";
import { Region } from "@terraform-cdk-constructs/google-compute-engine";
import * as destinations from "@terraform-cdk-constructs/google-eventarc-destinations";

export interface TriggerConfig {
  readonly name: string;
  readonly location: Region;
  readonly destination: destinations.ITriggerDestination;
  readonly matchingCriteria: MatchingCriteria[];
}

export class Trigger extends Construct {
  // private readonly resource: eventarcTrigger.EventarcTrigger;

  constructor(scope: Construct, id: string, config: TriggerConfig) {
    super(scope, id);

    let cloudRunService: eventarcTrigger.EventarcTriggerDestinationCloudRunService | undefined;
    if (config.destination.config.cloudRunService) {
      cloudRunService = {
        path: config.destination.config.cloudRunService.path,
        region: config.destination.config.cloudRunService.service.location,
        service: config.destination.config.cloudRunService.service.id,
      };
    }

    new eventarcTrigger.EventarcTrigger(this, "resource", {
      location: config.location,
      name: config.name,
      destination: {
        workflow: config.destination.config.workflow?.id,
        cloudRunService: cloudRunService,
      },
      matchingCriteria: config.matchingCriteria,
    });
  }
}

export interface MatchingCriteria {
  readonly attribute: string;
  readonly value: string;
}

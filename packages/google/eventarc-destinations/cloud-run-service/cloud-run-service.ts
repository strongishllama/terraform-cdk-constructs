import * as cloud_run from "@terraform-cdk-constructs/google-cloud-run";
import * as eventarc from "@terraform-cdk-constructs/google-eventarc";

export class CloudRunService implements eventarc.ITriggerDestination {
  public readonly config: eventarc.TriggerDestinationConfig;

  constructor(service: cloud_run.IService, path?: string) {
    this.config = {
      cloudRunService: {
        service: service,
        path: path,
      },
    };
  }
}

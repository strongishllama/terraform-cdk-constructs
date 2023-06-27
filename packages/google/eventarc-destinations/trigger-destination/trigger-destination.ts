import * as cloud_run from "@terraform-cdk-constructs/google-cloud-run";

export interface ITriggerDestination {
  readonly config: TriggerDestinationConfig;
}

export interface TriggerDestinationConfig {
  readonly workflow?: WorkflowConfig;
  readonly cloudRunService?: CloudRunServiceConfig;
}

export interface WorkflowConfig {
  id: string;
}

export interface CloudRunServiceConfig {
  readonly service: cloud_run.IService;
  readonly path?: string;
}

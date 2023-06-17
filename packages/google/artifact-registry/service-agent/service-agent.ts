import { Construct } from "constructs";

export interface ServiceAgentConfig {
  readonly projectNumber: string;
}

export class ServiceAgent extends Construct {
  public readonly grantMember: string;

  constructor(scope: Construct, id: string, config: ServiceAgentConfig) {
    super(scope, id);

    this.grantMember = `serviceAccount:service-${config.projectNumber}@gcp-sa-artifactregistry.iam.gserviceaccount.com`;
  }
}

import { Construct } from "constructs";

export interface ServiceAgentConfig {
  projectNumber: string;
}

export class ServiceAgent extends Construct {
  public readonly grantMember: string;

  constructor(scope: Construct, id: string, config: ServiceAgentConfig) {
    super(scope, id);

    // Doesn't currently exist? https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/storage_project_service_account
    // new DataGoogleStorageBucketServiceAccount()

    this.grantMember = `serviceAccount:service-${config.projectNumber}@gs-project-accounts.iam.gserviceaccount.com`;
  }
}

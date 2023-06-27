import { Construct } from "constructs";

export interface ServiceAccountConfig {
  readonly projectNumber: string;
}

export class IamServiceAccount extends Construct {
  public readonly grantMember: string;

  constructor(scope: Construct, id: string, config: ServiceAccountConfig) {
    super(scope, id);

    this.grantMember = `serviceAccount:${config.projectNumber}-compute@developer.gserviceaccount.com`;
  }
}

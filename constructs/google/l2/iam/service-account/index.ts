import { Construct } from "constructs";
import { serviceAccount } from "@cdktf/provider-google";

export interface ServiceAccountConfig {
  readonly accountId: string;
}

export class ServiceAccount extends Construct {
  public readonly grantMember: string;
  private readonly resource: serviceAccount.ServiceAccount;

  constructor(scope: Construct, id: string, config: ServiceAccountConfig) {
    super(scope, id);

    this.resource = new serviceAccount.ServiceAccount(this, "resource", {
      accountId: config.accountId,
    });

    this.grantMember = this.resource.member;
  }
}

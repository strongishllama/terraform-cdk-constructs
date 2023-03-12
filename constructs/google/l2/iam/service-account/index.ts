import { Construct } from "constructs";
import { serviceAccount } from "@cdktf/provider-google";

export interface ServiceAccountConfig {
  readonly accountId: string;
}

export class ServiceAccount extends Construct {
  public readonly grantMember: string;
  private readonly resource: serviceAccount.ServiceAccount;

  constructor(scope: Construct, name: string, config: ServiceAccountConfig) {
    super(scope, name);

    this.resource = new serviceAccount.ServiceAccount(this, "Resource", {
      accountId: config.accountId,
    });

    this.grantMember = this.resource.member;
  }
}

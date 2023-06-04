import { Construct } from "constructs";
import { serviceAccount } from "@cdktf/provider-google";

export interface ServiceAccountConfig {
  readonly accountId: string;
}

// TODO: Figure out a way to change the name of the class to ServiceAccount.
//       Currently JSII complains about the name conflicting with the 'serviceAccount' import.
//       This is not a problem with other L1 resources because they're prefix with their service name, i.e 'storageBucket'.
export class IamServiceAccount extends Construct {
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

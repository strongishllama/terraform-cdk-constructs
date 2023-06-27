import { Construct } from "constructs";
import { computeNetwork, computeSubnetwork } from "@cdktf/provider-google";

export interface VpcConfig {
  readonly name: string;
  readonly subnets: SubnetConfig[];
}

export class Vpc extends Construct implements IVpc {
  public readonly id: string;

  private readonly networkResource: computeNetwork.ComputeNetwork;
  private readonly subnetworkResources = new Map<string, computeSubnetwork.ComputeSubnetwork>();

  constructor(scope: Construct, id: string, config: VpcConfig) {
    super(scope, id);

    const subnets: SubnetConfig[] = [];
    config.subnets.forEach((s) => {
      subnets.push({
        name: s.name,
        cidr: s.cidr,
        enablePrivateGoogleAccess: s.enablePrivateGoogleAccess === undefined ? false : s.enablePrivateGoogleAccess,
      });
    });

    this.networkResource = new computeNetwork.ComputeNetwork(this, "network-resource", {
      autoCreateSubnetworks: config.subnets.length === 0,
      name: config.name,
    });

    this.id = this.networkResource.id;

    subnets.forEach((s) => {
      this.subnetworkResources.set(
        s.name,
        new computeSubnetwork.ComputeSubnetwork(this, `${s.name}-subnetwork-resources`, {
          ipCidrRange: s.cidr,
          name: s.name,
          network: this.networkResource.id,
          privateIpGoogleAccess: s.enablePrivateGoogleAccess,
        })
      );
    });
  }

  public getSubnet(name: string): ISubnet {
    const subnet = this.subnetworkResources.get(name);
    if (!subnet) {
      throw new Error(`Subnet for key ${name} was not found in Vpc.subnetResources`);
    }

    return {
      id: subnet.id,
    };
  }
}

export interface SubnetConfig {
  readonly name: string;
  readonly cidr: string;
  /**
   * If 'true', resources in this subnet will be able to access Google APIs without external IP addresses.
   *
   * @default false
   */
  readonly enablePrivateGoogleAccess?: boolean;
}

export interface IVpc {
  readonly id: string;
}

export interface ISubnet {
  readonly id: string;
}

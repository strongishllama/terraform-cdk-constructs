import { Construct } from "constructs";
import { dnsManagedZone } from "@cdktf/provider-google";

export interface ManagedZoneConfig {
  readonly dnsName: string;
  readonly name: string;
}

export class ManagedZone extends Construct implements IManagedZone {
  public readonly id: string;
  private readonly resource: dnsManagedZone.DnsManagedZone;

  constructor(scope: Construct, id: string, config: ManagedZoneConfig) {
    super(scope, id);

    this.resource = new dnsManagedZone.DnsManagedZone(this, "resource", {
      dnsName: config.dnsName,
      name: config.name,
    });

    this.id = this.resource.id;
  }
}

export interface IManagedZone {
  readonly id: string;
}

import { Construct } from "constructs";
import { dnsRecordSet } from "@cdktf/provider-google";
import { RecordSetType } from "../../../core/cloud-dns";
import { IManagedZone } from "../managed-zone";

export interface RecordSetConfig {
  readonly managedZone: IManagedZone;
  readonly name: string;
  readonly type: RecordSetType;
}

export class RecordSet extends Construct {
  // private readonly resource: dnsRecordSet.DnsRecordSet;

  constructor(scope: Construct, id: string, config: RecordSetConfig) {
    super(scope, id);

    /*this.resource = */new dnsRecordSet.DnsRecordSet(this, "resource", {
      managedZone: config.managedZone.id,
      name: config.name,
      type: config.type,
    });
  }
}

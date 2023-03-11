import { Construct } from "constructs";
import { storageBucket } from "@cdktf/provider-google";
import { Region } from "../../../core/region";

export interface BucketConfig {
  readonly location: Region;
  readonly name: string;
}

export class Bucket extends Construct {
  private readonly resource: storageBucket.StorageBucket;

  constructor(scope: Construct, name: string, config: BucketConfig) {
    super(scope, name);

    const resource = new storageBucket.StorageBucket(this, "Resource", {
      location: config.location,
      name: config.name,
    });
    this.resource = resource;
  }
}

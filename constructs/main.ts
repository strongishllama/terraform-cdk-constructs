import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { storageBucket } from "@cdktf/provider-google";
import { Bucket } from "./google/l2/cloud-storage";
import { Region } from "./google/core/region";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new storageBucket.StorageBucket(this, "bucket", {
      location: "australia-southeast1",
      name: "example-bucket",
    });

    new Bucket(this, "bucket", {
      location: Region.AUSTRALIA_SOUTHEAST1,
      name: "example-bucket",
    });
  }
}

const app = new App();
new MyStack(app, "constructs");
app.synth();

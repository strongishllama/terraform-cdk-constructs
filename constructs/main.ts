import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { kmsCryptoKey, kmsKeyRing, serviceAccount, storageBucket, storageBucketIamMember } from "@cdktf/provider-google";
import { Bucket } from "./google/l2/cloud-storage";
import { Region } from "./google/core/region";
import { ServiceAccount } from "./google/l2/iam";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // L1 example.
    const l1KeyRing = new kmsKeyRing.KmsKeyRing(this, "key-ring", {
      location: "australia-southeast1",
      name: "example-key-ring",
    });
    const l1CryptoKey = new kmsCryptoKey.KmsCryptoKey(this, "crypto-key", {
      keyRing: l1KeyRing.name,
      name: "example-crypto-key",
    });
    const l1Bucket = new storageBucket.StorageBucket(this, "bucket", {
      location: "australia-southeast1",
      name: "example-bucket",
      encryption: {
        defaultKmsKeyName: l1CryptoKey.name,
      },
    });
    const l1ServiceAccount = new serviceAccount.ServiceAccount(this, "service-account", {
      accountId: "john@example.com",
    });
    new storageBucketIamMember.StorageBucketIamMember(this, "member", {
      bucket: l1Bucket.name,
      member: l1ServiceAccount.member,
      role: "role/storage.objectViewer",
    });

    // L2 example.
    // const l2Bucket = new Bucket(this, "bucket", {
    //   location: Region.AUSTRALIA_SOUTHEAST1,
    //   name: "example-bucket",

    // });
    // const l2ServiceAccount = new ServiceAccount(this, "service-account", {
    //   accountId: "john@example.com",
    // });
    // l2Bucket.grantView(l2ServiceAccount);
  }
}

const app = new App();
new MyStack(app, "constructs");
app.synth();

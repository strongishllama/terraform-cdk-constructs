import { Construct } from "constructs";
import { TerraformStack } from "cdktf";
import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { Region } from "../../google/core/region";
import { CryptoKey, KeyRing } from "../../google/l2/cloud-kms";
import { Bucket } from "../../google/l2/cloud-storage";
import { ServiceAccount } from "../../google/l2/iam";

export class L2Stack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new GoogleProvider(this, "google", {
      region: Region.AUSTRALIA_SOUTHEAST1,
    });

    const l2KeyRing = KeyRing.fromKeyRingAttributes(this, "key-ring-l2", {
      location: Region.AUSTRALIA_SOUTHEAST1,
      name: "default",
    });
    const l2CryptoKey = new CryptoKey(this, "crypto-key-l2", {
      keyRing: l2KeyRing,
      name: "example-crypto-key-l2",
    });
    const l2Bucket = new Bucket(this, "bucket-l2", {
      cryptoKey: l2CryptoKey,
      location: Region.AUSTRALIA_SOUTHEAST1,
      name: "example-bucket",
    });
    const l2ServiceAccount = new ServiceAccount(this, "service-account-l2", {
      accountId: "example-service-account",
    });
    l2Bucket.grantView(l2ServiceAccount);
  }
}

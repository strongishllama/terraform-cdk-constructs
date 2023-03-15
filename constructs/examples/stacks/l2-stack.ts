import { env } from "process";
import { Construct } from "constructs";
import { TerraformStack } from "cdktf";
import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { Region } from "../../google/core/compute/region";
import { CryptoKey, KeyRing } from "../../google/l2/cloud-kms";
import { Bucket } from "../../google/l2/cloud-storage";
import { ServiceAccount } from "../../google/l2/iam";
import { DataGoogleProject } from "@cdktf/provider-google/lib/data-google-project";
import { Location } from "../../google/core/cloud-kms";

export class L2Stack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new GoogleProvider(this, "google", {
      region: Region.AUSTRALIA_SOUTHEAST1,
      project: env.PROJECT_ID,
    });
    const project = new DataGoogleProject(this, "project", {});

    const l2KeyRing = KeyRing.fromKeyRingAttributes(this, "key-ring-l2", {
      location: Location.AUSTRALIA_SOUTHEAST1,
      name: "default",
    });
    const l2CryptoKey = new CryptoKey(this, "crypto-key-l2", {
      keyRing: l2KeyRing,
      name: "example-crypto-key-l2_001",
    });
    // TODO: Clean up so service agents don't need to be created with inline objects.
    // TODO: Not sure if returning the created member is the right thing to do here.
    const cryptoMember = l2CryptoKey.grantEncrypterDecrypter({
      grantMember: `serviceAccount:service-${project.number}@gs-project-accounts.iam.gserviceaccount.com`,
    });
    const l2Bucket = new Bucket(this, "bucket-l2", {
      cryptoKey: l2CryptoKey,
      location: Region.AUSTRALIA_SOUTHEAST1,
      name: "example-bucket-l2",
      dependsOn: [cryptoMember],
    });
    const l2ServiceAccount = new ServiceAccount(this, "service-account-l2", {
      accountId: "example-service-account",
    });
    l2Bucket.grantView(l2ServiceAccount);
  }
}

import { env } from "process";
import { Construct } from "constructs";
import { TerraformStack } from "cdktf";
import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { Region } from "../../packages/google-core/compute/region/region";
import { CryptoKey, KeyRing } from "../../packages/google/l2/cloud-kms";
import { Bucket, ServiceAgent } from "../../packages/google/l2/cloud-storage";
import { ServiceAccount } from "../../packages/google/l2/iam";
import { Location } from "../../packages/google-core/cloud-kms";
import { Project } from "../../packages/google/l2/project/project";

export class L2Stack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new GoogleProvider(this, "google", {
      region: Region.AUSTRALIA_SOUTHEAST1,
      project: env.PROJECT_ID,
    });

    const project = Project.fromProjectAttributes(this, "project");

    const l2KeyRing = KeyRing.fromKeyRingAttributes(this, "key-ring-l2", {
      location: Location.AUSTRALIA_SOUTHEAST1,
      name: "default",
    });
    const l2CryptoKey = new CryptoKey(this, "crypto-key-l2", {
      keyRing: l2KeyRing,
      name: "example-crypto-key-l2_001",
    });
    const l2ServiceAgent = new ServiceAgent(this, "service-agent", {
      projectNumber: project.number,
    });
    const cryptoMember = l2CryptoKey.grantEncrypterDecrypter(l2ServiceAgent);
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

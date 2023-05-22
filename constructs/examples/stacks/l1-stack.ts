import { env } from "process";
import { Construct } from "constructs";
import { TerraformStack } from "cdktf";
import { kmsCryptoKey, kmsCryptoKeyIamMember, serviceAccount, storageBucket, storageBucketIamMember } from "@cdktf/provider-google";
import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { Region } from "../../google/core/compute/region/region";
import { DataGoogleKmsKeyRing } from "@cdktf/provider-google/lib/data-google-kms-key-ring";
import { DataGoogleProject } from "@cdktf/provider-google/lib/data-google-project";

export class L1Stack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new GoogleProvider(this, "google", {
      region: Region.AUSTRALIA_SOUTHEAST1,
      project: env.PROJECT_ID,
    });
    const project = new DataGoogleProject(this, "project", {});

    const keyRing = new DataGoogleKmsKeyRing(this, "key-ring-l1", {
      location: Region.AUSTRALIA_SOUTHEAST1,
      name: "default",
    });
    const cryptoKey = new kmsCryptoKey.KmsCryptoKey(this, "crypto-key-l1", {
      keyRing: keyRing.id,
      name: "example-crypto-key-l1_002",
    });
    const cryptoMember = new kmsCryptoKeyIamMember.KmsCryptoKeyIamMember(this, "crypto-member-l1", {
      cryptoKeyId: cryptoKey.id,
      member: `serviceAccount:service-${project.number}@gs-project-accounts.iam.gserviceaccount.com`,
      role: "roles/cloudkms.cryptoKeyEncrypterDecrypter",
    });
    const bucket = new storageBucket.StorageBucket(this, "bucket-l1", {
      location: "australia-southeast1",
      name: "example-bucket-l1",
      encryption: {
        defaultKmsKeyName: cryptoKey.id,
      },
      dependsOn: [cryptoMember],
    });
    const _serviceAccount = new serviceAccount.ServiceAccount(this, "service-account-l1", {
      accountId: "example-service-account-l1",
    });
    new storageBucketIamMember.StorageBucketIamMember(this, "member-l1", {
      bucket: bucket.name,
      member: _serviceAccount.member,
      role: "roles/storage.objectViewer",
    });
  }
}

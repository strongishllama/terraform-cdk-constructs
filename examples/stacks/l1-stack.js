"use strict";
// import { env } from "process";
// import { Construct } from "constructs";
// import { TerraformStack } from "cdktf";
// import { kmsCryptoKey, kmsCryptoKeyIamMember, serviceAccount, storageBucket, storageBucketIamMember } from "@cdktf/provider-google";
// import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
// import { Region } from "../../packages/google-core/compute/region/region";
// import { DataGoogleKmsKeyRing } from "@cdktf/provider-google/lib/data-google-kms-key-ring";
// import { DataGoogleProject } from "@cdktf/provider-google/lib/data-google-project";
// export class L1Stack extends TerraformStack {
//   constructor(scope: Construct, id: string) {
//     super(scope, id);
//     new GoogleProvider(this, "google", {
//       region: Region.AUSTRALIA_SOUTHEAST1,
//       project: env.PROJECT_ID,
//     });
//     const project = new DataGoogleProject(this, "project", {});
//     const keyRing = new DataGoogleKmsKeyRing(this, "key-ring-l1", {
//       location: Region.AUSTRALIA_SOUTHEAST1,
//       name: "default",
//     });
//     const cryptoKey = new kmsCryptoKey.KmsCryptoKey(this, "crypto-key-l1", {
//       keyRing: keyRing.id,
//       name: "example-crypto-key-l1_002",
//     });
//     const cryptoMember = new kmsCryptoKeyIamMember.KmsCryptoKeyIamMember(this, "crypto-member-l1", {
//       cryptoKeyId: cryptoKey.id,
//       member: `serviceAccount:service-${project.number}@gs-project-accounts.iam.gserviceaccount.com`,
//       role: "roles/cloudkms.cryptoKeyEncrypterDecrypter",
//     });
//     const bucket = new storageBucket.StorageBucket(this, "bucket-l1", {
//       location: "australia-southeast1",
//       name: "example-bucket-l1",
//       encryption: {
//         defaultKmsKeyName: cryptoKey.id,
//       },
//       dependsOn: [cryptoMember],
//     });
//     const _serviceAccount = new serviceAccount.ServiceAccount(this, "service-account-l1", {
//       accountId: "example-service-account-l1",
//     });
//     new storageBucketIamMember.StorageBucketIamMember(this, "member-l1", {
//       bucket: bucket.name,
//       member: _serviceAccount.member,
//       role: "roles/storage.objectViewer",
//     });
//   }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibDEtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsMS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQWlDO0FBQ2pDLDBDQUEwQztBQUMxQywwQ0FBMEM7QUFDMUMsdUlBQXVJO0FBQ3ZJLHdFQUF3RTtBQUN4RSw2RUFBNkU7QUFDN0UsOEZBQThGO0FBQzlGLHNGQUFzRjtBQUV0RixnREFBZ0Q7QUFDaEQsZ0RBQWdEO0FBQ2hELHdCQUF3QjtBQUV4QiwyQ0FBMkM7QUFDM0MsNkNBQTZDO0FBQzdDLGlDQUFpQztBQUNqQyxVQUFVO0FBQ1Ysa0VBQWtFO0FBRWxFLHNFQUFzRTtBQUN0RSwrQ0FBK0M7QUFDL0MseUJBQXlCO0FBQ3pCLFVBQVU7QUFDViwrRUFBK0U7QUFDL0UsNkJBQTZCO0FBQzdCLDJDQUEyQztBQUMzQyxVQUFVO0FBQ1YsdUdBQXVHO0FBQ3ZHLG1DQUFtQztBQUNuQyx3R0FBd0c7QUFDeEcsNERBQTREO0FBQzVELFVBQVU7QUFDViwwRUFBMEU7QUFDMUUsMENBQTBDO0FBQzFDLG1DQUFtQztBQUNuQyxzQkFBc0I7QUFDdEIsMkNBQTJDO0FBQzNDLFdBQVc7QUFDWCxtQ0FBbUM7QUFDbkMsVUFBVTtBQUNWLDhGQUE4RjtBQUM5RixpREFBaUQ7QUFDakQsVUFBVTtBQUNWLDZFQUE2RTtBQUM3RSw2QkFBNkI7QUFDN0Isd0NBQXdDO0FBQ3hDLDRDQUE0QztBQUM1QyxVQUFVO0FBQ1YsTUFBTTtBQUNOLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBlbnYgfSBmcm9tIFwicHJvY2Vzc1wiO1xuLy8gaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcbi8vIGltcG9ydCB7IFRlcnJhZm9ybVN0YWNrIH0gZnJvbSBcImNka3RmXCI7XG4vLyBpbXBvcnQgeyBrbXNDcnlwdG9LZXksIGttc0NyeXB0b0tleUlhbU1lbWJlciwgc2VydmljZUFjY291bnQsIHN0b3JhZ2VCdWNrZXQsIHN0b3JhZ2VCdWNrZXRJYW1NZW1iZXIgfSBmcm9tIFwiQGNka3RmL3Byb3ZpZGVyLWdvb2dsZVwiO1xuLy8gaW1wb3J0IHsgR29vZ2xlUHJvdmlkZXIgfSBmcm9tIFwiQGNka3RmL3Byb3ZpZGVyLWdvb2dsZS9saWIvcHJvdmlkZXJcIjtcbi8vIGltcG9ydCB7IFJlZ2lvbiB9IGZyb20gXCIuLi8uLi9wYWNrYWdlcy9nb29nbGUtY29yZS9jb21wdXRlL3JlZ2lvbi9yZWdpb25cIjtcbi8vIGltcG9ydCB7IERhdGFHb29nbGVLbXNLZXlSaW5nIH0gZnJvbSBcIkBjZGt0Zi9wcm92aWRlci1nb29nbGUvbGliL2RhdGEtZ29vZ2xlLWttcy1rZXktcmluZ1wiO1xuLy8gaW1wb3J0IHsgRGF0YUdvb2dsZVByb2plY3QgfSBmcm9tIFwiQGNka3RmL3Byb3ZpZGVyLWdvb2dsZS9saWIvZGF0YS1nb29nbGUtcHJvamVjdFwiO1xuXG4vLyBleHBvcnQgY2xhc3MgTDFTdGFjayBleHRlbmRzIFRlcnJhZm9ybVN0YWNrIHtcbi8vICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZykge1xuLy8gICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbi8vICAgICBuZXcgR29vZ2xlUHJvdmlkZXIodGhpcywgXCJnb29nbGVcIiwge1xuLy8gICAgICAgcmVnaW9uOiBSZWdpb24uQVVTVFJBTElBX1NPVVRIRUFTVDEsXG4vLyAgICAgICBwcm9qZWN0OiBlbnYuUFJPSkVDVF9JRCxcbi8vICAgICB9KTtcbi8vICAgICBjb25zdCBwcm9qZWN0ID0gbmV3IERhdGFHb29nbGVQcm9qZWN0KHRoaXMsIFwicHJvamVjdFwiLCB7fSk7XG5cbi8vICAgICBjb25zdCBrZXlSaW5nID0gbmV3IERhdGFHb29nbGVLbXNLZXlSaW5nKHRoaXMsIFwia2V5LXJpbmctbDFcIiwge1xuLy8gICAgICAgbG9jYXRpb246IFJlZ2lvbi5BVVNUUkFMSUFfU09VVEhFQVNUMSxcbi8vICAgICAgIG5hbWU6IFwiZGVmYXVsdFwiLFxuLy8gICAgIH0pO1xuLy8gICAgIGNvbnN0IGNyeXB0b0tleSA9IG5ldyBrbXNDcnlwdG9LZXkuS21zQ3J5cHRvS2V5KHRoaXMsIFwiY3J5cHRvLWtleS1sMVwiLCB7XG4vLyAgICAgICBrZXlSaW5nOiBrZXlSaW5nLmlkLFxuLy8gICAgICAgbmFtZTogXCJleGFtcGxlLWNyeXB0by1rZXktbDFfMDAyXCIsXG4vLyAgICAgfSk7XG4vLyAgICAgY29uc3QgY3J5cHRvTWVtYmVyID0gbmV3IGttc0NyeXB0b0tleUlhbU1lbWJlci5LbXNDcnlwdG9LZXlJYW1NZW1iZXIodGhpcywgXCJjcnlwdG8tbWVtYmVyLWwxXCIsIHtcbi8vICAgICAgIGNyeXB0b0tleUlkOiBjcnlwdG9LZXkuaWQsXG4vLyAgICAgICBtZW1iZXI6IGBzZXJ2aWNlQWNjb3VudDpzZXJ2aWNlLSR7cHJvamVjdC5udW1iZXJ9QGdzLXByb2plY3QtYWNjb3VudHMuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb21gLFxuLy8gICAgICAgcm9sZTogXCJyb2xlcy9jbG91ZGttcy5jcnlwdG9LZXlFbmNyeXB0ZXJEZWNyeXB0ZXJcIixcbi8vICAgICB9KTtcbi8vICAgICBjb25zdCBidWNrZXQgPSBuZXcgc3RvcmFnZUJ1Y2tldC5TdG9yYWdlQnVja2V0KHRoaXMsIFwiYnVja2V0LWwxXCIsIHtcbi8vICAgICAgIGxvY2F0aW9uOiBcImF1c3RyYWxpYS1zb3V0aGVhc3QxXCIsXG4vLyAgICAgICBuYW1lOiBcImV4YW1wbGUtYnVja2V0LWwxXCIsXG4vLyAgICAgICBlbmNyeXB0aW9uOiB7XG4vLyAgICAgICAgIGRlZmF1bHRLbXNLZXlOYW1lOiBjcnlwdG9LZXkuaWQsXG4vLyAgICAgICB9LFxuLy8gICAgICAgZGVwZW5kc09uOiBbY3J5cHRvTWVtYmVyXSxcbi8vICAgICB9KTtcbi8vICAgICBjb25zdCBfc2VydmljZUFjY291bnQgPSBuZXcgc2VydmljZUFjY291bnQuU2VydmljZUFjY291bnQodGhpcywgXCJzZXJ2aWNlLWFjY291bnQtbDFcIiwge1xuLy8gICAgICAgYWNjb3VudElkOiBcImV4YW1wbGUtc2VydmljZS1hY2NvdW50LWwxXCIsXG4vLyAgICAgfSk7XG4vLyAgICAgbmV3IHN0b3JhZ2VCdWNrZXRJYW1NZW1iZXIuU3RvcmFnZUJ1Y2tldElhbU1lbWJlcih0aGlzLCBcIm1lbWJlci1sMVwiLCB7XG4vLyAgICAgICBidWNrZXQ6IGJ1Y2tldC5uYW1lLFxuLy8gICAgICAgbWVtYmVyOiBfc2VydmljZUFjY291bnQubWVtYmVyLFxuLy8gICAgICAgcm9sZTogXCJyb2xlcy9zdG9yYWdlLm9iamVjdFZpZXdlclwiLFxuLy8gICAgIH0pO1xuLy8gICB9XG4vLyB9XG4iXX0=
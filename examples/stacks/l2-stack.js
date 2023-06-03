"use strict";
// import { env } from "process";
// import { Construct } from "constructs";
// import { TerraformStack } from "cdktf";
// import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
// import { Region } from "../../packages/google-core/compute/region/region";
// import { CryptoKey, KeyRing } from "../../packages/google/l2/cloud-kms";
// import { Bucket, ServiceAgent } from "../../packages/google/l2/cloud-storage";
// import { ServiceAccount } from "../../packages/google/l2/iam";
// import { Location } from "../../packages/google-core/cloud-kms";
// import { Project } from "../../packages/google/l2/project/project";
// export class L2Stack extends TerraformStack {
//   constructor(scope: Construct, id: string) {
//     super(scope, id);
//     new GoogleProvider(this, "google", {
//       region: Region.AUSTRALIA_SOUTHEAST1,
//       project: env.PROJECT_ID,
//     });
//     const project = Project.fromProjectAttributes(this, "project");
//     const l2KeyRing = KeyRing.fromKeyRingAttributes(this, "key-ring-l2", {
//       location: Location.AUSTRALIA_SOUTHEAST1,
//       name: "default",
//     });
//     const l2CryptoKey = new CryptoKey(this, "crypto-key-l2", {
//       keyRing: l2KeyRing,
//       name: "example-crypto-key-l2_001",
//     });
//     const l2ServiceAgent = new ServiceAgent(this, "service-agent", {
//       projectNumber: project.number,
//     });
//     const cryptoMember = l2CryptoKey.grantEncrypterDecrypter(l2ServiceAgent);
//     const l2Bucket = new Bucket(this, "bucket-l2", {
//       cryptoKey: l2CryptoKey,
//       location: Region.AUSTRALIA_SOUTHEAST1,
//       name: "example-bucket-l2",
//       dependsOn: [cryptoMember],
//     });
//     const l2ServiceAccount = new ServiceAccount(this, "service-account-l2", {
//       accountId: "example-service-account",
//     });
//     l2Bucket.grantView(l2ServiceAccount);
//   }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibDItc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsMi1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQWlDO0FBQ2pDLDBDQUEwQztBQUMxQywwQ0FBMEM7QUFDMUMsd0VBQXdFO0FBQ3hFLDZFQUE2RTtBQUM3RSwyRUFBMkU7QUFDM0UsaUZBQWlGO0FBQ2pGLGlFQUFpRTtBQUNqRSxtRUFBbUU7QUFDbkUsc0VBQXNFO0FBRXRFLGdEQUFnRDtBQUNoRCxnREFBZ0Q7QUFDaEQsd0JBQXdCO0FBRXhCLDJDQUEyQztBQUMzQyw2Q0FBNkM7QUFDN0MsaUNBQWlDO0FBQ2pDLFVBQVU7QUFFVixzRUFBc0U7QUFFdEUsNkVBQTZFO0FBQzdFLGlEQUFpRDtBQUNqRCx5QkFBeUI7QUFDekIsVUFBVTtBQUNWLGlFQUFpRTtBQUNqRSw0QkFBNEI7QUFDNUIsMkNBQTJDO0FBQzNDLFVBQVU7QUFDVix1RUFBdUU7QUFDdkUsdUNBQXVDO0FBQ3ZDLFVBQVU7QUFDVixnRkFBZ0Y7QUFDaEYsdURBQXVEO0FBQ3ZELGdDQUFnQztBQUNoQywrQ0FBK0M7QUFDL0MsbUNBQW1DO0FBQ25DLG1DQUFtQztBQUNuQyxVQUFVO0FBQ1YsZ0ZBQWdGO0FBQ2hGLDhDQUE4QztBQUM5QyxVQUFVO0FBQ1YsNENBQTRDO0FBQzVDLE1BQU07QUFDTixJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgZW52IH0gZnJvbSBcInByb2Nlc3NcIjtcbi8vIGltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG4vLyBpbXBvcnQgeyBUZXJyYWZvcm1TdGFjayB9IGZyb20gXCJjZGt0ZlwiO1xuLy8gaW1wb3J0IHsgR29vZ2xlUHJvdmlkZXIgfSBmcm9tIFwiQGNka3RmL3Byb3ZpZGVyLWdvb2dsZS9saWIvcHJvdmlkZXJcIjtcbi8vIGltcG9ydCB7IFJlZ2lvbiB9IGZyb20gXCIuLi8uLi9wYWNrYWdlcy9nb29nbGUtY29yZS9jb21wdXRlL3JlZ2lvbi9yZWdpb25cIjtcbi8vIGltcG9ydCB7IENyeXB0b0tleSwgS2V5UmluZyB9IGZyb20gXCIuLi8uLi9wYWNrYWdlcy9nb29nbGUvbDIvY2xvdWQta21zXCI7XG4vLyBpbXBvcnQgeyBCdWNrZXQsIFNlcnZpY2VBZ2VudCB9IGZyb20gXCIuLi8uLi9wYWNrYWdlcy9nb29nbGUvbDIvY2xvdWQtc3RvcmFnZVwiO1xuLy8gaW1wb3J0IHsgU2VydmljZUFjY291bnQgfSBmcm9tIFwiLi4vLi4vcGFja2FnZXMvZ29vZ2xlL2wyL2lhbVwiO1xuLy8gaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiLi4vLi4vcGFja2FnZXMvZ29vZ2xlLWNvcmUvY2xvdWQta21zXCI7XG4vLyBpbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSBcIi4uLy4uL3BhY2thZ2VzL2dvb2dsZS9sMi9wcm9qZWN0L3Byb2plY3RcIjtcblxuLy8gZXhwb3J0IGNsYXNzIEwyU3RhY2sgZXh0ZW5kcyBUZXJyYWZvcm1TdGFjayB7XG4vLyAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcpIHtcbi8vICAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4vLyAgICAgbmV3IEdvb2dsZVByb3ZpZGVyKHRoaXMsIFwiZ29vZ2xlXCIsIHtcbi8vICAgICAgIHJlZ2lvbjogUmVnaW9uLkFVU1RSQUxJQV9TT1VUSEVBU1QxLFxuLy8gICAgICAgcHJvamVjdDogZW52LlBST0pFQ1RfSUQsXG4vLyAgICAgfSk7XG5cbi8vICAgICBjb25zdCBwcm9qZWN0ID0gUHJvamVjdC5mcm9tUHJvamVjdEF0dHJpYnV0ZXModGhpcywgXCJwcm9qZWN0XCIpO1xuXG4vLyAgICAgY29uc3QgbDJLZXlSaW5nID0gS2V5UmluZy5mcm9tS2V5UmluZ0F0dHJpYnV0ZXModGhpcywgXCJrZXktcmluZy1sMlwiLCB7XG4vLyAgICAgICBsb2NhdGlvbjogTG9jYXRpb24uQVVTVFJBTElBX1NPVVRIRUFTVDEsXG4vLyAgICAgICBuYW1lOiBcImRlZmF1bHRcIixcbi8vICAgICB9KTtcbi8vICAgICBjb25zdCBsMkNyeXB0b0tleSA9IG5ldyBDcnlwdG9LZXkodGhpcywgXCJjcnlwdG8ta2V5LWwyXCIsIHtcbi8vICAgICAgIGtleVJpbmc6IGwyS2V5UmluZyxcbi8vICAgICAgIG5hbWU6IFwiZXhhbXBsZS1jcnlwdG8ta2V5LWwyXzAwMVwiLFxuLy8gICAgIH0pO1xuLy8gICAgIGNvbnN0IGwyU2VydmljZUFnZW50ID0gbmV3IFNlcnZpY2VBZ2VudCh0aGlzLCBcInNlcnZpY2UtYWdlbnRcIiwge1xuLy8gICAgICAgcHJvamVjdE51bWJlcjogcHJvamVjdC5udW1iZXIsXG4vLyAgICAgfSk7XG4vLyAgICAgY29uc3QgY3J5cHRvTWVtYmVyID0gbDJDcnlwdG9LZXkuZ3JhbnRFbmNyeXB0ZXJEZWNyeXB0ZXIobDJTZXJ2aWNlQWdlbnQpO1xuLy8gICAgIGNvbnN0IGwyQnVja2V0ID0gbmV3IEJ1Y2tldCh0aGlzLCBcImJ1Y2tldC1sMlwiLCB7XG4vLyAgICAgICBjcnlwdG9LZXk6IGwyQ3J5cHRvS2V5LFxuLy8gICAgICAgbG9jYXRpb246IFJlZ2lvbi5BVVNUUkFMSUFfU09VVEhFQVNUMSxcbi8vICAgICAgIG5hbWU6IFwiZXhhbXBsZS1idWNrZXQtbDJcIixcbi8vICAgICAgIGRlcGVuZHNPbjogW2NyeXB0b01lbWJlcl0sXG4vLyAgICAgfSk7XG4vLyAgICAgY29uc3QgbDJTZXJ2aWNlQWNjb3VudCA9IG5ldyBTZXJ2aWNlQWNjb3VudCh0aGlzLCBcInNlcnZpY2UtYWNjb3VudC1sMlwiLCB7XG4vLyAgICAgICBhY2NvdW50SWQ6IFwiZXhhbXBsZS1zZXJ2aWNlLWFjY291bnRcIixcbi8vICAgICB9KTtcbi8vICAgICBsMkJ1Y2tldC5ncmFudFZpZXcobDJTZXJ2aWNlQWNjb3VudCk7XG4vLyAgIH1cbi8vIH1cbiJdfQ==
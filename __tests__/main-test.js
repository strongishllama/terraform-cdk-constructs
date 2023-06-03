"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
require("cdktf/lib/testing/adapters/jest"); // Load types for expect matchers
// import { Testing } from "cdktf";
describe("My CDKTF Application", () => {
    // The tests below are example tests, you can find more information at
    // https://cdk.tf/testing
    it.todo("should be tested");
    // // All Unit tests test the synthesised terraform code, it does not create real-world resources
    // describe("Unit testing using assertions", () => {
    //   it("should contain a resource", () => {
    //     // import { Image,Container } from "./.gen/providers/docker"
    //     expect(
    //       Testing.synthScope((scope) => {
    //         new MyApplicationsAbstraction(scope, "my-app", {});
    //       })
    //     ).toHaveResource(Container);
    //     expect(
    //       Testing.synthScope((scope) => {
    //         new MyApplicationsAbstraction(scope, "my-app", {});
    //       })
    //     ).toHaveResourceWithProperties(Image, { name: "ubuntu:latest" });
    //   });
    // });
    // describe("Unit testing using snapshots", () => {
    //   it("Tests the snapshot", () => {
    //     const app = Testing.app();
    //     const stack = new TerraformStack(app, "test");
    //     new TestProvider(stack, "provider", {
    //       accessKey: "1",
    //     });
    //     new TestResource(stack, "test", {
    //       name: "my-resource",
    //     });
    //     expect(Testing.synth(stack)).toMatchSnapshot();
    //   });
    //   it("Tests a combination of resources", () => {
    //     expect(
    //       Testing.synthScope((stack) => {
    //         new TestDataSource(stack, "test-data-source", {
    //           name: "foo",
    //         });
    //         new TestResource(stack, "test-resource", {
    //           name: "bar",
    //         });
    //       })
    //     ).toMatchInlineSnapshot();
    //   });
    // });
    // describe("Checking validity", () => {
    //   it("check if the produced terraform configuration is valid", () => {
    //     const app = Testing.app();
    //     const stack = new TerraformStack(app, "test");
    //     new TestDataSource(stack, "test-data-source", {
    //       name: "foo",
    //     });
    //     new TestResource(stack, "test-resource", {
    //       name: "bar",
    //     });
    //     expect(Testing.fullSynth(app)).toBeValidTerraform();
    //   });
    //   it("check if this can be planned", () => {
    //     const app = Testing.app();
    //     const stack = new TerraformStack(app, "test");
    //     new TestDataSource(stack, "test-data-source", {
    //       name: "foo",
    //     });
    //     new TestResource(stack, "test-resource", {
    //       name: "bar",
    //     });
    //     expect(Testing.fullSynth(app)).toPlanSuccessfully();
    //   });
    // });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi10ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi10ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQStCO0FBQy9CLG1DQUFtQztBQUNuQywyQ0FBeUMsQ0FBQyxpQ0FBaUM7QUFDM0UsbUNBQW1DO0FBRW5DLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsc0VBQXNFO0lBQ3RFLHlCQUF5QjtJQUN6QixFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFFNUIsaUdBQWlHO0lBQ2pHLG9EQUFvRDtJQUNwRCw0Q0FBNEM7SUFDNUMsbUVBQW1FO0lBQ25FLGNBQWM7SUFDZCx3Q0FBd0M7SUFDeEMsOERBQThEO0lBQzlELFdBQVc7SUFDWCxtQ0FBbUM7SUFFbkMsY0FBYztJQUNkLHdDQUF3QztJQUN4Qyw4REFBOEQ7SUFDOUQsV0FBVztJQUNYLHdFQUF3RTtJQUN4RSxRQUFRO0lBQ1IsTUFBTTtJQUVOLG1EQUFtRDtJQUNuRCxxQ0FBcUM7SUFDckMsaUNBQWlDO0lBQ2pDLHFEQUFxRDtJQUVyRCw0Q0FBNEM7SUFDNUMsd0JBQXdCO0lBQ3hCLFVBQVU7SUFFVix3Q0FBd0M7SUFDeEMsNkJBQTZCO0lBQzdCLFVBQVU7SUFFVixzREFBc0Q7SUFDdEQsUUFBUTtJQUVSLG1EQUFtRDtJQUNuRCxjQUFjO0lBQ2Qsd0NBQXdDO0lBQ3hDLDBEQUEwRDtJQUMxRCx5QkFBeUI7SUFDekIsY0FBYztJQUVkLHFEQUFxRDtJQUNyRCx5QkFBeUI7SUFDekIsY0FBYztJQUNkLFdBQVc7SUFDWCxpQ0FBaUM7SUFDakMsUUFBUTtJQUNSLE1BQU07SUFFTix3Q0FBd0M7SUFDeEMseUVBQXlFO0lBQ3pFLGlDQUFpQztJQUNqQyxxREFBcUQ7SUFFckQsc0RBQXNEO0lBQ3RELHFCQUFxQjtJQUNyQixVQUFVO0lBRVYsaURBQWlEO0lBQ2pELHFCQUFxQjtJQUNyQixVQUFVO0lBQ1YsMkRBQTJEO0lBQzNELFFBQVE7SUFFUiwrQ0FBK0M7SUFDL0MsaUNBQWlDO0lBQ2pDLHFEQUFxRDtJQUVyRCxzREFBc0Q7SUFDdEQscUJBQXFCO0lBQ3JCLFVBQVU7SUFFVixpREFBaUQ7SUFDakQscUJBQXFCO0lBQ3JCLFVBQVU7SUFDViwyREFBMkQ7SUFDM0QsUUFBUTtJQUNSLE1BQU07QUFDUixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgSGFzaGlDb3JwLCBJbmNcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBNUEwtMi4wXG5pbXBvcnQgXCJjZGt0Zi9saWIvdGVzdGluZy9hZGFwdGVycy9qZXN0XCI7IC8vIExvYWQgdHlwZXMgZm9yIGV4cGVjdCBtYXRjaGVyc1xuLy8gaW1wb3J0IHsgVGVzdGluZyB9IGZyb20gXCJjZGt0ZlwiO1xuXG5kZXNjcmliZShcIk15IENES1RGIEFwcGxpY2F0aW9uXCIsICgpID0+IHtcbiAgLy8gVGhlIHRlc3RzIGJlbG93IGFyZSBleGFtcGxlIHRlc3RzLCB5b3UgY2FuIGZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhdFxuICAvLyBodHRwczovL2Nkay50Zi90ZXN0aW5nXG4gIGl0LnRvZG8oXCJzaG91bGQgYmUgdGVzdGVkXCIpO1xuXG4gIC8vIC8vIEFsbCBVbml0IHRlc3RzIHRlc3QgdGhlIHN5bnRoZXNpc2VkIHRlcnJhZm9ybSBjb2RlLCBpdCBkb2VzIG5vdCBjcmVhdGUgcmVhbC13b3JsZCByZXNvdXJjZXNcbiAgLy8gZGVzY3JpYmUoXCJVbml0IHRlc3RpbmcgdXNpbmcgYXNzZXJ0aW9uc1wiLCAoKSA9PiB7XG4gIC8vICAgaXQoXCJzaG91bGQgY29udGFpbiBhIHJlc291cmNlXCIsICgpID0+IHtcbiAgLy8gICAgIC8vIGltcG9ydCB7IEltYWdlLENvbnRhaW5lciB9IGZyb20gXCIuLy5nZW4vcHJvdmlkZXJzL2RvY2tlclwiXG4gIC8vICAgICBleHBlY3QoXG4gIC8vICAgICAgIFRlc3Rpbmcuc3ludGhTY29wZSgoc2NvcGUpID0+IHtcbiAgLy8gICAgICAgICBuZXcgTXlBcHBsaWNhdGlvbnNBYnN0cmFjdGlvbihzY29wZSwgXCJteS1hcHBcIiwge30pO1xuICAvLyAgICAgICB9KVxuICAvLyAgICAgKS50b0hhdmVSZXNvdXJjZShDb250YWluZXIpO1xuXG4gIC8vICAgICBleHBlY3QoXG4gIC8vICAgICAgIFRlc3Rpbmcuc3ludGhTY29wZSgoc2NvcGUpID0+IHtcbiAgLy8gICAgICAgICBuZXcgTXlBcHBsaWNhdGlvbnNBYnN0cmFjdGlvbihzY29wZSwgXCJteS1hcHBcIiwge30pO1xuICAvLyAgICAgICB9KVxuICAvLyAgICAgKS50b0hhdmVSZXNvdXJjZVdpdGhQcm9wZXJ0aWVzKEltYWdlLCB7IG5hbWU6IFwidWJ1bnR1OmxhdGVzdFwiIH0pO1xuICAvLyAgIH0pO1xuICAvLyB9KTtcblxuICAvLyBkZXNjcmliZShcIlVuaXQgdGVzdGluZyB1c2luZyBzbmFwc2hvdHNcIiwgKCkgPT4ge1xuICAvLyAgIGl0KFwiVGVzdHMgdGhlIHNuYXBzaG90XCIsICgpID0+IHtcbiAgLy8gICAgIGNvbnN0IGFwcCA9IFRlc3RpbmcuYXBwKCk7XG4gIC8vICAgICBjb25zdCBzdGFjayA9IG5ldyBUZXJyYWZvcm1TdGFjayhhcHAsIFwidGVzdFwiKTtcblxuICAvLyAgICAgbmV3IFRlc3RQcm92aWRlcihzdGFjaywgXCJwcm92aWRlclwiLCB7XG4gIC8vICAgICAgIGFjY2Vzc0tleTogXCIxXCIsXG4gIC8vICAgICB9KTtcblxuICAvLyAgICAgbmV3IFRlc3RSZXNvdXJjZShzdGFjaywgXCJ0ZXN0XCIsIHtcbiAgLy8gICAgICAgbmFtZTogXCJteS1yZXNvdXJjZVwiLFxuICAvLyAgICAgfSk7XG5cbiAgLy8gICAgIGV4cGVjdChUZXN0aW5nLnN5bnRoKHN0YWNrKSkudG9NYXRjaFNuYXBzaG90KCk7XG4gIC8vICAgfSk7XG5cbiAgLy8gICBpdChcIlRlc3RzIGEgY29tYmluYXRpb24gb2YgcmVzb3VyY2VzXCIsICgpID0+IHtcbiAgLy8gICAgIGV4cGVjdChcbiAgLy8gICAgICAgVGVzdGluZy5zeW50aFNjb3BlKChzdGFjaykgPT4ge1xuICAvLyAgICAgICAgIG5ldyBUZXN0RGF0YVNvdXJjZShzdGFjaywgXCJ0ZXN0LWRhdGEtc291cmNlXCIsIHtcbiAgLy8gICAgICAgICAgIG5hbWU6IFwiZm9vXCIsXG4gIC8vICAgICAgICAgfSk7XG5cbiAgLy8gICAgICAgICBuZXcgVGVzdFJlc291cmNlKHN0YWNrLCBcInRlc3QtcmVzb3VyY2VcIiwge1xuICAvLyAgICAgICAgICAgbmFtZTogXCJiYXJcIixcbiAgLy8gICAgICAgICB9KTtcbiAgLy8gICAgICAgfSlcbiAgLy8gICAgICkudG9NYXRjaElubGluZVNuYXBzaG90KCk7XG4gIC8vICAgfSk7XG4gIC8vIH0pO1xuXG4gIC8vIGRlc2NyaWJlKFwiQ2hlY2tpbmcgdmFsaWRpdHlcIiwgKCkgPT4ge1xuICAvLyAgIGl0KFwiY2hlY2sgaWYgdGhlIHByb2R1Y2VkIHRlcnJhZm9ybSBjb25maWd1cmF0aW9uIGlzIHZhbGlkXCIsICgpID0+IHtcbiAgLy8gICAgIGNvbnN0IGFwcCA9IFRlc3RpbmcuYXBwKCk7XG4gIC8vICAgICBjb25zdCBzdGFjayA9IG5ldyBUZXJyYWZvcm1TdGFjayhhcHAsIFwidGVzdFwiKTtcblxuICAvLyAgICAgbmV3IFRlc3REYXRhU291cmNlKHN0YWNrLCBcInRlc3QtZGF0YS1zb3VyY2VcIiwge1xuICAvLyAgICAgICBuYW1lOiBcImZvb1wiLFxuICAvLyAgICAgfSk7XG5cbiAgLy8gICAgIG5ldyBUZXN0UmVzb3VyY2Uoc3RhY2ssIFwidGVzdC1yZXNvdXJjZVwiLCB7XG4gIC8vICAgICAgIG5hbWU6IFwiYmFyXCIsXG4gIC8vICAgICB9KTtcbiAgLy8gICAgIGV4cGVjdChUZXN0aW5nLmZ1bGxTeW50aChhcHApKS50b0JlVmFsaWRUZXJyYWZvcm0oKTtcbiAgLy8gICB9KTtcblxuICAvLyAgIGl0KFwiY2hlY2sgaWYgdGhpcyBjYW4gYmUgcGxhbm5lZFwiLCAoKSA9PiB7XG4gIC8vICAgICBjb25zdCBhcHAgPSBUZXN0aW5nLmFwcCgpO1xuICAvLyAgICAgY29uc3Qgc3RhY2sgPSBuZXcgVGVycmFmb3JtU3RhY2soYXBwLCBcInRlc3RcIik7XG5cbiAgLy8gICAgIG5ldyBUZXN0RGF0YVNvdXJjZShzdGFjaywgXCJ0ZXN0LWRhdGEtc291cmNlXCIsIHtcbiAgLy8gICAgICAgbmFtZTogXCJmb29cIixcbiAgLy8gICAgIH0pO1xuXG4gIC8vICAgICBuZXcgVGVzdFJlc291cmNlKHN0YWNrLCBcInRlc3QtcmVzb3VyY2VcIiwge1xuICAvLyAgICAgICBuYW1lOiBcImJhclwiLFxuICAvLyAgICAgfSk7XG4gIC8vICAgICBleHBlY3QoVGVzdGluZy5mdWxsU3ludGgoYXBwKSkudG9QbGFuU3VjY2Vzc2Z1bGx5KCk7XG4gIC8vICAgfSk7XG4gIC8vIH0pO1xufSk7XG4iXX0=
import { App } from "cdktf";
import { L1Stack } from "./examples/stacks/l1-stack";
import { L2Stack } from "./examples/stacks/l2-stack";

const app = new App();
new L1Stack(app, "l1-stack");
new L2Stack(app, "l2-stack");
app.synth();

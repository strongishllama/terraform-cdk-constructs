import { IConstruct } from "constructs";
import { Aspects, IAspect } from "cdktf";

type LabelableConstruct = IConstruct & {
  labels?: {
    [key: string]: string;
  };
  labelsInput?: {
    [key: string]: string;
  };
};

function isLabelableConstruct(node: IConstruct): node is LabelableConstruct {
  return "labels" in node && "labelsInput" in node;
}

export class Labels implements IAspect {
  constructor(private readonly labels: Record<string, string>) {}

  public visit(node: IConstruct): void {
    if (isLabelableConstruct(node)) {
      node.labels = { ...this.labels, ...(node.labelsInput || {}) };
    }
  }

  public static add(scope: IConstruct, labels: Record<string, string>) {
    Aspects.of(scope).add(new Labels(labels));
  }
}

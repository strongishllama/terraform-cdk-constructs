import { Construct } from "constructs";
import { DataGoogleProject } from "@cdktf/provider-google/lib/data-google-project";

export interface ProjectConfig {}

export class Project extends Construct implements IProject {
  public static fromProjectAttributes(scope: Construct, id: string, attributes?: ProjectAttributes): IProject {
    class Import implements IProject {
      private readonly data: DataGoogleProject;

      constructor() {
        this.data = new DataGoogleProject(scope, id);
      }

      public get id(): string {
        return this.data.id;
      }

      public get number(): string {
        return this.data.number;
      }
    }

    return new Import();
  }

  // TODO: Implement
  private constructor(scope: Construct, id: string, config: ProjectConfig) {
    super(scope, id);
  }

  // TODO: Implement
  public get id(): string {
    return "";
  }

  // TODO: Implement
  public get number(): string {
    return "";
  }
}

export interface IProject {
  id: string;
  number: string;
}

export interface ProjectAttributes {}

import { Construct } from "constructs";
import { DataGoogleProject } from "@cdktf/provider-google/lib/data-google-project";

export interface ProjectConfig {
  readonly id: string;
  readonly number: string;
}

export class Project extends Construct implements IProject {
  public readonly id: string;
  public readonly number: string;

  public static fromProjectAttributes(scope: Construct, constructId: string, attributes?: ProjectAttributes): IProject {
    class Import implements IProject {
      public readonly id: string;
      public readonly number: string;
      private readonly data: DataGoogleProject;

      constructor() {
        this.data = new DataGoogleProject(scope, constructId, {
          id: attributes?.id,
          projectId: attributes?.projectId,
        });

        this.id = this.data.id;
        this.number = this.data.number;
      }
    }

    return new Import();
  }

  private constructor(scope: Construct, id: string, config: ProjectConfig) {
    super(scope, id);

    this.id = config.id;
    this.number = config.number;
  }
}

export interface IProject {
  readonly id: string;
  readonly number: string;
}

export interface ProjectAttributes {
  readonly id: string;
  readonly projectId: string;
}

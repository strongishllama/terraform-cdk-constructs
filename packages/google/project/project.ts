import { Construct } from "constructs";
import { DataGoogleProject } from "@cdktf/provider-google/lib/data-google-project";

export interface ProjectConfig {
  readonly id: string;
  readonly number: string;
}

export class Project extends Construct implements IProject {
  public readonly name: string;
  public readonly number: string;

  public static fromProjectAttributes(scope: Construct, constructId: string, attributes?: ProjectAttributes): IProject {
    class Import implements IProject {
      private readonly data: DataGoogleProject;

      constructor() {
        this.data = new DataGoogleProject(scope, constructId, {
          projectId: attributes?.projectId,
        });
      }

      public get name(): string {
        return this.data.name;
      }

      public get number(): string {
        return this.data.number;
      }
    }

    return new Import();
  }

  /**
   * NOT IMPLEMENTED
   * @param scope
   * @param id
   * @param _config
   */
  private constructor(scope: Construct, id: string, _config: ProjectConfig) {
    super(scope, id);

    this.name = "";
    this.number = "";
  }
}

export interface IProject {
  readonly name: string;
  readonly number: string;
}

export interface ProjectAttributes {
  readonly projectId: string;
}

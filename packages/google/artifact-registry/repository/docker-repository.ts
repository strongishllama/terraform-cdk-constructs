import { Construct } from "constructs";
import { Repository } from "./repository";
import { RepositoryFormat } from "../repository-format";
import { DockerImage } from "@terraform-cdk-constructs/google-artifact-registry-assets";
import { CryptoKey } from "@terraform-cdk-constructs/google-cloud-kms";

export interface DockerRepositoryConfig {
  readonly name: string;
  readonly cryptoKey?: CryptoKey;
}

export class DockerRepository extends Repository {
  constructor(scope: Construct, id: string, config: DockerRepositoryConfig) {
    super(scope, id, {
      format: RepositoryFormat.DOCKER,
      name: config.name,
      cryptoKey: config.cryptoKey,
    });
  }

  public addImage(id: string, config: ImageConfig): DockerImage {
    return new DockerImage(this, id, {
      path: config.path,
      name: `${this.resource.location}-docker.pkg.dev/${this.project.name}/${this.resource.name}/${config.name}`,
    });
  }
}

export interface ImageConfig {
  readonly path: string;
  readonly name: string;
}

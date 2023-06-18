import { TerraformAsset } from "cdktf";
import { Construct } from "constructs";
import { resource } from "@cdktf/provider-null";
import { IAsset } from "../asset";

export interface DockerImageConfig {
  readonly path: string;
  readonly name: string;
}

export class DockerImage extends Construct implements IAsset {
  public readonly id: string;
  public readonly uri: string;
  public readonly resource: resource.Resource;

  constructor(scope: Construct, id: string, config: DockerImageConfig) {
    super(scope, id);

    const asset = new TerraformAsset(this, "asset", {
      path: config.path,
    });

    const commands: string[] = [
      `cd ${asset.path}`, //
      `docker build --tag ${config.name} .`,
      `docker push ${config.name}`,
    ];

    this.resource = new resource.Resource(this, "resource", {
      triggers: {
        hash: asset.assetHash,
      },
      provisioners: [
        {
          type: "local-exec",
          command: commands.join(" && "),
        },
      ],
    });

    this.id = this.resource.id;
    this.uri = config.name;
  }
}

import { TerraformAsset } from "cdktf";
import { Construct } from "constructs";
import { resource } from "@cdktf/provider-null";

export interface DockerImageConfig {
  readonly path: string;
  readonly name: string;
}

export class DockerImage extends Construct {
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

    new resource.Resource(this, "resource", {
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
  }
}

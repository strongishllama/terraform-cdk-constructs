import { resource } from "@cdktf/provider-null";

export interface IAsset {
  readonly id: string;
  readonly uri: string;
  readonly resource: resource.Resource;
}

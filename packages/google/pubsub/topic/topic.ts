import { Construct } from "constructs";
import { pubsubTopic, pubsubTopicIamMember } from "@cdktf/provider-google";
import { GrantConfig, IGrantable, PubSubRoles } from "@terraform-cdk-constructs/google-iam";
import { CryptoKey } from "@terraform-cdk-constructs/google-cloud-kms";

export interface TopicConfig {
  readonly name: string;
  readonly cryptoKey: CryptoKey;
}

export class Topic extends Construct {
  private readonly resource: pubsubTopic.PubsubTopic;
  private readonly cryptoKey?: CryptoKey;

  constructor(scope: Construct, id: string, config: TopicConfig) {
    super(scope, id);

    if (config.cryptoKey !== undefined) {
      this.cryptoKey = config.cryptoKey;
    }

    this.resource = new pubsubTopic.PubsubTopic(this, "resource", {
      name: config.name,
      kmsKeyName: this.cryptoKey?.name,
    });
  }

  public grantPublisher(id: string, grantee: IGrantable): pubsubTopicIamMember.PubsubTopicIamMember {
    return this.grant(id, grantee, {
      id: this.resource.name,
      role: PubSubRoles.PUBLISHER,
    });
  }

  private grant(id: string, grantee: IGrantable, config: GrantConfig): pubsubTopicIamMember.PubsubTopicIamMember {
    if (this.cryptoKey !== undefined) {
      this.cryptoKey.grantEncrypterDecrypter(id, grantee);
    }

    return new pubsubTopicIamMember.PubsubTopicIamMember(this, "member", {
      member: grantee.grantMember,
      role: config.role,
      topic: config.id,
    });
  }
}

import { Construct } from "constructs";
import { artifactRegistryRepository, artifactRegistryRepositoryIamMember } from "@cdktf/provider-google";
import { RepositoryFormat } from "../repository-format";
import { CryptoKey } from "@terraform-cdk-constructs/google-cloud-kms";
import { ArtifactRegistryRoles, GrantConfig, IGrantable } from "@terraform-cdk-constructs/google-iam";

export interface RepositoryConfig {
  readonly format: RepositoryFormat;
  readonly name: string;
  readonly cryptoKey?: CryptoKey;
}

export class Repository extends Construct {
  private readonly resource: artifactRegistryRepository.ArtifactRegistryRepository;
  private readonly cryptoKey?: CryptoKey;

  constructor(scope: Construct, id: string, config: RepositoryConfig) {
    super(scope, id);

    this.cryptoKey = config.cryptoKey;

    this.resource = new artifactRegistryRepository.ArtifactRegistryRepository(this, "resource", {
      format: config.format,
      kmsKeyName: config.cryptoKey?.name,
      repositoryId: config.name,
    });
  }

  public grantAdmin(grantee: IGrantable): artifactRegistryRepositoryIamMember.ArtifactRegistryRepositoryIamMember {
    return this.grant(grantee, {
      id: this.resource.name,
      role: ArtifactRegistryRoles.REPOSITORY_ADMIN,
    });
  }

  public grantReader(grantee: IGrantable): artifactRegistryRepositoryIamMember.ArtifactRegistryRepositoryIamMember {
    return this.grant(grantee, {
      id: this.resource.name,
      role: ArtifactRegistryRoles.REPOSITORY_ADMIN,
    });
  }

  public grantWriter(grantee: IGrantable): artifactRegistryRepositoryIamMember.ArtifactRegistryRepositoryIamMember {
    return this.grant(grantee, {
      id: this.resource.name,
      role: ArtifactRegistryRoles.REPOSITORY_ADMIN,
    });
  }

  private grant(grantee: IGrantable, config: GrantConfig): artifactRegistryRepositoryIamMember.ArtifactRegistryRepositoryIamMember {
    if (this.cryptoKey !== undefined) {
      this.cryptoKey.grantEncrypterDecrypter(grantee);
    }

    return new artifactRegistryRepositoryIamMember.ArtifactRegistryRepositoryIamMember(this, "member", {
      member: grantee.grantMember,
      repository: config.id,
      role: config.role,
    });
  }
}

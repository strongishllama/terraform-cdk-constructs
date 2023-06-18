import { Construct } from "constructs";
import { artifactRegistryRepository, artifactRegistryRepositoryIamMember, kmsCryptoKeyIamMember } from "@cdktf/provider-google";
import { RepositoryFormat } from "../repository-format";
import { CryptoKey } from "@terraform-cdk-constructs/google-cloud-kms";
import { ArtifactRegistryRoles, GrantConfig, IGrantable } from "@terraform-cdk-constructs/google-iam";
import { ServiceAgent } from "../service-agent";
import { IProject, Project } from "@terraform-cdk-constructs/google-project";

export interface RepositoryConfig {
  readonly format: RepositoryFormat;
  readonly name: string;
  readonly cryptoKey?: CryptoKey;
}

export abstract class Repository extends Construct {
  protected readonly resource: artifactRegistryRepository.ArtifactRegistryRepository;
  protected readonly project: IProject;
  private readonly format: RepositoryFormat;
  private readonly cryptoKey?: CryptoKey;

  constructor(scope: Construct, id: string, config: RepositoryConfig) {
    super(scope, id);

    this.project = Project.fromProjectAttributes(this, "project");
    this.format = config.format;

    let grant: kmsCryptoKeyIamMember.KmsCryptoKeyIamMember | undefined = undefined;

    this.cryptoKey = config.cryptoKey;
    if (this.cryptoKey) {
      const serviceAgent = new ServiceAgent(this, "service-agent", {
        projectNumber: this.project.number,
      });
      grant = this.cryptoKey.grantEncrypterDecrypter(`${id}-service-agent`, serviceAgent);
    }

    this.resource = new artifactRegistryRepository.ArtifactRegistryRepository(this, "resource", {
      format: this.format,
      kmsKeyName: config.cryptoKey?.id,
      repositoryId: config.name,
      dependsOn: grant ? [grant] : undefined,
    });
  }

  public get id(): string {
    return this.resource.id;
  }

  public get name(): string {
    return this.resource.name;
  }

  public grantAdmin(id: string, grantee: IGrantable): artifactRegistryRepositoryIamMember.ArtifactRegistryRepositoryIamMember {
    return this.grant(id, grantee, {
      id: this.resource.name,
      role: ArtifactRegistryRoles.REPOSITORY_ADMIN,
    });
  }

  public grantReader(id: string, grantee: IGrantable): artifactRegistryRepositoryIamMember.ArtifactRegistryRepositoryIamMember {
    return this.grant(id, grantee, {
      id: this.resource.name,
      role: ArtifactRegistryRoles.REPOSITORY_ADMIN,
    });
  }

  public grantWriter(id: string, grantee: IGrantable): artifactRegistryRepositoryIamMember.ArtifactRegistryRepositoryIamMember {
    return this.grant(id, grantee, {
      id: this.resource.name,
      role: ArtifactRegistryRoles.REPOSITORY_ADMIN,
    });
  }

  private grant(id: string, grantee: IGrantable, config: GrantConfig): artifactRegistryRepositoryIamMember.ArtifactRegistryRepositoryIamMember {
    this.cryptoKey?.grantEncrypterDecrypter(id, grantee);

    return new artifactRegistryRepositoryIamMember.ArtifactRegistryRepositoryIamMember(this, "member", {
      member: grantee.grantMember,
      repository: config.id,
      role: config.role,
    });
  }
}

export interface AssetConfig {
  readonly path: string;
  readonly name: string;
}

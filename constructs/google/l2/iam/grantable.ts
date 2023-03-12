export interface IGrantable {
  readonly grantMember: string;
}

export interface GrantConfig {
  readonly name: string;
  readonly role: string;
}

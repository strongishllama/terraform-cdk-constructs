export interface IGrantable {
  readonly grantMember: string;
}

export interface GrantConfig {
  readonly id: string;
  readonly role: string;
}

import "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    sub?: string;
    username: string;
    name: string;
  }
  export function verify(
    token: string,
    secretOrPublicKey: Secret,
    options?: VerifyOptions & { complete?: false }
  ): JwtPayload;
}

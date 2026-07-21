export const ZITADEL_SCOPES = [
  "openid",
  "profile",
  "email",
  "offline_access",
  "urn:zitadel:iam:user:metadata",
  "urn:zitadel:iam:user:resourceowner",
  "urn:zitadel:iam:org:projects:roles",
  `urn:zitadel:iam:org:id:${import.meta.env.VITE_ZITADEL_PROJECT_ID}`,
].join(" ");

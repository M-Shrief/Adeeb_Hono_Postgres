export interface PartnerType {
  _id: string;
  name: string;
  phone: string;
  password: string;
}

export enum ERROR_MSG {
  NOT_FOUND = "Partner's not found",
  NOT_VALID = 'Data for partner is not valid',
}

export enum PERMISSIONS {
  READ = 'partner:read',
  WRITE = 'partner:write',
}

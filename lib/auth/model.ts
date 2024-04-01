export type User = {
  access_token: string;
  refresh_token: string;
  userUUid: string;
  roles: string[];
  resources: string[];
};

export type UserLoginRequestDto = {
  phoneNumber: string;
  password: string;
};

import IBase from "./base";

interface ILogin extends IBase {
  accessToken: string;
  refreshToken: string;
};

export default ILogin;
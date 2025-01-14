import request from "../utils/request";

import IResponse from "../interfaces/response";
import IUser from "../interfaces/user";
import ILogin from "../interfaces/login";

const getMe = async () => {
  const me = await request.get<IResponse<IUser>>(`/users/get/me`);
  return me;
}

const getById = async (id: string) => {
  const user = await request.get<IResponse<IUser>>(`/users/get/${id}`);
  return user;
}

const login = async (email: string, password: string) => {
  const login = await request.post<IResponse<ILogin>>("/users/login", { email, password });
  return login;
}

const userService = {
  getMe,
  getById,
  login
};
export default userService;
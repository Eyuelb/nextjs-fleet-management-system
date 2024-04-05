import { showNotification } from '@mantine/notifications';
import { httpGet, httpPost } from '../axios/services';
import { User, UserLoginRequestDto } from './model';
import AuthUtility from './utils';

const login = async (data: UserLoginRequestDto) => {
  try {
    const response = await httpPost<User, UserLoginRequestDto>(
      '/auth/authenticate',
      data,
    );
    if (response.access_token) {
      AuthUtility.setUser(response);
    }
  } catch (error ) {
    const err = error as any
    showNotification({
      message:err.message
    });
  }
};

const logout = () => {
  AuthUtility.removeUser();
};
const getUserById = async (uuid: string) =>
  await httpGet<User>(`/user/get/${uuid}`);

const AuthService = {
  login,
  logout,
  getUserById,
};

export default AuthService;

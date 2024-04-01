import dayjs from 'dayjs';
import { storageService } from '../client-storage/services';
import { User } from './model';

const StorageKey = 'user';



const AuthUtility = {
  getLocalRefreshToken: (): string | undefined => {
    const user = AuthUtility.getUser();
    return user?.refresh_token;
  },
  getLocalAccessToken: (): string | undefined => {
    const user = AuthUtility.getUser();
    return user?.access_token;
  },
  updateLocalAccessToken: (token: string): void => {
    let user = AuthUtility.getUser();
    user && AuthUtility.setUser({ ...user, access_token: token });
  },
  getUser: (): User | null => {
    return storageService.getItem(StorageKey);
  },
  setUser: (user: User): void => {
    storageService.setItem(StorageKey, user, dayjs(), dayjs().add(2, 'day'));
  },
  removeUser: (): void => {
    storageService.removeItem(StorageKey);
  },
  getUserId: (): string | undefined => {
    let user = AuthUtility.getUser();
    return user?.userUUid;
  },
  getUserRoles: (): string[] | undefined => {
    let user = AuthUtility.getUser();
    return user?.roles;
  },
  getUserResources: (): string[] | undefined => {
    let user = AuthUtility.getUser();
    return user?.resources;
  },
};

export default AuthUtility;

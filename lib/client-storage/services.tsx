import dayjs from "dayjs";
import {setCookie,getCookie} from 'cookies-next'
export enum StorageType {
    LocalStorage,
    Cookies
}

export const storageService = {
    getStorageType: (): StorageType | null => {
        
        if (typeof localStorage !== 'undefined') {
            return StorageType.LocalStorage;
        } else if (typeof document !== 'undefined' && typeof document.cookie !== 'undefined') {
            return StorageType.Cookies;
        } else {
            return null;
        }
    },
    getItem: (key: string): any | null => {
        const storageType = storageService.getStorageType();
        if (storageType === StorageType.LocalStorage) {
            const storedData = localStorage.getItem(key);
            return storedData !== null ? JSON.parse(storedData) : null;
        } else if (storageType === StorageType.Cookies) {
            const storedData = getCookie(key) as any;
            return storedData !== '' ? JSON.parse(storedData) : null;
        } else {
            return null;
        }
    },
    setItem: (key: string, value: any, reservedTime: dayjs.Dayjs, expirationTime: dayjs.Dayjs): void => {
        const storageType = storageService.getStorageType();
        const dataToStore = {
            value,
            reservedTime: reservedTime.valueOf(), // Convert to milliseconds
            expirationTime: expirationTime.valueOf() // Convert to milliseconds
        };
        if (storageType === StorageType.LocalStorage) {
            localStorage.setItem(key, JSON.stringify(dataToStore));
        } else if (storageType === StorageType.Cookies) {
            setCookie(key, JSON.stringify(dataToStore));
        }
    },
    removeItem: (key: string): void => {
        const storageType = storageService.getStorageType();
        if (storageType === StorageType.LocalStorage) {
            localStorage.removeItem(key);
        } else if (storageType === StorageType.Cookies) {
            setCookie(key, ''); // Setting expiration date in the past to remove the cookie
        }
    },
    startExpirationListener: (interval: number = 48000 /* 1 minute */) => {
        setInterval(() => {
            const storedKeys = Object.keys(localStorage);
            for (let key of storedKeys) {
                const storedItem = storageService.getItem(key);
                console.log({storedItem})
                if (storedItem && storedItem.expirationTime < Date.now()) {
                    storageService.removeItem(key);
                }
            }
        }, interval);
    }
};



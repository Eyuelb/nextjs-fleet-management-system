import dayjs from "dayjs";

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
            const storedData = getCookie(key);
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
            setCookie(key, '', -1); // Setting expiration date in the past to remove the cookie
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

function setCookie(name: string, value: string, days: number = 1) {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${expirationDate.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getCookie(name: string) {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let cookie of cookieArray) {
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return '';
}

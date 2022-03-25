interface Window {
  refreshcalled: boolean;
}

declare module 'bcrypt';
declare module 'js-cookie';

declare type ExtractValueFromObject<T> = { [I in keyof T]: T[I] }[keyof T];

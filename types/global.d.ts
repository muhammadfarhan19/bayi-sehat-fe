interface Window {
  refreshcalled: boolean;
}

declare module 'bcrypt';
declare module 'react-datepicker';
declare module 'js-cookie';

declare type ExtractValueFromObject<T> = { [I in keyof T]: T[I] }[keyof T];
declare type Flatten<T> = T extends Array<infer U> ? U : T;

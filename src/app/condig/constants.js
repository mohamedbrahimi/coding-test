// reg expression
export const REG_EXP_PASSWORD = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
export const REG_EXP_EMAIL = /\S+@\S+\.\S+/;

// use a default code to reset password
export const DEFAULT_RESET_PASSWORD_CODE = '111000';
// book type
export const TYPE_BOOK_PRIVATE = 'PRIVATE';
export const TYPE_BOOK_PUBLIC = 'PUBLIC';
export const TYPE_BOOK_LIST = [TYPE_BOOK_PRIVATE, TYPE_BOOK_PUBLIC];

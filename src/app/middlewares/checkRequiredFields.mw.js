import {REG_EXP_EMAIL, REG_EXP_PASSWORD, TYPE_BOOK_LIST} from '../condig'

function checkRequiredFieldsSignUpMw(req, res, next) {
    const {firstName, lastName, email, password} = req.body;

    if (!firstName || !lastName || !email || !password)
        return res.status(400).json({
            success: false,
            errorKey: 'MISSING_FIELDS'
        });

    if (!REG_EXP_EMAIL.test(email))
        return res.status(400).json({
            success: false,
            errorKey: 'EMAIL_NOT_VALID'
        });

    if (!REG_EXP_PASSWORD.test(password))
        return res.status(400).json({
            success: false,
            errorKey: 'PASSWORD_NOT_VALID'
        });

    return next();
}

function checkRequiredFieldsSignInMw(req, res, next) {
    const {email, password} = req.body;

    if (!email || !password)
        return res.status(400).json({
            success: false,
            errorKey: 'MISSING_FIELDS'
        });

    return next();
}

function checkRequiredFieldsResetPasswordMw(req, res, next) {
    const {email, code, password} = req.body;

    if (!email || !code || !password)
        return res.status(400).json({
            success: false,
            errorKey: 'MISSING_FIELDS'
        });

    if (!REG_EXP_PASSWORD.test(password))
        return res.status(400).json({
            success: false,
            errorKey: 'PASSWORD_NOT_VALID'
        });

    return next();
}

function checkRequiredFieldsCreateBookMw(req, res, next) {
    const {title, type} = req.body;

    if (!title || !type)
        return res.status(400).json({
            success: false,
            errorKey: 'MISSING_FIELDS'
        });

    if (!TYPE_BOOK_LIST.includes(type))
        return res.status(400).json({
            success: false,
            errorKey: 'TYPE_NOT_VALID'
        });

    return next();
}

export {
    checkRequiredFieldsSignUpMw,
    checkRequiredFieldsSignInMw,
    checkRequiredFieldsResetPasswordMw,
    checkRequiredFieldsCreateBookMw
}

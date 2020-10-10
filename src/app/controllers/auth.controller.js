import {jwtConfig} from '../condig';
import {createUserHelper, encodeJwtHelper, loadUserByEmailHelper, saveUserHelper} from "../helpers";

async function signUpController(req, res, next) {
    const {firstName, lastName, email, password} = req.body;

    const existingUser = await loadUserByEmailHelper({ email });

    if (existingUser)
        return res.status(400).json({
            success: false,
            errorKey: 'EMAIL_MUST_BE_UNIQUE'
        });

    const response = await createUserHelper({
        firstName,
        lastName,
        email,
        password
    });

    if (response)
        return res.json({
            success: true,
            successKey: 'USER_REGISTERED_SUCCESSFULLY'
        });
    else return res.status(400).json({
        success: false,
        errorKey: 'ERROR_HAS_BEEN_OCCURRED_DURING_USER_REGISTRATION'
    });
}

async function signInController(req, res, next) {
    const {email, password} = req.body;

    const existingUser = await loadUserByEmailHelper({
        email
    });

    if (!existingUser)
        return res.status(403).json({
            success: false,
            errorKey: 'USER_NOT_REGISTERED_YET'
        });

    if (! await existingUser.comparePassword(existingUser, password))
        return res.status(401).json({
            success: false,
            errorKey: 'INCORRECT_CREDENTIALS',
        });

    await saveUserHelper(email, { lastLogin: new Date() });

    const { _id } = existingUser;

    const token = encodeJwtHelper({ user: _id });

    if (token === jwtConfig.JWT_DEFAULT_ERR_RESPONSE)
        return res.status(401).json({
            success: false,
            errorsKey: 'AUTHENTICATION_ERROR',
        });

    return res.json({
        success: true,
        successKey: 'SUCCESS_AUTHENTICATION',
        data: {
            token,
            expiresIn: jwtConfig.JWT_DEFAULT_LIFE_TIME
        }
    })

}

async function resetPasswordController(req, res, next) {
   const { email, password } = req.body;

  const response =  await saveUserHelper(email, { password });

    if (response)
        return res.json({
            success: true,
            successKey: 'RESET_PASSWORD_SUCCESSFULLY'
        });
    else return res.status(400).json({
        success: false,
        errorKey: 'ERROR_HAS_BEEN_OCCURRED_DURING_PASSWORD_RESET'
    });
}

export {
    signUpController,
    signInController,
    resetPasswordController
}

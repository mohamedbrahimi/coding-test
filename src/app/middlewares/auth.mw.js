import {decodeJwtHelper} from "../helpers";
import { jwtConfig, DEFAULT_RESET_PASSWORD_CODE } from '../condig';

function authorizationMw(req, res, next) {
    const { authorization: token } = req.headers;

    if (!token)
        return res.status(401).json({
            success: false,
            errorKey: 'NOT_AUTHORIZED'
        });

    const decoded = decodeJwtHelper(token);

    if (decoded === jwtConfig.JWT_DEFAULT_ERR_RESPONSE)
        return res.status(401).json({
            success: false,
            errorKey: 'NOT_AUTHORIZED'
        });

    req.headers.uid = decoded.user;

    next();
}

function restPasswordAuthorizationMw(req, res, next) {
    const { code } = req.body;

    if (code !== DEFAULT_RESET_PASSWORD_CODE)
        return res.status(400).json({
            success: false,
            errorKey: 'CODE_PIN_INCORRECT'
        });

    next();
}

export {
    authorizationMw,
    restPasswordAuthorizationMw
}

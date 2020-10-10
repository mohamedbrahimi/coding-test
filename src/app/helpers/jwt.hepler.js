import jwt from 'jwt-simple';
import { jwtConfig } from '../condig';

function encodeJwtHelper(payload) {
    try {
        const encoded = jwt.encode({
            sub: payload.user,
            iat: Math.round(Date.now() / 1000),
            exp: Math.round((Date.now() / 1000) + jwtConfig.JWT_DEFAULT_LIFE_TIME)
        }, jwtConfig.JWT_DEFAULT_SECRET_KEY);

        console.info('success: encodeJwt | encoded json ', JSON.stringify(payload));
        return encoded;
    } catch (e) {
        console.error('error: encodeJwt | encoded json ', JSON.stringify(payload));
        return jwtConfig.JWT_DEFAULT_ERR_RESPONSE;
    }

}

function decodeJwtHelper(token) {
    try {
        const decoded = jwt.decode(token, jwtConfig.JWT_DEFAULT_SECRET_KEY);
        console.info('success: decodeJwt | decoded token ', token);
        return decoded;


    } catch (err) {
        console.error('error: decodeJwt | decoded json ', token);
        return jwtConfig.JWT_DEFAULT_ERR_RESPONSE;
    }
}

export {encodeJwtHelper, decodeJwtHelper};

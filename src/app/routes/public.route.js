import { Router } from 'express';
import { signInController, signUpController, resetPasswordController, getPublicBooksController } from '../controllers';
import { checkRequiredFieldsSignInMw, checkRequiredFieldsSignUpMw, checkRequiredFieldsResetPasswordMw, restPasswordAuthorizationMw  } from '../middlewares';
const router = Router();

/**
 * @swagger
 * public/auth/sign-up:
 *   post:
 *     tags:
 *       - document /public endpoints.
 *     description: register new user.
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: body
 *         type: object
 *         in: body
 *         required:
 *           - email
 *           - password
 *
 *         properties:
 *           firstName:
 *             type: string
 *           lastName:
 *             type: string
 *           email:
 *             type: string
 *           password:
 *             type: string
 *
 *     responses:
 *       400:
 *         description: invalid request (missing fields, invalid password, invalid email, duplicated email)
 *
 *       200:
 *         description: User Successfully registered
 *
 *
 */
router.route('/auth/sign-up')
    .post(checkRequiredFieldsSignUpMw, signUpController);
/**
 * @swagger
 * public/auth/sign-in:
 *   post:
 *     tags:
 *       - document /public endpoints.
 *     description: login.
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: body
 *         type: object
 *         in: body
 *         required:
 *           - email
 *           - password
 *
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *
 *     responses:
 *       400:
 *         description: invalid request (missing fields, incorrect password, incorrect email)
 *
 *       401:
 *         description: not authorized
 *
 *       403:
 *        description: user not found
 *       200:
 *         description: success login { token }
 *
 *
 */
router.route('/auth/sign-in')
    .post(checkRequiredFieldsSignInMw, signInController);
/**
 * @swagger
 * public/auth/rest-password:
 *   put:
 *     tags:
 *       - document /public endpoints.
 *     description: rest password, must send new password, email and test pin code = 111000.
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: body
 *         type: object
 *         in: body
 *         required:
 *           - email
 *           - password
 *           - code
 *
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *           code:
 *             type: string
 *     responses:
 *       400:
 *         description: invalid request (missing fields, invalid password)
 *
 *       200:
 *         description: rest password Successfully
 *
 *
 */
router.route('/auth/rest-password')
    .put([
            checkRequiredFieldsResetPasswordMw,
            restPasswordAuthorizationMw
          ], resetPasswordController);
/**
 * @swagger
 * public/books/pub:
 *   get:
 *     tags:
 *       - document /public endpoints.
 *     description: return public books.
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: limit
 *         type: number
 *         in: headers
 *       - name: page
 *         type: number
 *         in: headers
 *
 *     responses:
 *       200:
 *         description: book list
 *
 *
 */
router.route('/books/pub')
    .get(getPublicBooksController);

export default router;

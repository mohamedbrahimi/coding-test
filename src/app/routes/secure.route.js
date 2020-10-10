import { Router } from 'express';
import {  getBookController, getBooksController, createBookController, saveBookController, deleteBookController } from '../controllers';
import { checkRequiredFieldsCreateBookMw } from '../middlewares';

const router = Router();

/**
 * @swagger
 * private/books/:id:
 *   get:
 *     tags:
 *       - document /secure endpoints.
 *     description: get a single book.
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: id
 *         type: string
 *         in: params
 *         required:
 *           - id
 *
 *     responses:
 *       403:
 *         description: book not found
 *
 *       200:
 *         description: book returned successfully
 *
 *
 */
router.route('/books/:id')
    .get(getBookController);

/**
 * @swagger
 * private/books:
 *   get:
 *     tags:
 *       - document /secure endpoints.
 *     description: get all books.
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
 *         description: list of all books
 *
 *
 */
router.route('/books')
    .get(getBooksController);

/**
 * @swagger
 * private/books:
 *   post:
 *     tags:
 *       - document /secure endpoints.
 *     description: create new book.
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: body
 *         type: object
 *         in: body
 *         required:
 *           - title
 *           - type
 *
 *         properties:
 *           title:
 *             type: string
 *           type:
 *             type: string
 *           cover:
 *             type: string
 *           desc:
 *             type: string
 *           author:
 *             type: string
 *
 *     responses:
 *       201:
 *         description: new book has been created successfully!
 *       400:
 *         description: error occurred during the creation!
 *
 *
 */
router.route('/books')
    .post(checkRequiredFieldsCreateBookMw, createBookController);

/**
 * @swagger
 * private/books/:id:
 *   put:
 *     tags:
 *       - document /secure endpoints.
 *     description: update an existing book.
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: id
 *         type: string
 *         in: params
 *         required:
 *           -id
 *       - name: body
 *         type: object
 *         in: body
 *
 *         properties:
 *           title:
 *             type: string
 *           type:
 *             type: string
 *           cover:
 *             type: string
 *           desc:
 *             type: string
 *           author:
 *             type: string
 *
 *     responses:
 *       200:
 *         description: book has been updated successfully!
 *       400:
 *         description: error occurred during the update!
 *
 *
 */
router.route('/books/:id')
    .put(saveBookController);

/**
 * @swagger
 * private/books/:id:
 *   delete:
 *     tags:
 *       - document /secure endpoints.
 *     description: archive an existing book.
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: id
 *         type: string
 *         in: params
 *         required:
 *           -id
 *
 *     responses:
 *       200:
 *         description: book has been archived successfully!
 *       400:
 *         description: error occurred during the suppression!
 *
 *
 */
router.route('/books/:id')
    .delete(deleteBookController);



export default router;

import {createBookHelper, readBookHelper, readBooksHelper, saveBookHelper, deleteBookHelper} from "../helpers";
import {TYPE_BOOK_PUBLIC} from "../condig";

async function createBookController (req, res, next) {

    const { title, desc, cover, author, published_at, type} = req.body;

    const response = await createBookHelper({
        title,
        desc,
        cover,
        author,
        published_at,
        type
    })
    if (response)
        return res.status(201).json({
            success: true,
            successKey: 'NEW_BOOK_HAS_BEEN_CREATED_SUCCESSFULLY'
        });

    return res.status(400).json({
        success: false,
        errorKey: 'ERROR_HAS_BEEN_OCCURRED_DURING_BOOK_CREATION'
    });
}

async function getBookController (req, res, next) {
    const { id } = req.params;

    const book = await readBookHelper({ id });

    if (!book)
        return res.status(403).json({
            success: false,
            errorKey: 'BOOK_NOT_FOUND'
        });

    res.json({
        success: true,
        successKey: 'GET_BOOK_SUCCESSFULLY',
        data: {
            ...book
        }
    })
}

async function getBooksController (req, res, next) {
    const {limit, page } = req.headers;

    const books = await readBooksHelper({ limit, page });

    return res.json({
        success: true,
        successKey: 'FETCH_BOOKS',
        data: books
    });
}

async function getPublicBooksController (req, res, next) {
    const {limit, page } = req.headers;

    const books = await readBooksHelper({ limit, page, type: TYPE_BOOK_PUBLIC });

    return res.json({
        success: true,
        successKey: 'FETCH_BOOKS',
        data: books
    });
}

async function saveBookController (req, res, next) {

   const { id } = req.params;
   const data = req.body;

   const response = await saveBookHelper(id, data);

   if (!response)
       return res.status(400).json({
           success: false,
           errorKey: 'BOOK_NOT_UPDATED'
       });

   return res.json({
       success: true,
       successKey: 'BOOK_HAS_BEEN_UPDATED'
   })

}

async function deleteBookController (req, res, next) {

    const { id } = req.params;

    const response = await deleteBookHelper({id});

    if (!response)
        return res.status(400).json({
            success: false,
            errorKey: 'BOOK_NOT_DELETED'
        });

    return res.json({
        success: true,
        successKey: 'BOOK_HAS_BEEN_DELETED'
    })
}

export {
    createBookController,
    getBookController,
    getBooksController,
    saveBookController,
    deleteBookController,
    getPublicBooksController
}


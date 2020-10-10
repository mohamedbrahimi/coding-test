import { Book } from "../models";
import mongoose from 'mongoose';
async function createBookHelper(data) {
    const { title, desc, cover, author, published_at, type } = data;
    try {
        await Book.create({
            title,
            desc,
            cover,
            author,
            published_at,
            type
        });
        console.info('success: createBookHelper | create new book ', JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('error: createBookHelper | create new book ', JSON.stringify(data));
        return false;
    }
}

async function readBookHelper(data) {
    const { id } = data;
    try {

        const data = await Book.findOne({_id: id, archived: false}).lean();
        console.info('success: readBookHelper | read book ', JSON.stringify(data));
        return data;
    } catch (e) {
        console.error('error: readBookHelper | read book ', JSON.stringify(data));
        return null;
    }
}

async function readBooksHelper(data) {
    const { page, limit, type } = data;
    try {
        const ngLimit = !limit || isNaN(limit)|| limit > 100 ? 100 : parseInt(limit, 10);
        const ngPage = !page || isNaN(page) ? 0 :  parseInt(page);

        const data = await Book.find({archived: false, ...(type && { type })}, '', { limit: ngLimit, skip: ngLimit * ngPage }).lean();
        console.info('success: readBooksHelper | read books ', JSON.stringify(data));
        return data;
    } catch (e) {
        console.error('error: readBooksHelper | read books ', JSON.stringify(data));
        console.error(e)
        return [];
    }
}

async function saveBookHelper(id, data) {
    try {
        await Book.findOneAndUpdate({_id: id ,archived: false}, { ...data });
        console.info('success: saveBook | save book', JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('error: readBooks | save book ', JSON.stringify(data));
        return false;
    }
}

async function deleteBookHelper(data) {
    try {
        const { id } = data;
        await Book.findOneAndUpdate({_id: id ,archived: false}, { archived: true });
        console.info('success: deleteBookHelper | delete book', JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('error: deleteBookHelper | delete book ', JSON.stringify(data));
        return false;
    }
}

export {
    createBookHelper,
    readBookHelper,
    readBooksHelper,
    saveBookHelper,
    deleteBookHelper
}

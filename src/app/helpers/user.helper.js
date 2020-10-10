import { User } from '../models';

async function createUserHelper(data) {
    try {
        const { firstName, lastName, email, password } = data;
        await User.create({
            firstName,
            lastName,
            email,
            password
        });
        console.info('success: createUserHelper | create new user ', JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('error: createUserHelper | create new user ', JSON.stringify(data));
        return false;
    }
}

async function loadUserByEmailHelper(data) {
    try {
        const { email } = data;
        const user = await User.findOne({
            email
        });
        console.info('success: loadUserByEmailHelper | load existing user ', JSON.stringify(data));
        return user;
    } catch (e) {
        console.error('error: loadUserByEmailHelper | load existing user ', JSON.stringify(data));
        return null;
    }
}


async function saveUserHelper(email, data) {
    try {
        await User.findOneAndUpdate({
            email
        }, { ...data });
        console.info('success: saveUserHelper | save existing user ', email, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('error: saveUserHelper | save new existing ', email, JSON.stringify(data));
        return false;
    }
}

export {
    createUserHelper,
    loadUserByEmailHelper,
    saveUserHelper
}

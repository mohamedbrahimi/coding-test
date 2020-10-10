import mongoose from 'mongoose';
import bCrypt from 'bcrypt'

const {Schema} = mongoose;

const userSchema = new Schema(
    {

        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50,
            match: /\S+@\S+\.\S+/,
            unique: true
        },
        password: {
            type: String,
            minlength: 8,
            required: true
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        },
    },
    {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}},
);

userSchema.method('comparePassword', function comparePassword(
    user,
    candidate
) {
    if (!user.password) {
        throw new Error('User has not been configured with a password.');
    }
    if (!candidate) {
        return false;
    }
    return bCrypt.compare(candidate, this.password);
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        next();
    } else {
        bCrypt
            .genSalt(10)
            .then(salt => bCrypt.hash(this.password, salt))
            .then(hash => {
                this.password = hash;
                next();
            })
            .catch(next);
    }
});

userSchema.pre('findOneAndUpdate', async function(next){

    const { password } = this.getUpdate();

    if (password) {
       await bCrypt
            .genSalt(10)
            .then(salt => bCrypt.hash(password, salt))
            .then(hash => {
                this._update.password = hash;
                next();
            })
            .catch(next);
    } else next()

})

export {userSchema};
export default mongoose.model('user', userSchema);

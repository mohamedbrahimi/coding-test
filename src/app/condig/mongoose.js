// import mongoosePaginate from 'mongoose-paginate-v2';

// mongoosePaginate.paginate.options = {
//   lean: true,
//   limit: 20,
// };

export const MONGO_OPTIONS = {
    useNewUrlParser: true,
    poolSize: 20,
    connectTimeoutMS: 2000,
    keepAlive: 300000,
    useUnifiedTopology: true,
    /** fix  DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()`
     * without the `useFindAndModify` option set to false are deprecated.
     *
     * see:  https://mongoosejs.com/docs/deprecations.html#-findandmodify-
     * */
    useFindAndModify: false,
    // readPreference: 'secondaryPreferred',
    // loggerLevel: 'error',
};

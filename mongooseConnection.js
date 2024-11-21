import mongoose from 'mongoose';

export function mongooseConnection(url) {
    return mongoose.connect(url);
}

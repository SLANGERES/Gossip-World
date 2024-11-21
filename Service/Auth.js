import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const Key = "k@j#n3339";

export function mongooseConnection(url) {
    return mongoose.connect(url);
}

export function setUser(User) {
    if (!User || !User.Username || !User.email) {
        throw new Error('User object must have Username and email properties');
    }

    console.log(User.Username); // Debug log

    return jwt.sign({
        Username: User.Username,
        email: User.email
    }, Key); // Optional: Add expiration time
}

export function getUser(Token) {
    if (!Token) {
        console.log("Token not found");
    } else {
        return jwt.verify(Token, Key);
    }
}

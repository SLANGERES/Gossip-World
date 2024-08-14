const jwt = require('jsonwebtoken')

const Key="k@j#n3339"

function setUser(User) {
    if (!User || !User.Username || !User.email) {
        throw new Error('User object must have Username and email properties');
    }

    console.log(User.Username); // Debug log

    return jwt.sign({
        Username: User.Username,
        email: User.email
    }, Key); // Optional: Add expiration time
}
function getUser(Token){
    if(!Token){
        console.log("Token not found")
    }
    else{
        return jwt.verify(Token,Key)
    }
}

module.exports={
    setUser,
    getUser,
}
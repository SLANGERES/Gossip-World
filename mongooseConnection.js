const mongooe=require('mongoose')

function mongooseConnection(url){
    return mongooe.connect(url);
}

module.exports={
    mongooseConnection,
}
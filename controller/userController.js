const User = require('../model/User')
const {setUser,getUser}=require('../Service/Auth')
async function Sign_up(req, res) {
    const { Username, email, password } = req.body;

    if (!Username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        await User.create({ Username, email, password });
        res.render("login");
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Sign up failed' });
    }
}

async function Login(req,res){
    const {Username, password}=req.body;
    const usr = await User.findOne({ Username });
    if(!usr){
        res.json("user not exsisit");
    }
    else if(usr.password!=password){
        res.send("Incorrect Password");

    }
    else{
        console.log(usr.Username);
        const Token=setUser(usr);
        res.cookie('usrId',Token);
        res.cookie('username',usr.Username)
        console.log(Token)
        res.render('index',{username:usr.Username})
    }
}
module.exports={
    Sign_up,
    Login,
}
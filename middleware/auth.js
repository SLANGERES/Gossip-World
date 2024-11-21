
import { getUser } from "../Service/Auth.js";

export async function restrictToLoginUserOnly(req, res, next) {
    const token = req.cookies?.usrId; // Safe navigation operator to avoid accessing undefined
    const username = req.cookies?.username; // Retrieve the username from the cookie

    if (!token || !username) {
        return res.redirect('/login');
    }

    const user = getUser(token);
    if (!user) return res.redirect('/login');

    req.username = username; // Attach the username to the request object

    next();
}

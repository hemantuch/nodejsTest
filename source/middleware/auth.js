import jwt from "jsonwebtoken";
import "dotenv/config";


function generateToken(player) {
    const token = jwt.sign(player, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];    
    if (!token) {
        return res.status(401).json({
            result: false,
            message: "Authentication failed",
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
         return res.status(403).json({
            result: false,
            message: "Authentication failed"
        });
        }       
        req.user = user;
        next(); 
    });
 }

 const  authentication ={
     generateToken,
     authenticateToken
 }

export default authentication;

    
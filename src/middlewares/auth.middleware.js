import jwt from "jsonwebtoken";
import userService from "../services/user.service.js"
import dotenv from 'dotenv';
dotenv.config();

export const authMiddlware = (req, res, next) => {
    try{
        const {authorization} = req.headers;

        if(!authorization){ 
            return res.sendStatus(401);
        };

        const parts = authorization.split(" ");

        const [schema, token] = parts;

        if(parts.length !== 2){
            return res.send(401);
        };

        if(schema !=="Bearer"){
            return res.send(401);
        };

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {

            if(error){
                return res.status(401).send({message: "Token invalid"});
            };
        
            const user = await userService.findByIdUserService(decoded.id);
        
            if(!user || !user.id){
                return res.stauts(401).send({message: "Invalid token"})
            };

            req.userId = user._id;
            return next();
        });
    }
    catch(err){
        res.status(500).send({message: err.message})
    };
}
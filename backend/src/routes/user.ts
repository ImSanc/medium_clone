import { Hono } from "hono"
import { Prisma } from '@prisma/client/edge'
import {sign} from 'hono/jwt'
import {hash ,compare} from 'bcryptjs';
import { ResponseMessages } from "../constants/errorMessages";
import { Environment } from "../constants/environment";
import { signUpInput,signInInput } from "@imsanc/medium-common";

const user = new Hono<
    Environment
>();

user.post( '/signup', async (c) => {

    console.log(" User signup api called ");

    try{

        const body = await c.req.json();
        const {success} = signUpInput.safeParse(body);

        if( !success)
        {
            c.json( {
                 message : ResponseMessages.INVALID_INPUTS
            },411);
        }

        const {email,name, password} = body;
        const prisma = c.get('prisma');

        const hashedPassword = await hash(password,c.env.SALT);

        const userId  = await prisma.user.create({
            data :{
                email ,
                name ,
                password : hashedPassword
            },
            select : {
                id : true
            }
        });

        const token = await sign({ email,userId },c.env.JWT_SECRET);
        const finalToken = "Bearer " + token;

        c.status(201);
        return c.json({
            token : finalToken,
            message : ResponseMessages.USER_CREATED_SUCCESSFULLY
        });
    }
    catch(e){

        if( e instanceof Prisma.PrismaClientKnownRequestError){
            if(e.code === 'P2002')
            {
                c.status(409);
                return c.json({ message: ResponseMessages.EMAIL_ALREADY_IN_USE });
            }
        }
        c.status(500);
        return c.json({message : ResponseMessages.INTERNAL_SERVER_ERROR});
    }
});

user.post( '/signin', async (c) => {
    console.log(" User signin api called ");

    try {

        const prisma = c.get('prisma');
        const body = await c.req.json();

        const {success} = signInInput.safeParse(body);

        if( !success)
        {
            c.json( {
                 message : ResponseMessages.INVALID_INPUTS
            },411);
        }
        const {email, password} = body;

        const user = await prisma.user.findUnique({
            where : {
                email
            },
            select : {
                id : true,
                password : true
            }
        });

        if(!user){
            c.status(404);
            return c.json({message : ResponseMessages.USER_NOT_FOUND});
        }

        const isPasswordCorrect = await compare(password,user.password);

        if(!isPasswordCorrect){
            c.status(401);
            return c.json({message : ResponseMessages.INVALID_CREDENTIALS});
        }
        else
        {
            const token = await sign({email , userId : user.id},c.env.JWT_SECRET);
            const finalToken = "Bearer " + token;
            c.status(200);
            return c.json({
                token : finalToken,
                message : ResponseMessages.USER_SIGNED_IN_SUCCESSFULLY
            });
        }
    }
    catch(e){
        c.status(500);
        return c.json({message : ResponseMessages.INTERNAL_SERVER_ERROR});
    }
});

export default user;
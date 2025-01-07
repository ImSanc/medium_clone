import { Hono } from "hono"
import { PrismaClient, Prisma } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt'
import {hash ,compare} from 'bcryptjs';
import { ResponseMessages } from "../constants/errorMessages";

const user = new Hono<{
    Bindings : {
        DATABASE_URL :string,
        JWT_SECRET :string,
        SALT : number
      }
}>();

user.post( '/signup', async (c) => {

    console.log(" User signup api called ");

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const body = await c.req.json();
        const {email,name, password} = body;

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
    finally{
        await prisma.$disconnect();
    }
});

user.post( '/signin', async (c) => {
    console.log(" User signin api called ");

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {

        const body = await c.req.json();
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
    finally{
        await prisma.$disconnect();
    }
});

export default user;
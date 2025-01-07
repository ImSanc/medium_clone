import { Hono } from "hono"
import { PrismaClient, Prisma } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode, verify ,sign} from 'hono/jwt'
import {hash ,compare} from 'bcryptjs';

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

        await prisma.user.create({
            data :{
                email ,
                name ,
                password : hashedPassword
            }
        });

        const token = await sign({email},c.env.JWT_SECRET);

        c.status(201);
        return c.json({
            token : token,
            message : "User created successfully"
        });
    }
    catch(e){

        if( e instanceof Prisma.PrismaClientKnownRequestError){
            if(e.code === 'P2002')
            {
                c.status(409);
                return c.json({ message: "Email already in use" });
            }
        }
        c.status(500);
        return c.json({message : "Internal server error"});
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
            }
        });

        if(!user){
            c.status(404);
            return c.json({message : "User not found"});
        }

        const isPasswordCorrect = await compare(password,user.password);

        if(!isPasswordCorrect){
            c.status(401);
            return c.json({message : "Invalid credentials"});
        }
        else
        {
            const token = await sign({email},c.env.JWT_SECRET);
            c.status(200);
            return c.json({
                token : token,
                message : "User signed in successfully"
            });
        }
    }
    catch(e){
        c.status(500);
        return c.json({message : "Internal server error"});
    }
    finally{
        await prisma.$disconnect();
    }
});

export default user;
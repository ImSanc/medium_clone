import { Hono } from "hono"
import { PrismaClient, Prisma } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const user = new Hono<{
    Bindings : {
        DATABASE_URL :string
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

        await prisma.user.create({
            data :{
                email ,
                name ,
                password 
            }
        });

        c.status(201);
        return c.json({message : "User created successfully"});
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
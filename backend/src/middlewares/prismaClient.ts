import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context, Next } from "hono";
import { ErrorResponse } from "../constants/response";
import { ResponseMessages } from "../constants/errorMessages";


export const connectDB = async ( c :Context , next : Next) => {

    try {
        const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        c.set( 'prisma', prisma);
        await next();
    }
    catch( error ){
        return c.json<ErrorResponse>({
            success : false,
            message : ResponseMessages.DB_CONNECTION_ISSUE
        },500)
    }
}
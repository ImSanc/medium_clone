import { Hono } from "hono";
import { verifyToken } from "../middlewares/tokenVerfication";

const blog = new Hono();

blog.post( '/',verifyToken, async (c)=>{
    console.log("Blog post api called ");
    return c.json({ message: 'Accepted' },202);
});

blog.put( '/',verifyToken, async (c)=>{
    console.log("Blog put api called ");
});

blog.get( '/:id', async (c)=>{
    console.log("Blog get api called ");
});

blog.get( '/bulk', async (c)=>{
    console.log("Blog get api called ");
});

export default blog;
import { Hono } from "hono";

const blog = new Hono();

blog.post( '/', async (c)=>{
    console.log("Blog post api called ");
});

blog.put( '/', async (c)=>{
    console.log("Blog put api called ");
});

blog.get( '/:id', async (c)=>{
    console.log("Blog get api called ");
});

export default blog;
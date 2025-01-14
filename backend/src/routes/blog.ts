import { Hono } from "hono";
import { verifyToken } from "../middlewares/tokenVerfication";
import { Environment } from "../constants/environment";
import { ResponseMessages } from "../constants/errorMessages";

const blog = new Hono<Environment>();

blog.post( '/',verifyToken, async (c)=>{
    console.log("Blog post api called ");
    
    const body = await c.req.json();
    const prisma = c.get('prisma');

    try{
    const postId = await prisma.post.create({
        data :{
            title : body.title,
            content : body.content,
            published : body.published,
            author : body.author
        },
        select : {
            id : true
        }
        }
    );

    return c.json({
        success : true,
        postId : postId,
        message : ResponseMessages.POST_CREATED
    },202);
    }
    catch (error){
        return c.json(
            {
                success : false,
                message : ResponseMessages.POST_FAILED
            }

        ,409);
    }

});

blog.put( '/',verifyToken, async (c)=>{
    console.log("Blog put api called ");

    const body = await c.req.json();
    const prisma = c.get('prisma');

    try{
        const res = await prisma.post.update({
            where : {
                id : body.id
            },
            data : {
                title : body.title,
                published : body.published,
                content : body.content
            }
        });

        return c.json({
            success : true,
            postId : res.id,
            message : ResponseMessages.POST_UPDATED
        },202);
    }
    catch (error){
        return c.json(
            {
                success : false,
                message : ResponseMessages.POST_UPDATION_FAILED
            }

        ,409);
    }

});

blog.get( '/:id', async (c)=>{
    console.log("Blog get api called ");

    const body = await c.req.json();
    const id = c.req.param('id');
    const prisma = c.get('prisma');

    try{
        const res = await prisma.post.findUnique({
            where : {
                id : id
            },
            select : {
                title : true,
                content :true,
                published :true,
                author : true
            }
        });

        return c.json({
            success : true,
            post  : res,
            message : ResponseMessages.POST_RECEIVED
        },202);
    }
    catch (error){
        return c.json(
            {
                success : false,
                message : ResponseMessages.POST_RETRIEVE_FAILED
            }

        ,409);
    }
});

blog.get( '/bulk', async (c)=>{
    console.log("Blog get api called ");

    const id = c.req.param('id');
    const prisma = c.get('prisma');

    try{
        const posts = prisma.post.findMany();

        return c.json( {
            posts : posts,
            success : true,
            message : ResponseMessages.POSTS_RECEIVED
        })
    }
    catch( error){
        return c.json(
            {
                success : false,
                message : ResponseMessages.POST_RETRIEVE_FAILED
            }

        ,409);
    }


    

});

export default blog;
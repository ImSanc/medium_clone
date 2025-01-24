import { boolean, string, z } from "zod";

export const createBlog = z.object({
    title : string(),
    content : string(),
    published : boolean()
});

export type CreateBlogInput = z.infer< typeof createBlog>;

export const updateBlog = z.object({
    title : string(),
    content : string(),
    published : boolean(),
    id : string()
});

export type UpateBlogInput = z.infer< typeof updateBlog>; 
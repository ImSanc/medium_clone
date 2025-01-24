import { z } from "zod";
export declare const createBlog: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    published: z.ZodBoolean;
    authorId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    published: boolean;
    authorId: string;
}, {
    title: string;
    content: string;
    published: boolean;
    authorId: string;
}>;
export type CreateBlogInput = z.infer<typeof createBlog>;
export declare const updateBlog: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    published: z.ZodBoolean;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    published: boolean;
    id: string;
}, {
    title: string;
    content: string;
    published: boolean;
    id: string;
}>;
export type UpateBlogInput = z.infer<typeof updateBlog>;

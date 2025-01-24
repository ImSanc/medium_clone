
import {z} from "zod"

export const signInInput = z.object({
    email : z.string().email(),
    password : z.string().min(6)
})

export type SignInInput = z.infer<typeof signInInput>;


export const signUpInput = z.object({
    email : z.string().email(),
    password : z.string(),
    name :  z.string().optional()
})

export type SignUpInput = z.infer<typeof signUpInput>;
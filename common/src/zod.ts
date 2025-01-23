
import {z} from "zod"

export const signUpInput = z.object({
    email : z.string().email(),
    password : z.string(),
    name :  z.string().optional()
})

type SignUpInput = z.infer<typeof signUpInput>;


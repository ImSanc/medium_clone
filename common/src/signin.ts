
import {z} from "zod"

export const signIpInput = z.object({
    email : z.string().email(),
    password : z.string().min(6)
})

export type SignIpInput = z.infer<typeof signIpInput>;
import { Context, Next } from "hono"
import { ResponseMessages } from "../constants/errorMessages"
import { verify } from "hono/jwt"
import { ErrorResponse } from "../constants/response"



export const verifyToken = async ( c : Context, next : Next) => {
    try {
        const authHeader = c.req.header('Authorization');

        if(!authHeader){
            return c.json<ErrorResponse>({
                success : false,
                message : ResponseMessages.NO_AUTHORIZATION_HEADER_FOUND
            })
        }

        if(!authHeader.startsWith('Bearer')){
            return c.json<ErrorResponse>({
                success : false,
                message : ResponseMessages.INVALID_TOKEN_FORMAT
            })
        }

        const token = authHeader.split(' ')[1];

        const payload = await verify(token, c.env.JWT_SECRET);

        c.set( 'userId' , payload.userId );
        await next();
    }
    catch( error ){
        if (error instanceof Error) {
            return c.json<ErrorResponse>({
              success: false,
              message: ResponseMessages.INVALID_OR_EXPIRED_TOKEN
            }, 401)
        }
      
        
          return c.json<ErrorResponse>({
            success: false,
            message: ResponseMessages.AUTHENTICATION_ERROR
          }, 500)
    }
}
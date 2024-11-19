import { z} from 'zod'

export  const signupSchema = z.object({
name:z.string().min(4,{message:"name must be 4 char long"}),
    email:z.string().email(),
    password: z.string().min(4,{message:"password must be 4 char long"})
})

export  const signinSchema = z.object({
    name:z.string().min(4,{message:"name must be 4 char long"}),
        email:z.string().email(),
        password: z.string().min(4,{message:"password must be 4 char long"})
    })

   
export  const blogSchema = z.object({
            title:z.string(),
            desc:z.string() 
        })


export type BlogSchema = z.infer<typeof blogSchema>
export type  SignupSchema = z.infer<typeof signupSchema>
export type  SiginpSchema = z.infer<typeof signinSchema>


export enum StatusCode{
    Success=200,
    Created=201,
    BadRequest=400,
    Unauthorized=401,
    NOTFound = 404,
    InternalServerError=500


}
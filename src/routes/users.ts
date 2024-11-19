import { Hono } from "hono";
// import bcrypt from 'bcrypt'
import { getPrisma } from "../prismaFunctions";
import { SignupSchema } from "../shemas";
import { sign } from "hono/jwt";
import { Prisma } from "@prisma/client";
export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
}>()

userRouter.get('/', (c)=>{
    return c.json({msg:'this is signup route'})
})

userRouter.post('/signup', async(c)=>{

    const data:SignupSchema = await c.req.parseBody()
    const {name, email, password}= data;
    console.log('data is: ',name, email, password);
    const prisma = getPrisma(c.env.DATABASE_URL)
    const userExits = await prisma.users.findUnique({
        where:{
            email:email
        }
    })
    if(userExits){
        return c.json({
            msg:"user already exists! "
        })
    }
     
    const createUser = await prisma.users.create({
        data:{
            name:name,
            email:email,
            password:password
        }
    })

    const token = sign({email}, (c.env.JWT_SECRET))
  
    
    return c.json({msg:'user signid success',
        data:createUser
    })
})


userRouter.post('/login',async (c)=>{

    const data = await c.req.parseBody()
    const {email, password}= data;

    if(!email || !password){
        return c.json({msg: 'email and password required'})
    }

    const prisma = getPrisma(c.env.DATABASE_URL)
    const CheckUser = await prisma.users.findUnique({
        where:{
            email:email
        }, select:{
            password:true
        }
    })
     
    if(!CheckUser){
        return c.json({msg: 'account not found! signup instead'})
    }
    if(CheckUser.password !=password){
        return c.json({
            msg:'please enter a currect password!'
        })
    }

    return c.json({
        msg:"login success!"
    })
})

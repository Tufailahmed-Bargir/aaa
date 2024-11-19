import { Hono } from "hono";
import { getPrisma } from "../prismaFunctions";
import { BlogSchema, StatusCode } from "../shemas";
import { Prisma } from "@prisma/client";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string
    }
}>()

// get all blogs
blogRouter.get('/',async (c)=>{

    const prisma = getPrisma(c.env.DATABASE_URL)
    const posts = await prisma.posts.findMany()
    return c.json(posts,StatusCode.Success)
})

blogRouter.post('/postblog',async (c)=>{
    const data:BlogSchema=await c.req.parseBody()

    const {title, desc} = data;
    console.log('data recievded is: ');
    console.log(title, desc);
    
    const prisma = getPrisma(c.env.DATABASE_URL)

    const newPost = await prisma.posts.create({
        data:{
            title,
            desc
        }
    })
    return c.json({
        msg:"post created success",
        newPost
    },StatusCode.Success)
    
})

blogRouter.get('/posts/:id', async(c)=>{
    const id = c.req.param('id')
    console.log('id is: ', typeof(id));
    const prisma = getPrisma(c.env.DATABASE_URL)

    const findPost = await prisma.posts.findUnique({
        where:{
            id:Number(id)
        }
    })
    
    if(!findPost){
        return c.json({msg:`post with id ${id} not found`},StatusCode.NOTFound)
    }
    return c.json({findPost},StatusCode.Success)
})

blogRouter.put('/post/:id',async (c)=>{
    const id = c.req.param('id')
    const prisma = getPrisma(c.env.DATABASE_URL)

    const data = await c.req.parseBody()
console.log('data recived is: ', data);

    const {newTitle, newDesc}=data;

    const updatePost = await prisma.posts.update({
        where:{
            id:Number(id)
        },
        data:{
            title:newTitle,
            desc:newDesc
        }
    })

    return c.json({
        msg:'post updated success',
        updatePost
    },StatusCode.Success)
})
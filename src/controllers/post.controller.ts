import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Post } from "../schema/post.schema";
import { User } from "../schema/user.schema";

export const createPost = async (req: Request, res: Response) => {
    try {
        const userRepo = getConnection().getRepository(User)
        const postRepo = getConnection().getRepository(Post)
        let { userId, title, description } = req.body;

        // TODO: 1. Validate userId, title, description
        if (typeof (userId) !== 'number')
            throw new Error('UserID should be number')

        if (typeof (title) !== 'string')
            throw new Error('Title must be string')

        if (typeof (description) !== 'string')
            throw new Error('Title must be string')

        let user = await userRepo.findOne(userId)
        if (!user)
            throw new Error('User not found')

        let nTitle = title.replace(' ', '')
        let nDesc = description.replace(' ', '')

        if (nTitle.length < 10)
            throw new Error('Title must be at least 10 character excluding spaces')

        if (nDesc.length < 50)
            throw new Error('Description must be at least 10 character excluding spaces')

        /**
         * Validation criteria:
         * 1. userId must be a valid ObjectId
         * 2. title must be a string and minimum of 10 characters excluding spaces
         * 3. description must be a string and minimum of 50 characters excluding spaces
         */
        // TODO: 2. Create post and return in the response
        let postRes = await postRepo.insert({
            title,
            description,
            user
        })

        let post = await postRepo.findOne(postRes.identifiers[0].id,{
            relations:['user']
        })

        res.send({
            ...post
        });
    } catch (error) {
        res.send({ error: error.message });
    }
}
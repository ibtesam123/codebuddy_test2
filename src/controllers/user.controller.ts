import { User } from '../schema/user.schema'
import { Post } from '../schema/post.schema'
import { Request, Response } from 'express';
import { asyncForEach } from '../helpers/async.helper';
import { getConnection } from 'typeorm';


export const getUsersWithPostCount = async (req: Request, res: Response) => {
    try {
        const userRepo = getConnection().getRepository(User)
        const postRepo = getConnection().getRepository(Post)

        let pageNo: number

        if (!req.query.page)
            pageNo = 0
        pageNo = parseInt(req.query.page as string) - 1
        if (pageNo < 0)
            pageNo = 0

        const users = await userRepo.find({
            skip: (pageNo * 5),
            take: 5,
        })

        await asyncForEach(users, async (user, i: number) => {
            const postCount = await postRepo.count({
                where: {
                    user: user,
                }
            })

            users[i]['postCount'] = postCount;
        });

        res.send({ users });
    } catch (error) {
        res.send({ error: error.message });
    }
}
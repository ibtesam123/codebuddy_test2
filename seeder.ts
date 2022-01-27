import * as Faker from 'faker'
import { connection } from './src/helpers/db.helper'
import { Post } from './src/schema/post.schema';
import { User } from './src/schema/user.schema'

connection.then(async (conn) => {
    console.log('Connected to database...');
    console.log('Seeder started...');

    await Promise.all(
        Array.from(Array(100).keys()).map(async () => {
            const user = await conn.getRepository(User).save({
                name: Faker.name.findName()
            })

            console.log("Created user's name: ", user.name);

            await Promise.all(
                Array.from(Array(2).keys()).map(async () => {
                    const post = await conn.getRepository(Post).save({
                        user: user,
                        title: Faker.lorem.sentence(),
                        description: Faker.lorem.paragraph(10)
                    })
                }
                ));
        }
        ));

    console.log('Seeder completed... Exiting...');
    process.exit(0);
});


import bodyParser from 'body-parser';
import express from 'express'
import { createPost } from './controllers/post.controller';
import { getUsersWithPostCount } from './controllers/user.controller';

const app = express();

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/posts', createPost);
app.get('/users', getUsersWithPostCount);

export default app
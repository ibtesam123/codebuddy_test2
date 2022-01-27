import app from './src/app';
import { connection } from './src/helpers/db.helper'

connection.then(() => {
    app.listen(3000, () => {
        console.log('Server started on port http://localhost:3000');
    });
}).catch(err => {
    console.log(err);
    process.exit(1);
});
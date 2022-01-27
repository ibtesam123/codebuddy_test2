// const mongoose = require('mongoose');

import { createConnection } from "typeorm";
import { Post } from "../schema/post.schema";
import { User } from "../schema/user.schema";

export const connection = createConnection({
    type:'postgres',
    url:'postgres://krqpcupw:MAFDRtVLWODCDorbjcx_aKgd28tP-PBW@raja.db.elephantsql.com/krqpcupw',
    synchronize:true,
    entities:[User,Post],
    extra: {
        connectionLimit: 5
    }
})
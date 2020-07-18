import { User } from './user.type';
import { Comment } from './comment.type';

export type Tweet = {
    id?:number,
    text:string,
    user: User,
    image?:any,
    created_at?: string,
    updated_at?: string,
    comments?: Comment,

}
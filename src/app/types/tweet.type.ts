import { User } from './user.type';
import { Comment } from './comment.type';
import { Like } from './like.type';

export type Tweet = {
    id?:number,
    text:string,
    user: User,
    image?:any,
    created_at?: string,
    updated_at?: string,
    comments?: Comment,
    likes?:Like[];

}
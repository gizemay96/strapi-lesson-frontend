import { User } from './user.type';
import { Tweet } from './tweet.type';

export type Comment = {
    id?:number,
    text:string,
    user: User,
    tweet: Tweet,
    created_at?: string,
    updated_at?: string,
}
import { Author } from "./types/Author";
import { Comment } from "./types/Comment";
import { Label } from "./types/Label";
import { Post } from "./types/Post";
import { Reaction } from "./types/Reaction";
import { User } from "./types/User";

export { Hubbo } from "./hubbo";
export * from "./lib/error";

export type Author = typeof Author.__output;
export type Comment = typeof Comment.__output;
export type Label = typeof Label.__output;
export type Post = typeof Post.__output;
export type Reaction = typeof Reaction.__output;
export type User = typeof User.__output;

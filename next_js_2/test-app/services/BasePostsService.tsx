import IPost from "@/types/IPost";
import IUser from "@/types/IUser";

export interface BasePostService {
    getPosts(): Promise<IPost[]>;
    getPost(id: string): Promise<IPost>;
    createPost(post: IPost): Promise<IPost>;
    updatePost(post: IPost): Promise<void>;
    deletePost(id: string): Promise<void>;
    searchPost(searchTerm: string): Promise<IPost[]>;
    getUsers(): Promise<IUser[]>;
    getUser(userId: number): Promise<IUser | undefined>;
}
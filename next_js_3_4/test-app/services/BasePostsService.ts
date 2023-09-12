import IPost from "@/types/IPost";
import IUser from "@/types/IUser";

export interface BasePostService {
    getPosts(): Promise<IPost[]>;
    getPost(id: string): Promise<IPost>;
    createPost(title: string, body: string): Promise<IPost>;
    updatePost(post: IPost): Promise<void>;
    deletePost(id: string): Promise<Response>;
    searchPost(searchTerm: string): Promise<IPost[]>;
    getUsers(): Promise<IUser[]>;
    getUser(userId: number): Promise<IUser | null>;
}
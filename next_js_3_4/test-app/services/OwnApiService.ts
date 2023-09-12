import { BasePostService } from '@/services/BasePostsService';
import { IJsonPlaceholderPostData, IJsonPlaceholderUserData } from './JsonPlaceholderService';
import IPost from '@/types/IPost';
import IUser from '@/types/IUser';

export default class OwnApiPostService implements BasePostService {
    private static baseUrl = new URL("http://localhost:3000");
    private static postsEndpoint = "api/posts";
    private static usersEndpoint = "api/users";
    private static postsUrl = new URL(OwnApiPostService.postsEndpoint, OwnApiPostService.baseUrl);
    private static usersUrl = new URL(OwnApiPostService.usersEndpoint, OwnApiPostService.baseUrl);
    private static basicHeaders = {
        "Content-type": "application/json; charset=UTF-8",
    };

    private static async fetchData<DataT>(url: URL): Promise<DataT[]> {
        const response = await fetch(url, { next: { revalidate: 60 } });
        if (!response.ok) {
            throw new Error(`Unable to fetch data from ${url.toString()}`);
        }
        return await response.json();
    }

    private static ToIPost(postData: IJsonPlaceholderPostData): IPost {
        return {
            title: postData.title,
            body: postData.body,
            id: `${postData.id}`
        };
    }

    async getPosts(): Promise<IPost[]> {
        return OwnApiPostService.fetchData<IJsonPlaceholderPostData>(OwnApiPostService.postsUrl)
            .then(items => items.map<IPost>(item => OwnApiPostService.ToIPost(item)));
    }

    async getPost(id: string): Promise<IPost> {
        const response = await fetch(`${OwnApiPostService.postsUrl}/${id}`);
        if (!response.ok) {
            throw new Error(`Unable to fetch post with id: ${id}`);
        }
        return await response.json().then(item => OwnApiPostService.ToIPost(item));
    }

    async searchPost(searchTerm: string): Promise<IPost[]> {
        const url = OwnApiPostService.postsUrl;
        url.search = new URLSearchParams([
            ["q", searchTerm]
        ]).toString();
        return OwnApiPostService.fetchData<IJsonPlaceholderPostData>(url)
            .then(items => items.map<IPost>(item => OwnApiPostService.ToIPost(item)));
    }

    async createPost(title: string, body: string) {
        const response = await fetch(OwnApiPostService.postsUrl, {
            method: "POST",
            body: JSON.stringify({title: title, body: body}),
            headers: OwnApiPostService.basicHeaders,
            next: {
                revalidate: 0
            }
        })
        const newPost: IPost = await response.json().then(item => OwnApiPostService.ToIPost(item));
        return newPost;
    }

    async updatePost(post: IPost) {
        await fetch(`${OwnApiPostService.postsUrl}/${post.id}`, {
            method: "PATCH",
            body: JSON.stringify(post),
            headers: OwnApiPostService.basicHeaders,
            next: {
                revalidate: 0
            }
        });
    }

    async deletePost(id: string): Promise<Response> {
        return await fetch(`${OwnApiPostService.postsUrl}/${id}`, {
            method: "DELETE",
            headers: OwnApiPostService.basicHeaders,
            next: {
                revalidate: 0
            }
        });
    }

    private static ToIUser(userData: IJsonPlaceholderUserData): IUser {
        return {
            name: userData.name,
            username: userData.username,
            id: userData.id
        };
    }

    async getUsers(): Promise<IUser[]> {
        return OwnApiPostService.fetchData<IJsonPlaceholderUserData>(OwnApiPostService.usersUrl)
            .then(items => items.map<IUser>(item => OwnApiPostService.ToIUser(item)));
    }

    async getUser(userId: number): Promise<IUser | null> {
        let user = null;
        try {
            const response = await fetch(`${OwnApiPostService.usersUrl}/${userId}`, { next: { revalidate: 300 }});
            if (!response.ok) {
                console.log(`Unable to fetch user with id: ${userId}`);
                return null;
            }
            user = await response.json().then(item => OwnApiPostService.ToIUser(item));
        }
        catch {
            console.log(`Unable to get user with id: ${userId}`);
        }
        return user;
    }
}
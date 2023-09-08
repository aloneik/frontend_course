// import { BasePostService } from '@/services/BasePostsService';
// import IPost from '@/types/IPost';
// import IUser from '@/types/IUser';

export interface IJsonPlaceholderPostData {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface IJsonPlaceholderUserData {
    id: number;
    name: string;
    username: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
}

// export default class JsonPlaceholderPostService implements BasePostService {
//     private static baseUrl = new URL("https://jsonplaceholder.typicode.com");
//     private static postsEndpoint = "posts";
//     private static usersEndpoint = "users";
//     private static postsUrl = new URL(JsonPlaceholderPostService.baseUrl + JsonPlaceholderPostService.postsEndpoint);
//     private static usersUrl = new URL(JsonPlaceholderPostService.baseUrl + JsonPlaceholderPostService.usersEndpoint);
//     private static basicHeaders = {
//         "Content-type": "application/json; charset=UTF-8",
//     };

//     private static async fetchData<DataT>(url: URL): Promise<DataT[]> {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`Unable to fetch data from ${url.toString()}`);
//         }
//         return await response.json();
//     }

//     private static ToIPost(postData: IJsonPlaceholderPostData): IPost {
//         return {
//             title: postData.title,
//             body: postData.body,
//             id: `${postData.id}`
//         };
//     }

//     async getPosts(): Promise<IPost[]> {
//         return JsonPlaceholderPostService.fetchData<IJsonPlaceholderPostData>(JsonPlaceholderPostService.postsUrl)
//             .then(items => items.map<IPost>(item => JsonPlaceholderPostService.ToIPost(item)));
//     }

//     async getPost(id: string): Promise<IPost> {
//         const response = await fetch(`${JsonPlaceholderPostService.postsUrl}/${id}`);
//         if (!response.ok) {
//             throw new Error(`Unable to fetch post with id: ${id}`);
//         }
//         return await response.json().then(item => JsonPlaceholderPostService.ToIPost(item));
//     }

//     async searchPost(searchTerm: string): Promise<IPost[]> {
//         const url = JsonPlaceholderPostService.postsUrl;
//         url.search = new URLSearchParams([
//             ["q", searchTerm]
//         ]).toString();
//         return JsonPlaceholderPostService.fetchData<IJsonPlaceholderPostData>(url)
//             .then(items => items.map<IPost>(item => JsonPlaceholderPostService.ToIPost(item)));
//     }

//     async createPost(post: IPost) {
//         const response = await fetch(JsonPlaceholderPostService.postsUrl, {
//             method: "POST",
//             body: JSON.stringify(post),
//             headers: JsonPlaceholderPostService.basicHeaders,
//             next: {
//                 revalidate: 0
//             }
//         })
//         const newPost: IPost = await response.json().then(item => JsonPlaceholderPostService.ToIPost(item));
//         return newPost;
//     }

//     async updatePost(post: IPost) {
//         await fetch(`${JsonPlaceholderPostService.postsUrl}/${post.id}`, {
//             method: "PATCH",
//             body: JSON.stringify(post),
//             headers: JsonPlaceholderPostService.basicHeaders,
//             next: {
//                 revalidate: 0
//             }
//         });
//     }

//     async deletePost(id: string): Promise<Response> {
//         return await fetch(`${JsonPlaceholderPostService.postsUrl}/${id}`, {
//             method: "DELETE",
//             headers: JsonPlaceholderPostService.basicHeaders,
//             next: {
//                 revalidate: 0
//             }
//         });
//     }

//     private static ToIUser(userData: IJsonPlaceholderUserData): IUser {
//         return {
//             name: userData.name,
//             username: userData.username,
//             id: userData.id
//         };
//     }

//     async getUsers(): Promise<IUser[]> {
//         return JsonPlaceholderPostService.fetchData<IJsonPlaceholderUserData>(JsonPlaceholderPostService.usersUrl)
//             .then(items => items.map<IUser>(item => JsonPlaceholderPostService.ToIUser(item)));
//     }

//     async getUser(userId: number): Promise<IUser | undefined> {
//         const response = await fetch(`${JsonPlaceholderPostService.usersUrl}/${userId}`);
//         if (!response.ok) {
//             console.log(`Unable to fetch user with id: ${userId}`);
//             return undefined;
//         }
//         return await response.json().then(item => JsonPlaceholderPostService.ToIUser(item));
//     }
// }
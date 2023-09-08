import * as fs from "fs";

const POSTS_FILE = "./posts.json";

let id = 9999999;

export function getPosts() {
    try {
        const data = fs.readFileSync(POSTS_FILE)
        const posts = JSON.parse(data.toString());
        id = posts.reduce((a: any, b: any)=>a.id > b.id ? a : b).id;
        return posts;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

export function getPost(id: number) {
    try {
        const data = fs.readFileSync(POSTS_FILE)
        const posts = JSON.parse(data.toString());
        const desiredPost = posts.find((post: any) => post.id == id);
        console.log(desiredPost);
        return desiredPost;
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
}

export function removePost(id: number) {
    try {
        const jsonData = fs.readFileSync(POSTS_FILE);
        const posts = JSON.parse(jsonData.toString());

        fs.writeFileSync(POSTS_FILE, JSON.stringify(posts.filter((post: any) => post.id != id)));
    } catch (error) {
        // logging the error
        console.error(error);

        throw error;
    }
}

export function addPost(title: string, body: string) {
    try {
        const jsonData = fs.readFileSync(POSTS_FILE);
        const posts = JSON.parse(jsonData.toString());

        id += 1;
        const newPost = { userId: 1, id: id, title: title, body: body};
        posts.push(newPost);

        fs.writeFileSync(POSTS_FILE, JSON.stringify(posts));
        return newPost;
    } catch (error) {
        // logging the error
        console.error(error);

        throw error;
    }
}

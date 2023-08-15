import React from 'react';
import { createContext, useState, useContext, useReducer } from 'react';

import { nanoid } from 'nanoid';
import { match, P } from 'ts-pattern';

import IPost from '../types/IPost';
import { BasePostService } from '@/services/BasePostsService';

type PostsContextProviderProps<TProvider> = {
    children?: React.ReactNode,
    providerService: TProvider
};

class InitAction {
    public readonly initialItems: IPost[];

    constructor(items: IPost[]) {
        this.initialItems = items;
    }
};

class CreatePostAction {
    public readonly id: string;
    public readonly title: string;
    public readonly body: string;

    constructor(id: string, title: string, body: string) {
        this.id = id;
        this.title = title;
        this.body = body;
    }
};

class ChangePostAction {
    public readonly post: IPost;

    constructor(post: IPost) {
        this.post = post;
    }
};

class DeletePostAction {
    public readonly id: string;

    constructor(id: string) {
        this.id = id;
    }
};

declare type PostsReducerAction = InitAction | CreatePostAction | ChangePostAction | DeletePostAction;

interface IWrappedDispatch {
    add(title: string, body: string): Promise<void>,
    change(post: IPost): Promise<void>,
    delete(id: string): Promise<void>,
    initialize(posts: IPost[]): void
}

interface IItemsLoadingState {
    isLoaded: boolean,
    error: string | null
}

const PostsContext = createContext<IPost[]>([]);
const PostsDispatchContext = createContext<IWrappedDispatch | null>(null);
const PostsLoadingStateContext = createContext<IItemsLoadingState>({ isLoaded: false, error: null });

export function PostsProvider<TProvider extends BasePostService>({ children, providerService }: PostsContextProviderProps<TProvider>) {
    const postsContext = useContext(PostsContext);
    const [posts, dispatch] = useReducer(postsReducer, postsContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadingError, setError] = useState<string | null>(null);

    async function fetchData() {
        try {
            const fetchedData = await providerService.getPosts();
            dispatch(new InitAction(fetchedData));
        }
        catch (error) {
            setError((error as Error).message);
        }
        finally {
            setIsLoaded(true);
        }
    }
    fetchData();

    async function handleItemAdded(title: string, body: string) {
        try {
            const newItem = await providerService.createPost({
                title: title,
                body: body,
                id: nanoid()
            });
            dispatch(new CreatePostAction(newItem.id, newItem.title, newItem.body));
        }
        catch (error) {
            console.log(error);
            alert("Unable to add new item");
        }
    }

    async function handleItemChanged(post: IPost) {
        const changedItem = posts.find(item => post.id === item.id);
        match(changedItem)
            .with(undefined, _ => console.log(`Unable to find item with id: ${post.id}`))
            .otherwise(async item => {
                try {
                    await providerService.updatePost(post);
                    dispatch(new ChangePostAction(item));
                }
                catch (error) {
                    console.log(error);
                    alert(`Unable to update post with id: ${post.id}.`);
                }
            });
    }

    async function handleItemDeleted(id: string) {
        try {
            await providerService.deletePost(id);
            dispatch(new DeletePostAction(id));
        }
        catch (error) {
            console.log(error);
            alert(`Unable to delete post with id: ${id}.`);
        }
    }

    const wrappedDispatch: IWrappedDispatch = {
        add: handleItemAdded,
        change: handleItemChanged,
        delete: handleItemDeleted,
        initialize: (posts: IPost[]) => dispatch(new InitAction(posts))
    };

    return (
        <PostsContext.Provider value={ posts }>
            <PostsDispatchContext.Provider value={ wrappedDispatch }>
                <PostsLoadingStateContext.Provider value={ { isLoaded: isLoaded, error: loadingError } }>
                    { children }
                </PostsLoadingStateContext.Provider>
            </PostsDispatchContext.Provider>
        </PostsContext.Provider>
    );
}

export function usePosts() {
    return useContext(PostsContext);
}

export function usePostsDispatch() {
    return useContext(PostsDispatchContext);
}

export function useLoadingState() {
    return useContext(PostsLoadingStateContext);
}

function postsReducer(posts: IPost[], action: PostsReducerAction) {
    return match(action)
        .with(P.instanceOf(InitAction), action => action.initialItems)
        .with(P.instanceOf(CreatePostAction), action => {
            return [
                ...posts,
                {
                    id: action.id,
                    title: action.title,
                    body: action.body,
                },
            ];
        })
        .with(P.instanceOf(ChangePostAction), action => {
            return posts.map((item) => {
                if (item.id === action.post.id) {
                    return action.post;
                } else {
                    return item;
                }
            });
        })
        .with(P.instanceOf(DeletePostAction), action => posts.filter((item) => item.id !== action.id))
        .otherwise(action => {
            console.log(`Unknown action type: ${typeof(action)}`);
            return posts;
        });
}

import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './components/loading';
import Error from './components/error';
import Post from './components/post';
import { GET_POSTS } from './apollo/queries/getPosts';
import { useAddPostMutation } from './apollo/mutations/addPost';
import AvatarModal from './components/avatarModal';
import VideoModal from './components/videoModal';

const Feed = () => {

    const [postContent, setPostContent] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const { loading, error, data, fetchMore } = useQuery(GET_POSTS, { pollInterval: 5000, variables: { page: 0, limit: 10 } });

    const [addPost] = useAddPostMutation(postContent);

    const loadMore = (fetchMore) => {
        const self = this;

        fetchMore({
            variables: {
                page: page + 1,
            },
            updateQuery(previousResult, { fetchMoreResult }) {
                if (!fetchMoreResult.postsFeed.posts.length) {
                    setHasMore(false);
                    return previousResult;
                }

                setPage(page + 1);

                const newData = {
                    postsFeed: {
                        __typename: 'PostFeed',
                        posts: [
                            ...previousResult.postsFeed.posts,
                            ...fetchMoreResult.postsFeed.posts
                        ]
                    }
                };
                return newData;
            }
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addPost({ variables: { post: { text: postContent } } });
        setPostContent('');
    };

    const [isOpen, setIsOpen] = useState(false);

    const showModal = () => {
      setIsOpen(!isOpen);
    }  

    const handleVideo = (event) => {
        event.preventDefault();
    };

    if (loading) return <Loading />;
    if (error) return <Error><p>{error.message}</p></Error>;

    const { postsFeed } = data;
    const { posts } = postsFeed;

    return (
        <div className="container">
            <div className="postForm">
                <form onSubmit={handleSubmit}>
                    <textarea value={postContent} onChange={(e) =>
                        setPostContent(e.target.value)}
                        placeholder="Write something..." />
                    <input type="submit" value="Submit" />
                </form>
                <br />
                <form onSubmit={handleVideo}>
                    <input type="submit" value="Upload Video" onClick={() => showModal()}/>
                    <VideoModal isOpen={isOpen} showModal={showModal}/>
                </form>
            </div>
            <div className="feed">
                <InfiniteScroll
                    dataLength={posts.length}
                    next={() => loadMore(fetchMore)}
                    hasMore={hasMore}
                    loader={<div className="loader" key={"loader"}>Loading ...</div>}
                >
                    {posts.map((post, i) =>
                        <Post key={post.id} post={post} />
                    )}
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Feed
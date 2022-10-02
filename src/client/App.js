import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import '../../assets/css/style.css';

const App = () => {
    const [posts, setPosts] = useState(initialPosts);
    const [postContent, setPostContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newPost = {
            id: posts.length + 1,
            text: postContent,
            user: {
                avatar: 'public/uploads/mateusz.png',
                username: 'Fake User'
            }
        };
        setPosts([newPost, ...posts]);
        setPostContent('');
    };

    return (
        <div className="container">
            <Helmet>
                <title>Instagraph - Feed</title>
                <meta name="description" content="Catch up with the hot goss on Instagraph" />
            </Helmet>
            <div className="postForm">
                <form onSubmit={handleSubmit}>
                    <textarea value={postContent} onChange={(e) =>
                        setPostContent(e.target.value)}
                        placeholder="Write something..." />
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <div className="feed">
                {initialPosts.map((post, i) =>
                    <div key={post.id} className="post">
                        <div className="header">
                            <img src={post.user.avatar} />
                            <h2>{post.user.username}</h2>
                        </div>
                        <p className="content">
                            {post.text}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

const initialPosts = [
    {
        id: 3,
        text: 'It\'s been FIVE minutes since you got dinner...',
        user: {
            avatar: 'public/uploads/mateusz.png',
            username: 'Mateusz Ryczek'
        }
    },
    {
        id: 2,
        text: 'Please feed me it\'s been 20 minutes since I last ate!!',
        user: {
            avatar: 'public/uploads/charlie.png',
            username: 'Charlie the Cat'
        }
    },
    {
        id: 1,
        text: 'First!!!1!!11',
        user: {
            avatar: 'public/uploads/mateusz.png',
            username: 'Mateusz Ryczek'
        }
    }
];

export default App
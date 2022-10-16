import React from 'react';
import { Helmet } from 'react-helmet';
import Feed from './Feed';
import '../../assets/css/style.css';

const App = () => {
    return (
        <div className="container">
            <Helmet>
                <title>Instagraph - Feed</title>
                <meta name="description" content="Newsfeed of all your friends on Instagraph" />
            </Helmet>
            <Feed />
        </div>
    )
}

export default App
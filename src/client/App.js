import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Feed from './Feed';
import Bar from './components/bar';
import './components/fontawesome';
import '../../assets/css/style.css';
import LoginRegisterForm from './components/loginregister';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwt'));

    return (
        <div className="container">
            <Helmet>
                <title>Instagraph - Feed</title>
                <meta name="description" content="Newsfeed of all your friends on Instagraph" />
            </Helmet>
            {loggedIn && (
                <div>
                    <Bar changeLoginState={setLoggedIn} />
                    <Feed />
                </div>
            )}

            {!loggedIn && <LoginRegisterForm changeLoginState={setLoggedIn} />}
        </div>
    )
}

export default App
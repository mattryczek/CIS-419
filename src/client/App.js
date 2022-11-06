import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Feed from './Feed';
import Bar from './components/bar';
import './components/fontawesome';
import '../../assets/css/style.css';
import LoginRegisterForm from './components/loginregister';
import { useCurrentUserQuery } from './apollo/queries/currentUserQuery';
import Loading from './components/loading';
import 'cropperjs/dist/cropper.css';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwt'));
    const { data, error, loading, refetch } = useCurrentUserQuery();

    if (loading) {
        return <Loading />;
    }

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
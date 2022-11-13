import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './components/fontawesome';
import '../../assets/css/style.css';
import Router from './router';
import { useCurrentUserQuery } from './apollo/queries/currentUserQuery';
import Loading from './components/loading';
import 'cropperjs/dist/cropper.css';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwt'));
    const { data, error, loading, refetch } = useCurrentUserQuery();

    const handleLogin = (status) => {
      refetch().then(() => {
          setLoggedIn(status);
      }).catch(() => {
          setLoggedIn(status);
      });
  }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container">
          <Helmet>
            <title>Instagraph - Feed</title>
            <meta name="description" content="Newsfeed of all your friends on Instagraph" />
          </Helmet>
          <Router loggedIn={loggedIn} changeLoginState={handleLogin}/>
        </div>
    )
}

export default App;
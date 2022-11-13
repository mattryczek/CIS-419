import React from 'react';
import UserProfile from './components/user';
import Bar from './components/bar';

export const User = ({ changeLoginState, match }) => {
  return (
    <>
      <Bar changeLoginState={changeLoginState} />
      <UserProfile username={match.params.username}/>
    </>
  );
}

export default User

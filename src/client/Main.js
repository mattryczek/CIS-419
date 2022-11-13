import React from 'react';
import Feed from './Feed';
import Bar from './components/bar';

export const Main = ({ changeLoginState }) => {
  return (
    <>
      <Bar changeLoginState={changeLoginState} />
      <Feed />
    </>
  );
}

export default Main;

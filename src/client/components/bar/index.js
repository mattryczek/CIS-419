import React from 'react';
import SearchBar from './search';
import UserBar from './user';
import { UserConsumer } from '../context/user';
import Home from './home';

const Bar = ({ changeLoginState }) => {
  return (
    <div className="topbar">
      <div className="inner">
        <SearchBar/>
        <UserConsumer>
          <UserBar />
        </UserConsumer>
      </div>
      <div className="buttons">
        <Home/>
      </div>
    </div>
  );
}

export default Bar
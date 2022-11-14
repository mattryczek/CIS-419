import React, { useState } from 'react';
import AvatarModal from '../avatarModal';
import { Link } from 'react-router-dom';

const UserBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(!isOpen);
  }

  if (!user) return null;

  return (
    <Link to={'/user/' + user.username}>
      <div className="user">
        <img src={user.avatar} onClick={() => showModal()} />
        <AvatarModal isOpen={isOpen} showModal={showModal} />
        <span>{user.username}</span>
      </div>
    </Link>
  );
}

export default UserBar
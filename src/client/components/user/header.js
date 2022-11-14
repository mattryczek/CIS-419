import React, { useState } from 'react';
import AvatarModal from '../avatarModal';

export const UserProfileHeader = ({user}) => {
  const { avatar, username } = user;
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(!isOpen);
  }

  if(!user) return null;

  return (
    <div className="profileHeader">
      <div className="avatar">
        <img src={avatar} onClick={() => showModal()}/>
      </div>
      <AvatarModal isOpen={isOpen} showModal={showModal}/>
      <div className="information">
        <p>{username}</p>
        <p>{user.email}</p>
        <p>Write an interesting bio...</p>
      </div>
    </div>
  )
}

export default UserProfileHeader;

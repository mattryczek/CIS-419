import React, { useState } from 'react';
import AvatarModal from '../avatarModal';

export const UserProfileHeader = ({user}) => {
  const { avatar, username, email } = user;
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(!isOpen);
  }

  let mail_to = () => {return "mailto:" + new String(email)}

  if(!user) return null;

  return (
    <div className="profileHeader">
      <div className="avatar">
        <img src={avatar} onClick={() => showModal()}/>
      </div>
      <AvatarModal isOpen={isOpen} showModal={showModal}/>
      <div className="information">
        <p>{username}</p>
        <p>Contact me: <a href={mail_to()}>{email}</a></p>
        <p>Write an interesting bio...</p>
      </div>
    </div>
  )
}

export default UserProfileHeader;

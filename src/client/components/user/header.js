import React, { useState } from 'react';
import AvatarModal from '../avatarModal';
import { GET_CURRENT_USER } from '../../apollo/queries/currentUserQuery';
import { useQuery } from '@apollo/client';

export const UserProfileHeader = ({user}) => {
  const { avatar, username, email, id } = user;
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(!isOpen);
  }

  let mail_to = () => {return "mailto:" + new String(email)}

  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if(!user) return null;

  return (
    <div className="profileHeader">
      <div className="avatar">
        <img src={avatar} onClick={() => showModal()}/>
      </div>
      {(data.currentUser.id === id) ? <AvatarModal isOpen={isOpen} showModal={showModal}/> : <></>} 
      <div className="information">
        <p>{username}</p>
        <address>Contact me: <a href={mail_to()}>{email}</a></address>
        <p>Write an interesting bio...</p>
      </div>
    </div>
  )
}

export default UserProfileHeader;

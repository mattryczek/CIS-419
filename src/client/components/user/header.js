import React, { useState } from 'react';
import AvatarModal from '../avatarModal';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../apollo/queries/currentUserQuery';
import { useChangeUsernameMutation } from '../../apollo/mutations/changeUsername';

export const UserProfileHeader = ({ user }) => {
  const { avatar, username, email, id } = user;
  const [isOpen, setIsOpen] = useState(false);
  const [changeUsername] = useChangeUsernameMutation();

  const showModal = () => {
    setIsOpen(!isOpen);
  }

  let mail_to = () => { return "mailto:" + new String(email) }

  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (!user) return null;

  return (
    <div className="profileHeader">
      <div className="avatar">
        <img src={avatar} onClick={() => showModal()} />
      </div>
      {(data.currentUser.id === id) ? <AvatarModal isOpen={isOpen} showModal={showModal} /> : <></>}
      <div className="information">
        {(data.currentUser.id === id) ?
          <input type='email' defaultValue={username} onBlur={(e) => { changeUsername({ variables: { username: e.target.value } }) }}></input> :
          <p>{username}</p>}
        <address>Contact me: <a href={mail_to()}>{email}</a></address>
        <p>This user is quite mysterious indeed...</p>
      </div>
    </div>
  )
}

export default UserProfileHeader;

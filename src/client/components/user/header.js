import React, { useState } from 'react';
import AvatarModal from '../avatarModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../apollo/queries/currentUserQuery';
import { useChangeUsernameMutation } from '../../apollo/mutations/changeUsername';
import { useChangeEmailMutation } from '../../apollo/mutations/changeEmail';

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

      {/* Avatar Ternary */}
      {(data.currentUser.id === id) ? <AvatarModal isOpen={isOpen} showModal={showModal} /> : <></>}
      <div className="information">

        {/* FAIcon Ternary */}
        {(data.currentUser.id === id) ? <></> :
          <a href={mail_to()}>
            <FontAwesomeIcon icon={faEnvelopeCircleCheck} id="mail_me" />
          </a>
        }
        
        {/* Username Ternary */}
        {(data.currentUser.id === id) ?
          <input id='username_edit' type='text' defaultValue={username} onBlur={(e) => { changeUsername({ variables: { username: e.target.value } }) }}></input> :
          <p id='username_noedit'>{username}</p>
        }

        {/* Email Ternary */}
        {(data.currentUser.id === id) ?
          <input id='email_edit' type='email' defaultValue={email} onBlur={(e) => { changeEmail({ variables: { email: e.target.value } }) }}></input> :
          <address>{email}</address>
        }

        <p>This user is quite mysterious indeed...</p>
      </div>
    </div>
  )
}

export default UserProfileHeader;

import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

export const CHANGE_USERNAME = gql`
  mutation changeUsername($username : String!) {
    changeUsername(username : $username) {
      success
    }
  }
`;

export const getChangeUsernameConfig = () => ({
    update(cache, { data: { changeUsername } }) {
      console.log(changeUsername.success);
      if(changeUsername) {
        cache.modify({
          fields: {
            currentUser(user, { readField }) {
              cache.modify({
                id: user,
                fields: {
                  username() {
                    return changeUsername;
                  }
                }
              })
            }
          }
        });
      }
    }
  });
  
  export const useChangeUsernameMutation = () => useMutation(CHANGE_USERNAME, getChangeUsernameConfig());
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

export const CHANGE_EMAIL = gql`
  mutation changeEmail($email : String!) {
    changeEmail(email : $email) {
      success
    }
  }
`;

export const getChangeEmailConfig = () => ({
    update(cache, { data: { changeEmail } }) {
      console.log(changeEmail.success);
      if(changeEmail) {
        cache.modify({
          fields: {
            currentUser(user, { readField }) {
              cache.modify({
                id: user,
                fields: {
                  email() {
                    return changeEmail;
                  }
                }
              })
            }
          }
        });
      }
    }
  });
  
  export const useChangeEmailMutation = () => useMutation(CHANGE_EMAIL, getChangeEmailConfig());
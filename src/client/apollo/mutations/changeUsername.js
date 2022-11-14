import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

export const CHANGE_USERNAME = gql`
  mutation changeUsername($username : String!) {
    changeUsername(username : $username) {
      success
    }
  }
`;

// export const getChangeUsernameConfig = () => ({
//     update(cache, { data: { changeUsername } }) {
//       console.log(changeUsername);
//       if(changeUsername) {
//         cache.modify({
//           fields: {
//             currentUser(user, { readField }) {
//               cache.modify({
//                 id: user,
//                 fields: {
//                   username() {
//                     return changeUsername;
//                   }
//                 }
//               })
//             }
//           }
//         });
//       }
//     }
//   });

// , getChangeUsernameConfig()
  
  export const useChangeUsernameMutation = () => useMutation(CHANGE_USERNAME);
import { gql, useMutation } from '@apollo/client';

const UPLOAD_VIDEO = gql`
  mutation uploadVideo($file: Upload!) {
    uploadVideo(file : $file) {
      filename
      url
    }
  }
`;

export const useUploadVideoMutation = () => useMutation(UPLOAD_VIDEO);
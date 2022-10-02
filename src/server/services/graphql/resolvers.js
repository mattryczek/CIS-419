import logger from '../../helpers/logger';

let posts = [
  {
      id: 3,
      text: 'It\'s been FIVE minutes since you got dinner...',
      user: {
          avatar: 'public/uploads/mateusz.png',
          username: 'Mateusz Ryczek'
      }
  },
  {
      id: 2,
      text: 'Please feed me it\'s been 20 minutes since I last ate!!',
      user: {
          avatar: 'public/uploads/charlie.png',
          username: 'Charlie the Cat'
      }
  },
  {
      id: 1,
      text: 'First!!!1!!11',
      user: {
          avatar: 'public/uploads/mateusz.png',
          username: 'Mateusz Ryczek'
      }
  }
];

const resolvers = {
    RootQuery: {
      posts(root, args, context) {
        return posts;
      },
    },
    RootMutation: {
      addPost(root, { post, user }, context) {
          const postObject = {
              ...post,
              user,
              id: posts.length + 1,
          };
          posts.push(postObject);
          logger.log({ level: 'info', message: 'Post was created' });
          return postObject;
      },
  },
  };
  
  export default resolvers;
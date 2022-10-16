import logger from '../../helpers/logger';

export default function resolver() {

  const { db } = this;
  const { Post, User } = db.models;

  const resolvers = {
    Post: {
      user(post, args, context) {
        return post.getUser();
      },
    },
    RootQuery: {
      postsFeed(root, {
        page,
        limit
      }, context) {
        var skip = 0;

        if (page && limit) {
          skip = page * limit;
        }

        var query = {
          order: [
            ['createdAt', 'DESC']
          ],
          offset: skip,
        };

        if (limit) {
          query.limit = limit;
        }

        return {
          posts: Post.findAll(query)
        };
      },
      posts(root, args, context) {
        return Post.findAll({order: [['createdAt', 'DESC']]});
      },
    },
    RootMutation: {
      addPost(root, { post }, context) {
        return User.findAll().then((users) => {
          const usersRow = users[0];
      
          return Post.create({
            ...post,
          }).then((newPost) => {
            return Promise.all([
              newPost.setUser(usersRow.id),
            ]).then(() => {
              logger.log({
                level: 'info',
                message: 'Posted text [' + newPost.text + ']',
              });
              return newPost;
            });
          });
        });
      },
    },
  };

  return resolvers;
}
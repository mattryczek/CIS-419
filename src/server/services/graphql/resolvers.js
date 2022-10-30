import logger from '../../helpers/logger';
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

export default function resolver() {

  const { db } = this;
  const { Post, User } = db.models;
  const Op = Sequelize.Op;
  const { JWT_SECRET } = process.env;

  const resolvers = {
    Post: {
      user(post, args, context) {
        return post.getUser();
      },
    },
    RootQuery: {
      usersSearch(root, {
        page,
        limit,
        text
      }, context) {
        if (text.length < 3) {
          return {
            users: []
          };
        }
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
        query.where = {
          username: {
            [Op.like]: '%' + text + '%'
          }
        };
        return {
          users: User.findAll(query)
        };
      },
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
        return Post.findAll({ order: [['createdAt', 'DESC']] });
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
      deletePost(root, { postId }, context) {
        return Post.destroy({
          where: {
            id: postId
          }
        }).then(function (rows) {
          if (rows === 1) {
            logger.log({
              level: 'info',
              message: 'Post ' + postId + 'was deleted',
            });
            return {
              success: true
            };
          }
          return {
            success: false
          };
        }, function (err) {
          logger.log({
            level: 'error',
            message: err.message,
          });
        });
      },
      login(root, {
        email,
        password
      }, context) {
        return User.findAll({
          where: {
            email
          },
          raw: true
        }).then(async (users) => {
          if (users.length === 1) {
            const user = users[0];
            const passwordValid = await bcrypt.compare(password, user.password);
            if (!passwordValid) {
              throw new Error('Password does not match');
            }
            const token = JWT.sign({
              email,
              id: user.id
            }, JWT_SECRET, {
              expiresIn: '1d'
            });

            return {
              token
            };
          } else {
            throw new Error("User not found");
          }
        });
      }
    },
  };

  return resolvers;
}
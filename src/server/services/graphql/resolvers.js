import logger from '../../helpers/logger';
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { GraphQLUpload } from 'graphql-upload';

var Minio = require('minio');

const minio_config = {
  host: '10.10.20.39',
  protocol: 'http',
  api_port: 9000,
  console_port: 9090,
  ssl: false,
  minio_user: 'graphbook',
  minio_pass: 'northwestern'
}

var minioClient = new Minio.Client({
  endPoint: minio_config.host,
  port: minio_config.api_port,
  useSSL: minio_config.ssl,
  accessKey: minio_config.minio_user,
  secretKey: minio_config.minio_pass
});

export default function resolver() {

  const { db } = this;
  const { Post, User } = db.models;
  const Op = Sequelize.Op;
  const { JWT_SECRET } = process.env;

  const resolvers = {
    Upload: GraphQLUpload,
    Post: {
      user(post, args, context) {
        return post.getUser();
      },
    },
    RootQuery: {
      user(root, { username }, context) {
        return User.findOne({
          where: {
            username: username
          }
        });
      },
      currentUser(root, args, context) {
        return context.user;
      },
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
      postsFeed(root, { page, limit, username }, context) {
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

        if(username) {
          query.include = [{model: User}];
          query.where = { '$User.username$': username };
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
      changeEmail(root, {
        email
      }, context) {

        return User.update({
          email: email
        }, {
          where: {
            id: context.user.id
          }
        }).then(() => {
          return {
            success: true
          }
        });
      },
      changeUsername(root, {
        username
      }, context) {

        return User.update({
          username: username
        }, {
          where: {
            id: context.user.id
          }
        }).then(() => {
          return {
            success: true
          }
        });
      },
      async uploadAvatar(root, {
        file
      }, context) {
        const {
          createReadStream,
          filename,
          mimetype,
          encoding
        } = await file;
        const bucket = 'data';
        const params = {
          Bucket: bucket,
          Key: context.user.id + '/' + filename,
          Body: createReadStream()
        };

        const response = await minioClient.putObject(
          params.Bucket,
          params.Key,
          params.Body
        );

        console.log(response);

        let location = minio_config.protocol + '://' + minio_config.host + ':' + minio_config.api_port + '/' + bucket + '/' + params.Key;

        return User.update({
          avatar: location
        }, {
          where: {
            id: context.user.id
          }
        }).then(() => {
          return {
            filename: filename,
            url: location
          }
        });
      },
      async uploadVideo(root, {
        file
      }, context) {
        const {
          createReadStream,
          filename,
          mimetype,
          encoding
        } = await file;
        const bucket = 'data';
        const params = {
          Bucket: bucket,
          Key: context.user.id + '/' + filename,
          Body: createReadStream()
        };

        const response = await minioClient.putObject(
          params.Bucket,
          params.Key,
          params.Body
        );

        console.log(response);

        let location = minio_config.protocol + '://' + minio_config.host + ':' + minio_config.api_port + '/' + bucket + '/' + params.Key;

        return {
          filename: filename,
          url: location
        };
      },
      signup(root, {
        email,
        password,
        username
      }, context) {
        return User.findAll({
          where: {
            [Op.or]: [{
              email
            }, {
              username
            }]
          },
          raw: true,
        }).then(async (users) => {
          if (users.length) {
            throw new Error('User already exists');
          } else {
            return bcrypt.hash(password, 10).then((hash) => {
              return User.create({
                email,
                password: hash,
                username,
                activated: 1,
              }).then((newUser) => {
                const token = JWT.sign({
                  email,
                  id: newUser.id
                }, JWT_SECRET, {
                  expiresIn: '1d'
                });
                return {
                  token
                };
              });
            });
          }
        });
      },
      addPost(root, { post }, context) {        
        return Post.create({
          ...post,
        }).then((newPost) => {
          return Promise.all([
            newPost.setUser(context.user.id),
          ]).then(() => {
            logger.log({
              level: 'info',
              message: 'Posted text [' + newPost.text + ']',
            });
            return newPost;
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
              message: 'Post ' + postId + ' was deleted',
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
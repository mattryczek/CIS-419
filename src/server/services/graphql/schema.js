const typeDefinitions = `
directive @auth on QUERY | FIELD_DEFINITION | FIELD
scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }
  type Post {
    id: Int
    text: String
    user: User
  }
  type Response {
    success: Boolean
  }
  type UsersSearch {
    users: [User]
  }
  type RootQuery {
    user(username: String!): User @auth
    posts: [Post]
    postsFeed(page: Int, limit: Int, username: String): PostFeed @auth
    usersSearch(page: Int, limit: Int, text: String!): UsersSearch
    currentUser: User @auth
  }
  type PostFeed {
    posts: [Post]
  }
  type User {
    id: Int
    avatar: String
    username: String
    email: String
  }
  type Auth {
    token: String
  }
  input PostInput {
    text: String!
  }
  input UserInput {
    username: String!
    avatar: String!
  }
  type RootMutation {
    addPost (
      post: PostInput!
    ): Post
    deletePost (
      postId: Int!
    ): Response
    login (
      email: String!
      password: String!
    ): Auth
    signup (
      username: String!
      email: String!
      password: String!
    ): Auth
    uploadAvatar (
      file: Upload!
    ): File @auth
    uploadVideo (
      file: Upload!
    ): File @auth
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

export default [typeDefinitions];
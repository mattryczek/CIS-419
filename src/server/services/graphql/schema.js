const typeDefinitions = `
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
    posts: [Post]
    postsFeed(page: Int, limit: Int): PostFeed
    usersSearch(page: Int, limit: Int, text: String!): UsersSearch
  }
  type PostFeed {
    posts: [Post]
  }
  type User {
    avatar: String
    username: String
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
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

export default [typeDefinitions];
const typeDefinitions = `
directive @auth on QUERY | FIELD_DEFINITION | FIELD

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
    postsFeed(page: Int, limit: Int): PostFeed @auth
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
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

export default [typeDefinitions];
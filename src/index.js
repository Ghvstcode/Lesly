import {GraphQLServer} from 'graphql-yoga'

//Type definitions
const typeDefs = `
    type Query  {
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

//Resolvers
const resolvers = {
    Query: {
        me() {
            return {
                id: 1234987,
                name: "verse",
                email: "verse@gmail.com",
                age: 28
            }
        },
        post () {
            return {
                id: 1234987,
                title: "How to Graph like a QL",
                body: "graphing like a ql is not a easy thing however with determination you will be able to graph like a QL",
                published: false
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
})

server.start(()=> {
    console.log("The server is up")
})
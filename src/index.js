import {GraphQLServer} from 'graphql-yoga'

//Demo user data
const users = [{
    id: '1a',
    name: 'lesly',
    email: 'lesly@gmail.com',
    age: 45
}, {
    id: '2b',
    name: 'troy',
    email: 'troyy@gmail.com',
    age: 26
}, {
    id: '3c',
    name: 'tracy',
    email: 'tracy@gmail.com',
    age: 21
}]

//Type definitions
const typeDefs = `
    type Query  {
        users(query: String!): [User!]!
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
        users (parent, args, ctx, info) {
            if(!args.query) {
                return users
            }
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
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
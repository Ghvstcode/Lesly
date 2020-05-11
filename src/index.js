import {GraphQLServer} from 'graphql-yoga'

//Demo user data
const posts = [{
    id: '1a',
    title: 'what is graphQL?',
    body: 'It is a query language',
    published: false,
    author: '20b'
},{
    id: '2b',
    title: 'The art of graphQLing',
    body: 'graphqling is an art',
    published: true,
    author: '10a'
},{
    id: '3c',
    title: 'why graphQl?',
    body: 'GrphQL because well, money!',
    published: false,
    author: '10a'
}]

const users = [{
    id: '10a',
    name: 'lesly',
    email: 'lesly@gmail.com',
    age: 45
}, {
    id: '20b',
    name: 'troy',
    email: 'troyy@gmail.com',
    age: 26
}, {
    id: '30c',
    name: 'tracy',
    email: 'tracy@gmail.com',
    age: 21
}]

const comments = [{
    id: 90,
    text: "Nice article"
},{
    id: 80,
    text: "Interesting discourse"
}, {
    id: 70,
    text: "wawu, i am impressed"
},{
    id: 60,
    text: "Thought provoking article"
}]

//Type definitions
const typeDefs = `
    type Query  {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
        comments: [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }

    type Comment {
        id: ID!
        text: String!
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
        posts(parent,args,ctx,info) {
            if(!args.query) {
                return posts
            }
            return posts.filter((post)=> {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
        comments(parent, args, ctx, info) {
            return comments
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
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user)=>{
                return user.id === parent.author
            })
        },
    },
    User: {
        posts(parent, args, ctx, info){
            return posts.filter((post)=>{
                return post.author === parent.id
            })
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
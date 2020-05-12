import {GraphQLServer} from 'graphql-yoga'
import uuidv4  from 'uuid/v4'
//const { v4: uuidv4 } = require('uuid')
 
//Demo user data
const posts = [{
    id: '1a',
    title: 'what is graphQL?',
    body: 'It is a query language',
    published: false,
    author: '20b',
},{
    id: '2b',
    title: 'The art of graphQLing',
    body: 'graphqling is an art',
    published: true,
    author: '10a',
},{
    id: '3c',
    title: 'why graphQl?',
    body: 'GrphQL because well, money!',
    published: false,
    author: '10a',
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
    text: "Nice article",
    author: "30c",
    post: "3c"
},{
    id: 80,
    text: "Interesting discourse",
    author: "20b",
    post: "2b"
}, {
    id: 70,
    text: "wawu, i am impressed",
    author: "10a",
    post: "1a"
},{
    id: 60,
    text: "Thought provoking article",
    author: "30c",
    post: "2b"
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

    type Mutation {
        createUser(data: createUserInput): User!
        createPost(data: createPostInput): Post!
        createComment(data: createCommentInput): Comment!
    }

    input createUserInput {
        name: String!, 
        email: String!, 
        age: Int
    }

    input createPostInput {
        title: String!, 
        body: String!, 
        published: Boolean!, 
        author: ID!
    }

    input createCommentInput {
        text: String!, 
        author:ID!, 
        post:ID!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user)=>user.email === args.data.email)
            if(emailTaken){
                throw new Error("Email Taken")
            }
            const user = {
                id: uuidv4(),
                ...args.data
            }
            users.push(user)

            return user 
        },
        createPost(parent, args, ctx, info){
            const userExists = users.some((user)=> user.id === args.data.author)

            if(!userExists) {
                throw new Error("User not found")
            }

            const post = {
                id: uuidv4(),
                ...args.data,
            }

            posts.push(post)
            return post
        },
        createComment(parent, args, ctx, info) {
            const userExists = users.some((user)=> user.id === args.data.author)
            const postExists = posts.some((post)=> post.id === args.data.post && post.published)

            if(!userExists || !postExists) {
                throw new Error ("unable to post comment")
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            }

            comments.push(comment)
            return comment
        },
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user)=>{
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment)=>{
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info){
            return posts.filter((post)=>{
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info){
            return comments.filter((comment)=>{
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info){
            return users.find((user)=>{
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post)=>{
                return post.id === parent.post
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
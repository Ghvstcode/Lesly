import {GraphQLServer} from 'graphql-yoga'
import db from './db'
import Query from './resolver/Query'
import Mutation from './resolver/Mutation'
import User from './resolver/User'
import Post from './resolver/Post'
import Comment from './resolver/Comment'
//const { v4: uuidv4 } = require('uuid')
 
//Demo user data


//Type definitions
// const typeDefs = `

// `

//Resolvers


const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        User,
        Post,
        Comment
    },
    context: {
        db
    }
})

server.start(()=> {
    console.log("The server is up")
})
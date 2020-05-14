import {GraphQLServer, PubSub} from 'graphql-yoga'
import db from './db'
import Query from './resolver/Query'
import Mutation from './resolver/Mutation'
import User from './resolver/User'
import Post from './resolver/Post'
import Comment from './resolver/Comment'
import Subscription from './resolver/Subscripton'
//const { v4: uuidv4 } = require('uuid')
 
const pubsub = new PubSub()
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
        Comment,
        Subscription
    },
    context: {
        db,
        pubsub
    }
})

server.start(()=> {
    console.log("The server is up")
})
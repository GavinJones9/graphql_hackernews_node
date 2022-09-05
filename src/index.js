const { getUserId } = require('./utils');
const { ApolloServer,PubSub  } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Vote = require('./resolvers/Vote')
const Subscription = require('./resolvers/Subscription')
const prisma = new PrismaClient()

const pubsub = new PubSub()

const resolvers = {
    Query,
    Mutation,
    User,
    Link,
    Vote,
    Subscription,
    // Query: {
    //     info: () => `This is the API of a Hackernews Clone`,
    //     feed: (parent, args, context, info) => {
    //         return context.prisma.link.findMany()
    //     },
    //     // link: (parent, args,context) => context.prisma.li
    // },
    // // Link: {
    // //     id: (parent) => parent.id,
    // //     description: (parent) => parent.description,
    // //     url: (parent) => parent.url,
    // // },
    // Mutation: {
    //     // 2
    //     post: (parent, args, context, info) => {
    //         const newLink = context.prisma.link.create({
    //             data: {
    //                 url: args.url,
    //                 description: args.description,
    //             }
    //         })
    //         return newLink;
    //     },
    // },
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            pubsub,
            userId:
                req && req.headers.authorization
                    ? getUserId(req)
                    : null
        }
    },
})

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );
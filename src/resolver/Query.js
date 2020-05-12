const Query = {
    users (parent, args, { db }, info) {
        if(!args.query) {
            return db.users
        }
        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    posts(parent,args,{ db },info) {
        if(!args.query) {
            return db.posts
        }
        return db.posts.filter((post)=> {
            const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
            const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
            return isTitleMatch || isBodyMatch
        })
    },
    comments(parent, args, { db }, info) {
        return db.comments
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

export { Query as default} 
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
    id: "90",
    text: "Nice article",
    author: "30c",
    post: "3c"
},{
    id: "80",
    text: "Interesting discourse",
    author: "20b",
    post: "2b"
}, {
    id: "70",
    text: "wawu, i am impressed",
    author: "10a",
    post: "1a"
},{
    id: "60",
    text: "Thought provoking article",
    author: "30c",
    post: "2b"
}]

const db = {
    users,
    posts,
    comments
}

export{db as default}
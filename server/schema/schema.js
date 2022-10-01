const graphql = require('graphql')
const Book = require('../model/book')
const Author = require('../model/author')

const {GraphQLString, 
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLInt,

} = graphql;

const BookType = new GraphQLObjectType({
    name:"Book",
    fields:()=>({
       name: {type:GraphQLString},
       genre:{type:GraphQLString},
       author:{
        type:AuthorType,
        resolve(parent, args){
            return Author.findById(parent.authorID)
        }
        
       }
    })
})

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:()=>({
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({authorID:parent.id})
        }
    }
    })
})

const Root = new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                Book.findById(args.id)
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return Author.findById(args.id)
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent, args){
               return Book.find({})
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return Author.find({})
            }
        }

    }
})

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorID:{type:new graphql.GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                let book = Book({
                    name:args.name,
                    genre:args.genre,
                    authorID:args.authorID,
                })
                return book.save()
            }
        },
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new graphql.GraphQLNonNull(GraphQLString)},
                age:{type:new graphql.GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let author = Author({
                    name:args.name,
                    age:args.age
                })
                return author.save()
            }
        },
        removeBook:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                Book.findByIdAndRemove(args.id)
            }
        },
        removeAuthor:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                Book.findByIdAndRemove(args.id)
            }
        }

    }
})

module.exports = new GraphQLSchema({
    query:Root,
    mutation:Mutation
})
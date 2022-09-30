const graphql = require('graphql')
const Book = require('../model/book')
const Author = require('../model/author')

const {GraphQLString, 
    GraphQLObjectType,
    GraphQLID,

} = graphql;

const BookType = new graphql.GraphQLObjectType({
    name:"BookType",
    fields:()=>({
       name: {type:GraphQLID},
       genre:{type:String},
       author:{
        type:AuthorType,
        resolve(parent, args){
            return Author.findById(parent.authorID)
        }
        
       }
    })
})

const AuthorType = new graphql.GraphQLObjectType({
    name:"AuthorType",
    fields:()=>{
        
    }
})

const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields:{

    }
})

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addBook:{
            type:{},
            args:{},
            resolve(){
                
            }
        }

    }
})
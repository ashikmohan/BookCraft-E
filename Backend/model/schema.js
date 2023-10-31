const mongoose =require('mongoose');

//signup schema

const signUpSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    password:{
        type:String,                                                          
        required:true
    }
})

// add book

const addBookSchema=mongoose.Schema({
    bookname:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:['Fiction','Non-Fiction','Science Fiction','Fantasy','Romance','Horror','Biography/Autobiography']
    },
    languages:{
        type:String,
        required:true,
        enum:['Malayalam','Hindi','Tamil','Telugu','English']
    },
    writer:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    prize:{
        type:Number,
        required:true
    },
    image:{
        data: Buffer, // Store image as binary data
        contentType: String
    },
})

const BOOKCraft =mongoose.connection.useDb('BOOKCraft');

const SignUpSchema =BOOKCraft.model('User',signUpSchema);
const addBook=BOOKCraft.model('Book',addBookSchema);
module.exports={SignUpSchema,addBook};
const express=require('express');
const router=express.Router();
const bodyParser = require('body-parser');
const path = require('path');

const jwt = require('jsonwebtoken');
const { SignUpSchema,addBook } = require('../model/schema');
const secretKey = 'BOOKCraft';


router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const multer = require('multer');
const storage = multer.memoryStorage();

const upload=multer({storage:storage})



//signup


router.post("/Signup",async (req,res)=>{
    try{
        console.log(req.body);
        const user=req.body;
        const newdata=await SignUpSchema(user);
        newdata.save();
        res.status(200).json({message:"Post Succesful"})
    }catch(error){
        res.status(400).json("cannot Post data")
        console.log(`Cannot post data`)
    }
})

// login

router.post('/login',(req,res)=>{
    const{email,password}=req.body;
    console.log(email,password)
    if(email==="admin@gmail.com" && password==="admin123"){
        const data={email:email,role:"admin"}
        const token=jwt.sign({data},secretKey);
        res.status(200).json({token, role:'admin', message: 'Admin Login Successful', api:'/AdminDashboard'})
    }else{
        SignUpSchema.findOne({email,password})
        .then(user=>{
            if(user){
                 const name=user.name;
                 const data={email:email, role:'user'}
                 const token =jwt.sign({data}, secretKey)
                 res.status(200).json({token, role:'user',message:'Login Sucessful', api:'/UserDashboard',user:name});
            } else{
                res.status(401).json({error:'Invalid Username or Password'});
            }
        })
        .catch(error=>{
            res.status(500).json({error:error.message});
        });
    }

});

// addbook

router.post('/addbook', upload.single('image'),async(req,res)=>{
    try{
        const{
            bookname,
            category,
            languages,
            writer,
            description,
            prize,
        }=req.body;

        const book=new addBook({
            bookname,
            category,
            languages,
            writer,
            description,
            prize,
            image: {
                data:Buffer.from(req.file.buffer) ,
                contentType: req.file.mimetype,
            },

        });

        await book.save();

        res.status(201).json({ message: 'Book added successfully'});
    } catch(error){
        console.error('error adding books',error);
        res.status(500).json({ message: 'Inernal server error'});
    }
});

// fetched movie to dashboard
router.get('/fetchedbook',async (req,res)=>{
    try{
        const books=await addBook.find();
        res.status(200).json(books);
    } catch(err){
        res.status(500).json({error:'Failed to fetch image'})
    }
});


module.exports=router;


const express = require('express')
const app = express()
const fs = require('fs')


//Book Management System
const connectToDatabase =  require('./Database')
const Book = require('./model/bookModel')
// const {bookName,authorName,bookPrice,isbnNumber,publishedAt} = req.body
    
    app.use(express.json())
   const {multer,storage} = require("./middleware/multerConfig")
const { error } = require('console')
   const upload = multer({storage : storage})

  
      connectToDatabase()
      

      app.get ("/",(req,res)=>{
        res.status(200).json({
            message : "success"
        })
      })
// create book
app.post("/book",upload.single("image") ,async(req,res)=>{

    let fileName ;
    if(!req.file){
        fileName = "https://cdn.vectorstock.com/i/preview-1x/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg"
    }else{
       fileName = "http://localhost:3000/" + req.file.filename
    }
   const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body
   await Book.create({
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication,
        imageUrl : fileName
       })
   res.status(201).json({
    message : "Book Created Successfully"
   })
})



      //all read
      app.get("/book",async (req,res)=>{
       const books = await Book.find() // return array ma garcha
        res.status(200).json({
          message : "Books fetched successfully",
          data : books
        })

      })

      //single read
      app.get("/book/:id",async(req,res)=>{
        const id = req.params.id
        const book = await Book.findById(id) // return object ma garcha
        // Alternative 
        // Book.find({id : id})
        console.log(book)
      // const id = console.log(req.params.id)
        res.status(200).json({
          message : "single book triggered",
          data : book
        })
      })

//Delete Operation
app.delete("/book/:id",async (req,res)=>{
    const id = req.params.id
   await Book.findByIdAndDelete(id)
   res.status(200).json({
    message : "Book Deleted Successfully"
   })
})


//Update Operation
app.patch("/book/:id",upload.single("image"),async(req,res)=>{
    const id = req.params.id // kun book ma update garne id 
    const {bookName,bookPrice,authorName,publishedAt,publication,isbnNumber} = req.body
    const oldDatas = await Book.findById(id)
    let fileName ;
    if(req.file){
      const oldImagePath = oldDatas.imageUrl
      console.log(oldImagePath)
 
      const localHostUrlLength = "http://localhost:3000/".length
      const newOldImagePath = oldImagePath.slice(localHostUrlLength)
      console.log(newOldImagePath)
      //delete file/folder
      fs.unlink('storage/${newOldImagePath}',(err)=>{
        if(err){
          console.log(err)
        } else (err)=> {
          console.log("File deleted successfully")
        }
        
      })
      fileName = "http://localhost:3000/" + req.file.filename
    }
    await Book.findByIdAndUpdate(id,{
      bookName, bookPrice, authorName , publication , publishedAt , isbnNumber, imageUrl : fileName
    })


    res.status(200).json({
      message : "Book Updated Successfully"
    })
})

app.use(express.static("./storage "))

      app.listen(3000,()=>{
  console.log("Nodejs server has started at port 3000")
}
)
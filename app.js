
const express = require('express')
const app = express()


//Book Management System
const connectToDatabase =  require('./Database')
const Book = require('./model/bookModel')
// const {bookName,authorName,bookPrice,isbnNumber,publishedAt} = req.body
    
    app.use(express.json())
   const {multer,storage} = require("./middleware/multerConfig")
   const upload = multer({storage : storage})

  
      connectToDatabase()
      

      app.get ("/",(req,res)=>{
        res.status(200).json({
            message : "success"
        })
      })
//create book
      app.post("/book",upload.single("image"),async (req,res)=>{
        const {bookName,authorName,bookPrice,isbnNumber,publishedAt,publication} = req.body
        await Book.create({ 
          bookName,bookPrice,authorName,publishedAt,isbnNumber,publication })
          res.status(201).json({
        message : "Book Created Successfully"
      })
        // console.log(bookName,authorName,bookPrice,isbnNumber,publishedAt)

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
app.patch("/book/:id",async(req,res)=>{
    const id = req.params.id // kun book ma update garne id 
    const {bookName,bookPrice,authorName,publishedAt,publication,isbnNumber} = req.body
    await Book.findByIdAndUpdate(id,{
      bookName, bookPrice, authorName , publication , publishedAt , isbnNumber
    })
    res.status(200).json({
      message : "Book Updated Successfully"
    })
})

      

      app.listen(3000,()=>{
  //console.log("Nodejs server has started at port 3000")
}
)
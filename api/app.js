const express = require ('express')
const bodyParser = require('body-parser')
const model = require('./modals/models')
const app = express();
const multer = require('multer')
const path = require('path')

storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'-'+file.originalname)
    }
})
  
const upload = multer({
    storage: storage
}).single('image');
const uploadDir = path.join(__dirname, 'uploads')

let books = [
    {id:'0', cat:'std9', title:'My First Book.', description:'This is my first book for standard 9. Good book for exam reference. Covering this book assures high marks', cover_image:'/uploads/586.jpg', price:130},
    {id:'1', cat:'std10', title:'My Second Book', description:'This is my first book for standard 10', cover_image:'/uploads/586.jpg', price:130},
    {id:'3', cat:'std5', title:'My Third Book', description:'This is my first book for standard 5', cover_image:'/uploads/586.jpg', price:130},
    {id:'4', cat:'std6', title:'My 4th Book', description:'This is my first book for standard 6', cover_image:'/uploads/586.jpg', price:130},
    {id:'5', cat:'std9', title:'My 5th Book', description:'This is my first book for standard 9', cover_image:'/uploads/586.jpg', price:130},
    {id:'6', cat:'std11', title:'My 6th Book', description:'This is my first book for plus one', cover_image:'/uploads/586.jpg', price:130},
    {id:'7', cat:'stdU', title:'My 7th Book', description:'This is my first book for university', cover_image:'/uploads/586.jpg', price:130},
    {id:'8', cat:'std9', title:'My 8th Book', description:'This is my first book for standard 9', cover_image:'/uploads/586.jpg', price:130},
    {id:'9', cat:'std9', title:'My 9th Book', description:'This is my first book for standard 9', cover_image:'/uploads/586.jpg', price:130},
    {id:'10', cat:'std9', title:'My 10th Book', description:'This is my first book for standard 9', cover_image:'/uploads/586.jpg', price:130},
    {id:'11', cat:'std11', title:'My 11th Book', description:'This is my first book for plus one', cover_image:'/uploads/586.jpg', price:130},
    {id:'12', cat:'std9', title:'My 12th Book', description:'This is my first book for standard 9', cover_image:'/uploads/586.jpg', price:130},
    {id:'13', cat:'std12', title:'My 13th Book', description:'This is my first book for plus two', cover_image:'/uploads/586.jpg', price:130},
    {id:'14', cat:'std6', title:'My 14th Book', description:'This is my first book for standard 6', cover_image:'/uploads/586.jpg', price:130},
    {id:'15', cat:'stdU', title:'My 15th Book', description:'This is my first book for university', cover_image:'/uploads/586.jpg', price:130}
  ]

  categories = [
    {id:'1', cat:'std5', label:'Standard 5'},
    {id:'2', cat:'std6', label:'Standard 6'},
    {id:'3', cat:'std7', label:'Standard 7'},
    {id:'4', cat:'std8', label:'Standard 8'},
    {id:'5', cat:'std9', label:'Standard 9'},
    {id:'6', cat:'std10', label:'Standard 10'},
    {id:'7', cat:'std11', label:'Plus One'},
    {id:'8', cat:'std12', label:'Plus Two'},
    {id:'9', cat:'stdU', label:'University'},
    {id:'0', cat:'chumma', label:'Testing Items'}
  ]
//Allow CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, OPTIONS');

next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/uploads', express.static(uploadDir))


app.get('/booksforsale', (req,res) => {
    //status:'available
    let availableBooks = model.Book
    availableBooks.find({status:'available'}, (err, books) => {
        if(!err)
            res.json(books);
    })   
})

app.get('/books', (req,res) => {
    let allBooks = model.Book
    allBooks.find({}, (err, books) => {
        if(!err)
            res.json(books);
    })   
})

app.patch('/book', (req, res) => {
    let book = model.Book;
    book.findByIdAndUpdate(req.body.id, {$set: {status:req.body.status}},{new:true},(err, data) => {
        if(!err)
            return res.json({success:true, data})
        return res.json({success:false, err})

    })
    console.log(req.body, ' >>PATCH')
})
app.post('/book', (req, res) => {
    console.log(req.body)
    let newBook = new model.Book(req.body);
    newBook.save((err, book) => {
        if(!err)
           return res.json({success:true,
                book:book
            })
        return res.json({error})
    })
})
app.post('/upload',   (req,res) => {
    upload(req, res, ()=> {
        res.json({success:true, message: {
            file: req.file.originalname,
            path:req.file.path
            }
        })
    })
})

app.get('/categories', (req,res) => {
    console.log('1212')
    let allCategory = model.Category
    allCategory.find({}, (err, categories) => {
        if(!err)
            res.json(categories);
    })
})

app.post('/category', (req, res) => {
    let newcategory = new model.Category({
            category_name:req.body.name, 
            description:req.body.description
    })
    model.Category.findOneAndUpdate({category_name:req.body.name},newcategory,{upsert:true},
        (err, result)=> {
        if(!err)
            return res.json({result})
        return res.json({err})
    }
    )
    
})

app.post('/order', (req, res) =>{
    let Order = new model.Order(req.body);
    Order.save((err, order) => {
        if(!err)
            res.json({status:'success', data: order})
        else
            res.json({status:'failed', error: err})
    })
    console.log(req.body)
    
})

app.get('/orders', (req,res) => {
    let orders = model.Order
    orders.find({status:'active'}, (err, order) => {
        if(!err)
            res.json(order);
    })   
})

app.patch('/order', (req, res) => {
    let order = model.Order;
    order.findByIdAndUpdate(req.body.id, {$set: {status:req.body.status,
                                            completion_note:req.body.completion_note,
                                            status:req.body.status}},
                                            {new:true},(err, data) => {
        if(!err)
            return res.json({success:true, data})
        return res.json({success:false, err})

    })
    console.log(req.body, ' >>PATCH')
})


app.listen(8081, ()=>{
    console.log('server is running on port 8081')
})
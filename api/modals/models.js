const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const options = {
    useNewUrlParser: true,
    autoIndex: false, // Don't build indexes
  };
//mongodb://<dbuser>:<dbpassword>@ds263109.mlab.com:63109/maxpub
//mongodb://localhost/maximum_publishers
//mongodb://admin:Pwd123$$@ds263109.mlab.com:63109/maxpub
const db = mongoose.connect('mongodb://localhost:27017/bookstore', options, (err)=>{
    if (err)
        console.log(err)
});

const bookSchema = new Schema({
    title: String,
    description: String,
    author: String,
    publisher: String,
    category: String,
    cover_image: String,
    medium: String,
    price: Number,
    status: String

});

const categorySchema = new Schema({
    category_name: String,
    description: String
})

const orderSchema = new Schema({
    order_date:Date,
    user:{
        name: String,
        address: String,
        pin: Number,
        phone: String,
        mobile: String,
        landmark:String
    },
    orderItems:[{
        book_id:String,
        book_title:String,
        book_price:Number,
        qty: Number 
    }],
    order_total:Number,
    status:String,
    completion_note:String
})

const Category = mongoose.model('category', categorySchema);
const Book = mongoose.model('book', bookSchema);
const Order = mongoose.model('order', orderSchema);

module.exports = {Category, Book, Order}
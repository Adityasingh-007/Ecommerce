
const mongoose=require('mongoose')

const Product=require('./models/Product')  // requiring model because dummy data will be filled in model Product

const products = [
    {
        name:"Iphone 14pro",
        img:"https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGlwaG9uZTE0cHJvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" ,
        price: 130000,
        desc: "very costly, aukaat ke bahar" 
    },
    {
        name:"Macbook m2 pro",
        img:"https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fG1hY2Jvb2slMjBtMnxlbnwwfHwwfHx8MA%3D%3D",
        price: 250000 , 
        desc:"ye to bilkul hi aukaatke bahar"
    },
    {
        name:"Iwatch",
        price:51000,
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROzEBWSIT--95okkMi-UzyJcT0RpNufBUVCw&usqp=CAU",
        desc:"ye sasta hai lelo"
    },
    {
        name:"iPad Pro", 
        img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXBhZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60", 
        price: 237900, 
        desc: "life mein kuch cheese sirf dekhne ke liye hota hai"
    },
    {
        name:"airpods" , 
        img:"https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFpcnBvZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" , 
        price: 25000 ,
        desc: "badiya hai kamao kamao"
    }
]


// all methods of mongoose or DB always return a promise  
async function seedDB(){
    // await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("data seeded successfully");
}

// export this function to app.js

module.exports = seedDB;
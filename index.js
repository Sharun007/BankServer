// import cors
const cors = require('cors')


// import dataservice file from service folder

const dataservice=require('./service/dataService')

//import jsonwebtoken

const jwt=require('jsonwebtoken')



//import express
const express=require('express')

//create app

const app =express()

// connect frontend
app.use(cors({origin:'http://localhost:4200'}))

//set port
app.listen(3000,()=>{
    console.log("server started at port number 3000");
})

//to convert json datas to js
app.use(express.json())


// middleware to verify token

const jwtmiddleware=(req,res,next)=>{
    console.log("......router specific middleware...... ");
    try{
        const token =req.headers['access-token']
    const data=jwt.verify(token,"successkey333")
    console.log(data);
    next()
    }
    catch{
       res.status(422).json( {
            statusCode:422,
            status:false,
            message:"please login"
        })
    }
}

//request


//register

app.post('/register',(req,res)=>{

    dataservice.register(req.body.acno,req.body.uname,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
   
    
   


})

//login

app.post('/login',(req,res)=>{

    dataservice.login(req.body.acno,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)

    })
   
})

//deposit

app.post('/deposit',jwtmiddleware,(req,res)=>{

    dataservice.deposit(req.body.acno,req.body.psw,req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)

    })
   
})

//withdraw

app.post('/withdraw',jwtmiddleware,(req,res)=>{

    dataservice.withdraw(req.body.acno,req.body.psw,req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)

    })
   
   


})

//gettransaction

app.post('/transaction',jwtmiddleware,(req,res)=>{

   dataservice.gettransaction(req.body.acno).then(result=>{

    res.status(result.statusCode).json(result)

    })
   
   


})


//delete
app.delete('/deleteacc/:acno',jwtmiddleware,(req,res)=>{
    dataservice.acdelete(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})









//GET 

// app.get('/',(req,res)=>{
//     res.send('GET Method checking........')
// })

// //post

// app.post('/',(req,res)=>{
//     res.send('POST Method checking........')
// })

// //put

// app.put('/',(req,res)=>{
//     res.send('PUT Method checking........')
// })

// //patch

// app.patch('/',(req,res)=>{
//     res.send('PATCH Method checking........')
// })

// //delete

// app.delete('/',(req,res)=>{
//     res.send('DELETE Method checking........')
// })




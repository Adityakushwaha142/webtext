const express= require("express") ; 
const socketio = require("socket.io") ; 
const http = require("http") ; 
const path = require("path")
const app= express() ; 
const server= http.createServer(app) ; 
let users ={
    arnav:"ajkjdxk" , 
}
let socketmap={} ; 
const io = socketio(server) ; 

app.set("view engine" , "hbs") ;
app.use(express.static(path.join(__dirname, '/public')));
io.on("connection" , (socket)=>{
    console.log("connecction establishes" , socket.id) ; 


    socket.on("signin" , (data)=>{


        function login(s, u){
            s.join(u) ; 
            s.emit("signedin" ,data )
            socketmap[s.id]=u ; 
            console.log(socketmap) ; 

        }

        if (users[data.username]){
            if(users[data.username]==data.password){
                login(socket , data.username) ; 
               
                
            }
            else{
                socket.emit("login_failed" , data) ; 
            }

        }
        else {
            users[data.username]=data.password 
            login(socket , data.username) ; 
            
            
        }
        console.log(users) ; 


    })
    socket.on("msg_send", (data)=>{
        data.from=socketmap[socket.id] ; 

        if(data.to){
            io.to(data.to).emit("msg_rcvd" , data)  ;
            console.log(data.to , data.msg) ; 
        }
        else {
            console.log(data.to , data.msg) ; 
            socket.broadcast.emit("msg_rcvd" , data)  ; 
        }
    })
})

app.get("/room" , (req, res)=>{
    res.render("room") ; 
})



app.get("/" , (req,res)=>{
    res.render("index") ; 
})
app.get("/login" , (req, res)=>{
    res.render("login")
})
app.get("/signup"  , (req, res)=>{
    res.render("signup") ; 
}) 
app.get("/chatbox"  , (req, res)=>{
    res.render("chatbox") ; 
})


server.listen(5757, ()=>{
    console.log("server started on http://localhost:5757")  ; 
})

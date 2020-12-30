const express= require("express") ; 
const socketio = require("socket.io") ; 
const http = require("http") ; 
const app= express() ; 
const server= http.createServer(app) ; 
let users ={
    arnav:"ajkjdxk" , 
}
let socketmap={} ; 
const io = socketio(server) ; 

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



app.use("/" , express.static(__dirname+"/public")) ;

server.listen(2424, ()=>{
    console.log("server started on http://localhost:2424")  ; 
})

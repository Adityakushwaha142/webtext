let socket =io() ; 

 $(()=>{

  $("#navbar").load("../component/navbar.html") ; 

      $(".signup").show() ;
      $(".chat").hide() ; 


         $("#signupbtn").click(()=>{
       socket.emit("signin" , {
           username:$("#signupemail").val(),
           password:$("#signuppin").val()
            })
          })
          socket.on("signedin" , ()=>{
            $(".signup").hide() ;
              $(".chat").show() ; 

              })
        $("#btnsend").click(()=>{
        socket.emit("msg_send", {
   
       to: $("#everyone").val() ,   
       msg:$("#message").val() 
   })
    
 })
 socket.on("msg_rcvd" , (data)=>{
     $("#ul").append($("<li>").text(`${data.from} : ${data.msg}`)) ; 
 })


 socket.on("login_failed", ()=>{
     window.alert("Incorrect username or password ") ; 
 })
             })
           
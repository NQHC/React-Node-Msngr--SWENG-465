
  import io  from "socket.io-client";

  // Global User settings for account 
  var id = "";
  var email;
  var chats = [];
  var role;
  var activechat;
  var phone;
  var qstat;
  var realName;
  var username = "";
  const socket = io.connect("http://localhost:8080");
  const user = {
    id,
    email,
    chats,
    role,
    activechat,
    phone,
    qstat,
    username,
    socket,
    realName,
  };
  
  

  export default user;


import '../pages/Styles.css';
import Link from './sideImage.jsx';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import user from '../configuration/index';

//const data = Array.fromArray({ length: 5 }, (_, index) => index);

export default function SideBar({ goChat }) {

  const navigate = useNavigate();
  const [chatArr, setChats] = useState(user.chats);
  // const [ren,setRen] = useState(true);
  const ren = useRef(false)

  useEffect(() => {
    ren.current = true;
    checkChat();
    user.socket.off('updated_chats').on("updated_chats", async () => { // not implemented
      console.log("Received Remit");
      await checkChat(1);
    });
  }, []);
  useEffect(() => () => {
    ren.current = false;
  }, [])

  const Config = (params) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (params) {
      config = {
        ...config,
        params: {
          ...params,
        },
      };
    }
    return config;
  }
  function timeout(delay) { // del for animation
    return new Promise(res => setTimeout(res, delay));
  }
  const checkChat = async (a) => {
    if (a) {
      //    console.log("delay")
      await timeout(3000);
    }
    if (ren.current !== false) {

      const userId = user.id;
      axios.get(`http://localhost:8080/users/chats`, Config({ userId }))
        .then((res) => {
          //  console.log("Updated Chats :");
          //  console.log(res.data.chats);
          user.chats = res.data.chats;
          setChats(res.data.chats);
          if (!user.chats.includes(user.activechat)) {
            goHome();
          }
        })
        .catch(function (error) {
          //  console.log(error);
        });
    }
  }
  const setChatId = (id) => {
    goChat(id);
  }

  const goHome = () => {
    user.socket.emit("out_chat", user.activechat);
    navigate("/");
  }
  return (
    <div className="SideBar" >
      <button className="Button" style={{ width: '5.5rem' }} onClick={goHome}>Home</button>
      {chatArr.map(i => <div key={i}>
        <Link chatId={i} NavId={setChatId} />
      </div>)}
    </div>
  );

}

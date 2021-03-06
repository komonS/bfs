import React, { useEffect, useContext,useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import '../../css/Friend.css'
import { UrlContext } from '../../store/UrlProvider'
import { FriendContext } from '../../store/FriendProvider'
function Friend() {
    const { url } = useContext(UrlContext)
    const { friend,setFriend } = useContext(FriendContext)
    //const [friend, setFriend] = useState([])
    const getFriendData = async() => {
        let res = await axios.get(url.api+'api/friend/friend',{
            params:{
                userID:localStorage.userID
            }
        })
        //console.log(res.data)
        setFriend(res.data)
    }

    useEffect(() => {
        getFriendData()
    }, [])
  return (
    <div className="friend-bar">
        <h5 className="text-center">Friend List</h5>
      <ul className="nav flex-column">
          {friend.map((item, index) => (
            <li key={index} className="nav-item friend-nav">
                <Link to={'/message/friend/'+item.friendID+'/'+item.flID} >{item.fname} {item.lname}</Link>
            </li>
          ))}
        
      </ul>
    </div>
  );
}

export default Friend;

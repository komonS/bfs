import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { UrlContext } from '../../store/UrlProvider'
import '../../css/AddFriend.css'
import { FriendContext } from '../../store/FriendProvider'
import axios from 'axios'
function AddFriend(props) {
    const { url } = useContext(UrlContext)
    const { friend,setFriend } = useContext(FriendContext)
    const [frSt, setFrSt] = useState('')
    const [bt, setBt] = useState(<div></div>)
    const checkfriend = async () =>{
        let res = await axios.get(url.api+'api/friend/friend',{
            params:{
                userID:localStorage.userID,
                friendID:props.memberID
            }
        })
        console.log(res.data)
        
        if(res.data.length > 0){
            setFrSt(res.data[0].friendStatusID)
        }else{
            setFrSt('')
        }
        
    }


    const addfriend = async () => {
        let res = await axios.get(url.api+'api/friend/addfriend',{
            params:{
                userID:localStorage.userID,
                friendID:props.memberID
            }
        })

        if(res.data.status == 'success'){
            checkfriend()
            btnContent(frSt)
        }else{
            alert(res.data.status + '! '+res.data.detail)
        }
    }

    const confirmfriend = async () => {
        let res = await axios.get(url.api+'api/friend/confirm',{
            params:{
                userID:localStorage.userID,
                friendID:props.memberID
            }
        })

        if(res.data.status == 'success'){
            getFriendData()
            checkfriend()
            btnContent(frSt)
        }else{
            alert(res.data.status + '! '+res.data.detail)
        }
    }

    const getFriendData = async() => {
        let res = await axios.get(url.api+'api/friend/friend',{
            params:{
                userID:localStorage.userID
            }
        })
        //console.log(res.data)
        setFriend(res.data)
    }


    const Btn = () => {
        return <div>
            <button className="btn btn-secondary" onClick={addfriend}><i className="fas fa-user-plus"></i> &nbsp;Add Friend</button>
        </div>
    }

    const Btn3 = () => {
        return <div>
            <button className="btn btn-secondary"><i className="fas fa-user-times"></i> &nbsp;Delete Friend</button>
        </div>
    }

    const Btn1 = () => {
        return <div>
            <button className="btn btn-secondary"><i className="fas fa-user-minus"></i> &nbsp;Cancel Friend</button>
        </div>
    }

    const Btn2 = () => {
        return <div>
            <button className="btn btn-secondary" onClick={confirmfriend}><i className="fas fa-user-check"></i> &nbsp;Confirm Friend</button>
        </div>
    }

    const btnContent = (f) => {
        if(f === ''){
            setBt(<Btn/>) 
        }else if(f === '1'){
            setBt(<Btn1/>) 
        }else if(f === '2'){
            setBt(<Btn2/>) 
        }else if(f === '3'){
            setBt(<Btn3/>) 
        }

    }
    
    useEffect(() => {
        checkfriend()
        btnContent(frSt)
    }, [url,frSt])


  return (
    <div className="add-friend">    
      {bt}
    </div>
  );
}

export default AddFriend;

import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axiox from 'axios'
import { UrlContext } from '../../store/UrlProvider'
import '../../css/Message.css'
import { animateScroll } from "react-scroll";

function Message() {
    const [friendData, setFriendData] = useState([])
    const [messagesEnd, setMessagesEnd] = useState()
    const { url } = useContext(UrlContext)
    const { memberID, flID } = useParams()
    const [ms, setMs] = useState([])
    const [message, setMessage] = useState()
    const getMessage = async () => {
        let res = await axiox.get(url.api + 'api/message/message', {
            params: {
                flID: flID
            }
        })
        console.log(res.data)
        if (res.data.length > 0) {
            setMs(res.data)
            scrollToBottom()
        } else {
            setMs([])
        }

    }
    const send = async (e) => {
        e.preventDefault()
        document.getElementById('message').value = ""
        let res = await axiox.get(url.api + 'api/message/addmessage', {
            params: {
                userID: localStorage.userID,
                flID: flID,
                message: message
            }
        })
        if (res.data.status == 'success') {
            getMessage()
            
        } else {
            alert(res.data.status + '! ' + res.data.detail)
        }
    }

    const MessageBox = (props) => {
        let box = <div></div>
        
        if (props.userID === localStorage.userID) {
            box = <div className="container bg-secondary">
                <img src={url.api + 'picture/profile/' + props.picture} alt="Avatar" className="right" />
                <p className="text-white">{props.message}</p>
                <span className="time-left">{props.date}</span>
            </div>
        } else {
            box = <div className="container">
                <img src={url.api + 'picture/profile/' + props.picture} alt="Avatar" />
                <p>{props.message}</p>
                <span className="time-right">{props.date}</span>
            </div>


        }
        /*
       box = <div className="container darker">
                <img src={url.api + 'picture/profile/' + props.picture} alt="Avatar" className="right" />
                <p>{props.message}</p>
                <span className="time-left">{props.date}</span>
            </div>
            */
        return box
    }

    const getFriendData = async () => {
        let res = await axiox.get(url.api + 'api/user/memberinfo', {
            params: {
                userID: memberID
            }
        })
        setFriendData(res.data)
    }

    const scrollToBottom = async () => {
        await animateScroll.scrollToBottom({
          containerId: "message-box-content"
        });
    }

    useEffect(() => {
        getMessage()
        getFriendData()
        scrollToBottom()
        
    }, [url, flID])
    return (
        <div>
            <div className="message-box">
                <div className="message-box-header">{friendData.fullname}</div>
                <div className="message-box-content" id="message-box-content" >
                    {ms.map((item, index) => (

                        <div className="message-box-msg" key={index}>
                            <MessageBox userID={item.userID} message={item.message} picture={item.picture} date={item.sendDate} />
                        </div>

                    ))}
                </div>

            </div>
            <div className="message-input-content">
                <form onSubmit={send}>
                    <div className="form-inline">
                        <div className="message-input-text">
                            <input className="input-message" id="message" onChange={e => setMessage(e.target.value)} />
                        </div>
                        <div className="message-input-button">
                            <button className="btn btn-secondary btn-send"><i className="fas fa-paper-plane"></i></button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Message;

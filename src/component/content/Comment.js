import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { UrlContext } from '../../store/UrlProvider'
import axios from 'axios'
import '../../css/Comment.css'

function Comment(props) {
    const { url } = useContext(UrlContext)
    const [comment, setComment] = useState([])
    const [inputComment, setInputComment] = useState()

    const getCommentData = async () => {
        let res = await axios.get(url.api + 'api/postwall/comment', {
            params: {
                postID: props.id
            }
        })
        setComment(res.data)
    }

    const commentData = async () => {
        let res = await axios.get(url.api + 'api/postwall/insertcomment', {
            params: {
                postID: props.id,
                comment: inputComment,
                userID: localStorage.userID
            }
        })

        if (res.data.status == 'success') {
            //document.getElementsByClassName('comment-text').value = ''
            document.getElementById('comment-text-' + props.id).value = ''
            setInputComment('')
            getCommentData()
        } else {
            alert(res.data.status + '! ' + res.data.detail)
        }
    }

    useEffect(() => {
        getCommentData()

    }, [url])
    return (
        <div className="comment">
            <label>Comment</label>
            <div className="comment-detail">
                {comment.map((item, index) => (
                    <div className="row comment-centent" key={index}>
                        <div className="comment-detail-user">
                            <div className="comment-detail-user-left">
                                <Link className="link-profile" to={"/profile/friend/" + item.userID}>
                                    <img src={url.api + 'picture/profile/' + item.picture} className="post-img" />
                                </Link>
                            </div>
                            <div className="comment-detail-user-left">
                                <Link className="link-profile" to={"/profile/friend/" + item.userID}>
                                    {item.fname} {item.lname}
                                </Link>
                            </div>
                        </div>
                        <div className="comment-detail-content">
                            {item.commentDetail}
                        </div>
                    </div>
                ))}
            </div>
            <div className="comment-input">
                <div className="form-group">
                    <textarea className="form-control comment-text" id={'comment-text-' + props.id} rows="1" placeholder="comment..." onChange={e => setInputComment(e.target.value)} ></textarea>
                </div>

                <div className="text-right">
                    <button className="btn btn-secondary btn-comment" onClick={commentData}>comment</button>
                </div>

            </div>

        </div>
    );
}

export default Comment;

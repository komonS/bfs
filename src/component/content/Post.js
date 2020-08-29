import React, { useState,useContext } from 'react';
import '../../css/Post.css'
import axios from 'axios'
import { UrlContext } from '../../store/UrlProvider'

function Post() {
    const { url } = useContext(UrlContext)
    const [postDetail, setPostDetail] = useState()

    const save = async() => {
        let res = await axios.get(url.api+'api/postwall/insertpost',{
            params:{
                userID:localStorage.userID,
                detail:postDetail
            }
        })
        if(res.data.status === 'success'){
            alert(res.data.status +'! '+res.data.detail)
            document.getElementById('postdetail').value = ''
        }else{
            alert(res.data.status +'! '+res.data.detail)
        }
    }
    return (
        <div className="post-content-input">
            <div className="from-group">
                <textarea className="post-input form-control" id="postdetail" name="postdetail" rows="5" placeholder="เขียนอะไรบางอย่าง..." onChange={e => setPostDetail(e.target.value)}></textarea>
            </div>
            <div className="text-right">
                <button className="btn btn-dark post-button" onClick={save}>Post</button>
            </div>

        </div>
    );
}

export default Post;

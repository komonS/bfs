import React, { useState, useContext } from 'react';
import '../../css/Post.css'
import axios from 'axios'
import { UrlContext } from '../../store/UrlProvider'
import { UserContext } from '../../store/UserProvider'
function Post() {
    const { url } = useContext(UrlContext)
    const { user, setUser } = useContext(UserContext)
    const [postDetail, setPostDetail] = useState()
    const [postStatus, setPostStatus] = useState(false)
    const save = async () => {
        let res = await axios.get(url.api + 'api/postwall/insertpost', {
            params: {
                userID: localStorage.userID,
                detail: postDetail
            }
        })
        setPostStatus(true)
        if (res.data.status === 'success') {
            alert(res.data.status + '! ' + res.data.detail)
            document.getElementById('postdetail').value = ''
        } else {
            alert(res.data.status + '! ' + res.data.detail)
        }
    }

    const PostBox = () => {
        return <div className="box-post">
            <div className="post">
                <div className="post-content">
                    <div className="row post-header">
                        <div className="post-lift">
                            <img src={url.api + 'picture/profile/' + user.image} className="post-img" />
                        </div>
                        <div className="post-lift">
                            {user.fullname}
                        </div>
                    </div>
                    <div className="post-detail">
                        {postDetail}
                    </div>
                </div>
            </div>
        </div>
    }
    return (
        <div>

            <div className="home-post">
                <div className="post-content-input">
                    <div className="from-group">
                        <textarea className="post-input form-control" id="postdetail" name="postdetail" rows="5" placeholder="เขียนอะไรบางอย่าง..." onChange={e => setPostDetail(e.target.value)}></textarea>
                    </div>
                    <div className="text-right">
                        <button className="btn btn-dark post-button" onClick={save}>Post</button>
                    </div>
                </div>

            </div>
            <div>
                {postStatus ? <PostBox /> : null}
            </div>
        </div>
    );
}

export default Post;

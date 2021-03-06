import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { UrlContext } from '../../store/UrlProvider'
import axios from 'axios'
import '../../css/Wall.css'
import Comment from './Comment'
function FriendWall(props) {
  const { url } = useContext(UrlContext)
  const [post, setPost] = useState([])
  const getPostData = async () => {
    let res = await axios.get(url.api + 'api/postwall/post',{
        params:{
            userID:props.memberID
        }
    })
    setPost(res.data);
  }

  useEffect(() => {
    getPostData()

  }, [url])
  return (
    <div>
      {post.map((item, index) => (
        <div key={index} className="post">
          <div className="post-content">
            <div className="row post-header">
              <div className="post-lift">
                <Link to={"/profile/friend/" + item.userID}>
                  <img src={url.api + 'picture/profile/' + item.picture} className="post-img" />
                </Link>
              </div>
              <div className="post-lift">
                <Link className="link-profile" to={"/profile/friend/" + item.userID}>
                  {item.fname} {item.lname}
                </Link>
              </div>
            </div>
            <div className="post-detail">
              {item.detail}
            </div>
          </div>
          <div className="post-commet">
            <Comment id={item.postID} />
          </div>

        </div>
      ))}

    </div>
  );
}

export default FriendWall;

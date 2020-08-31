import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import '../../css/Profile.css'
import { UrlContext } from '../../store/UrlProvider'

function MemberPrfile(props) {
    const { url } = useContext(UrlContext)
    const [user, setUser] = useState([])
    const onGetUserInfo = async (userID) => {
        let res = await axios.get('http://localhost/biker/api/user/memberinfo', {
            params: {
                userID: userID
            }
        })
        setUser(res.data)
    }

    useEffect(() => {
        onGetUserInfo(props.memberID)
    }, [url,props.memberID])
    return (
        <div>
            <div className="Profile">
                <div>
                    <h3 className="text-center">Profile</h3>
                </div>
                <div className="text-center">
                    <div>
                        <img src={url.api + 'picture/profile/' + user.image} className="mx-auto Profile-Image" />
                    </div>
                    <div>
                        <h5>{user.fname} {user.lname}</h5>
                    </div>
                </div>
                <div className="Profile-Info">
                    <div className="form-group">
                        <label>Email : &nbsp;</label>
                        {user.email}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MemberPrfile;

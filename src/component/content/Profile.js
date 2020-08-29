import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import '../../css/Profile.css'
import { UrlContext } from '../../store/UrlProvider'
import { UserContext } from '../../store/UserProvider'

function Profile() {
    const { url } = useContext(UrlContext)
    const { user, setUser } = useContext(UserContext)
    const [file, setFile] = useState()

    //console.log(file)
    const onSubmitdata = async (event) => {
        event.preventDefault()
        let res = await axios.get(url.api+'/api/user/updateprofile',{
            params:{
                fname:document.getElementById("fname").value,
                lname:document.getElementById("lname").value,
                email:document.getElementById("email").value,
                userID:localStorage.userID
            }
        })
        
        if(res.data.status === 'success'){
            alert('Update data is completed')
        }else{
            alert(res.data.status + '! '+res.data.detail)
        }
    }

    const uploadFile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const imagefile = document.querySelector('#filUpload');
        formData.append("filUpload", imagefile.files[0]);
        let res = await axios.post(url.api+'service/upload.php', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            },
            params:{
                userID:localStorage.userID
            }
        })
        console.log(res.data)
        if(res.data.status === 'success'){
            onGetUserInfo(localStorage.userID)
        }else{
            alert(res.data.status+'! <br/>'+res.data.detail)
        }
        
    }

    const onGetUserInfo = async (userID) => {
        let res = await axios.get('http://localhost/biker/api/user/memberinfo', {
            params: {
                userID: userID
            }
        })
        console.log(res.data[0])
        setUser(res.data)
    }

    useEffect(() => {
        
    }, [])
    return (
        <div>
            <div className="Profile">
                <div>
                    <h3>Profile Information</h3>
                </div>
                <div className="form-inline">
                    <div>
                        <img src={url.api+'picture/profile/'+user.image} className="mx-auto Profile-Image" />
                    </div>
                    <div>
                        <form>
                            <input type="file" className="form-control Profile-Image-Input" id="filUpload" name="filUpload" onChange={(e)=>setFile(e.target.files[0])} />
                            <button className="btn btn-secondary" type="submit" onClick={uploadFile}>Upload</button>
                        </form>
                    </div>
                </div>
                <div className="Profile-Info">
                    <h4>Infomation</h4>
                    <form name="form1" id="form1" onSubmit={onSubmitdata}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control"  id="fname" defaultValue={user.fname}  />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" id="lname" defaultValue={user.lname}  />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" id="email" defaultValue={user.email} />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-secondary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Profile
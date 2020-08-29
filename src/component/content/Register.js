import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import { UrlContext } from '../../store/UrlProvider'
import axios from 'axios'
import '../../css/Register.css'

import FacebookLogin from 'react-facebook-login'
function Register() {
    const { url } = useContext(UrlContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [fname, setFname] = useState()
    const [lname, setLname] = useState()
    const [btnStatus, setBtnStatus] = useState(true)
    const [userStatus, setUserStatus] = useState(false)
    const history = useHistory()
    const onRegister = async (e) => {
        e.preventDefault()
        let res = await axios(url.api + 'api/user/register', {
            params: {
                username: username,
                password: password,
                email: email,
                fname: fname,
                lname: lname
            }
        })
        if (res.data.status === 'success') {
            alert('Wellcome to biker friend ship web site \n please login agian')
            history.push('/login')
        } else {
            alert('Please register agian')
        }
    }
    const checkData = () => {
        if (userStatus === true) {
            setBtnStatus(false)
        } else {
            setBtnStatus(true)
        }
    }

    const checkUsername = async () => {

        if (username.length >= 8) {
            let res = await axios.get(url.api + 'api/user/checkuser', {
                params: {
                    username: username
                }
            })
            if (res.data.status === 'success') {
                console.log(res.data.status)
                setBtnStatus(false)
            } else {
                console.log(res.data.status)
                setBtnStatus(true)
            }
        } else {
            setBtnStatus(true)
        }


    }

    const faceRegister = async (res) => {
        console.log(res)
        let fullname = res.name.split(" ")
        let f_fname = fullname[0]
        let f_lname = fullname[1]
        let re = await axios(url.api + 'api/user/registerfromface', {
            params: {
                username: res.userID,
                email: res.email,
                fname: f_fname,
                lname: f_lname
            }
        })
        if (re.data.status === 'success') {
            alert('Wellcome to biker friend ship web site \n please login agian')
            history.push('/login')
        } else {
            alert('Please register agian')
        }
    }

    useEffect(() => {
        checkData()

    }, [userStatus])
    return (
        <div className="register">
            <h3 className="text-center">Register</h3>

            <div>
                <form onSubmit={onRegister}>
                    <div className="form-group">
                        <label>Username : </label>
                        <input type="text" className="form-control" onChange={e => setUsername(e.target.value)} onKeyUp={checkUsername} required />
                    </div>
                    <div className="form-group">
                        <label>Password : </label>
                        <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>First Name : </label>
                        <input type="text" className="form-control" onChange={e => setFname(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Last Name : </label>
                        <input type="text" className="form-control" onChange={e => setLname(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Email : </label>
                        <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="btn-register-content">
                        <div className="text-center">
                            <div className="btn-register">
                                <button className="btn btn-secondary" type="submit" disabled={btnStatus}>Register</button>
                            </div>
                            <div className="btn-register">
                                <FacebookLogin
                                    appId="666668850613105"
                                    autoLoad={true}
                                    fields="name,email,picture"
                                    scope="public_profile,email"
                                    callback={faceRegister}
                                    cssClass="btn-login-facebook btn btn-primary"
                                    textButton="register facebook"
                                />
                            </div>
                        </div>
                    </div>

                </form>
                <div>

                </div>
            </div>
        </div>
    );
}

export default Register;

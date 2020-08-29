import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axiox from 'axios'
import { LoginContext } from '../../store/LoginProvider'
import { UserContext } from '../../store/UserProvider'
import FacebookLogin from 'react-facebook-login'
import '../../css/Login.css'
import { UrlContext } from '../../store/UrlProvider'
function Login() {
    const { url } = useContext(UrlContext)
    const { login, setLogin } = useContext(LoginContext)
    const { user, setUser } = useContext(UserContext)

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [alertUI, setalertUI] = useState(false)
    const [alertUI2, setalertUI2] = useState(false)
    const Alerts = () => {
        return <div class="alert alert-danger">
            <strong>Error!</strong> User or Password incorrect
        </div>
    }

    const Alerts2 = () => {
        return <div class="alert alert-danger">
            <strong>Error!</strong> This user can not register. Please registering.
        </div>
    }


    const history = useHistory();
    const onGetUserInfo = async (userID) => {
        let res = await axiox.get('http://localhost/biker/api/user/memberinfo', {
            params: {
                userID: userID
            }
        })
        console.log(res.data[0])
        setUser(res.data)
    }
    const onLogin = async (event) => {
        event.preventDefault()
        let res = await axiox.get('http://localhost/biker/api/user/checklogin', {
            params: {
                username: username,
                password: password
            }
        })

        if (res.data.status == 'success') {
            setLogin(true)
            localStorage.userID = res.data.userID
            onGetUserInfo(res.data.userID)
            history.push('/');
        } else {
            setalertUI(true)
        }

    }
    const responseFacebook = async (res) => {
        console.log(res)
        let re = await axiox.get(url.api+'api/user/checkloginface',{
            params:{
                username:res.userID
            }
        })

        console.log(re.data)

        if (re.data.status == 'success') {
            setLogin(true)
            localStorage.userID = re.data.userID
            onGetUserInfo(re.data.userID)
            history.push('/');
        } else {
            setalertUI2(true)
    }

    }
    return (
        <div>
            <h3 className="text-center">Login</h3>

            <form onSubmit={onLogin}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="text-center">
                    <div className="btn-login-content">
                        <button type="submit" className="btn btn-info">Login</button>
                    </div>
                    <div className='btn-login-content'>
                        <FacebookLogin
                            appId="666668850613105"
                            autoLoad={false}
                            fields="name,email,picture"
                            onClick={<div>login facebook click</div>}
                            callback={responseFacebook}
                            cssClass="btn-login-facebook btn btn-primary"
                            textButton="login facebook"
                            />
                    </div>

                </div>
            </form>
            {alertUI ? <Alerts /> : null}
            {alertUI2 ? <Alerts2 /> : null}
        </div>
    );
}

export default Login;

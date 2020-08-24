import React, { useState,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axiox from 'axios'
import { LoginContext } from '../../store/LoginProvider'
import { UserContext } from '../../store/UserProvider'

function Login() {
    const { login,setLogin } = useContext(LoginContext)
    const { user,setUser } = useContext(UserContext)
    
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [alertUI, setalertUI] = useState(false)
    
    const Alerts = () => {
        return <div class="alert alert-danger">
            <strong>Error!</strong> User or Password incorrect
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
                    <button type="submit" className="btn btn-info">Login</button>
                </div>
            </form>
            { alertUI ? <Alerts /> : null }
        </div>
    );
}

export default Login;

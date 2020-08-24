import React, { useEffect, useContext } from 'react';
import {useHistory} from 'react-router-dom'
import { Link } from "react-router-dom";
import axiox from 'axios'
import { LoginContext } from '../../store/LoginProvider'
import { UserContext } from '../../store/UserProvider'
import { UrlContext } from '../../store/UrlProvider'
import '../../css/Header.css'
function Header() {
    const history = useHistory()
    const { url } = useContext(UrlContext)
    const { user, setUser } = useContext(UserContext)
    const { login, setLogin } = useContext(LoginContext)
    const logout = () => {
        localStorage.clear()
        setLogin(false)
        let deluser = {
            fullname:'',
            username:'',
            rule:''
        }
        setUser(deluser)
        history.push('/')
    }
    const ImageProfile = () => {
        return <img className="img-profile" src={url.api+'picture/'+user.image} alt="Logo"  />
    }
    const Logined = () => {
        return <li className="nav-item dropdown ">
            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                <ImageProfile/> {user.fullname}
            </a>
            <div className="dropdown-menu dropdown-menu-right">
                <Link to="/profile" className="dropdown-item" href="#">Profile</Link>
                <Link to="/mybike" className="dropdown-item" href="#">My Bike</Link>
                <a className="dropdown-item" href="#" onClick={logout}>Logout</a>
            </div>
        </li>
    }

    const NullLogin = () => {
        return <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
        </li>
    }

    const getUserData = async (userID) => {
        let res = await axiox.get('http://localhost/biker/api/user/memberinfo', {
            params: {
                userID: userID
            }
        })
        setUser(res.data)
    }

    useEffect(() => {
        getUserData(localStorage.userID)
    }, [])



    return (
        <div>
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                <Link className="navbar-brand" href="#" to="/">IT Ticket</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    
                </div>
                <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        {login ? <Logined /> : <NullLogin />}
                    </ul>
                </div>
            </nav>
        </div>
    );
}




export default Header;

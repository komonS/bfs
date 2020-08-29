import React, { useEffect, useContext,useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axiox from 'axios'
import { LoginContext } from '../../store/LoginProvider'
import { UserContext } from '../../store/UserProvider'
import { UrlContext } from '../../store/UrlProvider'
import { MenuContext } from '../../store/MenuProvider'
import '../../css/Header.css'

function Header() {
    const history = useHistory()
    const { url } = useContext(UrlContext)
    const { menu,setMenu } = useContext(MenuContext)
    const { user, setUser } = useContext(UserContext)
    const { login, setLogin } = useContext(LoginContext)
    const logout = () => {
        localStorage.clear()
        setLogin(false)
        let deluser = {
            fullname: '',
            username: '',
            rule: ''
        }
        setUser(deluser)
        history.push('/login')
    }
    const ImageProfile = () => {
        return <img className="img-profile" src={url.api + 'picture/profile/' + user.image} alt="Logo" />
        
    }
    
    const Logined = () => {
        return <ul className="navbar-nav">
        <li className="nav-item dropdown ">
            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                <ImageProfile/> {user.fullname}
            </a>
            <div className="dropdown-menu dropdown-menu-right">
                <Link to="/profile" className="dropdown-item" href="#">Profile</Link>
                
                <a className="dropdown-item" href="#" onClick={logout}>Logout</a>
            </div>
        </li>
        </ul>
    }

    const NullLogin = () => {
        return <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
        </ul>

    }

    const getUserData = async (userID) => {
        let res = await axiox.get('http://localhost/biker/api/user/memberinfo', {
            params: {
                userID: userID
            }
        })
        console.log(res.data)
        setUser(res.data)
        
    }

    useEffect(() => {
        getUserData(localStorage.userID)
        
    }, [url])

    const showMenu = () => {
        
        if(menu === 'Hide'){
            setMenu('Show')
        }else if(menu === 'Show'){
            setMenu('Hide')
        }
        
       console.log(menu)
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
                <button className="btn btn-dark btn-menu d-xl-none" onClick={showMenu} type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand" href="#" to="/">Biker Friend Ship</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">

                </div>
                <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                    
                        {login ? <Logined /> : <NullLogin />}
                    
                </div>
            </nav>
        </div>
    );
}




export default Header;

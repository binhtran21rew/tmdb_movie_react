import React, { useRef, useState, useEffect, useContext } from 'react';


import './login.scss';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/AuthProvider';
const Login = () => {
    // const {setAuth} = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [showEye, setShowEye] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('')
    }, [user, password]);

    const showText = () =>{
        setShowEye(!showEye);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setUser('');
        setPassword('');
        setSuccess(true);
    }
    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in</h1>
                    <p>
                        <a href="#">Go to home</a>
                        <p>username: {user} <br/> password: {password}</p>
                        {/* {token.guest_session} <br/> {token.exprires} */}
                    </p>
                </section>
                
            ) : (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg": "offscreen"} aria-live='assertive'>{errMsg}</p>
            <div className="container">
                <div className="login">
                    <form onSubmit={handleSubmit}>
                        <div className="section mb-3">
                            <label htmlFor="">
                                <p>UserName:</p>
                            </label>
                            <div className="input__user">
                                <Input 
                                    id="username"
                                    ref={userRef}
                                    value={user}
                                    placeholder="enter your name"
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="section mb-3">
                            <label htmlFor="">
                                <p>Password:</p>
                            </label>
                            <div className="input__password">
                                <Input 
                                    id="password"
                                    ref={userRef}
                                    value={password}
                                    placeholder="enter your password"
                                    type={showEye ? 'text' : 'password'}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                {showEye ? <FontAwesomeIcon icon={faEye} onClick={showText} className='input__password__display'/> : 
                                
                                <FontAwesomeIcon icon={faEyeSlash} onClick={showText} className='input__password__display'/>}
                                
                                

                            </div>
                            
                        </div>
                        <div className="section mb-3">
                            <div className="tag">
                                <Button className="small btn__primary" 
                                >Login </Button>
                                <span className="link">
                                    <a href="#">Sign up</a>
                                </span>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        
        </section>
        
        )}
        </>
    )
}

export default Login;


import React, {useState, useEffect, useRef} from 'react';
import './register.scss';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { faCheck, faTimes, faInfoCircle, faIceCream, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import tmdbApi from '../../api/tmdbApi';
import axios from 'axios';


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;



const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    
    const [showEye, setShowEye] = useState({
        pass: false,
        confirm : false
    });
    const [token, setToken] = useState({
        guest_session: '',
        exprires: ''
    })
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])


    const handleShowPass = () => {
        setShowEye({...showEye, pass: !showEye.pass});
    }

    const handleShowText = () => {
        setShowEye({...showEye, confirm: !showEye.confirm})
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        const validName = USER_REGEX.test(user);
        const validPass = PWD_REGEX.test(pwd);
        if(!validName || !validPass){
            setErrMsg("Invalid Enter");
            return;

        }
        try{
            let res = await tmdbApi.createRequestToken();
            // console.log(res);

            setToken({
                guest_session: res.request_token,
                exprires: res.expires_at
            });
            setSuccess(true);


        }catch(err){
            console.log(err);
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success</h1>
                    <p>
                        <a href="#">Sign In</a>
                        <p>username: {user} <br/> password: {pwd}</p>
                        {token.guest_session} <br/> {token.exprires}
                    </p>
                </section>
                
            ) : (
            <section>
                <p ref={errRef} className={errMsg ? "errmsg": "offscreen"} aria-live='assertive'>{errMsg}</p>
                <div className="container">
                    <div className="register">
                        <form onSubmit={handleRegister}>
                            <div className="section mb-3">
                                <label htmlFor="nameuser">
                                    Username:
                                    <span className={validName ? "valid" : "hide"}>
                                        <FontAwesomeIcon icon={faCheck}/>
                                    </span>
                                    <span className={validName || !user ? "hide" : "invalid"}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </span>
                                </label>
                                <div className="input__name">
                                <Input 
                                    type="text"
                                    id="nameuser"
                                    
                                    ref={userRef}
                                    placeholder= "enter your name"
                                    value={user}
                                    name="name"
                                    onChange = {(e) => setUser(e.target.value)}
                                    autoComplete="off"
                                    required
                                    describedby="uidnote"
                                    invalid={validName ? "false" : "true"}
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false) }
                                />
                                </div>
                                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                    4 to 24 characters.<br/>
                                    Must begin with a letter.<br/>
                                    Letters, numbers, underscores, hyphens allowed.
                                </p>
                            </div>
                            <div className="section mb-3">
                                <label htmlFor="password">
                                    Password:
                                    <span className={validPwd ? "valid" : "hide"}>
                                        <FontAwesomeIcon icon={faCheck}/>
                                    </span>
                                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </span>
                                </label>
                                <div className="input__password">
                                    <Input 
                                        type={showEye.pass ? "text" : 'password'}
                                        id="password"
                                        onChange = {(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        placeholder= "enter your name"
                                        name="password"
                                        required
                                        describedby="pwdnote"
                                        invalid={validPwd ? "false" : "true"}
                                        onFocus={() => setPwdFocus(true)}
                                        onBlur={() => setPwdFocus(false) }
                                    />
                                    
                                    {
                                        showEye.pass ? <FontAwesomeIcon onClick={handleShowPass}  icon={faEye} className='input__password__display eyeDisplay'/> :
                                        <FontAwesomeIcon onClick={handleShowPass} icon={faEyeSlash} className='input__password__display'/>
                                    }
                                    
                                    
                                </div>
                                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                    8 to 24 characters.<br />
                                    Must include uppercase, lowercase letters, a number and a special character.<br />
                                    Allowed special characters: 
                                    <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </p>
                            </div>
                            <div className="section mb-3">
                                <label htmlFor="comfirm_password">
                                    Password:
                                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                        <FontAwesomeIcon icon={faCheck}/>
                                    </span>
                                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </span>
                                </label>
                                <div className="input__password">
                                    <Input 
                                        type={showEye.confirm ? "text" : 'password'}
                                        id="confirm_password"
                                        onChange={(e) => setMatchPwd(e.target.value)}
                                        value={matchPwd}
                                        placeholder= "enter your name"
                                        name="comfirm_password"
                                        required
                                        describedby="comfirmNote"
                                        invalid={validMatch ? "false" : "true"}
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false) }
                                    />
                                    {
                                        showEye.confirm ? <FontAwesomeIcon onClick={handleShowText}  icon={faEye} className='input__password__display eyeDisplay'/> :
                                        <FontAwesomeIcon onClick={handleShowText} icon={faEyeSlash} className='input__password__display'/>
                                    }
                                </div>
                                <p id="comfirmNote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must match the first password input field.
                                </p>
                            </div>
                            <div className="section mb-3">
                                <Button className="small btn__primary" 
                                    disabled = {!validName || !validPwd || !validMatch ? true : false}
                                >Register </Button>

                            </div>
                        </form>  
                    </div>
                </div>
            </section>

        )}
        </>
    )
}

export default Register;

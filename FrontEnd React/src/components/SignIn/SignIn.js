//import axios from 'axios';
import React, { useContext, useRef } from 'react';
import { Redirect, useHistory, Route } from "react-router-dom";
import './SignIn.css';



const SignIn = (props) => {

    const signForm = useRef();
    const history = useHistory();

    const loginHandler = () => {
        const form = signForm.current
        window.sessionStorage.setItem('loginName',form['username'].value);
       // history.go(1)
        props.history.push('/');
    };

    return (
        <div className="NewPost">
            <form ref={signForm}>
                <h1>Login</h1><div><br /></div>

                <small>Hint ==> Put Any Name and password</small><div><br /></div>

                <label>Name</label>
                <input type="text" id={'username'} name={'username'}/>

                <label>Password</label>
                <input type="password" id={'passoword'} name={'passoword'}/>
                <div><br /></div>

                <button  onClick={loginHandler}> <a href="/">Login</a></button> <div><br /></div>


            </form>
        </div>


    );
}
export default SignIn;
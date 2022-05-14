import axios from 'axios';
import React, { useContext, useRef } from 'react';
import { APIConfig } from '../../store/API-Config';

import './NewUser.css';

const NewUser = (props) => {

    const APIs = useContext(APIConfig);
    const userAPI = APIs.userAPI;

    const NewUserForm = useRef();

    const titleVal = useRef();


    const PostDataHandler = () => {

        const form = NewUserForm.current
        const data = { title: form['title'].value};
        console.log(data);
        axios.post(userAPI, data)
            .then(data => {
                console.log('Success:', data);
                props.history.push('/users'); // go to users
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    return (
            <div className="NewUser">
                <form ref={NewUserForm}>
                <h1>Add a User</h1>
                <label>Title</label>
                <input type="text" label={'title'} name={'title'} />
            </form>
            <div><br/></div>
            <button onClick={PostDataHandler}>Add User </button>
            <div><br/><br/></div>

        </div>


    );
}
// if i didnt use a form, you will get a Chrome sendrequest error: TypeError: Converting circular structure to JSON
export default NewUser;
import React, { useContext } from 'react';
import { LikedPosts } from '../../store/LikedPosts';

import './User.css';

const User = (props) => {

    const { likedPosts, setLikedPosts } = useContext(LikedPosts);

    return (
        <article className="Post" onClick={props.clicked}>
            <h1> User : {props.title}</h1>
            <small>id : {props.id}</small>

        </article>
    );
}

export default User;
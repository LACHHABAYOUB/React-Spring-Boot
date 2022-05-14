import React, { useContext } from 'react';
import { LikedPosts } from '../../store/LikedPosts';

import './Postfollow.css';

const Postfollow = (props) => {

    const { likedPosts, setLikedPosts } = useContext(LikedPosts);

    return (
        <article className="Post" onClick={props.clicked}>

            <h1>{props.title}</h1>
            <div className="Info">
                <div className="Author">{props.author}</div>

            </div>
                                     {
                likedPosts.includes(props.id)
                    ?

                  /* 1 On the “/http://localhost:3000/posts” page, fix the Follow button. When
                you click on Follow, it will turn into Unfollow, then it will not go back to follow if
                you click on it again.*/
                <button onClick={() => {
                        let array=[...likedPosts];
                            array = array.filter(function(Inside) {
                             return Inside !== props.id
                             })
                        //console.log(props);
                        console.log(likedPosts); setLikedPosts([likedPosts,...array]);}}>
                        Unfollow </button>
                    /* 1 On the “/http://localhost:3000/posts” page, fix the Follow button. When
              you click on Follow, it will turn into Unfollow, then it will not go back to follow if
              you click on it again.*/
                    :
                    <button onClick={() => { console.log(likedPosts); setLikedPosts([...likedPosts, props.id]) }}>
                        Follow </button>}
        </article>
    );
}

export default Postfollow;
import React, {useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import './Following.css';
import { APIConfig } from '../../store/API-Config';
import {LikedPosts} from "../../store/LikedPosts";



const Following = (props) => {

    const APIs = useContext(APIConfig);
    const postAPI = APIs.postAPI;
    const [show, setVisibility] = useState(false);  // Just for demonstration
    const { likedPosts, setLikedPosts } = useContext(LikedPosts);


    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }

    const [postCall, setPostCall] = useState({});
    const [renderedId, setRenderedId] = useState(null);
    const [RenderedTitle, setRenderedTitle] = useState(null);



    useEffect(() => {
        setRenderedId(props.match.params.id);

    }, []);

    useEffect(() => {
        if (renderedId !== props.match.params.id) {
            axios(postAPI + props.match.params.id, { headers })
                .then(response => {
                    setPostCall(response.data);
                    setRenderedId(props.match.params.id);
                    console.log('This wont get called again ');
                })
        }
        return () =>{
            console.log('post was calling DataBase')
        };
    }, [props]);  // if I leave this empty here, it will update twice.



    let post = <p style={{ justifyContent: 'space-around' }}></p>;
    console.log("id: "+likedPosts)

// 4 question

    if (props.match.params.id == likedPosts ) {
        post = (

            <div className="FullPost">
                <div><br/></div><h1> Post : {postCall.title}</h1><div><br/></div>

                <div><br/></div><p> Content :{postCall.content}</p><div><br/></div>

                <div className="flex">

                    <div className="delete">

                       {/* 5- On the page “/http://localhost:3000/following”, the user could also
                        unfollow a post from the Following component page where it should not show the
                        post after unfollowing. Hint: The page should update after unfollowing a post.
                        */}


                        <button onClick={() => {
                            let array=[...likedPosts];
                            array = array.filter(function(Inside) {
                                return Inside !== props.id
                            })
                            console.log(likedPosts); setLikedPosts([likedPosts,...array]);
                            history.go(0)
                        }}>
                            Unfollow </button>

                        {/*5- On the page “/http://localhost:3000/following”, the user could also
                        unfollow a post from the Following component page where it should not show the
                        post after unfollowing. Hint: The page should update after unfollowing a post.
                        */}

                    </div>


                </div>
                <br/><br/>
                <br/><br/>



                <br/><br/>
                <br/><br/>
            </div>
        );
    }


    return post;
}

export default Following;
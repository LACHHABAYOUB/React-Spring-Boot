import React, {useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import './FullPost.css';
import { APIConfig } from '../../store/API-Config';


const FullPost = (props) => {

    const APIs = useContext(APIConfig);
    const postAPI = APIs.postAPI;
    const [show, setVisibility] = useState(false);  // Just for demonstration

    const newPostForm = useRef();

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }

    const [postCall, setPostCall] = useState({});
    const [renderedId, setRenderedId] = useState(null);
    const [RenderedTitle, setRenderedTitle] = useState(null);

    const newPutForm = useRef();


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



 /* 2  When you delete a post, it should also be removed from the list of followed posts
    (likedPosts).
*/

        const deletePost = () => {
        axios.delete(postAPI + props.match.params.id, { headers })
            .then(response => {
                props.history.push('/');
                console.log(response);
            });
    };
        /*
    2 When you delete a post, it should also be removed from the list of followed posts
    (likedPosts).*/

    console.log("testEdit")
    console.log(postCall)
    console.log(props.match.params.id)
    const editPost = () => {


        const form = newPostForm.current
        const data = { id:props.match.params.id,
                       title: form['title'].value,
                       content: form['content'].value,
                       author: form['author'].value };

        console.log(data);
        axios.put(postAPI, data)
            .then(data => {
                console.log('Success:', data);
                history.go(0);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    };

    let post = <p style={{ justifyContent: 'space-around' }}> Please select a Post!</p>;
    if (props.match.params.id != null) {
        post = (
            <div className="FullPost">
                <div><br/></div><h1> Post : {postCall.title}</h1><div><br/></div>

                <div><br/></div><p> Content :{postCall.content}</p><div><br/></div>

                <div className="flex">

                    <div className="edit">
                        <button onClick={() => setVisibility(!show)}> Edit Post</button>

{/*
                        <button onClick={editPost} >Edit post </button>
*/}
                    </div>

                    <div className="delete">
                        <button onClick={deletePost} >Delete Post</button>
                    </div>


                </div>
                <br/><br/>
                <br/><br/>
                {/*  Edit Form*/}
                    <div>
                        {show &&
                        <div className="NewPost">
                            <form ref={newPostForm}>
                                <h1>Edit Post</h1>
                                <label>Title</label>
                                 <input type="text" label={'title'} name={'title'} placeholder={postCall.title} />

                                  <label>Content</label>
                                  <textarea  rows="4" label={'content'} name={'content'} placeholder={postCall.content} />

                                 <label>Author</label>
                                 <select label={'author'} name={'author'} >
                                     <option value=""> </option>
                                      <option value="Ayoub">Ayoub</option>
                                      <option value="Lachhab">Lachhab</option>
                                  </select>
                             </form>
                             <div><br/></div>
                        <button onClick={editPost} >Edit post </button><br/><br/>

                    </div>

                    }
                </div>
                {/*  Edit Form*/}



                <br/><br/>
                <br/><br/>
            </div>
        );
    }


    return post;
}

export default FullPost;
import React, { useContext, useEffect, useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import './Followings.css';
import { Link, Route } from 'react-router-dom';
import FullPost from '../../components/FullPost/FullPost';
import { APIConfig } from '../../store/API-Config';
import Following from "../../components/Following/Following";
import {LikedPosts} from "../../store/LikedPosts";
import Blog from "../Blog/Blog";
import Postfollow from "../../components/PostFollow/Postfollow";


const Followings = (props) => {

    const APIs = useContext(APIConfig);
    const postAPI = APIs.postAPI;

    //=================EXPLANATION====================
    const [value, setValue] = useState(0);  // click button , sends textInput
    const [textInput, setTextInput] = useState(0);  // synced input field

    const [count, setCount] = useState(0);
    //=================EXPLANATION====================
    const { likedPosts, setLikedPosts } = useContext(LikedPosts);

    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(false); // indicates that is retreiving data
    const [error, setError] = useState();
    const [selectedId, setSelectedId] = useState(null);
    const [show, setVisibility] = useState(false);  // Just for demonstration
    const [incrementValue , setIncrementValue] = useState(1);


    //=================NEW COMPONENT DECLARATION====================
    const [user, setUser] = useState("");
    useEffect(() => {
        const  insideComp = localStorage.getItem("user");
        if (insideComp) {
            setUser(insideComp);
        }
    }, []);

    //=================NEW COMPONENT DECLARATION====================

    function fetchPostsHandler() {
        const headers = {
            'Access-Control-Allow-Origin': '*',

        }
        setLoading(true);
        setError(null); // this is to set the error to null, if there were any previous errors existing
        //console.log(isLoading);
        axios(postAPI, { headers })
            .then(response => {
                setPosts(response.data);
                console.log(response.data)
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })

    }

    useEffect(fetchPostsHandler, []); // This will be fetched when mounted

    const postSelectedHandler = (id) => {
        setSelectedId(id)
    }


    // JUST FOR EXPLNATION ==================================

    function expensiveComputation(num) {
        console.log('Computation done!  ' + num * 10);
    };

    const computeHandler = useMemo(() => {
        return expensiveComputation();
    }, [value]);
    // JUST FOR EXPLNATION  ==================================

    const incr = () => {
        setCount(count + 1);
    }

    const increment = useCallback(() => {
        setCount(c=> c + incrementValue);

    }, [incrementValue]);



    // JUST FOR EXPLNATION  ==================================

    // We can do this rather than this :: <Post title={{...posts[1]}.title} />
    const rposts = posts.map(post => {
        return <Link to={props.match.url + '/' + post.id} key={post.id}>
            <Postfollow
                title={post.title}
                author={post.author}
                clicked={() => { postSelectedHandler(post.id) }}
                id={post.id} />
        </Link>
    });

    let content = <p >No Follow posts available</p>;
    if (rposts.length > 0) {
        content = rposts;
    }
    else if (error) {
        content = <p>{error}</p>;
    }
    else if (isLoading) {
        content = <p> Loading ... </p>;  // BONUS MAKE THIS WAIT FOR A 30 seconds
    }

    console.log("final"+likedPosts)
    return (
        <div>


            {/* Display Post*/}


            <section className="Posts">
                {content}
                <small> Try to follow one and click on it and click on others only followed
                    who display you can try unfollow its work fine</small>

            </section>

               {/* Display All Full Post*/}
            <Route path={props.match.url + '/:id'} component={Following} />

        </div>

    );
}

export default Followings;

/*Add a component called Following that will show all the followed posts which will
be mounted by itself as if it’s another page on
“/http://localhost:3000/following”. This page should only show the
posts that are followed. You may make a sub-component if necessary*/

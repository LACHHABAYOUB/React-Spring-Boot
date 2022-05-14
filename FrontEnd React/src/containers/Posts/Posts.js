import React, { useContext, useEffect, useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import './Posts.css';
import { Link, Route } from 'react-router-dom';
import FullPost from '../../components/FullPost/FullPost';
import { APIConfig } from '../../store/API-Config';
import { Test } from './Test';


const Posts = (props) => {

    const APIs = useContext(APIConfig);
    const postAPI = APIs.postAPI;

    //=================EXPLANATION====================
    const [value, setValue] = useState(0);  // click button , sends textInput
    const [textInput, setTextInput] = useState(0);  // synced input field

    const [count, setCount] = useState(0);
    //=================EXPLANATION====================

    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(false); // indicates that is retreiving data
    const [error, setError] = useState();
    const [selectedId, setSelectedId] = useState(null);
    const [show, setVisibility] = useState(false);  // Just for demonstration
    const [incrementValue , setIncrementValue] = useState(1);


    //=================NEW COMPONENT DECLARATION====================
    const [user, setUser] = useState("");
    const [theuser, settheUser] = useState("");

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
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })

    }

    useEffect(fetchPostsHandler, []); // This will be fetched when mounted

    const postSelectedHandler = (id) => {
        setSelectedId(id);
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
            <Post
                title={post.title}
                author={post.author}
                clicked={() => { postSelectedHandler(post.id) }}
                id={post.id} />
        </Link>
    });

    let content = <p >No posts available</p>;
    if (rposts.length > 0) {
        content = rposts;
    }
    else if (error) {
        content = <p>{error}</p>;
    }
    else if (isLoading) {
        content = <p> Loading ... </p>;  // BONUS MAKE THIS WAIT FOR A 30 seconds
    }

    const [thevalue, setthevalue] = useState("");

    const handleSubmithome = async e => {
        e.preventDefault();
        const theuser = { thevalue };
        settheUser(thevalue)
        localStorage.setItem('theuser', thevalue)

    };

    return (
        <div>


            <form onSubmit={handleSubmithome} className="NewComponent">
                <br/><br/>
                <h2>Put Your Statuts</h2>
                <br/><br/>
                <input
                    type="text"
                    value={thevalue }
                    onChange={({ target }) => setthevalue(target.value)}
                />
                <br/><br/>
                <button type="submit">Update  Status  </button>


            </form>


            {/*display Bonus Question */}

            <div className="newcomponent"> Status for this page  : {theuser} </div>

            <br/><br/><br/>

            <div className="newcomponent"> Status from other page (Bonus )  : {user} </div>

            {/* <h1 className="center">{user} </h1>*/}


            {/*display All hook button*/}
            <div><br/><br/></div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div>
                    {show && <label> Secret Text <br/> Hello Lachhab </label>}
                    {/* {show ?<label> SECRET TEXT</label> : null} */}

                    <button onClick={() => setVisibility(!show)}> Hide/Show</button>
                </div>

                <div>
                    <input type="number" value={textInput}
                           onChange={(event) => setTextInput(parseInt(event.target.value))} />
                    <button onClick={() => setValue(textInput)}> Compute</button>
                    {/* expensiveComputation(textInput) */}
                </div>
                <div>
                    <Test increment={increment} />
                    <div>count: {count}</div>
                 {/*    () => setCount(count + 1) */}
                </div>

                <div>
                    <button onClick={() => setCount(count + 1)} > Make it render </button>
                </div>
                <div>
                    <button onClick={() => { setIncrementValue(incrementValue + 5); console.log(incrementValue);
                    }} > Add 5 </button>
                </div>
            </div>
             <div><br/><br/></div>
            <h1 className="center">All Posts</h1>
            <div><br/></div>
                {/*Display All Post*/}
            <section className="Posts">
                {content}
            </section>

               {/* Display All Full Post*/}
            <Route path={props.match.url + '/:id'} component={FullPost} />

        </div>

    );
}

export default Posts;

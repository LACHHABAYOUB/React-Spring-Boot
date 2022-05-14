import React, { useContext, useEffect, useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import User from '../../components/User/User';
import './Users.css';
import { Link, Route } from 'react-router-dom';
import FullPost from '../../components/FullPost/FullPost';
import { APIConfig } from '../../store/API-Config';
import Post from "../../components/Post/Post";
import FullPostUser from "../../components/FullPostUser/FullPostUser";


const Users = (props) => {

    const APIs = useContext(APIConfig);
    const userAPI = APIs.userAPI;

    //=================EXPLANATION====================
    const [value, setValue] = useState(0);  // click button , sends textInput
    const [textInput, setTextInput] = useState(0);  // synced input field

    const [count, setCount] = useState(0);
    //=================EXPLANATION====================

    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false); // indicates that is retreiving data
    const [error, setError] = useState();
    const [selectedId, setSelectedId] = useState(null);
    const [show, setVisibility] = useState(false);  // Just for demonstration

    const [incrementValue , setIncrementValue] = useState(1);

    function fetchPostsHandler() {
        const headers = {
            'Access-Control-Allow-Origin': '*',

        }
        setLoading(true);
        setError(null); // this is to set the error to null, if there were any previous errors existing
        //console.log(isLoading);
        axios(userAPI, { headers })
            .then(response => {
                setUsers(response.data);
                console.log(response.data)
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
    const rusers = users.map(user => {
        return <Link to={props.match.url + '/' + user.id} key={user.id}>
            <User
                id={user.id}
                title={user.title}
                clicked={() => { postSelectedHandler(user.id) }}

            />

        </Link>
    });

    let content = <p >No posts available</p>;
    if (rusers.length > 0) {
        content = rusers;
    }
    else if (error) {
        content = <p>{error}</p>;
    }
    else if (isLoading) {
        content = <p> Loading ... </p>;  // BONUS MAKE THIS WAIT FOR A 30 seconds
    }

    return (
        <div>

            <div><br/></div>
            <h1 className="center">All Users</h1>
            <div><br/></div>

                {/*Display All Users*/}
            <section className="Posts">
                {content}
            </section>

               {/* Display All Full Users and Post*/}
            <Route path={props.match.url + '/:id'} component={FullPostUser} />
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <Route path={props.match.url + '/:id'} component={FullPost} />
            <br/><br/>

        </div>

    );
}

export default Users;

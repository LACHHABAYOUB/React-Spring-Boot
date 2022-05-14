import React, { useState , useEffect  } from 'react';
import './NewComponent.css';
const NewComponent = (props) => {

    const [value, setvalue] = useState("");
    const [user, setUser] = useState()

    const handleSubmit = async e => {
        e.preventDefault();
        const user = { value };
        setUser(user)
        localStorage.setItem('user', value)
        console.log(user);
        props.history.push('/'); 
    };

   /* 3 Add a component called Status on above the posts when we access
        “/http://localhost:3000/posts”. This component should have a text area,
        a label for status, and a button called ‘Update Status’. This should NOT be done by
            applying two-way binding.*/




   /* 6 (Bonus) If the user was writing something on the text area in the Status component
    and another component was mounted (page changed), it should maintain what was
    written in the text area. Remember do not re-render on every key stroke.*/

    return (
        <form onSubmit={handleSubmit} className="NewComponent">
            <br/><br/>
            <h2>Put Your Statuts</h2>
            <br/><br/>
            <textarea
            type="text"
            value={value}
            onChange={({ target }) => setvalue(target.value)}
          />
            <br/><br/>
          <button type="submit">Update  Status  </button>


        </form>


      );
    };
export default NewComponent;

/* 6 (Bonus) If the user was writing something on the text area in the Status component
  and another component was mounted (page changed), it should maintain what was
  written in the text area. Remember do not re-render on every key stroke.*/
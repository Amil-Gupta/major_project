import AuthContext from "context/AuthProvider";
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

function RootPage() {
    // PAGE TO BE USED AS TEMPORARY REDIRECT
    const {setAuth} = useContext(AuthContext);
    useEffect(()=>{
        setAuth({});
    },[]);

    return ( 
        <>
            <h1>
                Hi There! Kindly wait to be redirected to a better-looking page.
            </h1>
            <NavLink to='/login' replace>
                Take Me To One Now!
            </NavLink>
        </>
     );
}

export default RootPage;
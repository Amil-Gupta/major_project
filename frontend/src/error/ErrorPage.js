import AuthContext from "context/AuthProvider";
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = ()=>{
    const {auth, setAuth} = useContext(AuthContext);
    useEffect(()=>{
        setAuth({})
    },[]);
    return ( 
        <>
            <h1>
                Hi There! Looks like we encountered an error!
            </h1>
            <NavLink to='/login' replace>
                Lets go to the login page
            </NavLink>
        </>
    );
}

export default ErrorPage;
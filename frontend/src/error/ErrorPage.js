import AuthContext from "context/AuthProvider";
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = ({error})=>{
    const {setAuth} = useContext(AuthContext);
    useEffect(()=>{
        setAuth({})
    },[setAuth]);
    console.log(error);
    return (
        <>
            <h1>
                Hi There! Looks like we encountered an error :(
            </h1>
            <h1>
                Code: {error?.code}
            </h1>
            <h2>
                {error?.message}
            </h2>
            <NavLink to='/login' replace>
                Lets go to the login page
            </NavLink>
        </>
    );
}

export default ErrorPage;
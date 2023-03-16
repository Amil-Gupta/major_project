import AuthContext from "context/AuthProvider";
import { memo, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

const RootPage = memo(()=>{
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
},
(prevProps, nextProps) => {
    if (prevProps === nextProps) {
      return true;
    }
    return false;
}
)

export default RootPage;
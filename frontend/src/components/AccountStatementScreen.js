import axios from "api/axios";
import AuthContext from "context/AuthProvider";
// import LoadingContext from "context/LoadingProvider";
import StatementContext from "context/StatementProvider";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStyles from "styles/AccountStatementStyles";

// const GET_STATEMENT_URL = '/accounts/statement';

function AccountStatement() {
    const classes = useStyles();

    const { auth, setAuth } = useContext(AuthContext);
    const { statement, setStatement } = useContext(StatementContext);
    // const { loading, setLoading, loadingColor, setLoadingColor } = useContext(LoadingContext);
    const navigate = useNavigate();

    // useEffect(()=>{
        // if(!loading){
            // setLoadingColor('pink');
            // setLoading(true);
            // const getAccountStatement = async()=>{
            //     try{
            //         const token = auth?.token;
            //         const response = await axios.get(
            //             GET_STATEMENT_URL,
            //             {
            //                 headers: {
            //                     Authorization: "Bearer "+token,
            //                 }
            //             }
            //         );
                    // setLoading(false);
                    // setStatement(response?.data);
                    // navigate('/customerConsole', {replace:true});
            //     }catch(err){
            //         if(!err?.response){
            //             alert('No server response');
            //         }else{
            //             alert(err?.response?.data?.message);
            //         }
            //         navigate('/customerConsole', {replace:true});
            //         // setLoading(false);
            //     }
            // }
            // getAccountStatement();
        // }
    // },[]);

    useEffect(()=>{
        console.log(statement);
    },[statement]);

    return (
        <div className={classes.root}>
            
        </div>
    );
}

export default AccountStatement;
import useStyles from "styles/LoginPageStyles";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Grid, Button } from "@mui/material";
import logo from 'assets/logo.svg';
import { useContext, useEffect, useState, useMemo } from "react";
import AuthContext from "context/AuthProvider";
import { BANK_NAME } from "constants/constants";
import { getAccountRequest, loginRequest } from "api/requests";

function LoginPage() {
    const classes = useStyles();
    const navigate = useNavigate();

    // console.log(useContext(AuthContext));

    const { auth, setAuth } = useContext(AuthContext);

    const [accountId, setAccountId] = useState('');
    const [password, setPassword] = useState('');

    const [passwordErrors, setPasswordErrors] = useState([]);
    const [accountIdErrors, setAccountIdErrors] = useState([]);

    const accountIdErrorComponent = (accountIdErrors.length) ? (
        <ul className={classes.error}>
            {
                accountIdErrors.map((error)=>(
                    <li key={error.code}>
                        {error.message}
                    </li>
                ))
            }
        </ul>
    ) : (<></>);

    const passwordErrorComponent = (passwordErrors.length) ? (
        <ul className={classes.error}>
            {
                passwordErrors.map((error)=>(
                    <li key={error.code}>
                        {error.message}
                    </li>
                ))
            }
        </ul>
    ):(<></>);

    useEffect(()=>{
        const {token} = auth;
        if(token){
            const onSuccess = (response)=>{
                const userdata = response?.data;
                setAuth({...auth, ...userdata});

                if(! userdata?.admin){
                    navigate('/customerConsole', {replace: 'true'});
                }
                else{
                    navigate('/adminConsole', {replace: 'true'});
                }
            }
            getAccountRequest({token, onSuccess}); 
        }
    },[auth, navigate, setAuth]);

    const handleAccountIdUpdate = (e)=>{
        setAccountIdErrors([]);
        const newId = (e.target.value) > 0 ? e.target.value : '';
        setAccountId(newId);
    }
    const handlePasswordUpdate = (e)=>{
        setPasswordErrors([]);
        setPassword(e.target.value);
    }

    const handleLogin = (e)=>{
        e.preventDefault();
        setAccountIdErrors([]);
        setPasswordErrors([]);
        const onError = (error)=>{
            const response = error?.response;
            if(response?.status === 401){
                let {type, message} = response?.data;
                let err = {
                    code: type,
                    message: message
                }
                if(message === 'Kindly Recheck Your Password.'){
                    setPasswordErrors((passwordErrors)=>([...passwordErrors, err]))
                }
                else{
                    setAccountIdErrors((accountIdErrors)=>([...accountIdErrors, err]));
                }
                // alert('Incorrect account no. or password');
            }else if(response?.status === 422){
                let errors = response?.data?.errors;
                if(errors?.length){
                    errors.forEach(err => {
                        console.log(err)
                        if(err.field === 'password'){
                            setPasswordErrors((passwordErrors)=>([...passwordErrors, err]));
                        }
                        else{
                            setAccountIdErrors((accountIdErrors)=>([...accountIdErrors, err]));
                        }
                    });
                }
            }else{
                
            }
        }

        const onSuccess = (response)=>{
            const token = response?.data?.token;
            setAuth({token});
        }

        loginRequest({accountId, password, onError, onSuccess, disableAlertsOnResponse:true});
    }

    const TitleBar = useMemo(()=>{
        return(
            <div className={classes.titleBar}>
                <div className={classes.logoContainer}>
                    <img src={logo} alt='online_bank' className={classes.logo} />
                </div>

                <div className={classes.title}>
                    {BANK_NAME}
                </div>
            </div>
        )
    },[classes]);

    return (
        <div className={classes.root}>
            {/* <button onClick={()=>{
                navigate('customerConsole', {replace: true})
            }}>
                Login
            </button> */}
            <Box className={classes.loginBox} sx={{backgroundColor: 'black'}}>
                <Grid container justifyContent='center' alignItems='center'>
                    <Grid item xs = {12}>
                        {/* <TitleBar /> */}
                        {TitleBar}
                    </Grid>
                    <Grid item xs = {12}>
                        <div className={classes.entry}>
                            <label className={classes.label}>
                                Account No.
                            </label>
                            <input
                            id = 'account_no'
                            type = 'number'
                            className={classes.input}
                            autoComplete='off'
                            onChange={handleAccountIdUpdate}
                            value={accountId}
                            />
                        </div>
                        {
                            accountIdErrorComponent
                        }
                        <div className={classes.entry}>
                            <label className={classes.label}>
                                Password
                            </label>
                            <input
                            id = 'password'
                            type = 'password'
                            className={classes.input}
                            onChange={handlePasswordUpdate}
                            />
                        </div>
                        {
                            passwordErrorComponent
                        }
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                        <Button
                        className={classes.submitButton} 
                        sx={{
                            color: 'white', 
                            backgroundColor: '#4b484c',
                            width: '100%',
                            margin: '1rem 0'
                            }}
                        onClick={handleLogin}
                        disabled={accountIdErrors.length || passwordErrors.length || !accountId.length || !password.length}
                        >
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={12}>
                        <NavLink to='/signup'
                        style={{
                            display: 'block',
                            textAlign:'right',
                            textDecoration: 'none',
                            color: 'lime',
                        }}
                        replace
                        >
                            Don't have an account? Sign Up! &nbsp;
                        </NavLink>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default LoginPage;
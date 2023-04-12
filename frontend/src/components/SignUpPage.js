import useStyles from "styles/SignUpPageStyles";
import { useNavigate, NavLink } from "react-router-dom";
import { Box, Grid, Button } from "@mui/material";
import logo from 'assets/logo.svg';
import { useContext, useEffect, useMemo, useState } from "react";
import AuthContext from "context/AuthProvider";
import axios from "api/axios";
import excludeVariablesFromRoot from "@mui/material/styles/excludeVariablesFromRoot";
import { BANK_NAME } from "constants/constants";

const LOGIN_URL = '/tokens';
const GET_ACCOUNT_URL = '/accounts/detail';
const CREATE_ACCOUNT_URL = '/accounts';

function SignUpPage() {
    const classes = useStyles();
    const navigate = useNavigate();

    // console.log(useContext(AuthContext));

    const { auth, setAuth } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nameErrors, setNameErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const confirmPasswordMatch = (password === confirmPassword) ? true : false;
    
    const nameErrorComponent = (nameErrors.length) ? (
        <ul className={classes.error}>
            {
                nameErrors.map((error)=>(
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

    const confirmPasswordErrorComponent = (confirmPasswordMatch) ? (<></>) : (
        <ul className={classes.error}>
            <li key='mismatchError'>
                passwords must match.
            </li>
        </ul>
    );

    useEffect(()=>{
        const token = auth?.token;
        if(token){
            const loadDataAndRedirect = async()=>{
                const response = await axios.get(
                    GET_ACCOUNT_URL,
                    {
                        headers: {
                            Authorization: "Bearer "+token,
                        }
                    }
                )
                const userdata = response?.data;
                // const {id, admin} = userdata;
                setAuth({...auth, ...userdata});

                navigate('/customerConsole', {replace: 'true'});
            }
            loadDataAndRedirect();
        }
    },[auth]);

    // useEffect(()=>{
    //     console.log(acc, pass)
    // },[acc, pass])

    const handleNameUpdate = (e)=>{
        setNameErrors([]);
        setName(e.target.value);
    }
    const handlePasswordUpdate = (e)=>{
        setPasswordErrors([]);
        setPassword(e.target.value);
    }
    const handleConfirmPasswordUpdate = (e)=>{
        // setPasswordErrors([]);
        setConfirmPassword(e.target.value);
    }

    const handleSignUp = async(e)=>{
        e.preventDefault();

        // console.log(confirmPasswordMatch);

        if(confirmPasswordMatch){
            try{
                const signUpResponse = await axios.post(
                    CREATE_ACCOUNT_URL,
                    JSON.stringify({name, password}),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }
                );
                const accountId = signUpResponse?.data?.id;
                alert(`Account create with id : ${accountId}`);

                const loginResponse = await axios.post(
                    LOGIN_URL,
                    JSON.stringify({accountId, password}),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }
                );

                const token = loginResponse?.data?.token;

                setAuth({token});
            }catch(err){
                const response = err?.response;

                if(!response){
                    alert('No server response');
                } //401 ERROR IS NOT POSSIBLE BECAUSE THE CREDENTIALS HAVE BEEN SET BY THE USER
                else{
                    // console.log(err);
                    const errors = response?.data?.errors;
    
                    // console.log(errors)
    
                    if(errors?.length){
                        errors.forEach(error => {
                            if(error.field === 'name'){
                                setNameErrors((nameErrors)=>([...nameErrors, error]));
                            }
                            else if(error.field === 'password'){
                                setPasswordErrors((passwordErrors)=>([...passwordErrors, error]));
                            }
                        });
                    }
                }

            }
        }
        else{
            alert('Password and Confirm Password do not match');
        }
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
    },[logo]);

    return (
        <div className={classes.root}>
            {/* <button onClick={()=>{
                navigate('customerConsole', {replace: true})
            }}>
                Login
            </button> */}
            <Box className={classes.signUpBox} sx={{backgroundColor: 'black'}}>
                <Grid container justifyContent='center' alignItems='center'>
                    <Grid item xs = {12}>
                        {/* <TitleBar /> */}
                        {TitleBar}
                    </Grid>
                    <Grid item xs = {12}>
                        <div className={classes.entry}>
                            <label className={classes.label}>
                                Full Name
                            </label>
                            <input
                            id = 'full_name'
                            type = 'text' 
                            className={classes.input}
                            autoComplete='off'
                            onChange={handleNameUpdate}
                            />
                        </div>
                        {
                            nameErrorComponent
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
                        <div className={classes.entry}>
                            <label className={classes.label}>
                                Confirm Password
                            </label>
                            <input
                            id = 'confirmPassword'
                            type = 'password'
                            className={classes.input}
                            onChange={handleConfirmPasswordUpdate}
                            />
                        </div>
                        {
                            confirmPasswordErrorComponent
                        }
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                        <Button className={classes.submitButton} 
                        sx={{
                            color: 'white', 
                            backgroundColor: '#4b484c',
                            width: '100%',
                            margin: '1rem 0'
                            }}
                        onClick={handleSignUp}
                        disabled={nameErrors.length || passwordErrors.length || !confirmPasswordMatch || !name.length || !password.length}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={12}>
                        <NavLink to='/login'
                        style={{
                            display: 'block',
                            textAlign:'right',
                            textDecoration: 'none',
                            color: 'lime',
                        }}
                        replace
                        >
                            Already have an account? Log In! &nbsp;
                        </NavLink>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default SignUpPage;
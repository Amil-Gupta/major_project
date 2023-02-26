import useStyles from "styles/LoginPageStyles";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Button } from "@mui/material";
import logo from 'assets/logo.svg';
import { useContext, useEffect, useState } from "react";
import AuthContext from "context/AuthProvider";
import axios from "api/axios";

const LOGIN_URL = '/tokens';

function LoginPage() {
    const classes = useStyles();
    const navigate = useNavigate();

    const setAuth = useContext(AuthContext);

    const [accountId, setAccountId] = useState('');
    const [password, setPassword] = useState('');

    // useEffect(()=>{
    //     console.log(acc, pass)
    // },[acc, pass])

    const handleAccountIdUpdate = (e)=>{
        setAccountId(e.target.value);
    }
    const handlePasswordUpdate = (e)=>{
        setPassword(e.target.value);
    }

    const handleLogin = async(e)=>{
        e.preventDefault();

        try{
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({accountId, password}),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // withCredentials: true
                }    
            )

            console.log(JSON.stringify(response))

            // const token = response?.data?.token;
        }catch(err){
            console.log(err)
        }

        // navigate('/customerConsole', {replace: 'true'});
    }

    const TitleBar = ()=>{
        return(
            <div className={classes.titleBar}>
                <div className={classes.logoContainer}>
                    <img src={logo} alt='online_bank' className={classes.logo} />
                </div>

                <div className={classes.title}>
                    Online Bank
                </div>
            </div>
        )
    }

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
                        <TitleBar />
                    </Grid>
                    <Grid item xs = {12}>
                        <div className={classes.entry}>
                            <label className={classes.label}>
                                Account No.
                            </label>
                            <input
                            id = 'account_no'
                            type = 'text' 
                            className={classes.input}
                            autoComplete='off'
                            onChange={handleAccountIdUpdate}
                            />
                        </div>
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
                        onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
            </Box>
        </div>
    );
}

export default LoginPage;
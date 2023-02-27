import { Grid, Avatar, Popper, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import logo from 'assets/logo.svg';
import useStyles from 'styles/CustomerConsoleStyles';
import { useNavigate } from 'react-router-dom';
import AuthContext from 'context/AuthProvider';
import axios from 'api/axios';
import SelectInput from '@mui/material/Select/SelectInput';

// const GET_ACCOUNT_URL = '/accounts/balance';
function CustomerConsole()
{
    const classes = useStyles();
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(()=>{
        // console.log(auth?.token)
        if(! auth?.token){
            navigate('/login', {replace: true});
        }
    },[]);

    // useEffect(()=>{
    //     const getUser = async()=>{
    //     if(auth?.token){
    //         const token = auth?.token;
    //         const response = await axios.get(
    //             GET_ACCOUNT_URL,
    //             {
    //                 headers: {
    //                     Authorization: "Bearer "+token,
    //                 }
    //             }
    //         )
            // console.log(response);

            //TO TEST THE LOADING... PLACEHOLDER
            // function timeout(delay) {
            //     return new Promise( res => setTimeout(res, delay) );
            // }

            // await timeout(10000)

            // const userdata = response?.data;

            // const {id, admin} = userdata;

    //         setAuth({...auth, ...userdata})
    //     }
    // }
    // getUser();
    // },[]);

    function TitleBar() {
        const {id, admin} = auth;
        const user = (id) ? ((admin) ? `Admin #${id}` : `Customer #${id}`) : 'Loading...';
        const [popperAnchor, setPopperAnchor] = useState(null);
        const popperOpen = Boolean(popperAnchor);
        const popperId = popperOpen ? 'avatarPopper' : undefined;

        const handleAvatarMouseEnterLeave = (e)=>{
            // console.log('enter/leave');
            setPopperAnchor(popperAnchor ? null : e.currentTarget);
        }
        return ( 
            <div className={classes.titleBar}>
                <div className={classes.logoContainer}>
                    <img src={logo} alt='online_bank' className={classes.logo} />
                </div>

                <div className={classes.title}>
                    Online Bank
                </div>

                <div className={classes.avatar}>
                    <IconButton onMouseEnter={handleAvatarMouseEnterLeave} onMouseLeave={handleAvatarMouseEnterLeave}>
                        <Avatar 
                            sx={{ bgcolor: 'black' }}
                        />
                    </IconButton>
                    <Popper id={popperId} open={popperOpen} anchorEl={popperAnchor} >
                        <Box
                            className = {classes.popperBox}
                        >
                            {user}
                        </Box>
                    </Popper>
                </div>
            </div>
        );
    }

    function Body() {
        return (
            <div className={classes.body}>
                
            </div> 
        );
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <TitleBar />
                </Grid>
                <Grid item xs={12}>
                    <Body />
                </Grid>
            </Grid>
        </div> 
    );
}

export default CustomerConsole;
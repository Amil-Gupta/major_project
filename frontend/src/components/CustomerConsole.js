import { Grid, Avatar, Popper, IconButton , Box, Button} from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
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
    },[auth]);

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
        const {id} = auth;
        const user = (id) ? `Customer #${id}` : 'Loading...';
        const [popperAnchor, setPopperAnchor] = useState(null);
        const popperOpen = Boolean(popperAnchor);
        const popperId = popperOpen ? 'avatarPopper' : undefined;

        const avatarRef = useRef(null);
        const popperRef = useRef(null);

        useEffect(()=>{
            const handleClickOutside = (event) => {
                if (avatarRef.current && !avatarRef.current.contains(event.target) && popperRef.current && !popperRef.current.contains(event.target)) {
                    setPopperAnchor(null);
                }
                };
                    document.addEventListener('click', handleClickOutside, true);
                return () => {
                    document.removeEventListener('click', handleClickOutside, true);
                };
        },[]);

        const handleAvatarClick = (e)=>{
            // console.log('enter/leave');
            setPopperAnchor(popperAnchor ? null : e.currentTarget);
        }

        const handleLogout = ()=>{
            // console.log('user logged out');
            setAuth({});
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
                    <IconButton
                        onClick={handleAvatarClick}
                        ref={avatarRef}
                    >
                        <Avatar 
                            sx={{ bgcolor: 'black' }}
                        />
                    </IconButton>
                    <Popper
                        id={popperId}
                        open={popperOpen}
                        anchorEl={popperAnchor}
                        ref={popperRef}
                    >
                        <Box
                            className = {classes.popperBox}
                        >
                            <section className={classes.username}>
                                {user}
                            </section>
                            <Button
                                className={classes.logoutButton}
                                onClick={handleLogout}
                                sx={{
                                    color:'red',
                                    width: '100%',
                                    backgroundColor: 'black',
                                }}
                            >
                                Log Out
                            </Button>
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
import { Grid, Avatar, Popper, IconButton , Box, Button } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import logo from 'assets/logo.svg';
import transferIcon from 'assets/transferIcon.svg';
import useStyles from 'styles/CustomerConsoleStyles';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import AuthContext from 'context/AuthProvider';
import TransferScreen from './TransferScreen';
// import { faInr } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import LoadingOverlay from './LoadingOverlay';
import axios from 'api/axios';

const GET_ACCOUNT_URL = '/accounts/detail';
function CustomerConsole(props)
{
    const classes = useStyles();
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loading,  setLoading] = useState(false);

    useEffect(()=>{
        // console.log(auth?.token)
        if(! auth?.token){
            if(auth?.admin){
                navigate('/adminConsole', {replace: true});
            }
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
        const {name} = auth;
        const [balancePaise, setBalancePaise] = useState(auth?.balancePaise);
        const user = (name) ? name : 'Loading...';
        const balance = (typeof(balancePaise) === 'number') ? (
            <>
                {/* <div> */}
                Balance:&nbsp;
                {/* </div> */}
                {/* <FontAwesomeIcon icon={faInr} size='1x' /> */}
                {/* <div> */}
                ₹{balancePaise / 100}
                {/* </div> */}
            </>
        ):(
            'Loading...'
        );
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

        const handleBannerClick = ()=>{
            navigate('/customerConsole');
        }

        const handleAvatarClick = async(e)=>{
            // console.log('enter/leave');
            const {token} = auth;
            setPopperAnchor(popperAnchor ? null : e.currentTarget);
            const response = await axios.get(
                GET_ACCOUNT_URL,
                {
                    headers: {
                        Authorization: "Bearer "+token,
                    }
                }
            )
            const userdata = response?.data;
            // name = userdata?.name;
            // balancePaise = userdata?.balancePaise;
            setBalancePaise(userdata?.balancePaise);
        }

        const handleLogout = ()=>{
            // console.log('user logged out');
            setAuth({});
        }

        return ( 
            <div className={classes.titleBar}>
                <div className={classes.banner} onClick={handleBannerClick}>
                    <div className={classes.logoContainer}>
                        <img src={logo} alt='online_bank' className={classes.logo} />
                    </div>

                    <div className={classes.title}>
                        Online Bank
                    </div>
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
                            <section className={classes.balance}>
                                {balance}
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
        const OptionButton = (props)=>{
            return(
                <NavLink to={props.route}
                    style={{
                        textDecoration: 'none',
                        color: 'white',
                        // height: '17vw',
                        width: '100%',
                        display: 'block',
                        aspectRatio: '1 / 1',
                        // height: '100%',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                    }}
                    replace
                >
                    <div style={{
                        backgroundImage: `url(${props.icon})`,
                    }} 
                    className={classes.optionButton}
                    id = {props.id}
                    >
                        
                            {props.name}
                    </div>
                </NavLink>
            )
        }

        const Options = ()=>{
            return(
                <div className={classes.options}>
                    <Grid container>
                        <Grid item xs={6} md={2}>
                            <OptionButton name='Transfer Money' icon={transferIcon} id='transferButton' route='transfer'/>
                        </Grid>
                    </Grid>
                </div>
            )
        }

        return (
            <div className={classes.body}>
                <Routes>
                    <Route path='*' element={<Options />}></Route>
                    <Route path='transfer/*' element={<TransferScreen setLoading={props.setLoading} setLoadingColor={props.setLoadingColor} />}></Route>
                </Routes>
            </div> 
        );
    }

    return (
        <div className={classes.root}>
            {/* <LoadingOverlay show={loading} /> */}
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
import useStyles from "styles/AdminConsoleStyles";
import { Grid, Avatar, Popper, IconButton, Box, Button } from '@mui/material';
import { memo, useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, Routes, Route, NavLink } from 'react-router-dom';
import AuthContext from 'context/AuthProvider';
import logo from 'assets/logo.svg';

function AdminConsole() {
    const classes = useStyles();

    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        // console.log(auth?.token)
        if(! auth?.token){
            if(! auth?.admin){
                navigate('/customerConsole', {replace: true});
            }
            navigate('/login', {replace: true});
        }
    },[auth]);

    function TitleBar() {
        const {name} = auth;
        const user = (name) ? name : 'Loading...';
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
            navigate('/adminConsole');
        }

        const handleAvatarClick = (e)=>{
            // console.log('enter/leave');
            setPopperAnchor(popperAnchor ? null : e.currentTarget);
        }

        const handleLogout = ()=>{
            // console.log('admin logged out');
            setAuth({});
        }

        const Banner = memo(()=>{
            return(
                <div className={classes.banner} onClick={handleBannerClick}>
                    <div className={classes.logoContainer}>
                        <img src={logo} alt='online_bank' className={classes.logo} />
                    </div>

                    <div className={classes.title}>
                        Online Bank Administrator
                    </div>
                </div>
            )
        });

        return ( 
            <div className={classes.titleBar}>
                <Banner />

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
                                    backgroundColor: 'black'
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
                        </Grid>
                    </Grid>
                </div>
            )
        }

        return (
            <div className={classes.body}>
                <Routes>
                    <Route path='*' element={<Options />}></Route>
                </Routes>
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

export default AdminConsole;
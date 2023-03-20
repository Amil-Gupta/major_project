import { Grid, Avatar, Popper, IconButton , Box, Button } from '@mui/material';
import { useContext, useEffect, useRef, useState, useMemo } from 'react';
import { logo } from 'assets/assets';
import { transferIcon } from 'assets/assets';
import { accountStatementIcon } from 'assets/assets';
import useStyles from 'styles/CustomerConsoleStyles';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import AuthContext from 'context/AuthProvider';
import TransferScreen from './TransferScreen';
import axios from 'api/axios';
import AccountStatement from 'components/AccountStatement';
import CustomerConsoleProvider from 'context/CustomerConsoleProvider';
import LoadingContext from 'context/LoadingProvider';
import StatementContext from 'context/StatementProvider';

const GET_ACCOUNT_URL = '/accounts/detail';
const GET_STATEMENT_URL = '/accounts/statement';

function CustomerConsole()
{
    const classes = useStyles();
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { loading, setLoading, loadingColor, setLoadingColor } = useContext(LoadingContext);

    const handleBannerClick = ()=>{
        navigate('/customerConsole', {replace: true});
    }

    const Banner = useMemo(()=>{
        return(
            <div className={classes.banner} onClick={handleBannerClick}>
                <div className={classes.logoContainer}>
                    <img src={logo} alt='online_bank' className={classes.logo} />
                </div>

                <div className={classes.title}>
                    Online Bank
                </div>
            </div>
        )
    },[]);

    useEffect(()=>{
        // console.log(auth?.token)
        if(! auth?.token){
            if(auth?.admin){
                navigate('/adminConsole', {replace: true});
            }
            navigate('/login', {replace: true});
        }
    },[auth]);

    const TitleBar = ()=>{
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
                {/* <Banner /> */}
                {Banner}

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
        const { statement, setStatement } = useContext(StatementContext);
        const handleStatementFetch = async(e)=>{
            // console.log('click')
            // e.preventDefault();
            setLoading(true);
            setLoadingColor('pink');
            try{
                const token = auth?.token;
                const response = await axios.get(
                    GET_STATEMENT_URL,
                    {
                        headers: {
                            Authorization: "Bearer "+token,
                        }
                    }
                );
                setLoading(false);
                setStatement(response?.data);
                navigate('statement', {replace:true});
            }catch(err){
                if(!err?.response){
                    alert('No server response');
                }else{
                    alert(err?.response?.data?.message ?? 'An error occured.');
                }
                navigate('/customerConsole', {replace:true});
                setLoading(false);
            }
        }
        const OptionButton = (props)=>{
            // const icon = useMemo(()=>(`url(${props.icon})`),[]);
            const icon = `url(${props.icon})`;
            return(
                <NavLink to={props.route}
                    style={{
                        textDecoration: 'none',
                        color: 'white',
                        width: '100%',
                        display: 'block',
                        aspectRatio: '1 / 1',
                    }}
                    replace
                >
                    <div style={{
                        backgroundImage: icon,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                    }} 
                    className={classes.optionButton}
                    onClick={props.onClick}
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
                            <OptionButton name='Money Transfer' icon={transferIcon} id='transferButton' route='transfer'/>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <OptionButton name='Account Statement' icon={accountStatementIcon} id='accountStatementButton' route='statement' onClick={handleStatementFetch} />
                        </Grid>
                    </Grid>
                </div>
            )
        }

        return (
            <div className={classes.body}>
                <Routes>
                    <Route path='*' element={<Options />} />
                    <Route path='transfer/*' element={<TransferScreen />} />
                    <Route path='statement/*' element={<AccountStatement />} />
                </Routes>
            </div> 
        );
    }

    return (
        <CustomerConsoleProvider>
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
        </CustomerConsoleProvider>
            
    );
}

export default CustomerConsole;
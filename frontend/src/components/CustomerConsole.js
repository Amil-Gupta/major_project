import { Grid, Avatar, Popper, IconButton , Box, Button } from '@mui/material';
import { useContext, useEffect, useRef, useState, useMemo } from 'react';
import { loanEligibilityIcon, logo } from 'assets/assets';
import { transferIcon } from 'assets/assets';
import { accountStatementIcon } from 'assets/assets';
import useStyles from 'styles/CustomerConsoleStyles';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import AuthContext from 'context/AuthProvider';
import TransferScreen from 'components/TransferScreen';
import AccountStatement from 'components/AccountStatement';
import CustomerConsoleProvider from 'context/CustomerConsoleProvider';
import LoadingContext from 'context/LoadingProvider';
import StatementContext from 'context/StatementProvider';
import CreditScoreChecker from 'components/CreditScoreChecker';
import { BANK_NAME } from 'constants/constants';
import Profile from 'components/Profile';
import { getAccountRequest, getStatementRequest } from 'api/requests';

function CustomerConsole()
{
    const classes = useStyles();
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { setLoading, setLoadingColor } = useContext(LoadingContext);

    const Banner = useMemo(()=>{
        const handleBannerClick = ()=>{
            navigate('/customerConsole', {replace: true});
        }
        return(
            <div className={classes.banner} onClick={handleBannerClick}>
                <div className={classes.logoContainer}>
                    <img src={logo} alt='online_bank' className={classes.logo} />
                </div>

                <div className={classes.title}>
                    {BANK_NAME}
                </div>
            </div>
        )
    },[classes, navigate]);

    useEffect(()=>{
        // TO TEST ERROR BOUNDARY
        // const error = new Error('test error');
        // error.status = 0;
        // throw error;
        
        // console.log(auth?.token)
        if(! auth?.token){
            navigate('/login', {replace: true});
        }
        if(auth?.admin){
            navigate('/adminConsole', {replace: true});
        }
    },[auth, navigate]);

    const TitleBar = ()=>{
        const {name} = auth;
        const user = (name) ? name : 'Loading...';

        // CODE TO DISPLAY BALANCE IN POPUP
        // const [balancePaise, setBalancePaise] = useState(auth?.balancePaise);
        // const balance = (typeof(balancePaise) === 'number') ? (
        //     <>
        //         {/* <div> */}
        //         Balance:&nbsp;
        //         {/* </div> */}
        //         {/* <FontAwesomeIcon icon={faInr} size='1x' /> */}
        //         {/* <div> */}
        //         ₹{balancePaise / 100}
        //         {/* </div> */}
        //     </>
        // ):(
        //     'Loading...'
        // );

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
            setPopperAnchor(popperAnchor ? null : e.currentTarget);

            // CODE TO DISPLAY BALANCE IN POPUP
            // const {token} = auth;
            // const response = await getAccount({token})
            // const userdata = response?.data;
            // name = userdata?.name;
            // balancePaise = userdata?.balancePaise;
            // setBalancePaise(userdata?.balancePaise);

        }

        const handleProfileDisplay = ()=>{
            setLoadingColor('skyblue');
            setLoading(true);
            const {token} = auth;
            const onError = (error)=>{
                if(error?.response?.status === 401){
                    alert('Authorization expired. Please login again.');
                    setAuth({});
                    setLoading(false);
                    navigate('/login',{replace:true});
                }
                
                setLoading(false);
            }
            const onSuccess = (response)=>{
                const userdata = response?.data;
                setAuth((auth)=>({...auth, ...userdata}));
                navigate('profile', {replace:true});
                setLoading(false);
            }

            getAccountRequest({token, onError, onSuccess});
        }

        const handleLogout = ()=>{
            // console.log('user logged out');
            setAuth({});

            // PREVENTS LATENCY ON LOGOUT DUE TO CONTEXT UPDATE
            navigate('/login', {replace:true});
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

                            {/* CODE TO DISPLAY BALANCE IN POPUP */}
                            {/* <section className={classes.balance}>
                                {balance}
                            </section> */}

                            <Button
                                className={classes.popperButton}
                                onClick={handleProfileDisplay}
                                sx={{
                                    color:'mediumspringgreen',
                                    width: '100%',
                                    backgroundColor: 'black',
                                    margin: '.1rem',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}
                            >
                                Profile
                            </Button>

                            <Button
                                className={classes.popperButton}
                                onClick={handleLogout}
                                sx={{
                                    color:'darkred',
                                    width: '100%',
                                    backgroundColor: 'aliceblue',
                                    margin: '.1rem',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
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
        const { setStatement } = useContext(StatementContext);
        const handleStatementFetch = (e)=>{
            // console.log('click')
            // e.preventDefault();
            setLoading(true);
            setLoadingColor('pink');
            const token = auth?.token;
            const onError = (error)=>{
                if(error?.response?.status === 401){
                    alert('Authorization expired. Please login again.');
                    setAuth({});
                    setLoading(false);
                    navigate('/login',{replace:true});
                }
                else{
                    navigate('/customerConsole', {replace:true});
                }
                setLoading(false);
            }
            const onSuccess = (response)=>{
                setLoading(false);
                setStatement(response?.data);
            }

            getStatementRequest({token, onError, onSuccess, disableAlertsOnResponse:true});
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
                        <Grid item xs={6} md={2}>
                            <OptionButton name='Loan Eligibility' icon={loanEligibilityIcon} id='loanEligibilityButton' route='loanEligibility' />
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
                    <Route path='loanEligibility/*' element={<CreditScoreChecker />} />
                    <Route path='profile/*' element={<Profile bgcolor='skyblue' color='blue' />} />
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
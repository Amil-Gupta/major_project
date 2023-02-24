import { Grid, Avatar } from '@mui/material';
import logo from '../assets/logo.svg';
import useStyles from './styles/CustomerConsoleStyles';

function CustomerConsole()
{
    const classes = useStyles();

    function TitleBar() {
        return ( 
            <div className={classes.titleBar}>
                <div className={classes.logoContainer}>
                    <img src={logo} alt='online_bank' className={classes.logo} />
                </div>

                <div className={classes.title}>
                    Online Bank
                </div>

                <div className={classes.avatar}>
                    <Avatar sx={{ bgcolor: 'black' }} />
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
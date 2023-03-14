import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme)=>({
    logoContainer: {
        // backgroundColor: 'red'
    },

    logo: {
        width: '3rem',
        padding: '.5rem',
    },
      
    titleBar: {
        background: 'linear-gradient(45deg, red, magenta, blue)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 .5rem',
        height: '10vh',
        // justifyContent: 'center',
    },
        
    title: {
        fontSize: '1.5rem',
        padding: '.5rem',
        color: 'aliceblue',
    },

    avatar: {
        marginLeft: 'auto',
    },

    popperBox: {
        backgroundColor: '#666263',
        padding: '.3rem',
        border: '.2vw solid black',
        borderRadius: '1vh',
        color: 'aliceblue',
    },

    username: {
        textAlign: 'center'
    },

    // logoutButton: {
    //     backgroundColor: 'black',
    // },

    body: {
        // backgroundImage: `url(${handshake})`,
        // backgroundPosition: 'center', 
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: '25vh',
        backgroundColor: '#2a2b2a',
        height: '90vh',
        overflowY: 'auto',
    },
}));

export default useStyles;
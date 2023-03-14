import { makeStyles } from '@mui/styles';
// import handshake from '../../assets/handshake.svg';

const useStyles = makeStyles((theme) =>
  ({
    logoContainer: {
        // backgroundColor: 'red'
    },

    logo: {
        width: '3rem',
        padding: '.5rem',
    },
      
    titleBar: {
        background: 'linear-gradient(45deg, violet, blue, orange)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 .5rem',
        height: '10vh',
        // justifyContent: 'center',
    },

    banner: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        // width: '100%'
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
    //     backgroundColor: 'black'
    // },

    body: {
        backgroundColor: '#2a2b2a',
        height: '90vh',
        padding: '1rem',
        overflowY: 'auto',
    },

    optionButton: {
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: 'bolder',
        textAlign: 'center',
        backgroundColor: 'black',
        backgroundSize: 'contain',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '2vw',
        border: '.5px solid white',
        margin: '.5rem',
    }
  }),
);

export default useStyles;
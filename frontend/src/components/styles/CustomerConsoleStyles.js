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
        
    title: {
        fontSize: '2rem',
        padding: '.5rem',
        color: 'aliceblue',
    },

    avatar: {
        marginLeft: 'auto',
    },

    body: {
        // backgroundImage: `url(${handshake})`,
        // backgroundPosition: 'center', 
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: '25vh',
        backgroundColor: '#2a2b2a',
        height: '90vh',
    },
  }),
);

export default useStyles;
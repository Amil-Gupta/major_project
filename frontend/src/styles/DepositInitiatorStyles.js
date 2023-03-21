import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme)=>({
    root:{
        display: 'flex',
        justifyContent: 'center',
    },

    customerCard: {
        position: 'absolute',
        top: '50%',
        msTransform: 'translateY(-50%)',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(darkslategrey, black, darkslategrey)',
        borderRadius: '1rem',
        boxShadow: '0 0 .5rem greenyellow',
        margin: '.5rem',
    },

    heading: {
        fontWeight: 'bolder',
        fontSize: '1.7rem',
        color: 'lightslategrey',
    },

    avatarContainer: {
        display: 'flex',
        aspectRatio: '1 / 1',
        height: '40vh',
        justifyContent: 'center',
        alignItems: 'center',
    },

    depositFormContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    depositForm: {
        borderRadius: '1rem',
        padding: '1rem'
    },

    entry: {
        display: 'flex',
        margin: '.5rem 0'
    },

    label: {
        backgroundColor: 'beige',
        margin: '.5% 2%',
        padding: '.5rem',
        borderRadius: '1rem',
        width: '15rem',
        textAlign: 'center',
        fontWeight: 'bolder'
    },

    input: {
        background: 'transparent',
        color: 'limegreen',
        // backgroundColor: 'white',
        padding: '.5rem',
        margin: '.5% 2%',
        width: '100%',
        borderRadius: '1rem',
        fontWeight: 'bold',
        textAlign: 'center',

        '&::-webkit-outer-spin-button':{
            WebkitAppearance: 'none'
        },

        '&::-webkit-inner-spin-button':{
            WebkitAppearance: 'none'
        },

        MozAppearance: 'textfield',
    },
}));

export default useStyles;
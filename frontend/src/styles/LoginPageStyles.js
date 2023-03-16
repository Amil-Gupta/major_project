import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme)=>({
    root: {
        display: 'flex',
        // backgroundColor: '#2a2b2a',
        // backgroundImage: 'radial-gradient(white, aliceblue, grey, silver)',
        backgroundImage: 'radial-gradient(cyan, dodgerblue, teal)',
        height: '100vh',
        width: '100vw',
    },

    loginBox: {
        margin: 'auto',
        borderRadius: '1rem',
        padding: '0 0 1rem 0',
        width: 'max(20rem, 30vw)',
        boxShadow: '0 0 .5rem crimson'
    },

    titleBar: {
        background: 'linear-gradient(45deg, violet, blue, orange)',
        display: 'flex',
        alignItems: 'center',
        padding: '2.5rem 7vw',
        height: '10vh',
        justifyContent: 'center',
        borderRadius: '1rem 1rem 0 0',
        margin: '0 0 2rem 0'
    },

    logo: {
        width: '3rem',
        // padding: '.5rem',
    },

    title: {
        fontSize: '2rem',
        padding: '.5rem',
        color: 'aliceblue',
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
        backgroundColor: 'white',
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

    submitButton: {
        
    },

    error: {
        color: 'green',
        display: 'block'
    }
}));

export default useStyles;
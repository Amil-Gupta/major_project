import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme)=>({
    userInfo: {
        backgroundImage: 'linear-gradient(darkslategrey, black, darkslategrey)',
        color: 'white',
        borderRadius: '3rem',
        height: '100%',
        margin: '1rem',
        textAlign: 'center',
    },

    heading: {
        fontWeight: 'bolder',
        fontSize: '1.7rem',
        color: 'lightslategrey',
    },

    avatarContainer: {
        display: 'flex',
        aspectRatio: '1 / 1',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    details: {
        // textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '.5rem',
        fontWeight: 'bold',
        fontSize: '1.5rem',
    },

    transferFormContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
    },

    transferForm: {
        // height: '50%',
        // margin: 'auto auto',
        // transform: 'translateY(50%)',
        backgroundColor: 'black',
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
}));

export default useStyles;
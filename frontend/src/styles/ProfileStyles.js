import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme)=>({
    avatarContainer: {
        display: 'flex',
        aspectRatio: '1 / 1',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsAndFunctionalities: {
        // backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: 'white',
    },
    entry: {
        display: 'flex',
        margin: '.5rem 0'
    },
    label: {
        backgroundColor: 'black',
        margin: '.5% 2%',
        padding: '.5rem',
        borderRadius: '1rem',
        width: '15rem',
        textAlign: 'center',
        fontWeight: 'bolder',
        fontSize: '1.3rem',
    },
    value: {
        display: 'flex',
        backgroundColor: 'darkslategray',
        padding: '.5rem',
        margin: '.5% 2%',
        width: '95%',
        borderRadius: '1rem',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: '1.3rem',
    },
    input: {
        padding: '.5rem',
        margin: '.5% 2%',
        width: '95%',
        borderRadius: '1rem',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '1.3rem',
    },
    error: {
        color: 'green',
        display: 'block'
    },
    changePasswordButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    formToggleButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    balanceRefreshButton: {
        marginLeft: 'auto',
        fontWeight: 'bolder',
        cursor: 'pointer',
        padding: ' 0 .5rem',
        backgroundColor: 'olivedrab',
        borderRadius: '50%',

        '&:hover': {
            backgroundColor: 'green',
        },

        '&:active': {
            transform: 'rotate(1800deg)',
            transition: 'transform 1s linear',
        }
    }
}));

export default useStyles;
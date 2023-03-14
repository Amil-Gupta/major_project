import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme)=>({
    root:{
        // display: 'flex',
        // flexDirection: 'column',
        color: 'white',
        textAlign: 'center',
        fontSize: '1.5rem',
        // overflowY: 'auto',
        // height: '100%',
    },
    heading:{
        backgroundColor: 'black',
        color: 'green',
        fontSize: '2rem',
        // border: '.1rem solid grey',
        borderRadius: '1rem',
        boxShadow: '0 0 .5rem grey',
    },
    amount: {
        color: 'indigo',
        fontSize: '3rem',
    },
    detailsHeading:{
        backgroundColor: 'grey',
        border: '.2rem solid silver'
    },
    label:{
        backgroundColor: 'darkslategrey',
        padding: '1rem',
    },
    value:{
        backgroundColor: 'lightslategrey',
        padding: '1rem',
    },
    // okButton:{
    //     color: 'greenyellow',
    //     backgroundColor: 'green',
    //     margin: '.5rem 0',
    // },
}));

export default useStyles;
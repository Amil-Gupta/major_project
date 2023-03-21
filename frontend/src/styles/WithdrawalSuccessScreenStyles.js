import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme)=>({
    root:{
        color: 'white',
        textAlign: 'center',
        fontSize: '1.5rem',
    },
    heading:{
        backgroundColor: 'black',
        color: 'pink',
        fontSize: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 0 .5rem grey',
    },
    amount: {
        color: 'royalblue',
        fontSize: '3rem',
    },
    detailsHeading:{
        backgroundColor: 'dimgrey',
        fontWeight: 'bold',
        border: '.2rem solid silver',
    },
    label:{
        backgroundColor: 'darkslategrey',
        padding: '1rem',
        border: '.05rem solid black',
    },
    value:{
        backgroundColor: 'grey',
        padding: '1rem',
        border: '.05rem solid black',
    },
}));

export default useStyles;
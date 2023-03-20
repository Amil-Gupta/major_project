import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme)=>({
    gridContainer: {
        height: '70vh',
        // backgroundColor: 'black',
        // color: 'white',
        '& .MuiButtonBase-root':{
            color: 'white'
        },
    },

    typeIconContainer: {
        height: '100%'
    },

    typeIcon: {
        fit: 'contain',
        height: '100%',
    },
}));

export default useStyles;
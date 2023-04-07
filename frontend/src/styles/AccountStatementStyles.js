import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme)=>({
    header: {
        color: 'black',
        backgroundColor: 'grey',
        fontSize: '1.5rem',
        fontWeight: 'bolder',
    },
    heading: {
        textAlign: 'center',
        border: '.1rem solid black',
    },
    gridContainer: {
        height: '65vh',
        // backgroundColor: 'black',
        // color: 'white',
        '& .MuiButtonBase-root':{
            color: 'white'
        },
        '& .MuiTablePagination-toolbar':{
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
        }
    },

    typeIconContainer: {
        height: '100%',
    },

    typeIcon: {
        fit: 'contain',
        height: '100%',
    },

    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

export default useStyles;
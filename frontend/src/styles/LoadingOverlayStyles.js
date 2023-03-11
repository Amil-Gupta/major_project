import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme)=>({
    show:{
        position: 'absolute',
        display: 'flex',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '10',
        margin: '0',
    },
    hide:{
        display: 'none',
    },
}));

export default useStyles;
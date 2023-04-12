import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme)=>({
    label:{
        color: 'white',
        fontSize: '1.5rem',
    },
    input: {
        backgroundColor: 'white',
        padding: '.5rem',
        width: '100%',
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
    eligibilityTable: {
        color: 'whitesmoke',
        fontSize: '1.5rem',
    },
    rating: {
        color: 'green',
        fontSize: '3rem',
    },
    tableHeading: {
        backgroundColor: 'sienna',
        padding: '.3rem',
        border: '.1rem solid brown',
    },
    type: {
        backgroundColor: 'sandybrown',
        padding: '.2rem',
        border: '.1rem solid salmon',
    },
    subtype: {
        backgroundColor: 'rosybrown',
        padding: '.2rem',
        border: '.1rem solid sienna',
    },
    categoryRow: {
        backgroundColor: 'darkslategrey',
        padding: '.2rem',
        border: '.1rem solid green',
        '&:empty':{
            backgroundColor: 'green',
        }
    },
    tooltip: {
        fontSize: '1rem',
    },
    hoverTapSuggestion: {
        color: 'white',
    },
}));

export default useStyles;
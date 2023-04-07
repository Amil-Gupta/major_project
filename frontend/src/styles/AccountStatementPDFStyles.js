import { StyleSheet } from '@react-pdf/renderer';

const pdfStyles = StyleSheet.create({
    body: {
        padding: '0 1.5mm',
    },
    banner: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logo: {
        height: '1cm',
        width: '100%',
    },
    bankName:{
        textAlign: 'center',
    },
    info: {
        padding: '1mm',
        fontSize: '5mm',
    },
    tableHeading: {
        textAlign: 'center',
        fontSize: '5mm',
        padding: '1mm',
    },
    tableHeaderCell: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default pdfStyles;
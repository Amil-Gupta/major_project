//Loan eligibility
// 0: Not eligible 
// 1: High Interest With Collateral
// 2: High Interest Without Collateral Upto 9 lakhs, Moderate Interest With Collateral above 9 lakhs
// 3: Moderate Interest Without Collateral Upto 9 lakhs, Low Interest With Collateral above 9 lakhs
// 4: Moderate Interest Without Collateral Upto 12 lakhs, Low Interest With Collateral above 12 lakhs

const crediScoreEligibilityChecker = (creditScore)=>{
    let result = {};
    const high = 12.5;
    const moderate = 9.5;
    const low = 7.5;
    const referenceKey = [
        'Not eligible',
        `${high}% Interest With Collateral`,
        `${high}% Interest Without Collateral Upto 9 Lakhs, ${moderate}% Interest With Collateral Above 9 Lakhs`,
        `${moderate}% Interest Without Collateral Upto 9 Lakhs, ${low}% Interest With Collateral Above 9 Lakhs`,
        `${moderate}% Interest Without Collateral Upto 12 Lakhs, ${low}% Interest With Collateral Above 12 Lakhs`,
    ];
    if(creditScore < 300){
        const rating = 'Very Bad';
        const loanEligibility = {
            'student1': 2, //student in tier 1 college
            'student2': 1, //student in tier 2 college
            'student3': 0, //student in tier 3 college
            'personal': 0, //personal loan
            'auto': 0, //auto/car loan
            'business': 0, // business loan
        };
        result = {rating, loanEligibility};
    }else if(creditScore < 630){
        const rating = 'Bad';
        const loanEligibility = {
            'student1': 2,
            'student2': 1,
            'student3': 0,
            'personal': 0,
            'auto': 0,
            'business': 1,
        };
        result = {rating, loanEligibility};
    }else if(creditScore < 690){
        const rating = 'Fair';
        const loanEligibility = {
            'student1': 3,
            'student2': 2,
            'student3': 1,
            'personal': 1,
            'auto': 2,
            'business': 2,
        };
        result = {rating, loanEligibility};
    }else if(creditScore < 720){
        const rating = 'Good';
        const loanEligibility = {
            'student1': 3,
            'student2': 3,
            'student3': 2,
            'personal': 2,
            'auto': 3,
            'business': 3,
        };
        result = {rating, loanEligibility};
    }else{
        const rating = 'Excellent';
        const loanEligibility = {
            'student1': 4,
            'student2': 4,
            'student3': 3,
            'personal': 3,
            'auto': 4,
            'business': 4,
        };
        result = {rating, loanEligibility};
    }

    return {result, referenceKey};
};

export default crediScoreEligibilityChecker;
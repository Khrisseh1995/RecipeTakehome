const decimalToFraction = (decimal) => {    
    const decimalPlaces = decimal.split('.')[1].split('').length;
    console.log(decimalPlaces);
    const numerator = parseFloat(decimal) * (10 ** decimalPlaces);
    const denominator = 1 * (10 ** decimalPlaces);
    const numeratorGCF = getFactors(numerator);
    const denominatorGCF = getFactors(denominator);
    const commonFactors = numeratorGCF
        .filter(factor => denominatorGCF.includes(factor))
        .sort();
    const greatestCommonFactor = commonFactors[commonFactors.length - 1]
    console.log(greatestCommonFactor);

    const finalNumerator = numerator / greatestCommonFactor;
    const finalDenominator = denominator / greatestCommonFactor;

    return `${finalNumerator}/${finalDenominator};`
}

const getGreatestCommonFactor = (numerator,denominator) => {
    const numeratorGCF = getFactors(numerator);
    const denominatorGCF = getFactors(denominator);
    const commonFactors = numeratorGCF
        .filter(factor => denominatorGCF.includes(factor));
    const greatestCommonFactor = commonFactors[commonFactors.length - 1]
    return greatestCommonFactor;
}

const getBaseFractionForServingSize = (fraction,baseServingSize,customServingSize,isInteger = false) => {
    if (isInteger) {
        fraction = `${fraction}/1`;
    }
    const isDecimal = !!Number(fraction) && Number(fraction) % 1 !== 0
    console.log("Is Decimal", isDecimal);
    if(isDecimal) {
        fraction = decimalToFraction(fraction);
    }    

    const isGreaterThanOne = fraction.split(" ");
    
    if (isGreaterThanOne.length > 1) {
        const splitFraction = fraction.split(" ");
        const integer = splitFraction[0];
        const numerator = splitFraction[1].split('/')[0];
        const denominator = splitFraction[1].split('/')[1];
        fraction = `${parseInt(numerator) + parseInt(integer * denominator)}/${parseInt(denominator)}`;
    }
    const numerator = parseInt(fraction.split('/')[0]);  
    
    const denominator = parseInt(fraction.split('/')[1]);

    const numeratorSum = numerator * 1;
    const denominatorSum = denominator * baseServingSize;

    const greatestCommonFactor = getGreatestCommonFactor(numeratorSum,denominatorSum);
    const baselineNumerator = (numeratorSum / greatestCommonFactor) * customServingSize;
    const baselineDenominator = (denominatorSum / greatestCommonFactor) * 1;

    const greatestBaselineFactor = getGreatestCommonFactor(baselineNumerator,baselineDenominator);

    const finalNumerator = baselineNumerator / greatestBaselineFactor    
    const finalDenominator = baselineDenominator / greatestBaselineFactor;    
    
    const remainder = Math.floor(finalNumerator / finalDenominator);
    const numeratorToReturn = (finalNumerator - (finalDenominator * remainder));    

    const finalGCF = getGreatestCommonFactor(numeratorToReturn,finalDenominator);
    if((finalDenominator === 1 && finalNumerator === 1) || (!numeratorToReturn || !finalDenominator)) {
        return remainder;
    }    

    const portionToReturn = `${remainder} ${(finalNumerator - (finalDenominator * remainder)) / finalGCF}/${finalDenominator / finalGCF}`;
    
    return portionToReturn.replace(/0 /,"");

}

const getFactors = (num) => {
    const factors = [];
    for (let i = 1; i < num; i++) {
        if (num % i === 0) {
            factors.push(i);
        }
    }
    factors.push(num);
    return factors;
}

export {
    decimalToFraction,
    getGreatestCommonFactor,
    getBaseFractionForServingSize
}
export const calculateValue = (value: number, decimals: number): number => {
    return value / Math.pow(10, decimals);
};

export const formatPreMinted = (preMinted: number, max: number, decimals: number): string => {
    const value = calculateValue(preMinted, decimals);
    if (value === 0) return "None";
    return `${formatNumber(value)} ${formatPercentage(value, calculateValue(max, decimals))}`;
};

export const formatLargeNumber = (value: number): string => {
    const units = ["", "Thousand", "Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion", "Undecillion", "Duodecillion", "Tredecillion", "Quattuordecillion", "Quindecillion", "Sexdecillion", "Septendecillion", "Octodecillion", "Novemdecillion", "Vigintillion"];
    let unitIndex = 0;
    let num = value;

    while (num >= 1000 && unitIndex < units.length - 1) {
        num /= 1000;
        unitIndex++;
    }

    return `${num.toFixed(2)} ${units[unitIndex]}`.trim();
};

export const formatNumberWithWords = (value: number, decimals: number): string => {
    // const integerPart = Math.floor(value / Math.pow(10, decimals));
    // if (integerPart.toString().length >= (isMobile ? 5 : 14)) {
    //     return formatLargeNumber(integerPart);
    // }
    return formatNumber(value / Math.pow(10, decimals));
};

export const formatPercentage = (value: number, max: number, without?: boolean): string => {
    const percentage = (value / max) * 100;
    const formattedPercentage = percentage < 1 && percentage > 0 ? '<1' : Math.round(percentage);
    if (without) {
        return `${formattedPercentage}%`
    }
    return `(${formattedPercentage}%)`
};

export const formatNumber = (number: number | string, maxDigits = 5): string => {
    const internalNumber = typeof number === 'string' ? parsingNumber(number) : number
    if (internalNumber === 0) {
        return '0'
    }
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: maxDigits,
    }).format(internalNumber);
}

export const formatInteger = (num: number | string): string => {
    const internalNumber = typeof num === 'string' ? parseInt(num) : num
    if (isNaN(internalNumber)) {
        return 'N/A';
    }
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(internalNumber);
};

export const shortenString = (str: number | string, startLength = 5, endLength = 5): string => {
    const internalString = typeof str === 'string' ? str : String(str)

    if (internalString.length <= startLength + endLength) {
        return internalString
    }

    return `${internalString.slice(0, startLength)}...${internalString.slice(-endLength)}`;
}

const parsingNumber = (value: string): number => {
    return value.includes('.') ? parseFloat(value) : parseInt(value)
}

export const parseRawNumber = (rawNumber: string | number, decimals: number): number => {
    if (!rawNumber) {
        return 0
    }
    return Number(rawNumber) / Math.pow(10, decimals);
}

export const formatDateTime = (timestamp: string | number): string => {
    let internalTimestamp = timestamp;
    if (typeof timestamp === 'string') {
        internalTimestamp = parseInt(timestamp)
    }
    const date = new Date(internalTimestamp);
    return date.toLocaleString('en-US', {timeZoneName: 'short'});
}

// export const copyToClipboard = (text: string): void => {
//     void navigator.clipboard.writeText(text);
//     addAlert('success', 'Text copied')
// }

export const formatKaspa = (amount: string): string => {
    return (parseFloat(amount) / 100000000).toFixed(8) + " KAS";
}

export const formatKRC20Amount = (amount: number, decimals: number, tick: string): string => {
    if (!amount || amount === 0) {
        return '0'
    }
    return `${parseRawNumber(amount, decimals).toFixed(decimals)} ${tick}`;
}

export const openTransaction = (transactionId: string): void => {
    if (typeof window !== 'undefined') {
        window.open(`https://explorer.kaspa.org/txs/${transactionId}`, '_blank', 'noopener,noreferrer');
    }
};

export const openLink = (url: string): void => {
    if (typeof window !== 'undefined') {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
};

export const sortComparison = <T extends number | string>(a: T, b: T, sortDirection: 'asc' | 'desc'): number => {
    if (typeof a === 'number' && typeof b === 'number') {
        if (sortDirection === 'desc') {
            return b - a
        }
        return a - b
    }
    if (sortDirection === 'desc') {
        return String(b).localeCompare(String(a))
    }
    return String(a).localeCompare(String(b))
}

export const formatDecimalNumber = (value: number, decimals: number): string => {
    const number = value / Math.pow(10, decimals);
    return number.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}


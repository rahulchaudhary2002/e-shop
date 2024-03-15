const calculateExpirationTime = (shorthand) => {
    const expirationTime = new Date();

    if (shorthand.endsWith('ms')) {
        const milliseconds = parseInt(shorthand);
        expirationTime.setTime(expirationTime.getTime() + milliseconds);
    } else if (shorthand.endsWith('s')) {
        const seconds = parseInt(shorthand);
        expirationTime.setSeconds(expirationTime.getSeconds() + seconds);
    } else if (shorthand.endsWith('m')) {
        const minutes = parseInt(shorthand);
        expirationTime.setMinutes(expirationTime.getMinutes() + minutes);
    } else if (shorthand.endsWith('h')) {
        const hours = parseInt(shorthand);
        expirationTime.setHours(expirationTime.getHours() + hours);
    } else if (shorthand.endsWith('d')) {
        const days = parseInt(shorthand);
        expirationTime.setDate(expirationTime.getDate() + days);
    } else if (shorthand.endsWith('w')) {
        const weeks = parseInt(shorthand);
        expirationTime.setDate(expirationTime.getDate() + weeks * 7);
    } else if (shorthand.endsWith('M')) {
        const months = parseInt(shorthand);
        expirationTime.setMonth(expirationTime.getMonth() + months);
    } else if (shorthand.endsWith('y')) {
        const years = parseInt(shorthand);
        expirationTime.setFullYear(expirationTime.getFullYear() + years);
    }

    return expirationTime;
}

export default calculateExpirationTime
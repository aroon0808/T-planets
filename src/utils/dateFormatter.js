export const dateFormatter = (date) =>  {
    const dateObj = new Date(date);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };

    return dateObj.toLocaleString('pl-PL', options);
}
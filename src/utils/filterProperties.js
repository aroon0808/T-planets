export const filterProperties = (data, propertiesToKeep) => {
    if (Array.isArray(data.results)) {
        data.results = data.results.map(obj => {
            const filtered = {};
            propertiesToKeep.forEach(prop => {
                if (obj.hasOwnProperty(prop)) {
                    filtered[prop] = obj[prop];
                }
            });
            return filtered;
        });
    }
    return data;
}
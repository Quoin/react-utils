export default (type, payload) => {
    if (!type) {
        throw new Error(`Missing type`);
    }

    return Object.freeze({
        type,
        payload
    });
};

export default (namespace, baseKeys) => {
    if (!baseKeys.length) {
        throw new Error(`Missing baseKeys`);
    }

    return Object.freeze(baseKeys.reduce(
        (namespacedActions, baseKey) => ({
            ...namespacedActions,
            [baseKey]: namespace(baseKey)
        }),
        {}
    ));
};

import { INamespace } from './types';

export default (namespace: INamespace, baseKeys: string[]) => {
    if (!namespace) {
        throw new Error(`Missing namespace`);
    } else if (typeof namespace !== 'function') {
        throw new Error(`namespace is not a function`);
    }

    if (!baseKeys || !baseKeys.length) {
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

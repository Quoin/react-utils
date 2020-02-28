import { INamespace } from './types';

export default (namespace: INamespace, baseKeys: string[]): object => {
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

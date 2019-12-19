import {
    ERROR_BOUNDARY_SUFFIX
} from './constants';

export default (componentName) => {
    let cleanedName = componentName || '';

    const indexOfErrorBoundarySuffix = cleanedName.indexOf(ERROR_BOUNDARY_SUFFIX);
    if ((indexOfErrorBoundarySuffix !== -1) && (cleanedName.length - ERROR_BOUNDARY_SUFFIX.length === indexOfErrorBoundarySuffix)) {
        cleanedName = cleanedName.slice(0, indexOfErrorBoundarySuffix);
    }

    return cleanedName;
};

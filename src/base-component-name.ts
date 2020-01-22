import {
    ERROR_BOUNDARY_SUFFIX
} from './constants';

type IComponent = string | React.ComponentClass<any> | React.FunctionComponent<any>;

export default (componentName?: IComponent): string => {
    let cleanedName = (typeof componentName === 'string' ? componentName : componentName ? componentName.displayName : '') || '';

    const indexOfErrorBoundarySuffix = cleanedName.indexOf(ERROR_BOUNDARY_SUFFIX);
    if ((indexOfErrorBoundarySuffix !== -1) && (cleanedName.length - ERROR_BOUNDARY_SUFFIX.length === indexOfErrorBoundarySuffix)) {
        cleanedName = cleanedName.slice(0, indexOfErrorBoundarySuffix);
    }

    return cleanedName;
};

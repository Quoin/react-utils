import React from 'react';

import { MetaType } from './types';

export default (elements: readonly MetaType[] = []): React.ReactNode[] => {
    const workElements: MetaType[] = [ ...elements ];
    const found = Boolean(workElements.find((element: MetaType) => element.value === "viewport"));
    if (!found) {
        workElements.push({
            attribute: 'name',
            value: 'viewport',
            content: 'width=device-width, initial-scale=1'
        });
    }

    return workElements.map((element: MetaType, index: number) => {
        const props = {
            [element.attribute]: element.value,
            content: element.content
        };

        return (<meta key={index} {...props} />);
    });
};

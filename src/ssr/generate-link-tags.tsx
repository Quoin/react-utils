import React from 'react';

import { AssetType, AssetTypes, LinkType } from './types';

export default (assets: readonly AssetType[] = []): React.ReactNode[] => assets
    .filter((asset) => asset.type === AssetTypes.LINK)
    .map((asset: AssetType, index: number) => {
        const link: LinkType = (asset as LinkType);
        return (<link key={index} rel={link.rel} href={link.href} />);
    })
;

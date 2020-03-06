import React from 'react';

import {
    AssetType,
    AssetTypes,
    ExternalScriptType,
    ScriptType
} from './types';

export default (assets: readonly AssetType[] = []): React.ReactNode[] => assets
    .filter((asset) => asset.type === AssetTypes.SCRIPT)
    .map((asset, index) => {
        const script: ScriptType = (asset as ScriptType);
        if (script.inline) {
            return false;
        } else {
            const externalScript: ExternalScriptType = (script as ExternalScriptType);
            return (
                <script key={index} type="text/javascript" async={externalScript.async} src={externalScript.src}></script>
            );
        }
    })
;

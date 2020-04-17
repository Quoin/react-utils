import { AssetTypes } from './constants';

export default (assets = []) => assets
    .filter((asset) => asset.type === AssetTypes.LINK)
    .map((link) => (<link key={link.href} rel={link.rel} href={link.href} />))
;

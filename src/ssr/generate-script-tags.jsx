import { AssetTypes } from './constants';

export default (assets = []) => assets
  .filter((asset) => asset.type === AssetTypes.SCRIPT)
  .map((script) => (script.inline
    ? false
    : <script key={script.src} type="text/javascript" async={script.async} src={script.src} />));

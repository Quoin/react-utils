import PropTypes from 'prop-types';

import { AssetTypes } from './constants';

export const meta = PropTypes.shape({
  attribute: PropTypes.string.isRequired,
  content: PropTypes.string,
  value: PropTypes.string.isRequired,
});

export const link = PropTypes.shape({
  link: PropTypes.string,
  rel: PropTypes.string,
  type: PropTypes.oneOf([AssetTypes.LINK]).isRequired,
});

export const script = PropTypes.shape({
  async: PropTypes.bool,
  inline: PropTypes.bool,
  src: PropTypes.string.isRequired,
  type: PropTypes.oneOf([AssetTypes.SCRIPT]).isRequired,
});

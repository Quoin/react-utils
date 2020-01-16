import React from 'react';

class BaseClassComponent extends React.Component<any, any> {
  static displayName: string;
  static propTypes: object;
  static defaultProps: object;
}

export default BaseClassComponent;

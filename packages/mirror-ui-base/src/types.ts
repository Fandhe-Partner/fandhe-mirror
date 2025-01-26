import { Component } from '@fandhe/mirror-ui';

export interface AccessibleComponent extends Component {
  ariaLabel?: string;
  role?: string;
}

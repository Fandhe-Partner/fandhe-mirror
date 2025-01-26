import { AccessibleComponent } from '@fandhe/mirror-ui-base';

export interface TableConfig {
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
}

export interface TableComponent extends AccessibleComponent {
  config?: TableConfig;
}

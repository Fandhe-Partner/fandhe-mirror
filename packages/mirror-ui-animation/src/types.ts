import { AccessibleComponent } from '@fandhe/mirror-ui-base';

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export interface AnimatedComponent extends AccessibleComponent {
  animation?: AnimationConfig;
}

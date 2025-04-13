/**
 * Normalizes React props for use with Mirror UI components
 * This function handles converting React-specific props to a format compatible with Mirror UI
 */
export interface NormalizedProps {
  [key: string]: unknown;
}

/**
 * Normalizes React props for use with Mirror UI components
 * @param props React component props
 * @returns Normalized props object compatible with Mirror UI
 */
export function normalizeProps(props: Record<string, unknown>): NormalizedProps {
  const { children, ...restProps } = props as {
    children?: unknown;
    ref?: unknown;
    key?: unknown;
    [key: string]: unknown;
  };

  const normalizedProps: NormalizedProps = {};
  
  for (const [propName, propValue] of Object.entries(restProps)) {
    if (propName.startsWith("on") && typeof propValue === "function") {
      normalizedProps[propName] = propValue;
    } 
    else {
      normalizedProps[propName] = propValue;
    }
  }

  if (children !== undefined) {
    normalizedProps.children = children;
  }

  return normalizedProps;
}

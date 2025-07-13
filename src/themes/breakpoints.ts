/**
 * Breakpoint system for responsive design
 */
export const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
  unit: 'px',
  step: 5,
};

export const mediaQueries = {
  up: (key: keyof typeof breakpoints.values) =>
    `@media (min-width:${breakpoints.values[key]}${breakpoints.unit})`,
  down: (key: keyof typeof breakpoints.values) => {
    const value = breakpoints.values[key];
    return `@media (max-width:${value - breakpoints.step / 100}${breakpoints.unit})`;
  },
  between: (start: keyof typeof breakpoints.values, end: keyof typeof breakpoints.values) =>
    `@media (min-width:${breakpoints.values[start]}${breakpoints.unit}) and (max-width:${breakpoints.values[end] - breakpoints.step / 100}${breakpoints.unit})`,
  only: (key: keyof typeof breakpoints.values) => {
    if (key === 'xl') {
      return mediaQueries.up(key);
    }
    const keys = Object.keys(breakpoints.values) as Array<keyof typeof breakpoints.values>;
    const keyIndex = keys.indexOf(key);
    const nextKey = keys[keyIndex + 1];
    return mediaQueries.between(key, nextKey);
  },
};

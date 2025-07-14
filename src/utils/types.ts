/**
 * Common utility types for the component library
 */

/**
 * Make all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Make all properties required recursively
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * Extract keys of a specific type from an object
 */
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

/**
 * Create a union of all possible dot-notation paths in an object
 */
export type DotNotation<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? `${K}.${DotNotation<T[K]>}` | K
    : K
  : never;

/**
 * Get the type of a nested property using dot notation
 */
export type GetNestedType<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? GetNestedType<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

/**
 * Omit properties by type
 */
export type OmitByType<T, U> = Pick<T, { [K in keyof T]: T[K] extends U ? never : K }[keyof T]>;

/**
 * Pick properties by type
 */
export type PickByType<T, U> = Pick<T, { [K in keyof T]: T[K] extends U ? K : never }[keyof T]>;

/**
 * Make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Create a type that's either T or null
 */
export type Nullable<T> = T | null;

/**
 * Create a type that's either T or undefined
 */
export type Optional<T> = T | undefined;

/**
 * Create a type that's either T, null, or undefined
 */
export type Maybe<T> = T | null | undefined;

/**
 * Extract the element type from an array
 */
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/**
 * Create a union of all values in an object
 */
export type ValueOf<T> = T[keyof T];

/**
 * Create a type for function parameters
 */
export type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any
  ? P
  : never;

/**
 * Create a type for function return value
 */
export type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R
  ? R
  : any;

/**
 * Component props helper types
 */
export type ComponentSize = 'small' | 'medium' | 'large';
export type ComponentVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type ComponentColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'inherit';

/**
 * Theme mode type
 */
export type ThemeMode = 'light' | 'dark';

/**
 * Breakpoint keys
 */
export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Event handler types
 */
export type MouseEventHandler<T = Element> = (event: React.MouseEvent<T>) => void;
export type KeyboardEventHandler<T = Element> = (event: React.KeyboardEvent<T>) => void;
export type ChangeEventHandler<T = Element> = (event: React.ChangeEvent<T>) => void;
export type FocusEventHandler<T = Element> = (event: React.FocusEvent<T>) => void;

/**
 * Common component prop types
 */
export interface BaseComponentProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
  role?: string;
  tabIndex?: number;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  style?: React.CSSProperties;
}

/**
 * Props for components that can be disabled
 */
export interface DisableableProps {
  disabled?: boolean;
}

/**
 * Props for components with loading states
 */
export interface LoadableProps {
  loading?: boolean;
}

/**
 * Props for components with sizes
 */
export interface SizeableProps {
  size?: ComponentSize;
}

/**
 * Props for components with variants
 */
export interface VariantProps {
  variant?: ComponentVariant;
}

/**
 * Props for components with colors
 */
export interface ColorProps {
  color?: ComponentColor;
}

/**
 * Form field props
 */
export interface FormFieldProps {
  name?: string;
  value?: any;
  defaultValue?: any;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler;
  onBlur?: FocusEventHandler;
  onFocus?: FocusEventHandler;
}

/**
 * Props for polymorphic components (as prop pattern)
 */
export type PolymorphicProps<C extends React.ElementType, Props = {}> = React.PropsWithChildren<
  Props & AsMixin<C>
> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type AsMixin<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsMixin<C> & P);

/**
 * API response types
 */
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Error types
 */
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ApiError {
  message: string;
  code?: string | number;
  details?: any;
  validationErrors?: ValidationError[];
}

/**
 * File types
 */
export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  url?: string;
  preview?: string;
}

/**
 * User types (example)
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Theme configuration types
 */
export interface ThemeConfig {
  mode: ThemeMode;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: number;
  spacing: number;
}

/**
 * Localization types
 */
export interface LocaleConfig {
  code: string;
  name: string;
  flag: string;
  rtl?: boolean;
}

/**
 * Component state types
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
export type ValidationState = 'valid' | 'invalid' | 'pending';

/**
 * Utility types for refs
 */
export type RefType<T> = React.Ref<T> | React.RefObject<T> | null;

/**
 * Generic callback types
 */
export type Callback = () => void;
export type AsyncCallback = () => Promise<void>;
export type CallbackWithParam<T> = (param: T) => void;
export type AsyncCallbackWithParam<T> = (param: T) => Promise<void>;

/**
 * Generic state setter type
 */
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

/**
 * Branded types for type safety
 */
export type Brand<T, B> = T & { __brand: B };

export type Email = Brand<string, 'Email'>;
export type PhoneNumber = Brand<string, 'PhoneNumber'>;
export type URL = Brand<string, 'URL'>;
export type UUID = Brand<string, 'UUID'>;
export type ISO8601Date = Brand<string, 'ISO8601Date'>;

/**
 * CSS-in-JS style types
 */
export type CSSProperties = React.CSSProperties;
export type StyleObject = Record<string, CSSProperties>;
export type ResponsiveStyleValue<T> = T | Partial<Record<BreakpointKey, T>>;

/**
 * Animation types
 */
export interface AnimationConfig {
  duration?: number;
  easing?: string;
  delay?: number;
  fillMode?: 'forwards' | 'backwards' | 'both' | 'none';
  iterationCount?: number | 'infinite';
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
}

/**
 * Generic data fetching types
 */
export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface InfiniteQueryState<T> extends FetchState<T[]> {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

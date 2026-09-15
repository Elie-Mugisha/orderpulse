export const METADATA_KEYS = {
  CONTROLLER_PREFIX: 'orderpulse:controller_prefix',
  ROUTE_PATH: 'orderpulse:route_path',
  ROUTE_METHOD: 'orderpulse:route_method',
  ROUTE_PARAMS: 'orderpulse:route_params',
} as const;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type RouteParamSource = 'body' | 'param' | 'query' | 'headers'

export interface RouteParamMetadata {
  index: number;
  source: RouteParamSource;
  data?: string;
}
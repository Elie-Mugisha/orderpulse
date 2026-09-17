export const METADATA_KEYS = {
  CONTROLLER_PREFIX: 'orderpulse:controller_prefix',
  ROUTE_PATH: 'orderpulse:route_path',
  ROUTE_METHOD: 'orderpulse:route_method',
  ROUTE_PARAMS: 'orderpulse:route_params',
  INJECTABLE: 'orderpulse:injectable',
  PARAM_INJECTIONS: 'orderpulse:param_injections'
} as const;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type RouteParamSource = 'body' | 'param' | 'query' | 'headers'

export interface RouteParamMetadata {
  index: number;
  source: RouteParamSource;
  data?: string;
}

// Represents one registered route in our routing table

export interface RouteDefinition {
  httpMethod: HttpMethod;
  path: string;
  methodName: string
}
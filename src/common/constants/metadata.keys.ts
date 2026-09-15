export const METADATA_KEYS = {
  CONTROLLER_PREFIX: 'orderpulse:controller_prefix',
  ROUTE_PATH: 'orderpulse:route_path',
  ROUTE_METHOD: 'orderpulse:route_method',
  ROUTE_BODY_PARAM_INDEX: 'orderpulse:body_param_index',
} as const;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
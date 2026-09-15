export const METADATA_KEYS = {
  CONTROLLER_PREFIX: 'orderpulse:controller_prefix',
  ROUTE_PATH: 'orderpulse:route_path',
  ROUTE_METHOD: 'orderpulse:route_method',
} as const;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
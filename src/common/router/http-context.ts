export interface HttpRequestContext {
  headers: Record<string, string | string[] | undefined>;
  params: Record<string, string | undefined>;
  query: Record<string, string | string[] | undefined>;
  body: unknown;
}
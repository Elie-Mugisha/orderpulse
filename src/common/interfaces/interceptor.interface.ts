import { Observable } from "rxjs";

export interface CallHandler {
  handle(): Observable<any>;
}

export interface Interceptor {
  intercept(context: any, next: CallHandler): Observable<any>;
}
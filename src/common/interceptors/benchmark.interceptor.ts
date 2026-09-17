import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CallHandler, Interceptor } from "../interfaces/interceptor.interface";

export class BenchmarkInterceptor implements Interceptor {
  intercept(context: any, next: CallHandler): Observable<any> {
    const startTime = Date.now();

    return next.handle().pipe(
      map(result => {
        const executionTimeMs = Date.now() - startTime;

        return {
          data: result,
          executionTimeMs
        }
      })
    )
  }
}
import { SingleSpaPropsService } from '@services/single-spa-props/single-spa-props.service';
import { ParametersService } from '@services/parameters/parameters.service';
import { EndpointService } from '@services/endpoint/endpoint.service';
import { catchError, tap } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ItauPjInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector
    ) {
    }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const endpointInjector = this.injector.get(EndpointService);
    const parametersInjector = this.injector.get(ParametersService);
    const injectorSingleSpaProps = this.injector.get(SingleSpaPropsService);
    if (endpointInjector.urls && parametersInjector.parametersData && injectorSingleSpaProps.singleSpaProps) {
      const ssoProps = parametersInjector.parametersData.propsNames.SsoProps;
      if (
        request.url.startsWith(endpointInjector.urls['3scale'].BASE)
        ) {
        return next.handle(request).pipe(
          tap((data) => {
            injectorSingleSpaProps.singleSpaProps[ssoProps].setFlagRefresh(true);
            return data;
          }),
          catchError((err) => {
            if (err.status === 403 || err.status === 400) {
              const nameProps = parametersInjector.parametersData.propsNames.CallBackSessionExpired;
              injectorSingleSpaProps.singleSpaProps[nameProps]();
            }
            return throwError(err);
          }),
        );
      }
    }
    return next.handle(request);
  }
}

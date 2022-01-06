import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import '@angular/common/locales/pt';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BusinessRulesService } from '@services/businessRules/business-rules.service';
import { EndpointService } from '@services/endpoint/endpoint.service';
import { MessagesAppService } from '@services/messages-app/messages-app.service';
import { ParametersService } from '@services/parameters/parameters.service';
import { SingleSpaPropsService } from '@services/single-spa-props/single-spa-props.service';
import { AppComponent } from './app.component';

export function loadResources(
  messagesAppService: MessagesAppService,
  endpointService: EndpointService,
  parametersService: ParametersService,
  businessRulesService: BusinessRulesService,
  singleSpaPropsService: SingleSpaPropsService,
) {
  return async () => {
    await messagesAppService.loadMessages();
    await endpointService.loadURLS();
    await parametersService.loadParameters();
    await businessRulesService.loadBusinessRules();
    await singleSpaPropsService.loadProps();
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadResources,
      multi: true,
      deps: [
        MessagesAppService,
        EndpointService,
        ParametersService,
        BusinessRulesService,
        SingleSpaPropsService,
      ],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

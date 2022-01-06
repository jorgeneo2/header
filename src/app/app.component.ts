import { Component } from '@angular/core';
import { EndpointService } from '@services/endpoint/endpoint.service';
import { MessagesAppService } from '@services/messages-app/messages-app.service';
import { ParametersService } from '@services/parameters/parameters.service';
import { SingleSpaPropsService } from '@services/single-spa-props/single-spa-props.service';

@Component({
  selector: 'header-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'header';
  
  constructor(private parametersService: ParametersService, private endpointService: EndpointService, private messagesAppService: MessagesAppService, private singleSpaPropsService: SingleSpaPropsService){
    console.log('HEADER parametersService.parametersData',this.parametersService.parametersData);
    
    console.log('HEADER endpointService.urls',this.endpointService.urls);
    
    console.log('HEADER messagesAppService.messageData copies',this.messagesAppService.messageData);    
     
    console.log('HEADER singleSpaPropsService MiProps',this.singleSpaPropsService.singleSpaProps['MiProps']);    
  }
}

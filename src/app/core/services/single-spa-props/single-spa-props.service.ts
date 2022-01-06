import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { SingleSpaProps, singleSpaPropsSubject } from 'src/single-spa/single-spa-props';

@Injectable({
  providedIn: 'root'
})
export class SingleSpaPropsService {
  subscriptionProps: Subscription;
  singleSpaProps: SingleSpaProps;

  loadProps() {
    this.subscriptionProps = singleSpaPropsSubject.subscribe(
      props => {
        this.singleSpaProps = props;
      }
    );
  }
}

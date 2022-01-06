import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';
import { CONFIGMAP_COPIES } from 'src/utils/constant';

@Injectable({
  providedIn: 'root',
})
export class MessagesAppService {
  messageData: any;
  configData: any;
  constructor(private http: HttpClient) {}

  async loadMessages() {
    const url = assetUrl(CONFIGMAP_COPIES);
    await this.http
      .get<any>(url)
      .toPromise()
      .then((res: any) => {
        this.messageData = res['data'].copies;
      });
  }
}

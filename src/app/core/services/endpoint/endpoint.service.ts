import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';
import { CONFIGMAP_ENDPOINT_URLS } from 'src/utils/constant';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  urls: any;

  constructor(private http: HttpClient) {}

  async loadURLS() {
    const url = assetUrl(CONFIGMAP_ENDPOINT_URLS);
    await this.http
      .get<any>(url)
      .toPromise()
      .then((res: any) => {
        this.urls = res['urls'];
      });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';
import { CONFIGMAP_PARAMETERS } from 'src/utils/constant';

@Injectable({
  providedIn: 'root',
})
export class ParametersService {
  parametersData: any;

  constructor(private http: HttpClient) {}

  async loadParameters() {
    const url = assetUrl(CONFIGMAP_PARAMETERS);
    await this.http
      .get<any>(url)
      .toPromise()
      .then((res: any) => {
        this.parametersData = res['data'].parameters;
      });
  }
}

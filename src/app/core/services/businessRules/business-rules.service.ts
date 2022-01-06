import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';
import { CONFIGMAP_BUSINESS_RULES } from 'src/utils/constant';

@Injectable({
  providedIn: 'root',
})
export class BusinessRulesService {
  rulesData: any;

  constructor(private http: HttpClient) {}

  async loadBusinessRules() {
    const url = assetUrl(CONFIGMAP_BUSINESS_RULES);
    await this.http
      .get<any>(url)
      .toPromise()
      .then((res: any) => {
        this.rulesData = res['data'].businessRules;
      });
  }
}

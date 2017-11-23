export class ApiList {
  private baseUrl: string;
  private api: string;

  constructor() {
    this.baseUrl = 'http://jrcs.fancelue.com/jrcsApi/';
    this.api = '';
  }

  getUrl() {
    return this.baseUrl + this.api;
  }
}

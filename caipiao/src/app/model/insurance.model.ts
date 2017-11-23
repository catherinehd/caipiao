export class InsuranceModel {
  id: number;
  title: string;
  describe: string;
  subDescribe: string;
  imgSrc: string;
  targetUrl: string;
  visitTimes: number;
  constructor(options?: any) {
    if (options) {
      this.id = options.id;
      this.title = options.title.length > 10 ? options.title.substring(0, 10) + '...' : options.title;
      this.describe = options.descs;
      this.subDescribe = options.fav_desc;
      this.imgSrc = options.logo_url;
      this.targetUrl = options.target_url;
      this.visitTimes = options.visit_times;
    }
  }
}

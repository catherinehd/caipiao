export class BannerModel {
  id: number;
  imgUrl: string;
  targetUrl: string;
  constructor(options?: any) {
    if (options) {
      this.id = options.id;
      this.imgUrl = options.image_url;
      this.targetUrl = options.target_url;
    }
  }
}

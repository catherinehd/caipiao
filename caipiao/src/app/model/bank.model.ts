export class BankModel {
  id: string;
  name: string;
  imgUrl: string;
  describe: DetailInfo[];
  constructor(options?: any) {
    if (options) {
      this.id = options.id;
      this.name = options.title;
      this.imgUrl = options.logo_url;
      this.describe = this.setService(options.descs);
    }
  }

  setService(service) {
    if (!service) return [];
    const serviceArr = service.split('；');
    const newArr = [];
    for (const value of serviceArr) {
      const tempObj = {};
      const valueArr = value.split('：');
      tempObj['infoTitle'] = valueArr[0];
      tempObj['info'] = valueArr[1];
      newArr.push(tempObj);
    }
    return newArr;
  }
}

interface DetailInfo {
  infoTitle: string;
  info: string;
}

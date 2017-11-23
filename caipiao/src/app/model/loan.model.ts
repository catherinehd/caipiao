export class LoanModel {
  id: number;
  title: string;
  describe: string;
  imgSrc: string;
  targetUrl: string;
  debtMax: number;      // 元
  debtMin: number;
  timeMax: number;      // 月
  timeMin: number;
  interest: number;     // 月利率
  feeType: number;      // 利率类别
  typeId: number;       // 1小额 2大额 3车贷
  visitTimes: number;
  cvtRate: number;
  constructor(options?: any) {
    if (options) {
      this.id = options.id;
      this.typeId = options.type_id;
      this.title = options.title.length > 14 ? options.title.substring(0, 14) + '...' : options.title;
      this.describe = options.descs;
      this.imgSrc = options.logo_url;
      this.targetUrl = options.target_url;
      this.debtMax = options.debt_max / 10000;
      this.debtMin = options.debt_min / 10000;
      this.timeMax = options.time_max / 10000;
      this.timeMin = options.time_min / 10000;
      this.interest = options.fee.toFixed(2);
      this.feeType = options.fee_type;
      this.visitTimes = options.visit_times;
      this.cvtRate = options.cvt_rate;
    }
  }
}

export class CalcLoanModel extends LoanModel {
  totalInterest: number;
  repaymentMonthly: number;
  constructor(options ?: any, debt ?: number, time?: number) {
    super(options);
    if (options && debt && time) {
      this.visitTimes = options.visit_times > 10000 ? options.visit_times / 10000 + '万' : options.visit_times;
      this.calc(debt * 10000, time);
    }
  }

  calc(debt, time) {    // debt 万， this.interest %
    const originMonthly = debt / time;
    const rateMonthly = this.interest / 100;
    const decline = originMonthly * rateMonthly;
    this.repaymentMonthly = + (originMonthly + debt * rateMonthly ).toFixed(2);
    this.totalInterest = +(time * (debt * rateMonthly - decline * (time - 1) / 2 + originMonthly) - debt).toFixed(2);
  }
}

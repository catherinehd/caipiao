export class HotelModel {
  id: number;
  hotelName: string;
  address: string;
  score: number;
  orders: number;
  price: number;
  constructor(options?: any) {
    if (options) {
      this.id = options.id;
      this.hotelName = options.hotel_name;
      this.address = options.address;
      this.score = options.score;
      this.orders = options.orders;
      this.price = options.price;
    }
  }
}

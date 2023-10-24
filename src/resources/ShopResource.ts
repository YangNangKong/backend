import Shop from "../models/Shop";


export class ShopResource {
    id: number;
    shop_name: string;
    phone_number: string;
    address: string;
    detail_address: string;
    open_date: Date | null;
    closed_date: Date | null;
    // createdAt: Date;
    // updatedAt: Date;

    constructor(shop: Shop) {
        this.id = shop.id;
        this.shop_name = shop.shop_name;
        this.phone_number = shop.phone_number;
        this.address = shop.address;
        this.detail_address = shop.detail_address;
        this.open_date = shop.open_date;
        this.closed_date = shop.closed_date;
        // this.createdAt = user.createdAt;
        // this.updatedAt = user.updatedAt;
    }
}
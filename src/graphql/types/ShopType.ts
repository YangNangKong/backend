import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
class ShopType {
    @Field(() => ID)
    id: number;

    @Field()
    shop_name: string;

    @Field({ nullable: true })
    phone_number?: string;

    @Field({ nullable: true })
    address?: string;

    @Field({ nullable: true })
    detail_address?: string;

    @Field({ nullable: true })
    open_date?: Date;

    @Field({ nullable: true })
    closed_date?: Date;

    @Field({ nullable: true })
    created_at?: Date;

    @Field({ nullable: true })
    updated_at?: Date;

    @Field({ nullable: true })
    deleted_at?: Date;

    // 생성자
    constructor(
        id: number,
        shop_name: string,
        phone_number?: string,
        address?: string,
        detail_address?: string,
        open_date?: Date,
        closed_date?: Date,
        created_at?: Date,
        updated_at?: Date,
        deleted_at?: Date,
    ) {
        this.id = id;
        this.shop_name = shop_name;
        this.phone_number = phone_number;
        this.address = address;
        this.detail_address = detail_address;
        this.open_date = open_date;
        this.closed_date = closed_date;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
}

export default ShopType;
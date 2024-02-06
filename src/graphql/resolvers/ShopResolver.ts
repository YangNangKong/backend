import { Resolver, Query, Arg } from 'type-graphql';
import Shop from '../../models/Shop'; // Sequelize 모델 가져오기
import ShopType from '../types/ShopType';

@Resolver(() => ShopType)
export class ShopResolver {
    @Query(() => [ShopType])
    async shops(
        @Arg('shop_name', { nullable: true }) shop_name: string,
        @Arg('phone_number', { nullable: true }) phone_number: string
    ) {
        const whereCondition: any = {
            ...(shop_name && { shop_name }),
            ...(phone_number && { phone_number }),
        };

        return await Shop.findAll({ where: whereCondition });
    }

    @Query(() => ShopType, { nullable: true })
    async shop(@Arg('id') id: number) {
        return await Shop.findByPk(id);
    }
}
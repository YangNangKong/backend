import { Resolver, Query, Arg } from 'type-graphql';
import User from '../../models/User'; // Sequelize 모델 가져오기
import UserType from '../types/UserType';

@Resolver(() => UserType)
export class UserResolver {
    @Query(() => [UserType])
    async users(
        @Arg('user_name', { nullable: true }) user_name: string,
        @Arg('email', { nullable: true }) email: string
    ) {
        const whereCondition: any = {
            ...(user_name && { user_name }),
            ...(email && { email }),
        };

        return await User.findAll({ where: whereCondition });
    }

    @Query(() => UserType, { nullable: true })
    async user(@Arg('id') id: number) {
        return await User.findByPk(id);
    }
}
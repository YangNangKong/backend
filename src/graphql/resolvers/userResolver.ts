import { Resolver, Query, Arg } from 'type-graphql';
import User from '../../models/User'; // Sequelize 모델 가져오기
import UserType from '../types/UserType';

@Resolver(() => UserType)
export class UserResolver {
    @Query(() => [UserType])
    async users() {
        return await User.findAll();
    }

    @Query(() => UserType, { nullable: true })
    async user(@Arg('id') id: number) {
        return await User.findByPk(id);
    }
}
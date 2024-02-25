import { buildSchemaSync } from 'type-graphql';
import { UserResolver } from './resolvers/userResolver';
import { ShopResolver } from './resolvers/ShopResolver';

export const schema = buildSchemaSync({
  resolvers: [
    UserResolver,
    ShopResolver,
  ],
  emitSchemaFile: true,
  validate: false,
});
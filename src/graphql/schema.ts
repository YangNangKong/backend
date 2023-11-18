import { buildSchemaSync } from 'type-graphql';
import { UserResolver } from './resolvers/userResolver';

export const schema = buildSchemaSync({
  resolvers: [UserResolver],
  emitSchemaFile: true,
  validate: false,
});
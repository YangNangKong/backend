import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
class UserType {
  @Field(() => ID)
  id: number;

  @Field()
  user_name: string;

  @Field()
  user_type: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  company_name?: string;

  @Field({ nullable: true })
  company_code?: string;

  @Field({ nullable: true })
  phone_number?: string;

  @Field({ nullable: true })
  created_at?: Date;

  @Field({ nullable: true })
  updated_at?: Date;

  @Field({ nullable: true })
  deleted_at?: Date;

  // 생성자
  constructor(
    id: number,
    user_name: string,
    user_type: string,
    email: string,
    company_name?: string,
    company_code?: string,
    phone_number?: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
  ) {
    this.id = id;
    this.user_name = user_name;
    this.user_type = user_type;
    this.email = email;
    this.company_name = company_name;
    this.company_code = company_code;
    this.phone_number = phone_number;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}

export default UserType;
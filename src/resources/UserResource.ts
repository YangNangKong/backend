import User from "../models/User";

export class UserResource {
    id: number;
    user_name: string;
    email: string;
    company_name: string;
    company_code: string;
    phone_number: string;
    // created_at: Date;
    // updated_at: Date;

    constructor(user: User) {
        this.id = user.id;
        this.user_name = user.user_name;
        this.email = user.email;
        this.company_name = user.company_name;
        this.company_code = user.company_code;
        this.phone_number = user.phone_number;
        // this.created_at = user.created_at;
        // this.updated_at = user.updated_at;
    }
}
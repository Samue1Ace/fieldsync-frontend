import UserAddress from "./UserAddress";
import UserCompany from "./UserCompany";

export default interface User{
    id: Number,
    name: string,
    username: string,
    email: string,
    address: UserAddress,
    phone :string,
    website: string,
    company: UserCompany
}
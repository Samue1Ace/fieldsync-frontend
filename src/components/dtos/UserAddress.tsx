import Geo from "./Geo";

export default interface UserAddress{
    street:string,
    suite:string,
    city:string,
    zipCode:string,
    geo: Geo
}
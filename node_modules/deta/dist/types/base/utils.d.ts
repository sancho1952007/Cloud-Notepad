import { Action } from '../types/action';
import { ArrayType, BasicType } from '../types/basic';
export default class BaseUtils {
    trim(): Action;
    increment(value?: number): Action;
    append(value: BasicType | ArrayType): Action;
    prepend(value: BasicType | ArrayType): Action;
}
interface TTLResponse {
    ttl?: number;
    error?: Error;
}
export declare function getTTL(expireIn?: number, expireAt?: Date | number): TTLResponse;
export {};

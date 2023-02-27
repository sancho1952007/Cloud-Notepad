import { KeyType } from '../types/key';
import BaseUtils from './utils';
import { DetaType, CompositeType, ObjectType } from '../types/basic';
import { PutOptions, FetchOptions, UpdateOptions, InsertOptions, PutManyOptions } from '../types/base/request';
import { GetResponse, PutResponse, FetchResponse, DeleteResponse, InsertResponse, UpdateResponse, PutManyResponse } from '../types/base/response';
export default class Base {
    private requests;
    util: BaseUtils;
    constructor(key: string, type: KeyType, projectId: string, baseName: string, host?: string);
    put(data: DetaType, key?: string, options?: PutOptions): Promise<PutResponse>;
    get(key: string): Promise<GetResponse>;
    delete(key: string): Promise<DeleteResponse>;
    insert(data: DetaType, key?: string, options?: InsertOptions): Promise<InsertResponse>;
    putMany(items: DetaType[], options?: PutManyOptions): Promise<PutManyResponse>;
    update(updates: ObjectType, key: string, options?: UpdateOptions): Promise<UpdateResponse>;
    fetch(query?: CompositeType, options?: FetchOptions): Promise<FetchResponse>;
}

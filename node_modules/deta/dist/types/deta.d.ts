import BaseClass from './base';
import DriveClass from './drive';
import { KeyType } from './types/key';
export default class Deta {
    private key;
    private type;
    private projectId;
    constructor(key: string, type: KeyType, projectId: string);
    Base(baseName: string, host?: string): BaseClass;
    Drive(driveName: string, host?: string): DriveClass;
}

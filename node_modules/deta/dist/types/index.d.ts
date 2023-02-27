import DetaClass from './deta';
import BaseClass from './base';
import DriveClass from './drive';
export declare function Deta(projectKey?: string, authToken?: string): DetaClass;
export declare function Base(baseName: string, host?: string): BaseClass;
export declare function Drive(driveName: string, host?: string): DriveClass;

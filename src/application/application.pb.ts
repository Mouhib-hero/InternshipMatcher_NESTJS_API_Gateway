/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "application";

/** enum */
export enum stateEnum {
  PENDING = 0,
  ACCEPTED = 1,
  REJECTED = 2,
  UNRECOGNIZED = -1,
}

export interface AddRequestApp {
  idOffer: number;
  idUser: number;
}

export interface AddResponseApp {
  status: number;
  error: string[];
  idApp: number;
}

export interface GetDataApp {
  idApp: number;
  idOffer: number;
  idUser: number;
  state: stateEnum;
}

export interface GetRequestApp {
  idApp: number;
  idUser: number;
}

export interface GetResponseApp {
  status: number;
  error: string[];
  data: GetDataApp | undefined;
}

export interface SearchDataApp {
  idApp: number;
  idOffer: number;
  idUser: number;
  state: stateEnum;
}

export interface SearchRequestApp {
  idApp?: number | undefined;
  idOffer?: number | undefined;
  state?: stateEnum | undefined;
  idUser: number;
}

export interface SearchResponseApp {
  status: number;
  error: string[];
  data: SearchDataApp[];
}

export interface RemoveRequestApp {
  idApp: number;
  idUser: number;
}

export interface RemoveResponseApp {
  status: number;
  error: string[];
  idApp: number;
}

export interface UpdateDataApp {
  idApp: number;
  idOffer: number;
  idUser: number;
  state: stateEnum;
}

export interface UpdateRequestApp {
  idApp: number;
  idOffer?: number | undefined;
  idUser: number;
  state?: stateEnum | undefined;
}

export interface UpdateResponseApp {
  status: number;
  error: string[];
  data: UpdateDataApp | undefined;
}

/** soft delete */
export interface SoftDltRequestApp {
  idApp: number;
  idUser: number;
}

export interface SoftDltResponseApp {
  status: number;
  error: string[];
  idApp: number;
}

export interface RestoreDataApp {
  idApp: number;
  idOffer: number;
  idUser: number;
  state: stateEnum;
}

export interface RestoreRequestApp {
  idApp: number;
  idUser: number;
}

export interface RestoreResponseApp {
  status: number;
  error: string[];
  data: RestoreDataApp | undefined;
}

export const APPLICATION_PACKAGE_NAME = "application";

export interface ApplicationServiceClient {
  addApp(request: AddRequestApp): Observable<AddResponseApp>;

  getApp(request: GetRequestApp): Observable<GetResponseApp>;

  searchAppByCriteria(request: SearchRequestApp): Observable<SearchResponseApp>;

  removeApp(request: RemoveRequestApp): Observable<RemoveResponseApp>;

  updateApp(request: UpdateRequestApp): Observable<UpdateResponseApp>;

  softDeleteApp(request: SoftDltRequestApp): Observable<SoftDltResponseApp>;

  restoreApp(request: RestoreRequestApp): Observable<RestoreResponseApp>;
}

export interface ApplicationServiceController {
  addApp(request: AddRequestApp): Promise<AddResponseApp> | Observable<AddResponseApp> | AddResponseApp;

  getApp(request: GetRequestApp): Promise<GetResponseApp> | Observable<GetResponseApp> | GetResponseApp;

  searchAppByCriteria(
    request: SearchRequestApp,
  ): Promise<SearchResponseApp> | Observable<SearchResponseApp> | SearchResponseApp;

  removeApp(request: RemoveRequestApp): Promise<RemoveResponseApp> | Observable<RemoveResponseApp> | RemoveResponseApp;

  updateApp(request: UpdateRequestApp): Promise<UpdateResponseApp> | Observable<UpdateResponseApp> | UpdateResponseApp;

  softDeleteApp(
    request: SoftDltRequestApp,
  ): Promise<SoftDltResponseApp> | Observable<SoftDltResponseApp> | SoftDltResponseApp;

  restoreApp(
    request: RestoreRequestApp,
  ): Promise<RestoreResponseApp> | Observable<RestoreResponseApp> | RestoreResponseApp;
}

export function ApplicationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "addApp",
      "getApp",
      "searchAppByCriteria",
      "removeApp",
      "updateApp",
      "softDeleteApp",
      "restoreApp",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ApplicationService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ApplicationService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const APPLICATION_SERVICE_NAME = "ApplicationService";

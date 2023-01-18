/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "offer";

export interface AddRequestOffer {
  idUser: number;
  topic: string;
  description: string;
  availability: boolean;
}

export interface AddResponseOffer {
  status: number;
  error: string[];
  idOffer: number;
}

export interface GetDataOffer {
  idOffer: number;
  idUser: number;
  topic: string;
  description: string;
  availability: boolean;
}

export interface GetRequestOffer {
  idOffer: number;
}

export interface GetResponseOffer {
  status: number;
  error: string[];
  data: GetDataOffer | undefined;
}

export interface SearchDataOffer {
  idOffer: number;
  idUser: number;
  topic: string;
  description: string;
  availability: boolean;
}

export interface SearchRequestOffer {
  idUser: number;
}

export interface SearchResponseOffer {
  status: number;
  error: string[];
  data: SearchDataOffer[];
}

export interface ListDataOffer {
  idOffer: number;
  idUser: number;
  topic: string;
  description: string;
  availability: boolean;
}

export interface ListRequestOffer {
}

export interface ListResponseOffer {
  status: number;
  error: string[];
  data: ListDataOffer[];
}

export interface RemoveRequestOffer {
  idOffer: number;
}

export interface RemoveResponseOffer {
  status: number;
  error: string[];
  idOffer: number;
}

export interface UpdateDataOffer {
  idOffer: number;
  idUser: number;
  topic: string;
  description: string;
  availability: boolean;
}

export interface UpdateRequestOffer {
  idOffer: number;
  idUser?: number | undefined;
  topic?: string | undefined;
  description?: string | undefined;
  availability?: boolean | undefined;
}

export interface UpdateResponseOffer {
  status: number;
  error: string[];
  data: UpdateDataOffer | undefined;
}

/** soft delete */
export interface SoftDltRequestOffer {
  idOffer: number;
}

export interface SoftDltResponseOffer {
  status: number;
  error: string[];
  idOffer: number;
}

export interface RestoreDataOffer {
  idUser: number;
  topic: string;
  description: string;
  availability: boolean;
}

export interface RestoreRequestOffer {
  idOffer: number;
}

export interface RestoreResponseOffer {
  status: number;
  error: string[];
  data: RestoreDataOffer | undefined;
}

export const OFFER_PACKAGE_NAME = "offer";

export interface OfferServiceClient {
  addOffer(request: AddRequestOffer): Observable<AddResponseOffer>;

  getOfferById(request: GetRequestOffer): Observable<GetResponseOffer>;

  searchOfferByEmployer(request: SearchRequestOffer): Observable<SearchResponseOffer>;

  listOffers(request: ListRequestOffer): Observable<ListResponseOffer>;

  removeOffer(request: RemoveRequestOffer): Observable<RemoveResponseOffer>;

  updateOffer(request: UpdateRequestOffer): Observable<UpdateResponseOffer>;

  softDeleteOffer(request: SoftDltRequestOffer): Observable<SoftDltResponseOffer>;

  restoreOffer(request: RestoreRequestOffer): Observable<RestoreResponseOffer>;
}

export interface OfferServiceController {
  addOffer(request: AddRequestOffer): Promise<AddResponseOffer> | Observable<AddResponseOffer> | AddResponseOffer;

  getOfferById(request: GetRequestOffer): Promise<GetResponseOffer> | Observable<GetResponseOffer> | GetResponseOffer;

  searchOfferByEmployer(
    request: SearchRequestOffer,
  ): Promise<SearchResponseOffer> | Observable<SearchResponseOffer> | SearchResponseOffer;

  listOffers(request: ListRequestOffer): Promise<ListResponseOffer> | Observable<ListResponseOffer> | ListResponseOffer;

  removeOffer(
    request: RemoveRequestOffer,
  ): Promise<RemoveResponseOffer> | Observable<RemoveResponseOffer> | RemoveResponseOffer;

  updateOffer(
    request: UpdateRequestOffer,
  ): Promise<UpdateResponseOffer> | Observable<UpdateResponseOffer> | UpdateResponseOffer;

  softDeleteOffer(
    request: SoftDltRequestOffer,
  ): Promise<SoftDltResponseOffer> | Observable<SoftDltResponseOffer> | SoftDltResponseOffer;

  restoreOffer(
    request: RestoreRequestOffer,
  ): Promise<RestoreResponseOffer> | Observable<RestoreResponseOffer> | RestoreResponseOffer;
}

export function OfferServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "addOffer",
      "getOfferById",
      "searchOfferByEmployer",
      "listOffers",
      "removeOffer",
      "updateOffer",
      "softDeleteOffer",
      "restoreOffer",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OfferService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OfferService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const OFFER_SERVICE_NAME = "OfferService";

import { Controller, HttpException, HttpStatus, Inject, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch } from '@nestjs/common/decorators';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom, map, Observable } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';
import { roleEnum } from 'src/auth/roles/role.enum';
import { stateEnum } from 'src/application/enum/state.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { AddRequestApp, AddResponseApp, ApplicationServiceClient, APPLICATION_SERVICE_NAME, GetResponseApp, RemoveResponseApp, RestoreResponseApp, SearchRequestApp, SearchResponseApp, SoftDltResponseApp, UpdateRequestApp, UpdateResponseApp } from './application.pb';
import { Request } from 'express'
import { GetRequestOffer, GetResponseOffer, OfferServiceClient, OFFER_SERVICE_NAME } from 'src/offer/offer.pb';

@Controller('application')
export class ApplicationController {
    private application_svc: ApplicationServiceClient;


    @Inject(APPLICATION_SERVICE_NAME)
    private readonly application_client: ClientGrpc;
    
    private offer_svc: OfferServiceClient;
    
    @Inject(OFFER_SERVICE_NAME)
    private readonly offer_client: ClientGrpc;

    public onModuleInit(): void {
        this.application_svc = this.application_client.getService<ApplicationServiceClient>(APPLICATION_SERVICE_NAME);
        this.offer_svc = this.offer_client.getService<OfferServiceClient>(OFFER_SERVICE_NAME);
    }
    
    //add
    @Post('add')
    @UseGuards(AuthGuard)
    @Roles(roleEnum.STUDENT)
    private async addApp(@Body() body: AddRequestApp): Promise<Observable<AddResponseApp>> {
        const idOffer = body.idOffer;
        const idUser = body.idUser;
        console.log(idOffer, idUser);
            const rep: Observable<GetResponseOffer> = this.offer_svc.getOfferById({idOffer});
            const lastValue = await lastValueFrom(rep);
            console.log(lastValue);
            console.log(rep);
            console.log(lastValue.data);
            if (lastValue.status !== HttpStatus.OK) {
                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: 'Offer is not found',
                }, HttpStatus.FORBIDDEN, {});
              }
        return this.application_svc.addApp({idUser, idOffer});
    }


    //search
    @Get('searchApp/:idUser')
    @UseGuards(AuthGuard) 
    private async searchAppByCriteria(@Param('idUser', ParseIntPipe) idUser: number,
                                      @Body() bodySearchRequest: SearchRequestApp): Promise<Observable<SearchResponseApp>> {
        const idApp = bodySearchRequest.idApp;
        const idOffer = bodySearchRequest.idOffer;
        const state = bodySearchRequest.state;
        return this.application_svc.searchAppByCriteria({ idApp, idOffer, state, idUser });
    }
 //
    //remove
    @Delete('remove/:idUser/:idApp')
    @UseGuards(AuthGuard)
    @Roles(roleEnum.STUDENT)
    private async removeApp(@Param('idApp', ParseIntPipe) idApp: number,
                            @Param('idUser', ParseIntPipe) idUser: number): Promise<Observable<RemoveResponseApp>> {
        return this.application_svc.removeApp({
            idUser,
            idApp
        });
    }

    //update
    @Patch('update/:idUser/:idApp')
    @UseGuards(AuthGuard)
    @Roles(roleEnum.STUDENT)
    private async updateApp(@Param('idApp', ParseIntPipe) idApp: number,
                            @Param('idUser', ParseIntPipe) idUser: number,
                            @Body() bodyUpdateRequest: UpdateRequestApp): Promise<Observable<UpdateResponseApp>> {
        const idOffer = bodyUpdateRequest.idOffer;
        const state = bodyUpdateRequest.state;
        console.log(idOffer,state);
        return this.application_svc.updateApp({ idApp, idUser, idOffer, state });
    }

    //Refuse
    @Patch('refuse/:idUser/:idApp')
    @UseGuards(AuthGuard)
    @Roles(roleEnum.EMPLOYER)
    private async refuseApp(@Param('idApp', ParseIntPipe) idApp: number,
                            @Param('idUser', ParseIntPipe) idUser: number): Promise<Observable<UpdateResponseApp>> {
        return this.application_svc.updateApp({
            idApp,
            idUser,
            state : stateEnum.REJECTED
        });
    }
    //Accept
    @Patch('accept/:idUser/:idApp')
    @UseGuards(AuthGuard)
    @Roles(roleEnum.EMPLOYER)
    private async acceptApp(@Param('idApp', ParseIntPipe) idApp: number,
                            @Param('idUser', ParseIntPipe) idUser: number): Promise<Observable<UpdateResponseApp>> {
        return this.application_svc.updateApp({
            idApp,
            idUser,
            state : stateEnum.ACCEPTED
        });
    }
    //softDelete
    @Delete('softdelete/:idUser/:idApp')
    @UseGuards(AuthGuard)
    @Roles(roleEnum.STUDENT)
    private async softDeleteApp(@Param('idApp', ParseIntPipe) idApp: number,
                                @Param('idUser', ParseIntPipe) idUser: number): Promise<Observable<SoftDltResponseApp>> {
        return this.application_svc.softDeleteApp({ idApp, idUser});
    }
    //restore
    @Get('restore/:idUser/:idApp')
    @UseGuards(AuthGuard)
    @Roles(roleEnum.STUDENT)
    private async restoreApp(@Param('idApp', ParseIntPipe) idApp: number,
                             @Param('idUser', ParseIntPipe) idUser: number): Promise<Observable<RestoreResponseApp>> {
        return this.application_svc.restoreApp({ idApp, idUser });
    }

    
    //get
    @Get('getApp/:idUser/:idApp')
    @UseGuards(AuthGuard)
    private async getApp(@Param('idUser', ParseIntPipe) idUser: number, @Param('idApp', ParseIntPipe) idApp: number): Promise<Observable<GetResponseApp>> {
        return this.application_svc.getApp({ idApp, idUser });
    }

}


import { Controller, Get, Inject, OnModuleInit, Param, ParseIntPipe, UseGuards, Post, Body, Delete, Patch } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';
import { roleEnum } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { AddRequestOffer, AddResponseOffer, GetResponseOffer, ListRequestOffer, ListResponseOffer, OfferServiceClient, OFFER_SERVICE_NAME, RemoveResponseOffer, RestoreResponseOffer, SearchResponseOffer, SoftDltResponseOffer, UpdateRequestOffer, UpdateResponseOffer } from './offer.pb';

@Controller('offer')
export class OfferController {
    public svc: OfferServiceClient;
    
    @Inject(OFFER_SERVICE_NAME)
    private readonly client: ClientGrpc;
    
    public onModuleInit(): void {
        this.svc = this.client.getService<OfferServiceClient>(OFFER_SERVICE_NAME);
    }

    //list - getAll
    @Get('all')
    @UseGuards(AuthGuard)
    private async listOffers(@Body() body: ListRequestOffer): Promise<Observable<ListResponseOffer>> {
        return this.svc.listOffers({});
    }
    
    //add
    @Post('add')
    @UseGuards(AuthGuard)
    @Roles(roleEnum.EMPLOYER)
    private async addOffer(@Body() body: AddRequestOffer): Promise<Observable<AddResponseOffer>> {
        console.log(body);
        return this.svc.addOffer(body);
    }


    //getById
    @Get('get/:idOffer')
    @UseGuards(AuthGuard)
    private async getOfferById(@Param('idOffer', ParseIntPipe) idOffer: number): Promise<Observable<GetResponseOffer>> {
        return this.svc.getOfferById({ idOffer });
    }


    //search
    @Get('byemployer/:idUser')
    @UseGuards(AuthGuard)
    private async searchOfferByEmployer(@Param('idUser', ParseIntPipe) idUser: number): Promise<Observable<SearchResponseOffer>> {
        return this.svc.searchOfferByEmployer({ idUser });
    }

    
    
    //remove
    @Delete('remove/:idOffer')
    @UseGuards(AuthGuard)
    @Roles(roleEnum.EMPLOYER)
    private async removeOffer(@Param('idOffer', ParseIntPipe) idOffer: number): Promise<Observable<RemoveResponseOffer>> {
        return this.svc.removeOffer({ idOffer });
    }

    
    //restore
    @Get('restore/:idOffer')
    @UseGuards(AuthGuard)
    @Roles(roleEnum.EMPLOYER)
    private async restoreOffer(@Param('idOffer', ParseIntPipe) idOffer: number): Promise<Observable<RestoreResponseOffer>> {
        return this.svc.restoreOffer({ idOffer });
    }
    

    //update
    @Patch('update/:idOffer')
    @UseGuards(AuthGuard)
    @Roles(roleEnum.EMPLOYER)
    private async updateOffer(@Param('idOffer', ParseIntPipe) idOffer: number,
                              @Body() bodyUpdateOffer: UpdateRequestOffer): Promise<Observable<UpdateResponseOffer>> {
        const availability = bodyUpdateOffer.availability;
        const description = bodyUpdateOffer.description;
        const idUser = bodyUpdateOffer.idUser;
        const topic = bodyUpdateOffer.topic;
        console.log(availability, description, idUser, topic);
        return this.svc.updateOffer({ idOffer, idUser, topic, description, availability });
    }

    //softDelete
    @Delete('softdelete/:idOffer')
    @UseGuards(AuthGuard)
    @Roles(roleEnum.EMPLOYER)
    private async softDeleteOffer(@Param('idOffer', ParseIntPipe) idOffer: number): Promise<Observable<SoftDltResponseOffer>> {
        return this.svc.softDeleteOffer({ idOffer });
    }

    

}

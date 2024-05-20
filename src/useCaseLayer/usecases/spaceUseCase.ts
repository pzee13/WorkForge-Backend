import { IRequestValidator } from "../interfaces/repositries/validRepository";
import { SpaceRepository } from "../interfaces/repositries/spaceRepository";
import { createSpace } from "./space/createSpace";
import { getSpace } from "./space/getSpace";

export class SpaceUseCase{
    private readonly spaceRepository:SpaceRepository;
    private readonly requestValidator:IRequestValidator;

    constructor(
        spaceRepository:SpaceRepository,
        requestValidator:IRequestValidator
    ){
        this.spaceRepository = spaceRepository;
        this.requestValidator = requestValidator;
    }


    async createSpace({
        providerId,
        spaceName,
        spaceType,
        state,
        district,
        city,
        areaName,
        buildingName,
        description,
        floor,
        images,
        chargePerHour,
        availableSpaces,
        contactNumber,
        facilities,
        rentalAgreement,
        // startService,
        // endService,
        latitude,
        longitude,
    }:{
        providerId:string,
        spaceName:string,
        spaceType:string,
        state:string,
        district:string,
        city:string,
        areaName:string,
        buildingName:string,
        description:string,
        floor:string,
        images:string[] | null,
        chargePerHour:number,
        availableSpaces:number,
        contactNumber:string,
        facilities:string[]|null,
        rentalAgreement:string,
        // startService:Date,
        // endService:Date,
        latitude:number,
        longitude:number,
    }){
        return createSpace(
            this.requestValidator,
            this.spaceRepository,
            providerId,
            spaceName,
            spaceType,
            state,
            district,
            city,
            areaName,
            buildingName,
            description,
            floor,
            images,
            chargePerHour,
            availableSpaces, 
            contactNumber,
            facilities,
            rentalAgreement,
            // startService,
            // endService,
            latitude,
            longitude,
        );
    }

    async getSpace(){
        return getSpace()
    }
}
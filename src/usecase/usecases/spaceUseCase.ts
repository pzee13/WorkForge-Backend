import { IRequestValidator } from "../interfaces/repositries/validRepository";
import { SpaceRepository } from "../interfaces/repositries/spaceRepository";
import { createSpace } from "./space/createSpace";
import { getSpace } from "./space/getSpace";
import { createSpaceType } from "./space/createSpaceType";
import { getSpaceType } from "./space/getSpaceTypes";
import { editSpaceType } from "./space/editSpaceType"

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
        country,
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
        country:string,
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
            country,
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

    async createSpaceType({
        spaceTypeName,
        description,
        peopleAllowed,
        availableSpace
    }:{
        spaceTypeName:string,
        description:string,
        peopleAllowed:boolean,
        availableSpace:boolean,
    }){
        return createSpaceType(
            this.requestValidator,
            this.spaceRepository,
            spaceTypeName,
            description,
            peopleAllowed,
            availableSpace,

        );
    }

    async getSpaceType(){
        return getSpaceType()
    }

    async updateSpaceType({
                _id,
                spaceTypeName,
                description,
                peopleAllowed,
                availableSpace,
    }:{
        _id: string,
    spaceTypeName: string,
    description: string,            
    peopleAllowed: boolean,
    availableSpace: boolean,
    }){
        return editSpaceType(
            this.requestValidator,
            this.spaceRepository,
            _id,
            spaceTypeName,
            description,
            peopleAllowed,
            availableSpace,
        )
    }
}
export interface WorkSpace{
    _id?:string;
    providerId:string;
    spaceName:string;
    spaceType:string;
    state:string;
    district:string;
    country:string;
    areaName:string;
    buildingName:string;
    description:string;
    floor:string;
    images:string[] | null;
    chargePerHour:number;
    availableSpaces:number;
    isAccepted?:boolean;
    contactNumber:string;
    facilities:string[]|null;
    rentalAgreement:string;
    // startService:Date;
    // endService:Date;
    latitude:number,
    longitude:number,
}
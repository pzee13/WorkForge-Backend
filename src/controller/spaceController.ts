import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { SpaceUseCase } from "../usecase/usecases/spaceUseCase";

export class SpaceAdapter{
    private readonly spaceusecase:SpaceUseCase;

    constructor(spaceusecase:SpaceUseCase){
        this.spaceusecase = spaceusecase;
    }

    async createSpace(req: Req, res: Res, next: Next){
        try{
            const newSpace = await this.spaceusecase.createSpace(req.body)
            newSpace && 
             res.status(200).json({
                newSpace
             })
        }catch(err){
            next(err)
        }
    }

    async createSpaceType(req: Req, res: Res, next: Next){
        try{
            const newSpaceType = await this.spaceusecase.createSpaceType(req.body)
            newSpaceType &&
            res.status(200).json({
                newSpaceType
            })
        }catch(err){
            next(err)
        }
    }

    async getSpaceType(req: Req, res: Res, next: Next){
        try {
            console.log("get spaceType datas");
            const spacetypes = await this.spaceusecase.getSpaceType();
            spacetypes &&
              res.status(spacetypes.status).json({
                success: spacetypes.success,
                data: spacetypes.data,
              });
              console.log(spacetypes);
          } catch (err) {
            next(err);
          }
    }


    async updateSpaceType(req: Req, res: Res, next: Next){
        try{
            const updatedSpacetype = await this.spaceusecase.updateSpaceType(req.body)
            updatedSpacetype &&
            res.status(updatedSpacetype.status).json({
                success: updatedSpacetype.success,
                message: updatedSpacetype.message,
                spaceType: updatedSpacetype.data,
            });
        }catch(err){
            next(err)
        }
    }

}
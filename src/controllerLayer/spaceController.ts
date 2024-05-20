import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { SpaceUseCase } from "../useCaseLayer/usecases/spaceUseCase";

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

}
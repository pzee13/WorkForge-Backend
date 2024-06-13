import { SpaceAdapter } from "../../../controller/spaceController";
import { SpaceUseCase } from "../../../usecase/usecases/spaceUseCase";
import SpaceModel from "../../database/model/spaceModel";
import SpaceTypeModel from "../../database/model/spaceTypeModel";
import { SpaceRepositries } from "../../database/repository/spaceRepository";
import RequestValidator from "../../services/validateRepository";


const spaceRepository = new SpaceRepositries(SpaceModel,SpaceTypeModel)
const requestValidator = new RequestValidator()
const spaceusecase = new SpaceUseCase(spaceRepository,requestValidator)
const spaceAdapter = new SpaceAdapter(spaceusecase)

export { spaceAdapter }
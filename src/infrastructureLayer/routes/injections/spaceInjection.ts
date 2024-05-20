import { SpaceAdapter } from "../../../controllerLayer/spaceController";
import { SpaceUseCase } from "../../../useCaseLayer/usecases/spaceUseCase";
import SpaceModel from "../../database/model/spaceModel";
import { SpaceRepositries } from "../../database/repository/spaceRepository";
import RequestValidator from "../../services/validateRepository";


const spaceRepository = new SpaceRepositries(SpaceModel)
const requestValidator = new RequestValidator()
const spaceusecase = new SpaceUseCase(spaceRepository,requestValidator)
const spaceAdapter = new SpaceAdapter(spaceusecase)

export { spaceAdapter }
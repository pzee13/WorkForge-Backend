import { BookingAdapter } from "../../../controller/bookingController";
import { BookingUseCase } from "../../../usecase/usecases/bookingUseCase";
import AdminModel from "../../database/model/adminModel";
import BookingModel from "../../database/model/bookingModel";
import ProviderModel from "../../database/model/providerModel";
import SpaceModel from "../../database/model/spaceModel"
import UserModel from "../../database/model/userModel"
import SpaceTypeModel from "../../database/model/spaceTypeModel";
import { AdminRepository } from "../../database/repository/adminRepository";
import { BookingRepositories } from "../../database/repository/bookingRepository";
import { ProviderRepository } from "../../database/repository/providerRepository";
import { SpaceRepositries } from "../../database/repository/spaceRepository";
import StripeService from "../../services/stripe";
import RequestValidator from "../../services/validateRepository";
import { UserRepository } from "../../database/repository/userRepository";


// creating injection to provide the route
const bookingRepository = new BookingRepositories(BookingModel,SpaceModel);
const providerRepository = new ProviderRepository(ProviderModel)
const spaceRepository = new SpaceRepositries(SpaceModel,SpaceTypeModel)
const userRepository = new UserRepository(UserModel)
const adminRepository = new AdminRepository(AdminModel);
const requestValidator = new RequestValidator();
const stripe = new StripeService()
const bookingceusecase = new BookingUseCase(bookingRepository,providerRepository,userRepository,adminRepository, requestValidator,stripe);
const bookingAdapter = new BookingAdapter(bookingceusecase);


export { bookingAdapter };
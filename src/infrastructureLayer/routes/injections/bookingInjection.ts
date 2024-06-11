import { BookingAdapter } from "../../../controller/bookingController";
import { BookingUseCase } from "../../../useCaseLayer/usecases/bookingUseCase";
import AdminModel from "../../database/model/adminModel";
import BookingModel from "../../database/model/bookingModel";
import ProviderModel from "../../database/model/providerModel";
import { AdminRepository } from "../../database/repository/adminRepository";
import { BookingRepositories } from "../../database/repository/bookingRepository";
import { ProviderRepository } from "../../database/repository/providerRepository";
import StripeService from "../../services/stripe";
import RequestValidator from "../../services/validateRepository";


// creating injection to provide the route
const bookingRepository = new BookingRepositories(BookingModel);
const providerRepository = new ProviderRepository(ProviderModel)
const adminRepository = new AdminRepository(AdminModel);
const requestValidator = new RequestValidator();
const stripe = new StripeService()
const bookingceusecase = new BookingUseCase(bookingRepository,providerRepository,adminRepository, requestValidator,stripe);
const bookingAdapter = new BookingAdapter(bookingceusecase);


export { bookingAdapter };
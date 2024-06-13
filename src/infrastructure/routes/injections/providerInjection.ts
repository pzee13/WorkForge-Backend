import ProviderModel from '../../database/model/providerModel'
import { ProviderRepository } from '../../database/repository/providerRepository';
import { ProviderAdapter } from '../../../controller/providerController';
import { ProviderUseCase } from '../../../usecase/usecases/providerUseCase';
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import Nodemailer from "../../services/nodemailer"
import RequestValidator from "../../services/validateRepository";

const providerRepository = new ProviderRepository(ProviderModel)
const bcrypt = new Encrypt();
const jwt = new JwtPassword();
const nodemailer = new Nodemailer();
const requestValidator = new RequestValidator();

const providerusecase = new ProviderUseCase(
    providerRepository,
    bcrypt,
    jwt,
    nodemailer,
    requestValidator
)

const providerAdapter = new ProviderAdapter(providerusecase)

export { 
    providerRepository,
    providerAdapter
}
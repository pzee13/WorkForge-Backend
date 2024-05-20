import { AdminAdapter } from "../../../controllerLayer/adminController";
import { AdminUseCase } from "../../../useCaseLayer/usecases/adminUseCase";
import AdminModel from "../../database/model/adminModel";
import { AdminRepository } from "../../database/repository/adminRepository";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import Nodemailer from "../../services/nodemailer"
import RequestValidator from "../../services/validateRepository";
import SpaceModel from "../../database/model/spaceModel";
import { SpaceRepositries } from "../../database/repository/spaceRepository";
import { ProviderRepository } from "../../database/repository/providerRepository";
import ProviderModel from "../../database/model/providerModel";

const adminRepository = new AdminRepository(AdminModel);
const spaceRepository = new SpaceRepositries(SpaceModel)
const providerRepository = new ProviderRepository(ProviderModel)

const bcrypt = new Encrypt();
const jwt = new JwtPassword();
const nodemailer = new Nodemailer();

const requestValidator = new RequestValidator();
const adminusecase = new AdminUseCase(
  adminRepository,
  spaceRepository,
  providerRepository,
  bcrypt,
  jwt,
  requestValidator,
  nodemailer,
);

const adminAdapter = new AdminAdapter(adminusecase);

export { adminAdapter, adminusecase };
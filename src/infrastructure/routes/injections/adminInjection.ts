import { AdminAdapter } from "../../../controller/adminController";
import { AdminUseCase } from "../../../usecase/usecases/adminUseCase";
import AdminModel from "../../database/model/adminModel";
import { AdminRepository } from "../../database/repository/adminRepository";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import Nodemailer from "../../services/nodemailer"
import RequestValidator from "../../services/validateRepository";
import SpaceModel from "../../database/model/spaceModel";
import UserModel from "../../database/model/userModel";
import { SpaceRepositries } from "../../database/repository/spaceRepository";
import { ProviderRepository } from "../../database/repository/providerRepository";
import { UserRepository } from "../../database/repository/userRepository";
import ProviderModel from "../../database/model/providerModel";
import SpaceTypeModel from "../../database/model/spaceTypeModel";

const adminRepository = new AdminRepository(AdminModel);
const spaceRepository = new SpaceRepositries(SpaceModel,SpaceTypeModel)
const providerRepository = new ProviderRepository(ProviderModel)
const userRepository = new UserRepository(UserModel)

const bcrypt = new Encrypt();
const jwt = new JwtPassword();
const nodemailer = new Nodemailer();

const requestValidator = new RequestValidator();
const adminusecase = new AdminUseCase(
  adminRepository,
  spaceRepository,
  userRepository,
  providerRepository,
  bcrypt,
  jwt,
  requestValidator,
  nodemailer,
);

const adminAdapter = new AdminAdapter(adminusecase);

export { adminAdapter, adminusecase };
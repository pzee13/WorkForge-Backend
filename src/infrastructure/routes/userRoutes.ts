import express, { NextFunction, Request, Response } from "express";
import { userAdapter } from "./injections/userInjection";
import { bookingAdapter } from "./injections/bookingInjection";
import AuthMiddleware from "../middleware/authMiddleware";
import { spaceAdapter } from "./injections/spaceInjection";

const router = express.Router();

router.post("/register", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.createUser(req, res, next)
);

router.post("/login", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.loginUser(req, res, next)
);

router.post("/googleAuth", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.googleAuth(req, res, next)
);

router.post("/sendEmail", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.sendEmail(req, res, next)
);

router.post("/verifyEmail", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.emailVerification(req, res, next)
);

router.post(
  "/forgotPassword",
  (req: Request, res: Response, next: NextFunction) =>
    userAdapter.forgotPassword(req, res, next)
);

router.post(
  "/validateAccessToken",
  (req: Request, res: Response, next: NextFunction) =>
    userAdapter.validateAccessToken(req, res, next)
);


router.post(
  "/resetPassword",
  (req: Request, res: Response, next: NextFunction) =>
    userAdapter.resetPassword(req, res, next)
);



router.post("/logout",AuthMiddleware.protectUser, (req:Request,res:Response,next:NextFunction) => 
      userAdapter.logoutUser(req,res,next)
   )

   router.get(
    "/getSpaceTypes",

    (req: Request, res: Response, next: NextFunction) =>
      spaceAdapter.getSpaceType(req, res, next)
  )


router.get("/spaces", 

(req:Request,res:Response,next:NextFunction) => 
  userAdapter.getSpaces(req,res,next)
)

router.patch("/updateProfile",
AuthMiddleware.protectUser,
 (req: Request, res: Response, next: NextFunction) =>
  userAdapter.updateProfile(req, res, next)
);


router.post(
  "/bookSpace",
  AuthMiddleware.protectUser,
  (req: Request, res: Response, next: NextFunction) =>
    bookingAdapter.bookSpace(req, res, next)
);

router.post(
  "/preBookings",
  AuthMiddleware.protectUser,
  (req: Request, res: Response, next: NextFunction) =>
    bookingAdapter.getPreBookings(req, res, next)
);

router.post("/payment", (req: Request, res: Response, next: NextFunction) => {
  bookingAdapter.payment(req, res, next);
});

router.post("/webhook", (req: Request, res: Response, next: NextFunction) => {
  bookingAdapter.webhook(req, res, next);
});


router.get("/bookings",(req:Request, res: Response, next: NextFunction) => {
  bookingAdapter.getBookings(req,res,next);
})


router.post("/cancelBooking", AuthMiddleware.protectUser, (req: Request, res: Response, next: NextFunction) => 
  bookingAdapter.cancelBooking(req, res, next)
);



router.get("/getSpaceUser",(req:Request, res: Response, next: NextFunction) => {
  spaceAdapter.getSpaces(req,res,next);
})









export default router;

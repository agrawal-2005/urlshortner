import { getUser } from "../service/auth.js";

//Authentication
function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie) {
    return next();
  }

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  next();
}

//Authorization
function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");

    return next();
  };
}

// async function restrictToLoggedinUserOnly(req, res, next) {
//   // console.log(req.cookies);

//   const userUid = req.headers["authorization"];
//   const token = userUid.split("Bearer ")[1];
//   if (!userUid) return res.redirect("/login");
//   const user = getUser(token);
//   // const userUid = req.cookies?.uid;

//   // if (!userUid) return res.redirect("/login");

//   // const user = getUser(userUid);
//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// async function isLogin(req, res, next) {
//   // console.log(req.headers);
//   const userUid = req.headers["authorization"];
//   const token = userUid.split("Bearer ")[1];
//   const user = getUser(token);

//   // const userUid = req.cookies?.uid;

//   // const user = getUser(userUid);
//   req.user = user;
//   next();
// }

export { checkForAuthentication, restrictTo };

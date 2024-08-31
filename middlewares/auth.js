import { getUser } from "../service/auth.js";

async function restrictToLoggedinUserOnly(req, res, next) {
  // console.log(req.cookies);

  const userUid = req.headers['authorization'];
  const token = userUid.split("Bearer ")[1];
  if(!userUid) return res.redirect('/login');
  const user = getUser(token);
  // const userUid = req.cookies?.uid;

  // if (!userUid) return res.redirect("/login");

  // const user = getUser(userUid);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function isLogin(req, res, next) {
  // console.log(req.headers);
  const userUid = req.headers['authorization'];
  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);

  // const userUid = req.cookies?.uid;

  // const user = getUser(userUid);
  req.user = user;
  next();
}

export { restrictToLoggedinUserOnly, isLogin };
import { verifyToken } from "../helper/token.js";

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      throw new Error(" User not authorized !");
    }

    const decoded = verifyToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error.message);

    res.send(error.message);
  }
};

export { isLoggedIn };

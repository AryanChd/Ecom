import userServices from "../services/userServices.js";

 const createUser = async (req, res) => {

  try {


    const { name, email, password, phone, confirmPassword } = req.body;

    if (!name) {
      return res.send("UserName required")
    }
    if (!password) {
      return res.send("password required")
    }

    if (password !== confirmPassword) {
      return res.send("password doesnot match")
    }


    const data = await userServices.createUser(req.body);


    res.send(data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "error occured",
      error: error.message
    })
  }
};

export {createUser};
import user from "../models/User.js"


const createUser = async(data) => {

   return  await user.create(data)

}


export default {createUser}
const isAdmin = (req,res)=> { 

try {

        const user = req.user 

    if(user.role !== 'ADMIN'){
        throw new Error("User is not a admin !")

    }
    next()

} catch (error) {

    res.status(403).json({
        message: "User id not Admin !",
        error:error.message

    })
    
}

}

export {isAdmin}    
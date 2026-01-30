
const adminAuth = (req, res,next)=>{
    const token = "xyz"
    const isAdminAuthrized = token === "xyz"

    if(!isAdminAuthrized){
        res.status(401).send("unAuthrized adminData")
    }else{
        next();
    }
}

const userAuth = (req, res,next)=>{
    const token = "xyzfadsfasd"
    // const token = "xyz"
    const isAdminAuthrized = token === "xyz"

    if(!isAdminAuthrized){
        res.status(401).send("unAuthrized userData")
    }else{
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth
}
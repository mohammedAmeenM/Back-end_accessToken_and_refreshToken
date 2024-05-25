

const userAccess = async (req,res)=>{
    console.log(req.user)
    res.status(200).json({message:"User authenticated"});
}

module.exports = {
    userAccess
}
import jwt from "jsonwebtoken"
export const genratejwt=async (userid,res) => {
    try {
        const token =jwt.sign({userid},process.env.JWT_SECRET,{
            expiresIn:"2d"
        })
        res.cookie("jwt",token,{
            maxAge:2*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !=="development"

        })
        return token;
    } catch (error) {
        console.log(error.message);
        console.log("unable to genrate jwttoken ");
        
    }
    
}

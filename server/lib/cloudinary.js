import {v2 as cloudinary} from "cloudinary"
import {config} from "dotenv"
config()
cloudinary.config({
    cloud_name:process.env.CLOUDINAR_CLOUD_NAME,
    cloud_apikey:process.env.CLOUDINAR_CLOUD_APIKEY,
    cloud_apisecret:process.env.CLOUDINAR_APISECRET,
})
export default cloudinary

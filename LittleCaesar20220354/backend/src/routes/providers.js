import expres from "express"
import providerController from "../controllers/providersController.js"
import upload from "../utils/CloudinaryConfig.js"

const router = expres.Router()

router.route("/")
.get(providerController.getAllProviders)
.post(providerController.inserProviders)

router.route("/:id")
.put(upload.single("image"), providerController.updateProvider)
.delete(providerController.deleteProvider)

export default router;
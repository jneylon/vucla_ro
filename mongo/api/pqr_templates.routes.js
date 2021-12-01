import { Router } from "express"
import PQRTemplatesCTRL from "./pqr_templates.controller.js"

const router = new Router()

router.route("/").get(PQRTemplatesCTRL.apiGetAllTemplates)
router.route("/folders").get(PQRTemplatesCTRL.apiGetUniqueFolders)
router.route("/templates/:folder").get(PQRTemplatesCTRL.apiGetFolderTemplates)
router.route("/match/:folder/:template").get(PQRTemplatesCTRL.apiGetTemplate)
router.route("/delete/:id").delete(PQRTemplatesCTRL.apiDeleteTemplate)
router.route("/new").post(PQRTemplatesCTRL.apiPostNewTemplate)

export default router
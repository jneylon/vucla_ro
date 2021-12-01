import { Router } from "express"
import PQRPatientsCTRL from "./pqr_patients.controller.js"

const router = new Router()

router.route("/").get(PQRPatientsCTRL.apiGetAllPatients)
router.route("/get/:id").get(PQRPatientsCTRL.apiGetPatientByID)
router.route("/match/:mrn/:course/:plan_id").get(PQRPatientsCTRL.apiGetPatientByMatch)
router.route("/delete/:id").delete(PQRPatientsCTRL.apiDeletePatientByID)
router.route("/new").post(PQRPatientsCTRL.apiPostNewPatient)

export default router
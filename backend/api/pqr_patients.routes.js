import { Router } from "express"
import PQRPatientsCTRL from "./pqr_patients.controller.js"

const router = new Router()

router.route("/").get(PQRPatientsCTRL.apiGetAllPatients)
router.route("/get/:id").get(PQRPatientsCTRL.apiGetPatientByID)
router.route("/template/:match_folder/:match_template/:laterality/:fractional_dose").get(PQRPatientsCTRL.apiGetPatientsByQuery)
router.route("/dose_levels/:match_folder/:match_template/:laterality").get(PQRPatientsCTRL.apiGetDoseLevels)
router.route("/count/:match_folder/:match_template/:laterality/:fractional_dose").get(PQRPatientsCTRL.apiGetPatientCount)
router.route("/stats/:match_folder/:match_template/:laterality/:fractional_dose").get(PQRPatientsCTRL.apiAggregateStats)
router.route("/match/:mrn/:course_id/:plan_id").get(PQRPatientsCTRL.apiGetPatientByMatch)
router.route("/delete/:id").delete(PQRPatientsCTRL.apiDeletePatientByID)
router.route("/new").post(PQRPatientsCTRL.apiPostNewPatient)

export default router
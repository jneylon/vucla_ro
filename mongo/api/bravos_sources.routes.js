import { Router } from "express"
import BravosSourcesCTRL from "./bravos_sources.controller.js"

const router = new Router()

router.route("/").get(BravosSourcesCTRL.apiGetBravosSources)
router.route("/active").get(BravosSourcesCTRL.apiGetBravosSourceActive)
router.route("/new").post(BravosSourcesCTRL.apiPostNewSource)
router.route("/delete").delete(BravosSourcesCTRL.apiDeleteSource)
router.route("/activate").put(BravosSourcesCTRL.apiUpdateActiveSource)

export default router
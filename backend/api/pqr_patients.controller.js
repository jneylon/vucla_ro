import PQRPatientsDAO from "../dao/pqr_patients.js";

export default class PQRPatientsCTRL {

    static async apiGetAllPatients(req, res) {
        const RESULTS_PER_PAGE = 10
        const { ptList, ptCount } = await PQRPatientsDAO.getAllPatients()
        let response = {
            patients: ptList,
            page: 0,
            filters: {},
            entries_per_page: RESULTS_PER_PAGE,
            pt_count: ptCount,
        }
        res.json(response)
    }

    static async apiGetPatientByID(req, res) {
        const { pt } = await PQRPatientsDAO.getPatientByID(req.params)
        let response = {
            patient: pt,
        }
        res.json(response)
    }

    static async apiGetPatientByMatch(req, res) {
        const { pt } = await PQRPatientsDAO.getPatientByMatch(req.params)
        let response = {
            patient: pt,
        }
        res.json(response)
    }

    static async apiDeletePatientByID(req, res) {
        try {
            console.log(req.params);
            const deleteResult = await PQRPatientsDAO.deletePatientByID(req.params)
            console.log(deleteResult)
            var { error } = deleteResult
            if (error) {
                res.status(100).json({ error })
                return 
            }
            res.json(deleteResult)
        } catch (e) {
            console.log(req.params);
            res.status(500).json(e)
        }
    }

    static async apiPostNewPatient(req, res) {
        try {
            const patient = req.body;
            console.log(patient);
            const pResponse = await PQRPatientsDAO.postPatient(patient)
            console.log(pResponse)
            var { error } = pResponse
            if (error) {
                res.status(500).json({error})
                return
            }
            res.json(pResponse)
        } catch (e) {
            res.status(500).json({e})
        }
    }

}
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
            patient: pt
        }
        res.json(response)
    }

    static async apiGetPatientsByQuery(req, res) {
        var match = req.params;
        if (match.laterality === "Both" || match.laterality === "None") {
            delete match.laterality;
        }
        if (match.fractional_dose === "All") {
            delete match.fractional_dose
        }
        //console.log(match);

        const { ptList, ptCount } = await PQRPatientsDAO.getPatientsByQuery(match)
        let response = {
            patients: ptList,
            pt_count: ptCount,
        }
        res.json(response)
    }


    static async apiGetDoseLevels(req, res) {
        var match = req.params;
        if (match.laterality === "Both" || match.laterality === "None") {
            delete match.laterality;
        }
        //if (match.fractional_dose === "All") {
        //    delete match.fractional_dose
        //}
        //console.log(match);

        const { doses } = await PQRPatientsDAO.getDoseLevels(match)
        let response = {
            dose_levels: doses,
        }
        res.json(response)
    }

    static async apiGetPatientCount(req, res) {
        var match = req.params;
        if (match.laterality === "Both" || match.laterality === "None") {
            delete match.laterality;
        }
        if (match.fractional_dose === "All") {
            delete match.fractional_dose
        }
        //console.log(match);

        const { ptCount } = await PQRPatientsDAO.getPatientCount(match)
        let response = {
            pt_count: ptCount,
        }
        res.json(response)
    }

    static async apiAggregateStats(req, res) {
        var match = req.params;
        if (match.laterality === "Both" || match.laterality === "None") {
            delete match.laterality;
        }
        if (match.fractional_dose === "All") {
            delete match.fractional_dose
        }
        //console.log(match);

        const { dataArray } = await PQRPatientsDAO.aggregateStats(match)
        let response = {
            stats: dataArray
        }
        res.json(response)
    }

    static async apiDeletePatientByID(req, res) {
        try {
            //console.log(req.params);
            const deleteResult = await PQRPatientsDAO.deletePatientByID(req.params)
            //console.log(deleteResult)
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
            //console.log(patient);
            const pResponse = await PQRPatientsDAO.postPatient(patient)
            //console.log(pResponse)
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
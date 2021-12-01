import PQRTemplatesDAO from "../dao/pqr_templates.js";

export default class PQRTemplatesCTRL {

    static async apiGetAllTemplates(req, res, next) {
        const RESULTS_PER_PAGE = 10
        const { templateList, totalTemplates } = await PQRTemplatesDAO.getAllTemplates()
        let response = {
            templates: templateList,
            page: 0,
            filters: {},
            entries_per_page: RESULTS_PER_PAGE,
            total_results: totalTemplates,
        }
        res.json(response)
    }

    static async apiGetUniqueFolders(req, res, next) {
        const { folderList } = await PQRTemplatesDAO.getUniqueFolders()
        let response = {
            folders: folderList,
        }
        res.json(response)
    }

    static async apiGetFolderTemplates(req, res, next) {
        const { tempList } = await PQRTemplatesDAO.getFolderTemplates(req.params)
        let response = {
            templates: tempList,
        }
        res.json(response)
    }

    static async apiPostNewTemplate(req, res) {
        try {
            const template = req.body;
            console.log(template);
            const tResponse = await PQRTemplatesDAO.postTemplate(template)
            console.log(tResponse)
            var { error } = tResponse
            if (error) {
                res.status(500).json({error})
                return
            }
            res.json(tResponse)
        } catch (e) {
            res.status(500).json({e})
        }
    }

    static async apiDeleteTemplate(req, res) {
        try {
            console.log(req.params);
            const deleteResult = await PQRTemplatesDAO.deleteTemplate(req.params)
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

    static async apiGetTemplate(req, res) {
        const { tempList } = await PQRTemplatesDAO.getTemplate(req.params)
        let response = {
            template: tempList,
        }
        console.log(tempList)
        res.json(response)
    }
}
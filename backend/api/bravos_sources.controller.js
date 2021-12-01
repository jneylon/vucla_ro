import BravosSourcesDAO from "../dao/bravos_sources.js";

export default class BravosSourcesCTRL {
    
    static async apiGetBravosSources(req, res, next) {
        const SOURCES_PER_PAGE = 10
        const { sourceList, totalSources } = await BravosSourcesDAO.getBravosSources()
        let response = {
            sources: sourceList,
            page: 0,
            filters: {},
            entries_per_page: SOURCES_PER_PAGE,
            total_results: totalSources,
        }
        res.json(response)
    }

    static async apiGetBravosSourceActive(req, res, next) {
        const { active_source, totalSources } = await BravosSourcesDAO.getBravosSourceActive()
        let response = {
            source: active_source,
            page: 0,
            filters: {},
            total_results: totalSources,
        }
        res.json(response)
    }

    static async apiPostNewSource(req, res) {
        try {
            const source = req.body;
            console.log(source);
            const sourceResponse = await BravosSourcesDAO.postBravosSource(source)
            console.log(sourceResponse)
            var { error } = sourceResponse
            if (error) {
                res.status(500).json({error})
                return
            }
            res.json(sourceResponse)
        } catch (e) {
            res.status(500).json({e})
        }
    }

    static async apiDeleteSource(req, res) {
        try {
            const sid = req.body;
            console.log(sid);
            const deleteResult = await BravosSourcesDAO.deleteBravosSource(sid)
            console.log(deleteResult)
            var { error } = deleteResult
            if (error) {
                res.status(100).json({ error })
                return 
            }
            res.json(deleteResult)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async apiUpdateActiveSource(req, res) {
        try {
            const sid = req.body;
            console.log(sid);
            const _result = await BravosSourcesDAO.updateActiveSource(sid)
            console.log(_result)
            var { _error } = _result
            if (_error) {
                res.status(100).json({ _error })
                return 
            }
            res.json(_result)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}
import { ObjectID, ObjectId } from "bson"

let vuclaro
let bravos_sources

export default class BravosSourcesDAO {
    static async injectDB(conn) {
        if (bravos_sources) {
            return
        }
        try {
            vuclaro = await conn.db(process.env.VUCLARO_NS)
            bravos_sources = await conn.db(process.env.VUCLARO_NS).collection('bravos_sources')
            //this.bs = bravos_sources
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in BravosSourcesDAO: ${e}`,
            )
        }
    }

    /*
    * @param {string} id
    * @param {string} isotope
    * @param {float} half_life
    * @param {string} serial
    * @param {Date} calibration
    * @param {Date} ten_ci_date
    * @param {float} curie
    * @param {float} gbq
    * @param {float} air_kerma_m
    * @param {float} air_kerma_cm
    * @param {bool} active
    * @param {string} timestamp
    */

    static async getBravosSources({ page = 0, countPerPage = 10 } = {}) {
        let query = {}
        let cursor
        
        try {
            cursor = await bravos_sources.find(query).sort({_id: -1})
        } catch (e) {
            console.log(`Unable to issue find command, ${e}`)
            return { sourceList: [], totalSources: 0 }
        }
        
        const displayCursor = cursor.limit(countPerPage)
        try {
            const sourceList = await displayCursor.toArray()
            const totalSources = page === 0 ? await bravos_sources.countDocuments(query) : 0
            return { sourceList, totalSources }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { sourceList: [], totalSources: 0 }
        }
    }

    static async getBravosSourceActive({ page = 0, countPerPage = 1 } = {}) {
        let query = { active: true }
        let cursor
        
        try {
            cursor = await bravos_sources.find(query).sort({_id: -1})
        } catch (e) {
            console.log(`Unable to issue find command, ${e}`)
            return { active_source: [], totalSources: 0 }
        }
        
        const displayCursor = cursor.limit(countPerPage)
        try {
            const active_source = await displayCursor.toArray()
            const totalSources = page === 0 ? await bravos_sources.countDocuments(query) : 0
            return { active_source, totalSources }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { active_source: [], totalSources: 0 }
        }
    }

    static async postBravosSource(new_source) {
        try {
            // if new_source.active, update all other source to inactive
            const response = await bravos_sources.insertOne(new_source)
            return response
        } catch(e) {
            console.error(`Unable to add new source: ${e}`)
            if (e.code == 11000) {
                return { error: "Source already exists in database!"}
            } else {
                return { error: e }
            }
        }
    }

    static async deleteBravosSource(sid) {
        try {
            await bravos_sources.deleteOne({'_id': sid._id})
            if (!(await this.checkIfSourceExists(sid))) {
                console.log("Successful deletion.")
                return { success: true }
            } else {
                console.error("Deletion unsuccessful")
                return { error: "Deletion unsuccessful" }
            }
        } catch (e) {
            console.error(`Unable to delete source: ${e}`)
            return { error: e }
        }
    }

    static async checkIfSourceExists(sid) {
        try {
            const response = await bravos_sources.findOne({'_id': sid._id})
            console.log(response)
            return response
        } catch (e) {
            console.error(`Unable to query sources: ${e}`)
            return { error: e }
        }
    }

    static async updateActiveSource(sid) {
        try {  
            const inactres = await bravos_sources.updateMany({}, {$set: { active: false } })
            //console.log(response)
            const actres = await bravos_sources.updateOne({_id: sid._id}, { $set: { active: true} })
            //console.log(response)
            return actres
        } catch (e) {
            console.error(`Unable to set source as active: ${e}`)
            return { error: e }
        }
    }
}


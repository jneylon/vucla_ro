import { ObjectID, ObjectId } from "bson"

let pqr_templates

export default class PQRTemplatesDAO {
    static async injectDB(conn) {
        if (pqr_templates) {
            return
        }
        try {
            pqr_templates = await conn.db(process.env.VUCLARO_NS).collection('pqr_templates')
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in PQRTemplateDAO: ${e}`,
            )
        }
    }

    static async getAllTemplates({ page = 0, countPerPage = 10 } = {}) {
        let query = {}
        let cursor
        
        try {
            cursor = await pqr_templates.find(query).sort({folder: 1})
        } catch (e) {
            console.log(`Unable to issue find command, ${e}`)
            return { templateList: [], totalTemplates: 0 }
        }
        
        const displayCursor = cursor.limit(countPerPage)
        try {
            const templateList = await displayCursor.toArray()
            const totalTemplates = page === 0 ? await pqr_templates.countDocuments(query) : 0
            return { templateList, totalTemplates }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { templateList: [], totalTemplates: 0 }
        }
    }

    static async getUniqueFolders() {
        try {
            const folderList = await pqr_templates.distinct('folder')
            //console.log(folderList)
            return { folderList }
        } catch (e) {
            console.error(`Unable to retrieve list of folders, ${e}`)
            return { folderList: [] }
        }
    }

    
    static async getFolderTemplates(query) {
        let cursor 

        try {
            cursor = await pqr_templates.find(query)
            const tempList = await cursor.toArray()
            //console.log(tempList)
            return { tempList }
        } catch (e) {
            console.log(`Unable to issue find command, ${e}`)
            return { templateList: [] }
        }
    }
    
    static async getTemplate(query) {
        let cursor 

        try {
            cursor = await pqr_templates.find(query)
            const tempList = await cursor.toArray()
            //console.log(tempList)
            return { tempList }
        } catch (e) {
            console.log(`Unable to issue find command, ${e}`)
            return { templateList: [] }
        }
    }

    static async postTemplate(new_template) {
        try {
            // if new_source.active, update all other source to inactive
            const response = await pqr_templates.insertOne(new_template)
            return response
        } catch(e) {
            console.error(`Unable to add new template: ${e}`)
            if (e.code == 11000) {
                return { error: "Template already exists in database!"}
            } else {
                return { error: e }
            }
        }
    }

    static async deleteTemplate(sid) {
        try {
            await pqr_templates.deleteOne({'_id': ObjectId(sid.id)})
            if (!(await this.checkIfTemplateExists(sid))) {
                console.log("Successful deletion.")
                return { success: true }
            } else {
                console.error("Deletion unsuccessful")
                return { error: "Deletion unsuccessful" }
            }
        } catch (e) {
            console.error(`Unable to delete template: ${e}`)
            return { error: e }
        }
    }

    static async checkIfTemplateExists(sid) {
        try {
            const response = await pqr_templates.findOne({'_id': ObjectId(sid.id)})
            console.log(response)
            return response
        } catch (e) {
            console.error(`Unable to query templates: ${e}`)
            return { error: e }
        }
    }
}
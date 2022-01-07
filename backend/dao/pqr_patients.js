import { ObjectID, ObjectId } from "bson"

let pqr_patients

export default class PQRPatientsDAO {
    static async injectDB(conn) {
        if (pqr_patients) {
            return
        }
        try {
            pqr_patients = await conn.db(process.env.VUCLARO_NS).collection('pqr_patients')
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in PQRPatientsDAO: ${e}`,
            )
        }
    }

    static async getAllPatients({ page = 0, countPerPage = 10 } = {}) {
        let query = {}
        let cursor
        
        try {
            cursor = await pqr_patients.find(query).sort({mrn: 1})
        } catch (e) {
            console.log(`Unable to issue find command, ${e}`)
            return { ptList: [], ptCount: 0 }
        }
        
        const displayCursor = cursor.limit(countPerPage)
        try {
            const ptList = await displayCursor.toArray()
            const ptCount = page === 0 ? await pqr_patients.countDocuments(query) : 0
            return { ptList, ptCount }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { ptList: [], ptCount: 0 }
        }
    }

    static async getPatientByID(query) {
        let pt
        try {
            pt = await pqr_patients.findOne({'_id': ObjectId(query.id)})
            return pt
        } catch (e) {
            console.log(`Unable to issue find command, ${e}`)
            return { pt: [] }
        }
    }

    static async getPatientByMatch(query) {
        let pt
        //console.log(query)
        try {
            pt = await pqr_patients.findOne(query)
            //console.log(pt)
            return { pt }
        } catch (e) {
            console.log(`Unable to issue find command, ${e}`)
            return { pt: [] }
        }
    }

    static async getPatientsByQuery(query) {
        console.log(query)
        let cursor
        
        try {
            cursor = await pqr_patients.find(query).sort({mrn: 1})
        } catch (e) {
            console.log(`Unable to issue find command, ${e}`)
            return { ptList: [], ptCount: 0 }
        }

        try {
            const ptList = await cursor.toArray()
            const ptCount = await pqr_patients.countDocuments(query)
            return { ptList, ptCount }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { ptList: [], ptCount: 0 }
        }
    }

    
    static async getDoseLevels(query) {
        console.log(query)       

        try {
            const doses = await pqr_patients.distinct('fractional_dose', query)
            return { doses }
        } catch (e) {
            console.error(`Unable to complete distinct dose level query, ${e}`)
            return { doses: [] }
        }
    }

    static async getPatientCount(query) {
        console.log(query)       

        try {
            const ptCount = await pqr_patients.countDocuments(query)
            return { ptCount }
        } catch (e) {
            console.error(`Unable to count documents, ${e}`)
            return { ptCount: 0 }
        }
    }

    static async aggregateStats(match) {
        var pipeline = [
            // Match only orders made in 2020
            {"$match": match},
            {"$unwind": '$constraints'},
            {$group:{'_id':'$constraints.PriorityMatch','data':{$push:'$constraints.ActualValue'}}} 
          ]
        //console.log(pipeline)

        let cursor
        try {
            cursor = await pqr_patients.aggregate(pipeline)
        } catch (e) {
            console.log(`Unable to issue aggregate command, ${e}`)
            return { dataArray: [] }
        }

        try {
            const dataArray = await cursor.toArray()
            return { dataArray }
        } catch (e) {
            console.error(`Unable to convert cursor to array, ${e}`)
            return { dataArray: [] }
        }
    }

    static async deletePatientByID(query) {
        try {
            await pqr_patients.deleteOne({'_id': ObjectId(query.id)})
            if (!(await this.getPatientByID(query.id))) {
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

    static async postPatient(new_patient) {
        try {
            const response = await pqr_patients.insertOne(new_patient)
            return response
        } catch(e) {
            console.error(`Unable to add new patient: ${e}`)
            if (e.code == 11000) {
                return { error: "Patient already exists in database!"}
            } else {
                return { error: e }
            }
        }
    }
}
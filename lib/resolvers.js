'use strict'

const connectDb = require('./db')
const { ObjectID } = require('mongodb')
module.exports = {
  Query: {
    getCourses: async () => {
      let db
      let courses = []
      try {
        db = await connectDb()
        courses = await db.collection('courses').find().toArray()
        console.log(courses)
      } catch (error) {
        console.log(error)
      }
      return courses
    },
    getCourse: async (root, { id }) => {
      
      let db, course
      try {
        db = await connectDb()
        course = await db.collection('courses').findOne({_id: ObjectID(id)})
        console.log(course)
      } catch (error) {
        console.log(error)
      }
      return course
    }
  }

}

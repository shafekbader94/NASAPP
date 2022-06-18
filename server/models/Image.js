const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
    title: String,
    url: String,
    explanation: String
})

const Image = mongoose.model("Image", imageSchema)
module.exports = Image
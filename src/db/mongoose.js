import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true
}).then(result => {
    console.log('Connected!')
}).catch(error => {
    console.log(error)
})

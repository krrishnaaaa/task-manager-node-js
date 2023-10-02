import express from 'express'
import userRouter from './routers/user.js'
import taskRouter from './routers/task.js'

import('./db/mongoose.js')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use(userRouter, taskRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
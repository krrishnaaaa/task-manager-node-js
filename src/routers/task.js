import express from 'express'
import Task from "../models/task.js";

const router = express.Router()

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    await task.save()
    try {
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send({'error': 'Task not found'})
        }
        return res.send(task);
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const deleted = await Task.findByIdAndDelete({_id})
        const count = await Task.countDocuments({completed: false})
        res.send({deleted, count})
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description', 'completed']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        return res.status(400).send({'error': 'Invalid update operation for task'})
    }
    try {
        const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).send({'error': 'Task not found'})
        }

        updates.forEach(update => task[update] = req.body[update])

        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

export default router
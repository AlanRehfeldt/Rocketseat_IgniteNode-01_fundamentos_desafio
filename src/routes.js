import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      if(!title || !description) {
        return res.writeHead(400).end(JSON.stringify({
          error: 'Bad Request',
          statusCode: '400',
          message: 'Title and description are required'
        }))
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      database.insert('tasks', task)

      return res.writeHead(201).end(JSON.stringify(task))
    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select('tasks', {
        title: search,
        description: search
      })

      return res.writeHead(200).end(JSON.stringify(tasks))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { title, description } = req.body
      const { id } = req.params

      if(!title && !description) {
        return res.writeHead(400).end(JSON.stringify({
          error: 'Bad Request',
          statusCode: '400',
          message: 'Title or description are required'
        }))
      }

      const [task] = database.select('tasks', { id })

      if(!task) {
        return res.writeHead(404).end(JSON.stringify({
          error: 'Not found',
          statusCode: '404',
          message: 'Task not found'
        }))
      }
      
      const updatedTask = database.update('tasks', id, { 
        title: title ?? task.title,
        description: description ?? task.description,
        updated_at: new Date().toISOString()
      })

      return res.writeHead(200).end(JSON.stringify(updatedTask))
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const [task] = database.select('tasks', { id })

      if(!task) {
        return res.writeHead(404).end(JSON.stringify({
          error: 'Not found',
          statusCode: '404',
          message: 'Task not found'
        }))
      }
      
      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params
      
      const [task] = database.select('tasks', { id })

      if(!task) {
        return res.writeHead(404).end(JSON.stringify({
          error: 'Not found',
          statusCode: '404',
          message: 'Task not found'
        }))
      }
      
      const updatedTask = database.update('tasks', id, { 
        completed_at: new Date().toISOString()
      })

      return res.writeHead(200).end(JSON.stringify(updatedTask))
    }
  },
]
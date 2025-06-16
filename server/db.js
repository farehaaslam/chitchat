import mongoose from "mongoose"
import express from "express"
import { server } from "./lib/socket.js"

const connectToMongoDB = async (url) => {
    try {
      await mongoose.connect(url)
      console.log('Connected to MongoDB successfully.')
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error.message)
      process.exit(1)
    }
  }
 const startServer = async (app,PORT) => {
    try {
      await connectToMongoDB(process.env.URL_DB)
      server.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`)
      })
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error.message)
      process.exit(1) // Exit the process with failure
    }
  }
  export default startServer
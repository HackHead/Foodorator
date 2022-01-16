import express from 'express';
import mongoose from 'mongoose';
import serverRouters from './routers/routers.js'
import dotenv from 'dotenv'
import cors from 'cors'

let app = express()
app.use(express.static('static'))



/**
 * 
 * FIX ON PRODUCTION!!
 * 
 */
app.use(cors({
    origin: '*'
}));

dotenv.config()
const PORT = process.env.PORT || 3000
const db_connection = process.env.DB_CONN



app.use(express.json())
app.use(serverRouters)




async function run(){
	try {
		await mongoose.connect(db_connection)
			.then(()=> {
				console.log('Database connection established')
			})
		app.listen(PORT, () => {
			console.log(`Server is up on port ${PORT}`)
		})
	} catch (e) {
		console.log(e)
	}
}

run()
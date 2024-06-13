import { app } from "./infrastructure/configuration/app";
import connectDB from "./infrastructure/configuration/dataBase";
import dotenv from 'dotenv';
dotenv.config()

const PORT = process.env.PORT || 3000;

const server = () => {
  app.get('/',(req,res)=> {
    res.send('hello')
  })

  app.listen(PORT,()=> {
    connectDB()
    console.log(`Server connected to http://localhost/${PORT}`); 
  })
}

server();
import express from "express"
import path from "path"
import { fileURLToPath } from "url";
const app = express();
const port = 5000;
app.use(express())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,'../public/index.html'))
})
app.get("/style.css",(req,res)=>{
  res.sendFile(path.join(__dirname,"../public/style.css"))
})
app.get("/script.js",(req,res)=>{
  res.sendFile(path.join(__dirname,"../public/script.js"))
})
app.get("/images/:filename",(req,res)=>{
  const {filename} = req.params
  res.sendFile(path.join(__dirname,`../public/images/${filename}`))
})
app.get("/images/icons/:filename",(req,res)=>{
  const {filename} = req.params
  res.sendFile(path.join(__dirname,`../public/images/icons/${filename}`))
})
app.get("/fonts/:filename",(req,res)=>{
  const {filename} = req.params
  res.sendFile(path.join(__dirname,`../public/fonts/${filename}`))
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

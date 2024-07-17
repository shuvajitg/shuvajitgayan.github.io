import express from "express"
import path from "path"
import { fileURLToPath } from "url";
const app = express();
const port = 5000;
app.use(express())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const casheOptions = {
  Headers:{
    'Cache-Control':'../public,max-age=86400'
  }
}

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,'../public/index.html'))
})

app.get("/style.css",(req,res)=>{
  const referer = req.get('Referer')
  if(referer && referer.startsWith(`http://localhost:${port}`)){
    res.sendFile(path.join(__dirname,"./style.css"),casheOptions)
  }else{
    res.status(403).send('Forbidden')
  }
})

app.get("/script.js",(req,res)=>{
  const referer = req.get('Referer')
  if(referer && referer.startsWith(`http://localhost:${port}`)){
    res.sendFile(path.join(__dirname,"./script.js"),casheOptions)

  }else{
    res.status(403).send('Forbidden')
  }
})

app.get("/images/:filename",(req,res)=>{
  const {filename} = req.params
  res.sendFile(path.join(__dirname,`../public/images/${path.basename(filename)}`))
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

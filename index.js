import express from "express";
import { readFile } from "fs/promises"
const __dirname = import.meta.dirname;

const app = express();

// direccion json
const pathFile = __dirname + "/data/deportes.json"
console.log(pathFile) //comprobando

app.use(express.static(__dirname + '/public'));


// leer json (READ) 
app.get("/deportes", async (req, res) => {
    try {
        const stringDeportes = await readFile(pathFile, 'utf8')
        const deportes = JSON.parse(stringDeportes)
        return res.json({ deportes })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})





const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("servidor escuchando")
})
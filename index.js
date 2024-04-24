import express from "express";
import { writeFile } from "fs/promises";
import { readFile } from "fs/promises"
const __dirname = import.meta.dirname;

const app = express();

// req.body
app.use(express.json());
// para formulario:
app.use(express.urlencoded({ extended: true }))

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
});

// CREATE 

app.post("/deportes", async (req, res) => {
    try {
        const deporte = req.body.deporte
        const precio = req.body.precio

        const deporteNew = {
            deporte: deporte,
            precio: precio
        }

        const stringDeportes = await readFile(pathFile, 'utf8')
        const deportes = JSON.parse(stringDeportes)
        deportes.push(deporteNew)

        // crear archivo con info nueva
        await writeFile(pathFile, JSON.stringify(deportes))

        return res.json({ deporteNew })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: true })
    }
});



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("servidor escuchando")
})
import express from "express";
const app = express();

const __dirname = import.meta.dirname;
app.use(express.static(__dirname + '/public'));

app.get("/deporte", (req, res) => {
    res.send("deportes guardados")
})





const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("servidor escuchando")
})
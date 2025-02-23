import express from "express";
import "dotenv/config"
import { globalRouter } from "./routes/index.js";
const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json())

app.use('/api/openmailer', globalRouter )
app.listen(PORT, () => {
    console.log(`Server running on port: `, PORT);
    
})
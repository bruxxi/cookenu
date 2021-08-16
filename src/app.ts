import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3006, ()=>{
    console.log('Servidor rodando na porta 3006')
})

export default app
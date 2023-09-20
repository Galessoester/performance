const express = require('express')
const app = express()
const redis = require('redis')
const host = '127.0.0.1'
const port = 6379
const clientRedis = redis.createClient(port, host, redis)



// Simulando um problema de tempo de resposta
const getAllClients = async () => {
    const time = Math.random() * 8000;
    console.log(time)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                [{
                        "nome": "Ester Galesso"
                    },
                    {
                        "nome": "Alice Bianchi"
                    },
                    {
                        "nome": "Guilherme Zapater"
                    }
                ]
            )
        }, time)
    })
}


app.get("/", async (req, res) => {
    // criando um cache
    clientRedis.set('nome', 'Ester Galesso')

    //const clients = await getAllClients();
    
    res.status(200).send({})
})

const startup = async () => {
    //conectar o redis
    await clientRedis.connect()

    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    })
}

startup()



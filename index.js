const express = require('express');
const User=require('./models/User');
const sequelize = require('./database');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

app.use(express.json());

sequelize.sync({force: false}).then(() => {
    console.log("all models were synchronized successfully.");
}
).catch(err=>{
    console.error('Unable to synchronize the models:', err);
}
);

app.get('/getAll', async (req, res) => {
    try{
        const users = await User.findAll();
        res.json(users);
    }
    catch(err){
        console.log(err);
    }
});

app.post('/create', async (req, res) => {
    try{
        const {name, email} = req.body;
        const newUser = await User.create({
            name,
            email
        });
        res.json(newUser);
    }
    catch(err){
        console.log(err);
    }
});




const express = require('express');
const User=require('./models/User');
const sequelize = require('./database');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

app.use(express.json());

sequelize.sync({force: false}).then(() => { // force: true will drop the table if it already exists
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

app.put('/update/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const {name, email} = req.body;
        const user = await User.findOne({
            where: {
                id
            }
        });
        user.name = name;
        user.email = email;
        await user.save();
        res.json(user);
    }
    catch(err){
        console.log(err);
    }
}
);

app.delete('/delete/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findOne({
            where: {
                id
            }
        });
        await user.destroy();
        res.json("User deleted");
    }catch(err){
        console.log(err);
    }
}
);



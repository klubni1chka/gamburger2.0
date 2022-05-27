

const express = require('express');
const port = 3006;
const path = require('path');
const router = express.Router();
const app = express();
const User=require('./models/UserModel')
const passport = require("passport");
const bcrypt = require('bcrypt');

// const candidate=await User.findOne({email})
// const hashedPassword = await bcrypt.hash(password,12)
// const user=new User({email,password:hashedPassword})
// await user.save()
// res.status(201).json({message:'Пользрватель создан'})

const ejs=require('ejs')

const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
const UserRoute = require('./routes/UserRoute')
app.use('/user',UserRoute)


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*router.post(('/saveAnswer'),(req,res) => {
        const user = new UserModel({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            score: req.body.result
        });

        user.save().then(data => {

            res.status(200).render('results', {mydata: "user "+ data.firstName +" created succesfully!"})
        }).catch(err => {
            res.render('results', {mydata: err.message || "Some error occurred while creating user"})
        });
    })*/

app.use("/", require("./routes/root"));
app.use('/test1', require('./routes/test1'));
app.use('/test2', require('./routes/test2'));

const mongoose = require('mongoose');
const UserModel = require("./models/UserModel");
// const uri = "mongodb+srv://Mooz:20040705@cluster0.ssvvs.mongodb.net/?retryWrites=true&w=majority"
//const uri = "mongodb+srv://Mooz:20040705@cluster0.ssvvs.mongodb.net/?retryWrites=true&w=majority";
const dbConfig = require('./database.config.js');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.get('/update', (req, res) => {
    res.render('update');
});

app.get('/find', (req, res) => {
    res.render('find');
});
app.get('/delete', (req, res) => {
    res.render('delete');
});
app.listen(process.env.PORT || port, err => {
    console.log(`Server is listening on http://localhost:${port}`);
});

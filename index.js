const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ShoppingList = require('./models/shopping-list');
const RecipeBox = require('.//models/recipe')
const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json())
app.use(cors())

mongoose.connect('mongodb+srv://mj:mj12345@cluster0.wfmad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.post('/newRecipe', async (req, res) => {
    const recipe = new RecipeBox(req.body);
    await recipe.save();
    res.send(true)
})

app.get('/getRecipe', async (req, res) => {
    const recipe = await RecipeBox.find({});
    res.send(recipe)
})

app.post('/getRecipeById/:id', async (req, res) => {
    await RecipeBox.findById(req.params.id, (err, result) => {
        if (err)
            console.log(err)
        else
            res.send(result);
        console.log(result)

    })
})

app.post('/addShoppingFromRecipe', async (req, res) => {
    const shopp = new ShoppingList(...req.body);
    await shopp.save((err, room) => {
        console.log(room)
    });

})

app.post('/editRecipe/:Id', (req, res) => {
    RecipeBox.findById(req.params.Id, (err, update) => {
        if (err) {
            console.log(err);
            res.status(500).send(err)
        } else {
            update.name = req.body.name,
                update.desc = req.body.desc,
                update.imgPath = req.body.imgPath,
                update.ingridents = req.body.ingridents

            update.save((err, result) => {
                if (err) {
                    console.log(err);
                    res.status(400).send({
                        success: false,
                        message: "Error in update"
                    });
                } else {
                    console.log(result);
                    res.status(200).send({
                        success: true,
                        message: "Item Updated"
                    });
                }
            });
        }
    });
});

app.post('/deleteRecipe/:id', (req, res) => {

    RecipeBox.findByIdAndRemove(req.params.id,
        (err, result) => {
            if (err) {
                console.log("error")
                res.send(400, "Error in delete")
            } else {
                res.send(true)
            }
        });
});





app.post('/newShopping', async (req, res) => {

    const shopping = new ShoppingList(req.body);
    await shopping.save((err, room) => {
        res.send(room._id)
    });


})

app.post('/editShopping/:Id', (req, res) => {
    ShoppingList.findById(req.params.Id, (err, update) => {
        if (err) {
            console.log(err);
            res.status(500).send(err)
        } else {
            update.name = req.body.name,
                update.amount = req.body.amount

            update.save((err, result) => {
                if (err) {
                    console.log(err);
                    res.status(400).send({
                        success: false,
                        message: "Error in update"
                    });
                } else {
                    console.log(result);
                    res.status(200).send({
                        success: true,
                        message: "Item Updated"
                    });
                }
            });
        }
    });
});



app.get('/getShopping', async (req, res) => {
    const shopping = await ShoppingList.find({})
    res.send(shopping);

})


app.get('/getShoppingById/:id', async (req, res) => {
    ShoppingList.findById(req.params.id, (err, result) => {
        if (err)
            console.log(err)
        else
            res.send(result);
    })

})


app.post('/deleteShopping/:id', (req, res) => {

    ShoppingList.findByIdAndRemove(req.params.id,
        (err, result) => {
            if (err) {
                console.log("error")
                res.send(400, "Error in delete")
            } else {
                res.send(true)
            }
        });
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
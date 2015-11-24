 // app/routes.js

// grab the database models
var dbModels = require('./models/dbModels');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // inventory api ===========================================================

//        app.get('/api/inventory/{inventoryID}', function(req, res) {
	app.get('/api/inventory/{inventoryID}', function(req, res) {
            // use mongoose to get all inventories in the database
            dbModels.inventory.find(function(err, inventories) {

                // if there is an error retrieving, send the error. 
                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(inventories); // return all inventories in JSON format
            });
        });

        //app.post
        //app.delete

        // user api ================================================================

        //app.get
        //app.post
        //app.delete

        // item api ================================================================

        //app.get
        //app.post
        //app.delete

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };

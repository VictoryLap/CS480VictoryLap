 // app/routes.js

// grab the database models
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var dbModels = require('./models/dbModels');
var Inventory = dbModels.inventory;
var User = dbModels.user;
var Item = dbModels.item;

    module.exports = function(app, passport) {

        // middleware to use for all requests
        router.use(function(req, res, next) {
            // do logging
            console.log('Something is happening.');
            next(); // make sure we go to the next routes and don't stop here
        });

        // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
        router.get('/', function(req, res) {
            res.json({ message: 'hooray! welcome to our api!' });
        });

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes


        // inventory api ===========================================================
        router.route('/inventories')

            // get all inventories
            .get(function(req, res) {
                Inventory.find(function(err, inventories) {
                    if (err)
                        res.send(err);

                    res.json(inventories);
                });
            })

            // add an inventory
            .post(function(req, res){
                var inventory = new Inventory();
                console.log('Adding an Inventory');
                inventory.name = req.body.name;
                inventory.dateCreated = Date.now();
                inventory.dateLastAltered = Date.now();
                inventory.admins = req.body.admins;
                inventory.users = [];
                inventory.items = [];

                inventory.save(function(err){
                    if(err)
                        res.send(err);
                    res.json(inventory._id);
                });
            });


        router.route('/inventories/:inventoryID')

            // get inventory with specific ID
            .get(function(req, res) {
                Inventory.findById(req.params.inventoryID, function(err, inventory) {
                    if (err)
                        res.send(err);
                    res.json(inventory);
                });
            })

            // update an inventory
            .put(function(req, res) {
                Inventory.findById(req.params.inventoryID, function(err, inventory) {
                    if (err)
                        res.send(err);

                    inventory.name = req.body.name;
                    inventory.dateCreated = req.body.dateCreated;
                    inventory.dateLastAltered = req.body.dateLastAltered;
                    inventory.admins = req.body.admins;
                    inventory.users = req.body.users;
                    inventory.items = req.body.items;

                    inventory.save(function(err) {
                        if(err)
                            res.send(err);
                        res.json(inventory);
                    });
                });
            })

            // delete an inventory
            .delete(function(req, res){
                Inventory.remove({
                    _id: req.params.inventoryID
                }, function(err, inventory) {
                    if(err)
                        res.send(err);
                    res.json({ message: 'Successfully deleted' });
                });
            });


        // user api ================================================================

        router.route('/users')

            // get all users
            .get(function(req, res) {
                User.find(function(err, users) {
                   if (err)
                      res.send(err);

                      res.json(users);
                });
            })

            // add a user
            .post(function(req, res){
                var user = new User();

                console.log('Another User Hello');

                user.userName = req.body.userName;
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.email = req.body.email;
                user.dateCreated = Date.now();
                user.password = req.body.password;
                user.img = req.body.img;

                user.save(function(err){
                    if(err)
                        res.send(err);
                    res.json(user._id);
                });
            });

        router.route('/users/:userID')
            // get a user by userID
            .get(function(req, res) {
                User.findById(req.params.userID, function(err, user) {
                    if (err)
                        res.send(err);
                    res.json(user);
                });
            })

            // update a user
            .put(function(req, res) {
                User.findById(req.params.userID, function(err, user) {
                    if (err)
                        res.send(err);

                    user.name = req.body.name;
                    user.firstName = req.body.firstName;
                    user.lastName = req.body.lastName;
                    user.email = req.body.email;
                    user.dateCreated = req.body.dateCreated;
                    user.password = req.body.password;
                    user.img = req.body.img;

                    user.save(function(err) {
                        if(err)
                            res.send(err);
                        res.json({ message: 'User updated!' });
                    });
                });
            })

            // delete a user
            .delete(function(req, res){
                User.remove({
                    _id: req.params.userID
                }, function(err, user) {
                    if(err)
                        res.send(err);
                    res.json({ message: 'Successfully deleted' });
                });
            });

        router.route('/users/userName/:userName')

            // get user by userName
            .get(function(req, res) {
                User.findOne({userName: req.params.userName}, function(err, user) {
                    if (err)
                        res.send(err);
                    res.json(user);
                });
            });

        // item api ================================================================

        router.route('/items')

            // get all items
            .get(function(req, res) {
                Item.find(function(err, items) {
                    if (err)
                        res.send(err);

                    res.json(items);
                });
            })

            // add an item
            .post(function(req, res){
                var item = new Item();

                item.name = req.body.name;
                item.quantity = req.body.quantity;
                item.owner = null;
                item.img = null;

                item.save(function(err){
                    if(err)
                        res.send(err);
                    res.json(item);
                });
            });

        router.route('/items/:itemID')
            // get a item by itemID
            .get(function(req, res) {
                Item.findById(req.params.itemID, function(err, item) {
                    if (err)
                        res.send(err);
                    res.json(item);
                });
            })

            // update an item
            .put(function(req, res) {
                Item.findById(req.params.itemID, function(err, item) {
                    if (err)
                        res.send(err);

                    item.name = req.body.name;
                    item.quantity = req.body.quantity;
                    item.owner = req.body.owner;
                    item.img = req.body.img;

                    item.save(function(err) {
                        if(err)
                            res.send(err);
                        res.json({ message: 'Item updated!' });
                    });
                });
            })

            // delete an item
            .delete(function(req, res){
                Item.remove({
                    _id: req.params.itemID
                }, function(err, item) {
                    if(err)
                        res.send(err);
                    res.json({ message: 'Successfully deleted' });
                });
            });


        // REGISTER OUR ROUTES =====================================================
        // all of our routes will be prefixed with /api
        app.use('/api', router);

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };

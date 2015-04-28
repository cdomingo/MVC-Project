var _ = require('underscore');
var models = require('../models');

var Room = models.Room;

var makerPage = function(req, res) {

    Room.RoomModel.findByOwner(req.session.account._id, function(err, docs) {

        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }
        
        res.render('app', {Rooms: docs});
    });
};

var makeRoom = function(req, res) {

    if(!req.body.name) {
        return res.status(400).json({error: "Room name is required"});
    }
    
    var RoomData = {
        name: req.body.name,
        owner: req.session.account._id
    };
    
    var newRoom = new Room.RoomModel(RoomData);
    
    newRoom.save(function(err) {
        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }

        res.json({redirect: '/maker'});
    });
    
};

module.exports.makerPage = makerPage;
module.exports.make = makeRoom;
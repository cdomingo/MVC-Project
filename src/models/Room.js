var mongoose = require('mongoose');
var _ = require('underscore');

var RoomModel;

var setName = function(name) {
    return _.escape(name).trim();
};

var RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName
    },
    
    owner: 	{
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
	},
    
    createdData: {
        type: Date,
        default: Date.now
    }

});

RoomSchema.methods.toAPI = function() {
    return {
        name: this.name
    };
};

RoomSchema.statics.findByOwner = function(ownerId, callback) {

    var search = {
        owner: mongoose.Types.ObjectId(ownerId)
    };

    return RoomModel.find(search).select("name").exec(callback);
};


RoomModel = mongoose.model('Room', RoomSchema);


module.exports.RoomModel = RoomModel;
module.exports.RoomSchema = RoomSchema;
/**
 * Postrack
 * Created by Nitai J. Perez
 * Nitai.Perez@Gmail.com
 * 19/10/2014
 */

/** @namespace changes.tracks */

// Generate Postal adapters object:
var services = ['israelPost'];
var postalServices = {};


_.each(services, function (serviceName) {
    var servicePath = "app/adapters/" + serviceName + "Adapter.js";
    $.getScript(servicePath, function (data, textStatus, jqxhr) {
        if (jqxhr.status == 200) {
            postalServices[serviceName] = window[serviceName + 'adapter']
        } else {
            console.error("Service", servicePath, "does not exist.");
        }
    });
});


var tracks = {
    RH034325007CN: {
        name: "Cogito Watch",
        type: "Registered Mail",
        updated: Date.now(),
        provider: "ILPost",
        lastStatus: "Un route",
        lastCourier: "israelPost"
    },
    RH034325006CN: {
        name: "SD Card",
        type: "Air Mail",
        updated: Date.now(),
        provider: "ILzxcPost",
        lastStatus: "Item was lost in the USA and will never arrive!",
        lastCourier: "israelPost"
    }
};

function updateTrack(trackCode, cb) {
    _.first(postalServices).getTrackInfoByCode(trackCode, "EN", function (err, type, status) {
        var tempTracks = _.clone(tracks);
        tempTracks[trackCode][lastStatus] = status;
        chrome.storage.sync.set({tracks: tempTracks});
        cb();
    });
}

function updateTracks() {
    // assuming openFiles is an array of file names and saveFile is a function
    // to save the modified contents of that file:
    async.each(Object.keys(tracks), updateTrack, function (err) {
        if (err) {
            // One of the iterations produced an error.
            // All processing will now stop.
            console.log('A track failed to process');
        } else {
            console.log('All tracks have been processed successfully');
        }
    });
}

// Listen for changes in storage which might come from other clients.
chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName == "sync" && !_.isUndefined(changes.tracks)) {
        tracks = changes.tracks.newValue;
    }
});


setInterval(function () {
    // TODO: Update Tracks!
    var nt = _.cloneDeep(tracks);
    nt.RH034325006CN.status = Math.random();
    try {
        console.log("Writing to memory;");
        chrome.storage.sync.set({tracks: nt});
    } catch (e){}
}, 10000); // 5 Minutes;

var trackCtrl = {
    getAll: function (cb) {
    },
    get: function (id, cb) {
    },
    update: function (id, data, cb) {
    },
    remove: function (id, cb) {
    }
};

function saveTracks(cb) {
    chrome.storage.sync.set({'value': "dummy"}, function () {
        // Notify that we saved.
        console.log('Settings saved');
        cb()
    });
}

/*Chrome Storage reference:
 https://developer.chrome.com/extensions/storage

 chrome.storage.sync.get(string or array of string or object keys, function callback)
 chrome.storage.sync.set(object items, function callback)
 chrome.storage.sync.remove(string or array of string keys, function callback)



 var storage = {
 get: chrome.storage.sync.get,
 set: chrome.storage.sync.set,
 remove: chrome.storage.sync.remove
 };

 var config = {};

 config.services = ["configAPI", "idb", "analytics", "user", "scripts", "stylebot", "search"];
 config.analytics_keep_alive_interval = 15e5;
 config.notify_about_avilable_overrides = true;

 var configAPI = function () {
 "use strict";
 function init(a) {
 window.config || (window.config = {});
 chrome.storage.sync
 idb.getAll("config", function (key) {
 _.each(key, function (a) {
 config[a.id] = a.value
 });
 _.callback(a);
 })
 }

 function get(key) {
 return config[key]
 }

 function set(key, value) {
 config[key] = value;
 idb.update("config", {id: key, value: value}, null);
 }

 function remove(key) {
 try {
 idb.remove("config", key, null);
 delete config[key];
 } catch (e) {
 }
 }

 return{
 init: init,
 get: get,
 set: set,
 remove: remove
 }
 }();*/

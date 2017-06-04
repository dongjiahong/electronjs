'use strict';

var nconf = require('nconf').file({file: getUserHome() + '/Echo.json'});

function saveSettings(settingKey, setingValue) {
    nconf.set(settingKey, settingValue);
    nconf.save();
}

function readSettings(settingKey) {
    nconf.load();
    return nconf.get(settingKey);
}

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE': 'HOME'];
}

module.exports = {
    saveSettings: saveSettings,
    readSettings: readSettings
};
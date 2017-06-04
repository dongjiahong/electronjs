//使用js的“严格模式”，总体来说是让代码更加的严谨，提高编译器效率，
// 具体的严格模式有何不同参考http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html
'use strict'

var app = require('app');
var BrowserWindow = require('browser-window');
var globalShortcut = require('global-shortcut');
var configuration = require('./configuration');
// Electron提供ipc模块来实现在web页面施行gui操作，ipc模块可以实现从通道订阅消息，
// 发送消息给通道的订阅者，通道区分消息的接受者，用字符来表示... 参考http://get.ftqq.com/7870.get
var ipc = require('ipc')

var mainWindow = null;
var settingsWindow = null;

app.on('ready', function(){
    if (!configuration.readSettings('shortcutKeys')){
        configuration.saveSettings('shortcutKeys', ['ctrl', 'shift']);
    }

    mainWindow = new BrowserWindow({
        frame: false, // 窗口无边框
        height: 700,
        resizable: false,
        width: 368
    });

    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
    setGlobalShortcuts();
});

function setGlobalShortcuts() {
    globalShortcut.unregisterAll();

    var shortcutKeysSetting = configuration.readSettings('shortcutKeys');
    var shortcutPrefix = shortcutKeysSetting.length === 0 ? '' : shortcutKeysSetting.json('+') + '+';

    globalShortcut.register(shortcutPrefix + '1', function(){
        mainWindow.webContents.send('global-shortcut', 0);
    });
    globalShortcut.register(shortcutPrefix + '2', function() {
        mainWindow.webContents.send('global-shortcut', 1);
    });
}

// 从通道订阅消息, on()方法设置订阅的通道名，定义回调函数
ipc.on('close-main-window', function() {
    app.quit();
});

ipc.on('open-settings-window', function() {
    if (settingsWindow) {
        return;
    }

    settingsWindow = new BrowserWindow({
        frame: false,
        height: 200,
        resizeable: false,
        width: 200
    });

    settingsWindow.loadUrl('file://' + __dirname + '/app/settings.html');

    settingsWindow.on('closed', function() {
        settingsWindow = null;
    });
});

ipc.on('close-settings-window', function (){
    if (settingsWindow) {
        settingsWindow.close();
    }
});

ipc.on('set-global-shortcuts', function(){
    setGlobalShortcuts();
});
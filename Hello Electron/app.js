const electron = require("electron");
const app=electron.app; // app模块会控制应用的生命周期
const BrowserWindow=electron.BrowserWindow;

let mainWindow;

function createWindow(){
    mainWindow=new BrowserWindow({
        width: 300,
        height: 400
    });

    mainWindow.loadURL('file://'+__dirname+'/index.html');

    mainWindow.on("closed",function(){
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed",function(){
    if(process.platform!="darwin"){
        app.quit();
    }
});

app.on("activate",function(){
    if(mainWindow===null){
        createWindow();
    }
});
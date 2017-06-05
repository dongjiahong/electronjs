const electron = require("electron");
const app=electron.app; // app模块会控制应用的生命周期
const BrowserWindow=electron.BrowserWindow;

let mainWindow;

function createWindow(){
    mainWindow=new BrowserWindow({
        width: 950,
        height: 500
    });

    mainWindow.loadURL('file://'+__dirname+'/index.html');

    mainWindow.on("closed",function(){
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed",function(){
    app.quit();
});

app.on("activate",function(){
    if(mainWindow===null){
        createWindow();
    }
});
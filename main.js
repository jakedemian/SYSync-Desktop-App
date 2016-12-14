// main.js
const {
    app,
    BrowserWindow
} = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

// var PROPERTIES = {};

// function parseProperties(props){
// 	console.log("here");
// 	for(var i = 0; i < props.length; i++){
// 		var line = null;
// 		if(props[i] == '\n' && i != props.length - 1){
// 			line = props.substring(0, i);
// 			props = props.substring(i + 1);
// 		}
// 		else if(i == props.length - 1){ // this is the end of the file but there's no new line, so read one last time
// 			line = props;
// 			props = "1";
// 		}

// 		if(!!line) {
// 			i = 0;
// 			line = line.replace(/\s/g, '');
// 			var key = line.substring(0, line.indexOf("="));
// 			var val = line.substring(line.indexOf("=") + 1);
// 			PROPERTIES[key] = eval(val);
// 		}
// 	}
// }

// function getProperty(key){
// 	if(!!PROPERTIES[key]){
// 		return PROPERTIES[key];
// 	}
// 	return null;
// }

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
	var p = path.join(__dirname, "config.properties");
	fs.readFileSync(p, 'utf8', function (err, data) {
	  if (err) {
	  	return console.log(err);
	  }
	  parseProperties(data);
	});

    // Create the browser window.
    win = new BrowserWindow({
        width: 1000,
        height: 800
    });

    //win.setMenu(null);

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
   	//win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
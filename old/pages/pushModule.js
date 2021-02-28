const { app, BrowserWindow } = require("electron");
console.log(typeof BrowserWindow);

document.getElementById("select").addEventListener("click", () => {
	let path_to_file = document.getElementById("file").files[0].path;
	index = document.getElementById("file").files[0].path.lastIndexOf("\\");
	path_to_file = path_to_file.slice(0, index);
	console.log(path_to_file);
});

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.loadFile("./postModule.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

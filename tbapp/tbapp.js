/**
 * Created by Kalle on 4.3.2017.
 */

var npmRun = require("npm-run");
const fs = require("fs-extra");


console.log(process.platform);

var isWin = process.platform === "win32";
var execCmdPrefix = isWin ? "" : "mono ";
var absCompilerPath = isWin ? "node_modules\\@theball\\appgen\\abscompiler.exe" : "node_modules/@theball/appgen/abscompiler.exe";
var execCmd = execCmdPrefix + absCompilerPath;

var configPath = "node_modules/@theball/appgen/AbstractionBuilderContent_v1_0.xml";
var genRootPath = "tbapp/absgen";

fs.remove(__dirname + "/absgen", function(err) {
  if(err)
    return console.error(err);
  fs.copy(__dirname + "/appmodel.xml", __dirname + "/absgen/TheBallCore/In/Content_v1_0/appmodel.xml", function(err) {
    if(err)
      return console.error(err);
    console.log("Model prep copy done");
    var stdOut = npmRun.execSync(execCmd + " " + configPath + " " + genRootPath);
    console.log(stdOut.toString());
  });
});

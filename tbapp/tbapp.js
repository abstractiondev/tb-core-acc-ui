/**
 * Created by Kalle on 4.3.2017.
 */

var npmRun = require("npm-run");
const fs = require("fs-extra");

var isDebug = process.argv.length > 2 && process.argv[2] == "-debug";

if(isDebug)
  console.log(process.platform);

var isWin = process.platform === "win32";
var execCmdPrefix = isWin ? "" : "mono ";
var absCompilerPath = isWin ? __dirname +  "\\..\\node_modules\\@theball\\appgen\\abscompiler.exe" : __dirname + "/../node_modules/@theball/appgen/abscompiler.exe";
var execCmd = execCmdPrefix + absCompilerPath;

var configPath = __dirname + "/../node_modules/@theball/appgen/AbstractionBuilderContent_v1_0.xml";
var genRootPath = __dirname + "/absgen";

var copyGenToCS = function(sourceFilePath, targetFileName) {
  if(isDebug)
    console.log("Copying CSharp to: " + targetFileName);
  fs.copySync(__dirname + "/absgen/" + sourceFilePath, __dirname + "/cs/App/" + targetFileName);
};

var copyGenToTS = function (sourceFilePath, targetFileName) {
  if(isDebug)
    console.log("Copying TypeScript to: " + targetFileName);
  fs.copySync(__dirname + "/absgen/" + sourceFilePath, __dirname + "/../src/app/tbinterface/" + targetFileName);
};

fs.remove(__dirname + "/absgen", function(err) {
  if(err)
    return console.error(err);
  fs.copy(__dirname + "/AppModel.xml", __dirname + "/absgen/TheBallCore/In/Content_v1_0/AppModel.xml", function(err) {
    if(err)
      return console.error(err);
    fs.copySync(__dirname + "/../node_modules/@theball/appgen/TheBallInterface.xml", __dirname + "/absgen/TheBallCore/In/Content_v1_0/TheBallInterface.xml" );
    if(isDebug)
      console.log("Model preparation copy done");
    var stdOut = npmRun.execSync(execCmd + " " + configPath + " " + genRootPath);
    if(isDebug) {
      console.log(stdOut.toString());
    }
    copyGenToTS("TheBallCore/Out/AppModel.nggen.ts", "AppModel.nggen.ts");
    copyGenToTS("TheBallCore/Out/TheBallInterface.nggen.ts", "TheBallInterface.nggen.ts");
    copyGenToCS("Operation/Out/OperationAbstractionFromAppModel.designer.cs", "Operations.gen.cs");
    //copyGenToCS("TheBallCore/Out/AppModel.serialization.designer.cs", "SerializationClasses.gen.cs");
    copyGenToCS("TheBallCore/Out/AppModel_dataclass.designer.cs", "DataClasses.gen.cs");
    copyGenToCS("TheBallCore/Out/AppModel_interface.designer.cs", "Interface.gen.cs");
    //copyGenToCS("TheBallCore/Out/AppModel_SQLite.designer.cs", "SQLite.gen.cs");
    if(!isDebug) {
      fs.remove(__dirname + "/absgen");
    }
  });
});

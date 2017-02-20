/**
 * Created by Kalle on 19.2.2017.
 */


// dev-server.js
const express = require('express');
const app = express();
const fs = require("fs-extra");
const protobuf = require("protobufjs");

// Import routes
//require('./_routes')(app);   // <-- or whatever you do to include your API endpoints and middleware
app.set('port', 8080);
app.listen(app.get('port'), function() {
  console.log('Node App Started');
});


app.use('/devemu/TBRoot', express.static(__dirname + '/devemu/TBRoot'));

fs.remove(__dirname + "/devemu/TBRoot", function(err) {
  if(err)
    return console.error(err);
  fs.copy(__dirname + "/../src/data/TBRoot", __dirname + "/devemu/TBRoot", function(err) {
    if(err)
      return console.error(err);
    console.log("TBRoot copy done");
    fs.mkdir(__dirname + "/devemu/TBRoot/TheBall.Interface/InterfaceOperation", function(err) {
      if(err)
        return console.error(err);
    });
  });
});

var httpOperationDataMessage;

protobuf.load("tbdevserver/tb.proto", function(err, root) {
  if(err)
    throw err;
  httpOperationDataMessage = root.lookup("HttpOperationData");
});

var timestamp = function() {
  function pad(n) {return n<10 ? "0"+n : n}
  function padms(n) {return n<10 ? "00"+n : n<100 ? "0"+n : n}
  d=new Date()
  dash="-"
  colon="_"
  return d.getFullYear()+dash+
    pad(d.getMonth()+1)+dash+
    pad(d.getDate())+"_"+
    pad(d.getHours())+colon+
    pad(d.getMinutes())+colon+
    pad(d.getSeconds())+colon+
    padms(d.getMilliseconds());
};

app.post('/postback', function(request, respond) {
  console.log("Posting...");
  var body = '';
  var operationID =  timestamp(); //"random_id_base";
  var operationDataFile = operationID + ".data";
  var operationResultFile = operationID + ".json";
  var filePath = __dirname + '/devemu/TBRoot/TheBall.Interface/InterfaceOperation/';
  var operationDataFullPath = filePath + operationDataFile;
  var operationResultPath = filePath + operationResultFile;
  console.log(filePath);
  request.on('data', function(data) {
    body += data;
  });

  request.on('end', function (){
    var message = httpOperationDataMessage.create({
      OperationName: "fiuu",
      OperationRequestPath: "fauu",
      QueryParameters: [
        {
          Key: "param1",
          Value: "param1value"
        },
        {
          Key: "param2",
          Value: "param2value"
        }
      ],
      FormValues: [

      ],
      FileCollection: [

      ],
      RequestContent: body,
      ExecutorAccountID : "execAccountID",
      OwnerRootLocation: "ownerRootLocation",
      EnvironmentName: "environmentName"
    });
    var buffer = httpOperationDataMessage.encode(message).finish();
    fs.writeFile(operationResultPath, "{}", function() {
      fs.writeFile(operationDataFullPath, buffer, function() {
        respond.send("{ \"OperationID\": \"" + operationID +  "\" }");
        respond.end();
        console.log("Done: " + filePath);
      });
    });
  });
});

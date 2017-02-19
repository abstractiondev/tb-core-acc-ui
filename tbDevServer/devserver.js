/**
 * Created by Kalle on 19.2.2017.
 */


// dev-server.js
const express = require('express');
const app = express();
const fs = require("file-system");
const protobuf = require("protobufjs");
// Import routes
//require('./_routes')(app);   // <-- or whatever you do to include your API endpoints and middleware
app.set('port', 8080);
app.listen(app.get('port'), function() {
  console.log('Node App Started');
});
app.get("/", function(req, res) {
  res.send("Hello world!");
});

app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

var httpOperationDataMessage;

protobuf.load("tbDevServer/tb.proto", function(err, root) {
  if(err)
    throw err;
  httpOperationDataMessage = root.lookup("HttpOperationData");
});

app.post('/receive', function(request, respond) {
  console.log("Posting...");
  var body = '';
  var filePath = __dirname + '/public/data.txt';
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
    fs.writeFile(filePath, buffer, function() {
      respond.end();
      console.log("Done: " + filePath);
    });
  });
});

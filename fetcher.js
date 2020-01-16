const request = require('request');
const fs = require('fs');
const input = process.argv.splice(2);







fs.stat(input[1], function(err) {
    if (!err) {
        console.log('file or directory exists');
    } else if (err.code === 'ENOENT') {
        console.log('file or directory does not exist');
        request(input[0], (error, response, body) => {
            //console.log('error:', error); // Print the error if one occurred
            //console.log('statusCode:', response && response.statusCode); // Print the response was received
            //console.log('ALEX');
            //console.log('body:', body); // Print the HTML for the Google homepage.

            fs.access(input[1], fs.R_OK, (err) => {
                if (!err) {
                    console.log("File exists")
                };
            });

            fs.writeFile(input[1], body, (err) => {
                if (err) throw err;
                //console.log('The file has been saved!');

                fs.stat(input[1], (err, stat) => {
                    console.log(stat);
                    console.log(`Downloaded and saved ${stat['size']} bytes to ${input[1]}`);
                })



            });

        });
    }
});

import * as path from 'path';
import * as Shelljs from 'shelljs';

export class NgdEngine {
    constructor() {

    }
    renderGraph(filepath:String, outputpath: String) {
        return new Promise(function(resolve, reject) {
           Shelljs.exec(path.resolve(__dirname + '/../node_modules/.bin/ngd') + ' -f ' + filepath + ' -d ' + outputpath + ' -s', {
               silent: true
           }, function(code, stdout, stderr) {
               if(code === 0) {
                   resolve();
               } else {
                   reject();
               }
           });
        });
    }
};
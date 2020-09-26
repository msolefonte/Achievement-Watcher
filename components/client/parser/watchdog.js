"use strict";

const { remote } = require('electron');
const path = require("path");
const glob = require("fast-glob");
const ffs = require(path.join(appPath,"util/feverFS.js"));

const cache = path.join(remote.app.getPath('userData'),"steam_cache/data");

module.exports.scan = async () => {
  try{
    let data = [];
    
      for (let file of await glob("([0-9])+.db",{cwd: cache, onlyFiles: true, absolute: false})){
        
        data.push({ 
                    appid: file.replace(".db",""),
                    source: "Achievement Watcher : Watchdog", 
                    data: {
                      type: "cached"
                    }
                });
      
      }
      
      return data;
    
  }catch(err){
    throw err;
  }
}

module.exports.getAchievements = async (appID) => {
  try{
    return JSON.parse(await ffs.promises.readFile(path.join(cache,`${appID}.db`),"utf8"));
  }catch(err){
    throw err;
  }
}
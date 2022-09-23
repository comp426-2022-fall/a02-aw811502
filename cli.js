#!/usr/bin/env node

// Import Dependencies
const fs = require('fs');
const parseArgs = require('minimist');
const moment = require('moment-timezone');

// Process command flags 
const args = parseArgs(process.argv.slice(2));

// If -h flag is present, print help text and exit
if (args.h) {
  const buffer = fs.readFileSync("help.txt");
  const helpText = buffer.toString();
  console.log(helpText);
  process.exit(0);
}

// Get system timezone
const timezone = moment.tz.guess();
console.log(timezone);

// Input Variables for API Call
// https://api.open-meteo.com/v1/forecast?latitude=35.93&longitude=-78.99&daily=precipitation_hours&current_weather=true&timezone=America%2FNew_York

const lat = args.n || args.s * -1;
const lon = args.e || args.w * -1;
var tz = args.z || timezone;
tz = encodeURIComponent(tz);
const day = args.d || 1;
const print_json = args.j;

const url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&daily=precipitation_hours&current_weather=true&timezone=" + tz;

console.log(url);

// Make API call
//const response = await fetch(url);
//const data = await response.json();

//console.log(data);

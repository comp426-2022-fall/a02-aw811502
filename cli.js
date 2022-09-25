#!/usr/bin/env node

// Import Dependencies
import fs from 'fs';
import parseArgs from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';

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

// Parse Input Variables for API Call

const lat = args.n || args.s * -1;
const lon = args.e || args.w * -1;

var tz = args.t || timezone;
tz = encodeURIComponent(tz);

var day = 1;
if (args.d != undefined) {
  day = args.d;
}

const print_json = args.j;

// Format URL for API Call
const url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&daily=precipitation_hours&current_weather=true&timezone=" + tz;

// Make API call
const response = await fetch(url);
const data = await response.json();

// Print api response if -j flag is present
if (print_json) {
  console.log(data);
  process.exit(0);
}

// Format Response
const rain = data.daily.precipitation_hours[day];
var message = "";
if (rain == 0) {
 message = message + "You will not need your galoshes";
} else {
 message = message + "You might need your galoshes";
}

if (day == 0) {
  message = message + " today.";
} else if (day == 1) {
  message = message + " tomorrow.";
} else {
  message = message + " in " + day + " days.";
} 

console.log(message);

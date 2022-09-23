#!/usr/bin/env node

const fs = require('fs');
const parseArgs = require('minimist');

const args = parseArgs(process.argv.slice(2));

if (args.h) {
  const buffer = fs.readFileSync("help.txt");
  const helpText = buffer.toString();
  console.log(helpText);
  process.exit(0);
}

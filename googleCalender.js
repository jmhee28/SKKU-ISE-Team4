/*
const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
*/
import { parsing } from "./crawling.js"
import { default as fsWithCallbacks } from 'fs'
const fs = fsWithCallbacks.promises
import path from "path"
import process from "process";
import { authenticate } from '@google-cloud/local-auth'
import { google } from 'googleapis'
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH, function (error) { //function(error) 추가해야 함
      console.log('write end!');
    });
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH, function (error) { //function(error) 추가해야 함
    console.log('write end!');
  });
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload, function (error) { //function(error) 추가해야 함
    console.log('write end!');
  });
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
let keywords = ["장학", "취업", "학사"];
async function getCrawled() {
  let crawlresult = [];
  let idx = 0;
  for (let keyword of keywords) {
    let crawl = await parsing(keyword);
    crawlresult.push({
      keyword: keyword,
      result: crawl
    });
    idx++;
  }
  // console.log("crawlresult\n" + JSON.stringify(crawlresult));
  return crawlresult;
}


async function addEvents(auth) {
  const calendar = google.calendar({ version: 'v3', auth });
  let crawlresult = await getCrawled();
  crawlresult = crawlresult;
  // console.log("crawlresult\n" + crawlresult);
  let eventlst = [];
  for (let cr of crawlresult) {
    for (let cnt of cr.result) {      
      let start = cnt.date + 'T09:00:00'
      let end = cnt.date + 'T10:00:00'
      // description이 undefined일때는 pass하기
      if(typeof(cnt.content[0]?.content) == "undefined")
      {
        continue;
      }      
      let evt = {
        'summary': cnt.title,
        'description': cnt.content[0]?.content, 
        'start': {
          'dateTime': start,
          'timeZone': 'Asia/Seoul',
        },
        'end': {
          'dateTime': end,
          'timeZone': 'Asia/Seoul',
        },
      }
      eventlst.push(evt);
    }
  }
  /*event1이랑 최대한 format 맞춰서 넣으면 될 것 같습니다. */
  // const event1 = {
  //     'summary': '과목이름2',
  //     'description': '과제이름2',
  //     'start': {
  //       'dateTime': '2022-12-28T09:00:00',
  //       'timeZone': 'Asia/Seoul',
  //     },
  //     'end': {
  //       'dateTime': '2022-12-28T17:00:00',
  //       'timeZone': 'Asia/Seoul',
  //     },
  //   };
  function sleep(ms) {

    return new Promise((resolve) => {
  
      setTimeout(resolve, ms);
  
    });
  
  }

  for (let event of eventlst) {
    console.log("event : ",event)
    await sleep(1000);
    calendar.events.insert({
      auth: auth,
      calendarId: 'primary',
      resource: event,
    }, function (err, event) {
      if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
        return;
      }
    });
  }
}

authorize().then(addEvents).catch(console.error);

export {authorize, addEvents};
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var SCOPES = [
    'https://www.googleapis.com/auth/calendar.readonly', // 캘린더 정보의 읽기 권한? 입니다.
    'https://www.googleapis.com/auth/calendar' // 캘린더 정보의 편집 권한? 입니다.
    ];

var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
// 토큰이 저장될 디렉토리
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';
// 토큰 파일 명
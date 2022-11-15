

var keywords = new Array(0);
var keylen = 0;
var schedules = new Array(0);
var schedulelen = 0;
function addkeyword(){
  keylen++;
  var newkey = document.getElementById('keyword').value;
  keywords.push(newkey);
  displaykeyword();
  document.getElementById('keyword').value ='';  
 
}
function displaykeyword(){
  document.getElementById('key').innerHTML = "";
  for(let i=0; i<keylen; i++){
    document.getElementById('key').innerHTML += createkeyword(keywords[i]);
  }
  
}
function createkeyword(keyword){
  return '<label class="list-group-item d-flex gap-3"><span class="pt-1 form-checked-content"><i class="bi bi-dash-circle" onclick="" style="cursor:pointer"></i><strong>  ' + keyword +'</strong></span><label>'
}

function addschedule(){
  schedulelen++;
  var newtitle = document.getElementById('s_title').value;
  var newdead = document.getElementById('s_dead').value;
  schedules.push([newtitle,newdead]);
  console.log(schedules);
  displayschedule();
  document.getElementById('s_title').value="";
  document.getElementById('s_dead').value="";
}

function displayschedule(){
  document.getElementById('schedule').innerHTML = "";
  for(let i = 0; i<schedulelen; i++){
    console.log(schedules[i]);
    document.getElementById('schedule').innerHTML += createschedule(schedules[i]);
  }
}

function createschedule(schedule){
  return '<label class="list-group-item d-flex gap-3"><input class="form-check-input flex-shrink-0" type="checkbox" value=""  style="font-size: 1.375em;"><span class="pt-1 form-checked-content"><strong>'+schedule[0]+'</strong><small class="d-block text-muted"><svg class="bi me-1" width="1em" height="1em"><use xlink:href="#calendar-event"/></svg>'+schedule[1]+'</small></span></label>'
}

// parsing(keywords);
// module.exports = {keywords};
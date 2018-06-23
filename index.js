const colors = require('colors');
const argv = require('optimist').argv;
const axios = require('axios');
const url = require('url');

let httpObj = {
    successNum : 0,
    failNum : 0 ,
    esNumber : 0 ,
    reqNumber : 0 ,
    reqUrl : '' 
}
let reqNum = 0;
if(!argv.url || typeof argv.url === 'boolean'){
    console.log('url is null'.red);
    return;
}
httpObj.reqUrl =argv.url;
httpObj.esNumber = ( argv.es && typeof argv.es !== 'boolean' && argv.es ) || 10;
httpObj.reqNumber = ( argv.req && typeof argv.req !== 'boolean' && argv.req ) || 100;
console.log('wait...'.green);
let timer = setInterval(req_http,1000)

function req_http(){
    if(reqNum >= httpObj.reqNumber){
        req_http_end();
        clearInterval(timer);
        return;
    }
    for(let i = 0 ; i < httpObj.esNumber ; i++){
        if(reqNum >= httpObj.reqNumber){
            break;
        }
        reqNum ++;
        axios.get(httpObj.reqUrl)
        .then(function (res) {
            httpObj.successNum ++ ;
        })
        .catch(function (err) {
            httpObj.failNum ++ ;
        });
    }
}

function req_http_end(){
    setTimeout(()=>{
        console.log(`totalReq:${httpObj.reqNumber.toString().blue},erupt simultaneously:${httpObj.esNumber.toString().yellow}/s,success:${(httpObj.successNum ).toString().green},fail:${(httpObj.reqNumber - httpObj.successNum).toString().red}`);
        process.exit();
    },httpObj.reqNumber * 10)
}

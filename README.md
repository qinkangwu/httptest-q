## Description:
> This is a get stress test on http or https. It will send multiple requests to the http or https at the same time, set the number of requests, and finally count the success or failure.

## Installation:
```
npm i -g httptest-q 
```
## Usage:
```
httpTest --url [--es] [--req]
```
## Example:
```
httpTest --url 'https://www.baidu.com' --es 100 --req 1000
log:totalReq:1000,erupt simultaneously:100/s,success:1000,fail:0
```
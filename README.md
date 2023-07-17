# PB Instance Generator

### setup:

1. Dependencies:
    
    `node 18 >` && (`npm` || `yarn`) && `pm2`

2. 
   
    Add pocketBase binary to pb/ folder and rename the binary file to pb

    `yarn gen' # generate new instance
   
    `yarn del' # delete instance by name
   
    `yarn res' # restart instance by name
   
    `yarn rel' # reload instance by name
   
    `yarn mgt' # create management database instance at 8090 port
   

## config.json file used to store id=port ,subdomain and targetUrl

{
  "proxies": [
    {
      "id": "8092",
      "subdomain": "sub1.cotech.test",
      "targetUrl": "http://127.0.0.1:8092"
    }
  ]
}

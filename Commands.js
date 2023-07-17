/**
 * {isLogin ? "Designed and Developed" : ""}
 */

/**
 * **************adding to existing connected repository*******
 * 
delete package-lock.json
node-modules folder
<This is done to reduce size of file being uploaded to git>
<These are recreated when npm install command is run>
git add .  
git commit -m "<add whatever comment  needed to identify change done>"
git push -u origin main
*******************end***********************

****In case of trying to add to a brand new repository*****
 git remote remove origin //to remove existing remote to repository
echo "# DMSAPPv1.1" >> README.md
git init
git add README.md
git commit -m "<add any comment>"
git branch -M main
git remote add origin <url of new repository>
git push -u origin main
**************end**********************

***************changing remote of repository to add to a preexisting one**********


git remote remove origin //to remove existing remote to repository
git init
git add .
git commit -m "<add any comment>"

git remote add origin <url of new repository>
git push -u origin main

*********might throw error check website**********
******https://www.cloudbees.com/blog/remote-origin-already-exists-error*******
*********end**************************


**************upgrading to latest sdk***********
expo upgrade cli 
npm audit fix --force //to resolve any such issues
npm install  //install all packages
sudo chown -R 501:20 "/Users/apple/.npm"//this will reset to sdk1.0.0
expo upgrade cli // this will ask to latest sdk.click yes

******************end******************************
***************launching expo go**********
npx expo start 
****************end************************
 */
/**
 * for directly generating apk file change eas.json as mentioned
 * https://docs.expo.dev/build-reference/apk/
 * eas build -p android --profile preview
 * 
 * old(now deprecated)
 expo build:android  

 */
/**
 *
 *
 */

/**
 *
 * "useNextNotificationsApi": true,
 */
/**
 * 200: OK. The standard success code and default option.
201: Object created. Useful for the store actions.
204: No content. When an action was executed successfully, but there is no content to return.
206: Partial content. Useful when you have to return a paginated list of resources.
400: Bad request. The standard option for requests that fail to pass validation.
401: Unauthorized. The user needs to be authenticated.
403: Forbidden. The user is authenticated, but does not have the permissions to perform an action.
404: Not found. This will be returned automatically by Laravel when the resource is not found.
500: Internal server error. Ideally you're not going to be explicitly returning this, but if something unexpected breaks, this is what your user is going to receive.
503: Service unavailable. Pretty self explanatory, but also another code that is not going to be returned explicitly by the application.
 * 
 */

/**
 * const response = await axios.post(
      ` https://997f-166-0-218-149.ngrok.io/api/v1/mobile`,
      {
        userID: "123456789",
        connectionType: "abc", // DeviceDetails.ConnectionType,
        deviceIp: "abc", //DeviceDetails.DeviceIP,
        deviceManufacturer: "abc", //DeviceDetails.DeviceManufacturer,
        deviceModelName: "abc", //DeviceDetails.DeviceModelName,
        deviceOsName: "abc", //DeviceDetails.DeviceOsName,
        deviceOsVersion: "abc", //DeviceDetails.DeviceOsVersion,
        devicePlatformApiLevel: "abc", //DeviceDetails.DevicePlatformApiLevel,
        onHardware: "abc", //DeviceDetails.OnHardware,
        //createdat: "what to be added here?",
        //updatedat: "what to be added here?",
       // DeviceDetails,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    ); //ngrock
 * 
 * 
 * 
 * login api(auth.js)
 * duty api(WelcomeScreen.js)
 * devicedetails api(WelcomeScreen.js)
 * 
 * 
 * 
 */
/**
 *
 */

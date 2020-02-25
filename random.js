console.log("1.I will be executed first");

function doAsyncWork() {
    return new Promise(function(resolve, reject) { 

        setTimeout(() =>{
            console.log("2. Doing something in a timer...");
            resolve("Asynchronus result");
        }, 3000);
    });
// waiting 3 sec to display
}
async function GetAsyncResults(){
    try{
        let asyncresult =await doAsyncWork(); //await used for wait until response come

        console.log("3. I'm second: " + asyncresult);
    }catch(err){
        console.log(err);
    }
    
}
 GetAsyncResults();

console.log("4. Doing other works");
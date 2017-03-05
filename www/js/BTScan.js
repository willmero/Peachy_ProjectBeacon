var BT_Devices = {};
var BT_ACCEPTED_LIST = [];
var BT_INIT = false;
var BT_ACCEPTED_DEVICE_REFRESH_RATE = 100;
var BT_AUTH_DEVICES = {};

function AddDevice(device)
{
    if(device.name){
        var dev = {};
        dev.rssi = device.rssi;
        dev.id = device.id;
        if(!BT_Devices[device.name])
            setTimeout(removeDevice, 8 * BT_ACCEPTED_DEVICE_REFRESH_RATE, device.name, dev);   
        BT_Devices[device.name] = dev;
    }
}

function removeDevice(name, device)
{
    if(BT_Devices[name].rssi == device.rssi)
    {
        delete BT_Devices[name];
        var accepted = BT_ACCEPTED_LIST.find((val) => {return val.name === name});
        if(accepted)
            accepted.destroyed(name);
        return;
    }
    else
    {
        setTimeout(removeDevice, 10 * BT_ACCEPTED_DEVICE_REFRESH_RATE, name, BT_Devices[name]);
    }

}

function callbackAcceptedDeviced()
{
    BT_ACCEPTED_LIST.forEach(function(item){
        var name = item.name;
        if (BT_Devices[name])
        {
            var bucketSize = 4;            
            var size = BT_Devices[name].rssi;
            if(size > 1)
                return
            if(size  > -120)
                bucketSize = 4
            if(size  > -115)
                bucketSize = 3;
            if(size > -100)
                bucketSize = 2;
            if(size > -70)
                bucketSize = 1;

            item.callback(name, bucketSize, BT_Devices[name].id,  BT_Devices[name].rssi);            
        }
    });
}

function BTScan_Init(bt_accepted_list, refresh_rate)
{
    BT_ACCEPTED_LIST = bt_accepted_list;
    BT_INIT = true;
    BT_ACCEPTED_DEVICE_REFRESH_RATE = refresh_rate | 100;
}

function BTScan_Start()
{
    if(!BT_INIT){
        onBTFail("BTScanner Not Initilized");
        return;
    }
    ble.startScanWithOptions([], { reportDuplicates: true }, AddDevice, onBTFail);
    setInterval(callbackAcceptedDeviced, BT_ACCEPTED_DEVICE_REFRESH_RATE);
}

function BTScan_Stop()
{
    if(!BT_INIT){
        onBTFail("BTScanner Not Initilized");
        return;
    }
    ble.stopScan(function(){
        console.log("Successfully Stopped BTScan");
    }, onBTFail);
}

// function BTScan_Auth(name, authCallback)
// {
//     var accepted = BT_ACCEPTED_LIST.find((val) => {return val.name === name});
//     if(accepted){
        
//         var auth = BT_AUTH_DEVICES[name];
//         if(auth ){
//             if(auth === 3)
//             {
//                 delete BT_AUTH_DEVICES[name];
//                 authCallback(true);
//             }
//             else
//             {
//                 if()
//                 BT_AUTH_DEVICES[name]++;
//                 setTimeout(BTScan_Auth, BT_ACCEPTED_DEVICE_REFRESH_RATE, name, authCallback);
//             }
//         }
//         else
//         {
//            BT_AUTH_DEVICES[name] = 0; 
//            setTimeout(BTScan_Auth, BT_ACCEPTED_DEVICE_REFRESH_RATE, name, authCallback);
//         }
//     }
//     else
//     {
//         authCallback(false);
//     }
// }


function onBTFail(error)
{
    console.log(error);
}

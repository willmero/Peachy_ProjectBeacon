var BT_Devices = {};
var BT_ACCEPTED_LIST = [];
var BT_INIT = false;
var BT_ACCEPTED_DEVICE_REFRESH_RATE = 100;
var BT_PREVIOUS_VALUE = {};

function AddDevice(device)
{
    if(device.name){
        BT_Devices[device.name] = {}
        BT_Devices[device.name].rssi = device.rssi;
        BT_Devices[device.name].id = device.id;
        BT_PREVIOUS_VALUE[device.name] = rssi;
    }
}

function callbackAcceptedDeviced()
{
    BT_ACCEPTED_LIST.forEach(function(item){
        var name = item.name;
        if (BT_Devices[name])
        {
            var bucketSize = 4;
            var rssi = BT_Devices[name].rssi;
            var size = rssi - BT_PREVIOUS_VALUE[name];
            if (rssi > -40 &&  BT_PREVIOUS_VALUE[name] > -50)
                if (size > 35)
                    size = BT_PREVIOUS_VALUE[name];
                else
                {
                    size = BT_Devices[name].rssi;
                    BT_PREVIOUS_VALUE[name] = BT_Devices[name].rssi;
                }
            else
            {
                if (size > 15)
                    size = BT_PREVIOUS_VALUE[name];
                else
                {
                    size = BT_Devices[name].rssi;
                    BT_PREVIOUS_VALUE[name] = BT_Devices[name].rssi;
                }
            }
            if(size  > -90)
                bucketSize = 3;
            if(size > -60)
                bucketSize = 2;
            if(size > -30)
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

function onBTFail(error)
{
    console.log(error);
}

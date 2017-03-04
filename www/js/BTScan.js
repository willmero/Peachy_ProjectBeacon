var BT_Devices = {};
var BT_ACCEPTED_LIST = [];
var BT_INIT = false;

function AddDevice(device)
{
    if(device.name){
        BT_Devices[device.name] = {}
        BT_Devices[device.name].rssi = device.rssi;
        BT_Devices[device.name].id = device.id;
    }
}

function callbackAcceptedDeviced()
{
    BT_ACCEPTED_LIST.forEach(function(item){
        var name = item.name;
        if (BT_Devices[name])
        {
            var size = -1*BT_Devices[name].rssi;
            if(size > 120)
                size = 120;
            if(size < 20)
                size = 20;
            size = (100 - (size - 20))/ 100;

            item.callback(name, size, BT_Devices[name].id,  -1*BT_Devices[name].rssi);
        }
    });
}

function BTScanInit(bt_accepted_list)
{
    BT_ACCEPTED_LIST = bt_accepted_list;
    BT_INIT = true;
}

function StartBTScan()
{
    if(!BT_INIT){
        onBTFail("BTScanner Not Initilized");
        return;
    }
    ble.startScanWithOptions([], { reportDuplicates: true }, AddDevice, onBTFail);
    setInterval(callbackAcceptedDeviced, 100);
}

function StopBTScan()
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
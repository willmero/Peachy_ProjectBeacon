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

// function printBTDevices()
// {
//     $("#BT_Devices").empty();
//     var val = "";
//     Object.keys(BT_Devices).forEach(function(dev){
//         // $("#BT_Devices").append('<p>ID: '+dev+', rssi: '+ BT_Devices[dev].rssi+', name: '+ BT_Devices[dev].name+'</p>');        
//         if(BT_Devices[dev].name == "Pebble Time LE DC6A")
//             val += '<p>ID: '+dev+', rssi: '+ BT_Devices[dev].rssi+', name: '+ BT_Devices[dev].name+'</p>';
//         // if(BT_Devices[dev].rssi > -90)
//         // {
//         //     val += '<p>ID: '+dev+', rssi: '+ BT_Devices[dev].rssi+', name: '+ BT_Devices[dev].name+'</p>';
//         // }
//         // else{
//         //     // console.log('<p>ID: '+dev+', rssi: '+ BT_Devices[dev].rssi+', name: '+ BT_Devices[dev].name+'</p>');
//         // }
//     });
//     $("#BT_Devices").append(val);
// }

function callbackAcceptedDeviced()
{
    BT_ACCEPTED_LIST.forEach(function(item){
        var name = item.name;
        if (BT_Devices[name])
        {

            ble.isConnected(item.id, function(isCon){
                if(isCon)
                {
                    console.log("Is Connected");
                    ble.readRSSI(item.id, function(rssi) {
                        item.callback(name, rssi, BT_Devices[name].id);    
                    }, onBTFail);
                }
                else
                {
                    
                }                
            }, function(val){
                // console.log("NOT: ", val);
                console.log("Isn't Connected");
                ble.connect(item.id, function(){
                    ble.readRSSI(item.id, function(rssi) {
                        item.callback(name, rssi, BT_Devices[name].id);    
                    }, onBTFail);
                }, onBTFail)
            });

            // ble.connect(item.id, function(){
            //         ble.readRSSI(item.id, function(rssi) {
            //         item.callback(name, rssi, BT_Devices[name].id);    
            //     }, onBTFail);
            // }, onBTFail)
            
            item.callback(name, BT_Devices[name].rssi, BT_Devices[name].id);
        }
    });
}

function onPause()
{
    StartBTScan();
}

function onResume()
{
    StopBTScan();
}  

function onReady()
{
    BTScanInit([{name: "Pebble Time LE DC6A", callback: function(name, rssi, id){
        $("#BT_Devices").empty();
        $("#BT_Devices").append('<p>ID: '+id+', rssi: '+ rssi+', name: '+ name+'</p>');
    }}]);
    StartBTScan();
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

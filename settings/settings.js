// Settings
$.domoticzurl = "http://192.168.1.80:8080";//domoticz url (can be with username:password@ip:port)
$.degreesUnit = " C";
$.percentUnit = " %";


// Dashboard screen User settings >>> 
// format: idx, value (from json), replace label, description, chart label, chart color
$.PageDashboardArray = [
    //switches
    ['15', 'Status', 'cell1', 'Mark Telefoon', 'button'],
    ['24', 'Status', 'cell2', 'Chantal Telefoon', 'button'],
    ['16', 'Status', 'cell3', 'Mac Mini', 'button'],
    ['17', 'Status', 'cell4', 'PC', 'button'],
    ['62', 'Status', 'cell5', 'Plex', 'button'],
    ['63', 'Status', 'cell6', 'SabNZB', 'button'],

    //other devices
    ['68', 'Humidity', 'cell7', 'Vocht Badkamer', 'badkamer', '#b2c831'],
    ['68', 'LastUpdate', 'cell70', 'Vocht Badkamer'],

    ['14', 'Temp', 'cell8', 'Temperatuur Woonkamer', 'woonkamer', '#2980B9'],
    ['14', 'LastUpdate', 'cell80', 'Temperatuur Woonkamer'],

    ['58', 'Usage', 'cell9', 'Zonnepanelen (Watt)'],
    ['58', 'Data', 'cell29', 'Zonnepanelen'],
    ['58', 'CounterToday', 'cell39', 'Zonnepanelen'],
    ['58', 'LastUpdate', 'cell19', 'Zonnepanelen'],

    ['47', 'Temp', 'cell10', 'Temperatuur Buiten', 'buiten', '#C0382B'],
    ['47', 'LastUpdate', 'cell100', 'Temperatuur Buiten'],

    ['53', 'Data', 'cell11', 'SabNZB Status'],
    ['57', 'Data', 'cell12', 'Plex Status'],
    ['41', 'Status', 'cell13', 'Ventilatie', 'arrow'],
];


// Switches Sidebar User settings >>> 
// format: idx, value (from json), replace label, description, chart label, chart color
$.PageSwitchArray = [
    //switches (left sidebar)
    ['15', 'Status', 'cell1', 'Mark Telefoon', 'button'],
    ['24', 'Status', 'cell2', 'Chantal Telefoon', 'button'],
    ['16', 'Status', 'cell3', 'Mac Mini', 'button'],
    ['17', 'Status', 'cell4', 'PC', 'button'],
    ['62', 'Status', 'cell5', 'Plex', 'button'],
    ['63', 'Status', 'cell6', 'SabNZB', 'button'],
];


// Graph screen User settings >>> (max 3 on screen)
//format: idx, value (from json), replace label, description, chart label, chart color
$.GraphTemperatureArray = [
    //graph screen (3 fields)
    ['58', 'counter&method=1', 'day', 'cell7', 'Zonnepanelen (Watt)', 'graph1', '#b2c831', 'v'],
    ['68', 'temp', 'day', 'cell8', 'Vocht Badkamer', 'graph2', '#C0382B', 'hu'],
    ['14', 'temp', 'day', 'cell10', 'Temperatuur Woonkamer', 'graph3', '#2980B9', 'te'],
];




// Graph screen User settings >>> (max 3 on screen)
$.LightArray = [
    //format: idx, 'Hue' (color lamp) or 'Dimmer' (for normal dimmer), replace label, description
    ['11', 'Hue', 'cell7', 'Tafel 1'],
    ['8', 'Hue', 'cell8', 'Tafel 2'],
    ['5', 'Hue', 'cell10', 'Tafel 3'],
    ['7', 'Hue', 'cell11', 'Tafel 4'],
    ['9', 'Hue', 'cell12', 'Spot 1 (TV)'],
    ['10', 'Hue', 'cell13', 'Spot 1 (Bank)'],
];


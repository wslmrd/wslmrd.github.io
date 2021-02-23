(function () {
    var myConnector = tableau.makeConnector();
    myConnector.getSchema = function (schemaCallback) {

    // var cols = [
    // { id : "date", alias:"Date", dataType : tableau.dataTypeEnum.string },
    // { id : "trips", alias: "Trips Per Day",dataType : tableau.dataTypeEnum.string },
    // { id : "farebox",alias: "Farebox Per Day", dataType : tableau.dataTypeEnum.string },
    // { id : "uniquemed",alias: "Unique Medallions", dataType : tableau.dataTypeEnum.string },
    // { id : "uniquedrivers", alias: "Unique Drivers", dataType : tableau.dataTypeEnum.string},
    // { id : "medperday", alias: "Medallions Per Day", dataType : tableau.dataTypeEnum.string },
    // { id : "avg1", alias: "Average Days Medallions On Road",  dataType : tableau.dataTypeEnum.string },
    // { id : "avg2", alias: "Avg Hours Per Day Per Medallion",  dataType : tableau.dataTypeEnum.string},
    // { id : "avg3", alias:"Avg Days Drivers on Road",  dataType : tableau.dataTypeEnum.string},
    // { id : "avg4", alias:"Avg Hours Per Day Per Driver", dataType : tableau.dataTypeEnum.string},
    // { id : "avg5", alias: "Avg Minutes Per Trip",  dataType : tableau.dataTypeEnum.string},
    // { id : "cc", alias: "Percent of Trips Paid with Credit Card", dataType : tableau.dataTypeEnum.string}
    // ];

    var colsMetricas = [
        { id : "tipo", alias:"Tipo", dataType : tableau.dataType.string },
        { id : "intencao", alias:"Intencao", dataType : tableau.dataType.string },
        { id : "usuario", alias:"Usuario", dataType : tableau.dataType.string },
    ]

    var tableInfo = {
    id : "uber",
    alias : "Tabela do Wesley",
    columns : colsMetricas
    };

    schemaCallback([tableInfo]);
    };
    
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://southamerica-east1-prodap-x.cloudfunctions.net/intencao_metricas ", function(resp) {
        var feat = resp;
        tableData = [];
        // Iterate over the JSON object
        for (var i = 0, len = feat.metricas.length; i < len; i++) {
        tableData.push({
        "tipo": feat[i]["Tipo"],
        "intencao": feat[i]["Intencao"],
        "usuario": feat[i]["Usuario"]
        // "date": feat[i]["Month"]["Year"],
        // "trips": feat[i]["Trips Per Day"],
        // "farebox": feat[i] ["Farebox Per Day"],
        // "uniquemed": feat[i] ["Unique Medallions"],
        // "uniquedrivers": feat[i] ["Unique Drivers"],
        // "medperday": feat[i] ["Medallions Per Day"],
        // "avg1": feat[i] ["Avg Days Medallions on Road"],
        // "avg2": feat[i] ["Avg Hours Per Day Per Medallion"] ,
        // "avg3": feat[i] ["Avg Days Drivers on Road"],
        // "avg4": feat[i] ["Avg Hours Per Day Per Driver"],
        // "avg5": feat[i] ["Avg Minutes Per Trip"],
        // "cc": feat[i] ["Percent of Trips Paid with Credit Card"]
        });
    }
    
    table.appendRows(tableData);
    doneCallback();
    });
    };
    tableau.registerConnector(myConnector);
    $(document).ready(function () {
    $("#submitButton").click(function () {
    tableau.connectionName = "uber";
    tableau.submit();
    });
    });})();
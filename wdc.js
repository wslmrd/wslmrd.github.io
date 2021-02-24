(function () {
    var myConnector = tableau.makeConnector();
    myConnector.getSchema = function (schemaCallback) {
        var colsMetricas = [
            { id : "tipo", alias:"tipo", dataType : tableau.dataType.string },
            { id : "intencao", alias:"intencao", dataType : tableau.dataType.string },
            { id : "usuario", alias:"usuario", dataType : tableau.dataType.string },
        ];

    var tableInfo = {
    id : "uber",
    alias : "Tabela do Wesley",
    columns : colsMetricas
    };

    schemaCallback([tableInfo]);
    };
    
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://southamerica-east1-prodap-x.cloudfunctions.net/intencao_metricas", function(resp) {
            var feat = resp.metricas,
                tableData = [];
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                "tipo": feat[i].tipo,
                "intencao": feat[i].intencao,
                "usuario": feat[i].usuario
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
(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "tipo",
            alias: "Tipo",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "intencao",
            alias: "Intencao",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "usuario",
            alias: "Usuario",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "horas",
            alias: "Horas",
            dataType: tableau.dataTypeEnum.string
        }];

        var colsEng = [{
            id: "idFazenda",
            alias: "idFazenda",
            dataType: tableau.dataTypeEnum.string
        }];
    
        var tableSchema = {
            id: "Firebase",
            alias: "Metricas",
            columns: cols
        };

        var tableSchema1 = {
            id: "Firebase",
            alias: "Engajamento",
            columns: colsEng
        };

    
        schemaCallback([tableSchema], [tableSchema1]);
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
                    "usuario": feat[i].usuario,
                    "horas": feat[i].data.horas
                });
            }
    
            table.appendRows(tableData);
            doneCallback();

            var feat = resp.engajamentoFazendas,
                tableDataEng = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "idFazenda": feat[i].idFazenda,
                });
            }

            table.appendRows(tableDataEng);
            doneCallback();

        });
    };

    tableau.registerConnector(myConnector);
    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Firebase";
            tableau.submit();
        });
    });
})();
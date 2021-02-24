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
            id: "idFazenda",
            alias: "idFazenda",
            dataType: tableau.dataTypeEnum.Integer
        }, {
            id: "app",
            alias: "App",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "codigoDialogo",
            alias: "Codigo_Dialogo",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "versaoFuncao",
            alias: "Versao_Funcao",
            dataType: tableau.dataTypeEnum.string

        }];
    
        var tableSchema = {
            id: "Firebase",
            alias: "Metricas",
            columns: cols
        };

    
        schemaCallback([tableSchema]);
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
                    "idFazenda": feat[i].idFazenda,
                    "app": feat[i].app,
                    "codigoDialogo": feat[i].codigoDialogo,
                    "versaoFuncao": feat[i].versaoFuncao

                });
            }
    
            table.appendRows(tableData);
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
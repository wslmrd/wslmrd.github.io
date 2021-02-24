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
            dataType: tableau.dataTypeEnum.string
/*        }, {
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
        }, {
            id: "plataforma",
            alias: "Plataforma_Dispositivo",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "modelo",
            alias: "Modelo_Dispositivo",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "nomeUsuario",
            alias: "Nome_Usuario_Dispositivo",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "email",
            alias: "Email_Dispositivo",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "usuario_Lore",
            alias: "Usuario_Dispositivo",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "versaoLore",
            alias: "Versao_Lore_Dispositivo",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "_seconds",
            alias: "SecondsUTC",
            dataType: tableau.dataTypeEnum.Integer
        }, {
            id: "_nanoseconds",
            alias: "Nano_Seconds_UTC",
            dataType: tableau.dataTypeEnum.Integer
        }, {
            id: "ano",
            alias: "Ano",
            dataType: tableau.dataTypeEnum.Integer
        }, {
            id: "mes",
            alias: "Mes",
            dataType: tableau.dataTypeEnum.Integer
        }, {
            id: "dia",
            alias: "Dia",
            dataType: tableau.dataTypeEnum.Integer
        }, {
            id: "horas",
            alias: "Horas",
            dataType: tableau.dataTypeEnum.Integer
        }, {
            id: "minutos",
            alias: "Minutos",
            dataType: tableau.dataTypeEnum.Integer
        }, {
            id: "segundos",
            alias: "Segundos",
            dataType: tableau.dataTypeEnum.Integer */
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
                    "idFazenda": feat[i].idFazenda
                    /*"app": feat[i].app,
                    "codigoDialogo": feat[i].codigoDialogo,
                    "versaoFuncao": feat[i].versaoFuncao,
                    "plataforma": feat[i].dispositivo.plataforma,
                    "modelo": feat[i].dispositivo.modelo,
                    "nomeUsuario": feat[i].dispositivo.usuario,
                    "email": feat[i].dispositivo.email,
                    "usuario_Lore": feat[i].dispositivo.usuario,
                    "versaoLore": feat[i].dispositivo.versaoLore,
                    "_seconds": feat[i].dataUTC._seconds,
                    "_nanoseconds": feat[i].dataUTC._nanoseconds,
                    "ano": feat[i].data.ano,
                    "mes": feat[i].data.mes,
                    "dia": feat[i].data.dia,
                    "horas": feat[i].data.horas,
                    "minutos": feat[i].data.minutos,
                    "segundos": feat[i].data.segundos*/

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
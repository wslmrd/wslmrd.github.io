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
            alias: "Id_Fazenda",
            dataType: tableau.dataTypeEnum.string
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
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "_nanoseconds",
            alias: "Nano_Seconds_UTC",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ano",
            alias: "Ano",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "mes",
            alias: "Mes",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "dia",
            alias: "Dia",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "horas",
            alias: "Horas",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "minutos",
            alias: "Minutos",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "segundos",
            alias: "Segundos",
            dataType: tableau.dataTypeEnum.string 
        }, {
            id: "id",
            alias: "id_metricas",
            dataType:tableau.dataTypeEnum.string
        }, {
            id: "dataEmISOString",
            alias: "data_Metrica",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "categoria_Dialogo",
            alias: "categoria_dialogo",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "UsuarioCriacao_Dialogo",
            alias: "usuario_Criacao_dialogo",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "UsuarioAlteracao_Dialogo",
            alias: "usuario_Alteracao_dialogo",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "excluido_Dialogo",
            alias: "excluido_dialogo",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "data_fim_Dialogo",
            alias: "data_fim_dialogo",
            dataType: tabelau.dataTypeEnum.string
        }, {
            id: "dataCriacao_Dialogo",
            alias: "data_criacao_dialogo",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "dataAlteracao_Dialogo",
            alias: "data_alteracao_dialogo",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "descricao_Dialogo",
            alias: "descricao_dialogo",
            dataType: tableau.dataTypeEnum.string  
        }, {
            id: "data_inicio_Dialogo",
            alias: "data_inicio_dialogo",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "nomeFazenda_Dialogo",
            alias: "nome_fazenda_dialogo",
            dataType: tableau.dataTypeEnum.string        
        }, {
            id: "lido",
            alias: "lido",
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
        $.getJSON("https://southamerica-east1-prodap-x.cloudfunctions.net/intencao_metricas?visaoTableau=true", function(resp) {
            var feat = resp.metricas,
                tableData = [];
			
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
				const dispositivo = feat[i].dispositivo || {}
                const dialogo = feat[i].dialogo || {}

                if (feat[i].dialogo && feat[i].dialogo.lido && feat[i].dialogo.lido.length > 1) {
                    for (var j = 0, len1 = feat[i].dialogo.lido.length; j < len1; j++) {
                        tableData.push({
                            "tipo": feat[i].tipo,
                            "intencao": feat[i].intencao,
                            "usuario": feat[i].usuario,
                            "idFazenda": feat[i].idFazenda,
                            "app": feat[i].app,
                            "codigoDialogo": feat[i].codigoDialogo,
                            "versaoFuncao": feat[i].versaoFuncao,
                            "plataforma": dispositivo.plataforma,
                            "modelo": dispositivo.modelo,
                            "nomeUsuario": dispositivo.usuario,
                            "email": dispositivo.email,
                            "usuario_Lore": dispositivo.usuario,
                            "versaoLore": dispositivo.versaoLore,
                            "_seconds": feat[i].dataUTC._seconds,
                            "_nanoseconds": feat[i].dataUTC._nanoseconds,
                            "ano": feat[i].data.ano,
                            "mes": feat[i].data.mes,
                            "dia": feat[i].data.dia,
                            "horas": feat[i].data.horas,
                            "minutos": feat[i].data.minutos,
                            "segundos": feat[i].data.segundos,
                            "id": feat[i].id,
                            "dataEmISOString": feat[i].dataEmISOString,
                            "categoria_dialogo": dialogo.categoria,
                            "UsuarioCriacao": dialogo.UsuarioCriacao,
                            "UsuarioAlteracao": dialogo.UsuarioAlteracao,
                            "excluido": dialogo.excluido,
                            "data_fim_Dialogo": dialogo.fim,
                            "dataCriacao_Dialogo": dialogo.dataCriacao,
                            "dataAlteracao_Dialogo": dialogo.dataAlteracao,
                            "descricao_Dialogo": dialogo.descricao,
                            "data_inicio_Dialogo": dialogo.inicio,
                            "lido": feat[i].dialogo.lido[j].usuario
        
                        });
                    }
                
                }
                else if (feat[i].dialogo && feat[i].dialogo.lido && feat[i].dialogo.lido.length == 1) {
                    tableData.push({
                        "tipo": feat[i].tipo,
                        "intencao": feat[i].intencao,
                        "usuario": feat[i].usuario,
                        "idFazenda": feat[i].idFazenda,
                        "app": feat[i].app,
                        "codigoDialogo": feat[i].codigoDialogo,
                        "versaoFuncao": feat[i].versaoFuncao,
                        "plataforma": dispositivo.plataforma,
                        "modelo": dispositivo.modelo,
                        "nomeUsuario": dispositivo.usuario,
                        "email": dispositivo.email,
                        "usuario_Lore": dispositivo.usuario,
                        "versaoLore": dispositivo.versaoLore,
                        "_seconds": feat[i].dataUTC._seconds,
                        "_nanoseconds": feat[i].dataUTC._nanoseconds,
                        "ano": feat[i].data.ano,
                        "mes": feat[i].data.mes,
                        "dia": feat[i].data.dia,
                        "horas": feat[i].data.horas,
                        "minutos": feat[i].data.minutos,
                        "segundos": feat[i].data.segundos,
                        "id": feat[i].id,
                        "dataEmISOString": feat[i].dataEmISOString,
                        "categoria_dialogo": dialogo.categoria,
                        "UsuarioCriacao": dialogo.UsuarioCriacao,
                        "UsuarioAlteracao": dialogo.UsuarioAlteracao,
                        "excluido": dialogo.excluido,
                        "data_fim_Dialogo": dialogo.fim,
                        "dataCriacao_Dialogo": dialogo.dataCriacao,
                        "dataAlteracao_Dialogo": dialogo.dataAlteracao,
                        "descricao_Dialogo": dialogo.descricao,
                        "data_inicio_Dialogo": dialogo.inicio,
                        "lido": feat[i].dialogo.lido[0].usuario
                    });
                }
                else {
                    tableData.push({
                        "tipo": feat[i].tipo,
                        "intencao": feat[i].intencao,
                        "usuario": feat[i].usuario,
                        "idFazenda": feat[i].idFazenda,
                        "app": feat[i].app,
                        "codigoDialogo": feat[i].codigoDialogo,
                        "versaoFuncao": feat[i].versaoFuncao,
                        "plataforma": dispositivo.plataforma,
                        "modelo": dispositivo.modelo,
                        "nomeUsuario": dispositivo.usuario,
                        "email": dispositivo.email,
                        "usuario_Lore": dispositivo.usuario,
                        "versaoLore": dispositivo.versaoLore,
                        "_seconds": feat[i].dataUTC._seconds,
                        "_nanoseconds": feat[i].dataUTC._nanoseconds,
                        "ano": feat[i].data.ano,
                        "mes": feat[i].data.mes,
                        "dia": feat[i].data.dia,
                        "horas": feat[i].data.horas,
                        "minutos": feat[i].data.minutos,
                        "segundos": feat[i].data.segundos,
                        "id": feat[i].id,
                        "dataEmISOString": feat[i].dataEmISOString,
                        "categoria_dialogo": dialogo.categoria,
                        "UsuarioCriacao": dialogo.UsuarioCriacao,
                        "UsuarioAlteracao": dialogo.UsuarioAlteracao,
                        "excluido": dialogo.excluido,
                        "data_fim_Dialogo": dialogo.fim,
                        "dataCriacao_Dialogo": dialogo.dataCriacao,
                        "dataAlteracao_Dialogo": dialogo.dataAlteracao,
                        "descricao_Dialogo": dialogo.descricao,
                        "data_inicio_Dialogo": dialogo.inicio,
                        "lido": ''
                    });
                }
                


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
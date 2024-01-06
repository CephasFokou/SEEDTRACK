// FUNCTION LOADER SERVICE
function showLoader() {
    var loader = document.getElementById("loader");
    loader.style.display = "flex";
}

function hideLoader() {
    var loader = document.getElementById("loader");
    loader.style.display = "none";
}

/*** APPEL DES FONCTIONS */
getDataGenetic();
getDataSpeculation();
getDataPollinisation();
getDataFarmaType();
getDataTypeActivity();
getDataFloorType();
getDataRole();

//http://5.250.176.223:8080/api/dictionaries/7/values


/** APPEL DES FONCTIONS */
getDataSite();
getDataParcels();
getDataFarms();
getDataLine();
getDataTree();
getDataFruit();
getDataLeave();
getDataUsers();
getProprio();

/**GET DATA GENETIC RESSOURCE */
function getDataGenetic(){
    $.ajax({
        url: URI+'/api/dictionaries/2/values',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            console.log('geneticRessource',data);
            tab = data;
            if (xhr.status == 200) {
                if ($.isArray(tab) && tab.length > 0) {
                    var options = '';
                    var j = tab;
                    for (var i = 0; i < j.length; i++) {
                        options += '<option value="' + j[i].label + '">' + j[i].label.toUpperCase() + '</option>';
                        //console.log(options);
                    }
                    $('.geneticRessource').html(options);
                        //console.log(item.name);
                }else{
                    $('.geneticRessource').html($("<option></option>").attr("value", "").text('AUCUNE DONNEE DISPONIBLE'));
                }
            }
          
        },
        error: function(xhr, status, error) {
            console.error(status + ' : ' + error);
        }
    });
}
/** GET DATA SPECULATION */
function getDataSpeculation(){
    $.ajax({
        url: URI+'/api/dictionaries/1/values',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            console.log('speculation',data);
            // console.log('code',xhr.status);
            tab = data;
            if (xhr.status == 200) {
                if ($.isArray(tab) && tab.length > 0) {
                    var options = '';
                    var j = tab;
                    for (var i = 0; i < j.length; i++) {
                        options += '<option value="' + j[i].label + '">' + j[i].code.toUpperCase() + '</option>';
                        //console.log(options);
                    }
                    $('.speculation').html(options);
                        //console.log(item.name);
                }else{
                    $('.speculation').html($("<option></option>").attr("value", "").text('AUCUNE DONNEE DISPONIBLE'));
                }
            }
        },
        error: function(xhr, status, error) {
            console.error(status + ' : ' + error);
        }
    });
}
/** GET DATA POLLINISATION */
function getDataPollinisation(){
    $.ajax({
        url: URI+'/api/dictionaries/6/values',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            console.log('POLLINISATION',data);
            // console.log('code',xhr.status);
            tab = data;
            if (xhr.status == 200) {
                if ($.isArray(tab) && tab.length > 0) {
                    var options = '';
                    var j = tab;
                    for (var i = 0; i < j.length; i++) {
                        options += '<option value="' + j[i].label + '">' + j[i].label.toUpperCase() + '</option>';
                        //console.log(options);
                    }
                    $('.pollinisation').html(options);
                        //console.log(item.name);
                }else{
                    $('.pollinisation').html($("<option></option>").attr("value", "").text('AUCUNE DONNEE DISPONIBLE'));
                }
            }
        },
        error: function(xhr, status, error) {
            console.error(status + ' : ' + error);
        }
    });
}
function getDataFarmaType(){
    $.ajax({
        url: URI+'/api/dictionaries/5/values',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            console.log('Farm Type',data);
            // console.log('code',xhr.status);
            tab = data;
            if (xhr.status == 200) {
                if ($.isArray(tab) && tab.length > 0) {
                    var options = '';
                    var j = tab;
                    for (var i = 0; i < j.length; i++) {
                        options += '<option value="' + j[i].label + '">' + j[i].label.toUpperCase() + '</option>';
                        //console.log(options);
                    }
                    $('.farmType').html(options);
                        //console.log(item.name);
                }else{
                    $('.farmType').html($("<option></option>").attr("value", "").text('AUCUNE DONNEE DISPONIBLE'));
                }
            }
        },
        error: function(xhr, status, error) {
            console.error(status + ' : ' + error);
        }
    });
}
function getDataTypeActivity(){
    $.ajax({
        url: URI+'/api/dictionaries/4/values',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            console.log('Type activity',data);
            // console.log('code',xhr.status);
            tab = data;
            if (xhr.status == 200) {
                if ($.isArray(tab) && tab.length > 0) {
                    var options = '';
                    var j = tab;
                    for (var i = 0; i < j.length; i++) {
                        options += '<option value="' + j[i].label + '">' + j[i].label.toUpperCase() + '</option>';
                        //console.log(options);
                    }
                    $('.activityType').html(options);
                        //console.log(item.name);
                }else{
                    $('.activityType').html($("<option></option>").attr("value", "").text('AUCUNE DONNEE DISPONIBLE'));
                }
            }
        },
        error: function(xhr, status, error) {
            console.error(status + ' : ' + error);
        }
    });
}
function getDataFloorType(){
    $.ajax({
        url: URI+'/api/dictionaries/7/values',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            console.log('FLOOR TYPE',data);
            // console.log('code',xhr.status);
            tab = data;
            if (xhr.status == 200) {
                if ($.isArray(tab) && tab.length > 0) {
                    var options = '';
                    var j = tab;
                    for (var i = 0; i < j.length; i++) {
                        options += '<option value="' + j[i].label + '">' + j[i].label.toUpperCase() + '</option>';
                        //console.log(options);
                    }
                    $('.floorType').html(options);
                        //console.log(item.name);
                }else{
                    $('.floorType').html($("<option></option>").attr("value", "").text('AUCUNE DONNEE DISPONIBLE'));
                }
            }
        },
        error: function(xhr, status, error) {
            console.error(status + ' : ' + error);
        }
    });
}
function getDataRole(){
    $.ajax({
        url: URI+'/api/roles',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            console.log('ROLE USER',data);
            // console.log('code',xhr.status);
            tab = data;
            if (xhr.status == 200) {
                if ($.isArray(tab) && tab.length > 0) {
                    var options = '';
                    var j = tab;
                    for (var i = 0; i < j.length; i++) {
                        options += '<option value="' + j[i].name + '" data-badge="">' + j[i].name.toUpperCase() + '</option>';
                        //console.log(options);
                    }
                    $('.roleUser').html(options);
                        //console.log(item.name);
                }else{
                    $('.roleUser').html($("<option></option>").attr("value", "").text('AUCUNE DONNEE DISPONIBLE'));
                }
            }
        },
        error: function(xhr, status, error) {
            console.error(status + ' : ' + error);
        }
    });
}

/** GET DATA PARCELS */
function getDataFarms(){
    //alert(237)
    $.ajax({
        url: URI+'/api/farms',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            console.log('all farms' ,data);
            if (xhr.status == 200) {
                tab = data;
                if ($.isArray(tab) && tab.length > 0) {
                    $.each(tab, function(index, item) {
                        var lb_latitude = item.geographicalPos.leftBottom.latitude;
                        var lb_longitude = item.geographicalPos.leftBottom.longitude;
                        var lt_latitude = item.geographicalPos.leftTop.latitude;
                        var lt_longitude = item.geographicalPos.leftTop.longitude;

                        var rb_latitude = item.geographicalPos.rightBottom.latitude;
                        var rb_longitude = item.geographicalPos.rightBottom.longitude;
                        var rt_latitude = item.geographicalPos.rightTop.latitude;
                        var rt_longitude = item.geographicalPos.rightTop.longitude;

                        var content =`<li class="sidebar-item">`;
                            content +=      `<a data-bs-target="#farms_${item.id}" data-bs-toggle="collapse" class="sidebar-link collapsed">
                                                ${item.name.toUpperCase()}<br/>
                                                <span class="text-body-tertiary small">${item.farmType}</span>
                                            </a>`;
                            
                            content +=`<div class="d-flex end-0 float-end mt-2 position-absolute position-relative top-0">`;
                            content +=      `<i class="fas fa-eye action_icon view_icon" id="view_icon_${item.id}" title="Lister de tous les parcerelles du champ" onclick="viewList('${item.name}', 'parcels', ${item.id})"></i>`;
                            if(roleUser == "ADMINISTRATEUR" || roleUser == "AGENT VALIDATEUR"){
                                content +=  `<i class="fas fa-pencil action_icon edit_icon" title="Cliquez pour editer" onclick="openModalFarm('${item.id}')"></i>`;
                            }
                            content +=      `<i class="fas fa-map-marked-alt action_icon map_icon" id="action_icon map_icon_${item.id}" title="Afficher localisation" 
                                                onclick="updateMap('${lt_latitude}','${lt_longitude}','${lb_latitude}','${lb_longitude}','${rt_latitude}','${rt_longitude}','${rb_latitude}','${rb_longitude}','${item.name.toUpperCase()}')">
                                            </i>`;	  
                            if(roleUser == "ADMINISTRATEUR" || roleUser == "AGENT VALIDATEUR"){
                                content +=     `<i class="fas fa-trash-alt action_icon delete_icon" id="delete_icon_${item.id}" title="Cliquez pour supprimer" onclick="confirmDeleteItem('sites', ${item.id})"></i>`;
                            }
                            content += `</div>`;
                            content +=     `<ul class="collapse cursor-default mb-3 sidebar-dropdown width-p" id="farms_${item.id}" data-bs-parent="#farms_${item.id}">
                                            <div class="card-body p-3 bg-body-tertiary">
                                                <div class="row">
                                                    <div class="d-flex gap-1 gm-ui-hover-effect small w-auto">
                                                        <div class="col-md-6 d-grid">
                                                            <span class="px-2 bg- small"><b>${item.initialArea}%</b> champs</span>
                                                            <span class="px-2 bg- small"><b>${item.initialDensity}%</b> arbre male NC</span>
                                                            <span class="px-2 bg- small"><b>${item.lastArea}%</b> arbre male C</span>
                                                            <span class="px-2 bg- small"><b>${item.lastDensity}%</b> arbre femelle NC</span>
                                                            <span class="px-2 bg- small"><b>${item.floorType}%</b> arbre femelle C</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>`;
                        $('#all_farms').append(content);
                        // $("#site_name").text(item.name.toUpperCase());
                        //console.log(item.name);
                    })
                    var options = "";
                    for (var i = 0; i < tab.length; i++) {
                        options += '<option value="' + tab[i].id + '">' + tab[i].name.toUpperCase() + '</option>';
                    }
                    $('.farmId').html(options);
                }else{
                    console.log('Le tableau est vide.');
                }
            }
          
        },
        error: function(xhr, status, error) {
            console.error(status + ' : ' + error);
        }
    });
}

function openModalFarm(farmId) {
    //alert(parcelId);
    getDataFarmById(farmId);
    //$('#addFarms').appendTo('body');
    $('#addFarms').modal('show');

}
function openAddFarmModal(){
    //alert(237)
    $("#add_farms").get(0).reset();
    //$('#add_site').trigger('reset');
    $('#addFarms').modal('show');
    $('#titleFarm').text("Enregistrement d'un champ");
    $('#add_farms').attr('data-mode', 'add');
    //alert(userId)
    $('#userId').val(userId);
    
}
function getDataFarmById(farmId){
    $.ajax({
        url: URI+'/api/farms/'+farmId,
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            if (xhr.status == 200) {
                console.log(`data parcel by`, data);
                var lb_latitude = data.geographicalPos.leftBottom.latitude;
                var lb_longitude = data.geographicalPos.leftBottom.longitude;
                var lt_latitude = data.geographicalPos.leftTop.latitude;
                var lt_longitude = data.geographicalPos.leftTop.longitude;

                var rb_latitude = data.geographicalPos.rightBottom.latitude;
                var rb_longitude = data.geographicalPos.rightBottom.longitude;
                var rt_latitude = data.geographicalPos.rightTop.latitude;
                var rt_longitude = data.geographicalPos.rightTop.longitude;
                var name = data.name;
                //var site = data.site;
                var geneticRessource = data.geneticRessource;
                var speculation  = data.speculation;
                var farmType  = data.farmType;
                var floorType  = data.floorType;
                var initialDensity = data.initialDensity;
                var lastDensity = data.lastDensity;
                var initialArea = data.initialArea;
                var lastArea = data.lastArea;
                //alert(farm)
                $('#titleFarm').text('Edition du champ '+name)
                $('#add_farms').attr('data-mode', 'edit');
                $('#add_farms').attr('data-id', data.id);
                $('#name_farms').val(name);
                //$('#siteIdFarm').val(site);
                $('#farmTypeParcel').val(farmType);
                $('#geneticRessourceParcel').val(geneticRessource);
                $('#speculationParcel').val(speculation);
                $('#initialDensity_farms').val(initialDensity);
                $('#lastDensity_farms').val(lastDensity);
                $('#initialArea_farms').val(initialArea);
                $('#lastArea_farms').val(lastArea);
                $('#floorTypeFarm').val(floorType);
                
                $('#lb_latitude_farms').val(lb_latitude);
                $('#lb_longitude_farms').val(lb_longitude);
                $('#lt_latitude_farms').val(lt_latitude);
                $('#lt_longitude_farms').val(lt_longitude);
                $('#rb_latitude_farms').val(rb_latitude);
                $('#rb_longitude_farms').val(rb_longitude);
                $('#rt_latitude_farms').val(rt_latitude);
                $('#rt_longitude_farms').val(rt_longitude);
                //$('#name').val(name);
                
            }
          
        },
        error: function(xhr, status, error) {
            console.error(status + ' URL NOT FOUND : ' + error);
        }
    });
}

/** POST DATA FARMS */
function sendDataFarmsWithFormData(e,form){
    e.preventDefault();
    var form_ = $('#'+form)[0];
    var formData = new FormData(form_);

    // Ajout de données supplémentaires à l'objet FormData existant
    var secondJSON = {
        geographicalPos: {
            leftBottom: { 
                latitude: $('#lb_latitude_farms').val() == null ? 0 : $('#lb_latitude_farms').val(),
                longitude: $('#lb_longitude_farms').val() == null ? 0 : $('#lb_longitude_farms').val()
            },
            leftTop: { 
                latitude: $('#lt_latitude_farms').val() == null ? 0 : $('#lt_latitude_farms').val(), 
                longitude: $('#lt_longitude_farms').val() == null ? 0 : $('#lt_longitude_farms').val() 
            },
            rightBottom: { 
                latitude: $('#rb_latitude_farms').val() == null ? 0 : $('#rb_latitude_farms').val(), 
                longitude: $('#rb_longitude_farms').val() == null ? 0 : $('#rb_longitude_farms').val() 
            },
            rightTop: { 
                latitude: $('#rt_latitude_farms').val() == null ? 0 : $('#rt_latitude_farms').val(), 
                longitude: $('#rt_longitude_farms').val() == null ? 0 : $('#rt_longitude_farms').val()
            }
        }
    };
    var formDataObj = {};
    formData.forEach(function(value, key){
        formDataObj[key] = value;
    });

    // Affichage des données JSON dans la console
    console.log("objet 1",formDataObj);
    console.log("objet 2",secondJSON);    
    
    // Ajout des propriétés du deuxième objet au premier objet
    Object.assign(formDataObj, secondJSON);
    var all_JSON = JSON.stringify(formDataObj);

    // Affichage du premier objet JSON mis à jour dans la console
    console.log('ALL JSON',all_JSON);
    var mode = $('#'+form).attr('data-mode');
    if (mode == "add") {
        $.ajax({
            url: URI+'/api/farms',
            type: "POST",
            contentType: 'application/json',
            data: all_JSON,
            dataType: "json",
            beforeSend: function() {
                $('.btn_submit').prop('disabled', true);
            },
            success: function(data,status, xhr) {
                console.log(data,status,xhr);
                if (xhr.status == 200 || xhr.status == 201) {
                    $(".alert").removeClass('alert-danger').addClass('alert-success').show()
                    $(".alert-message").text(data.name.toUpperCase()+ " ENREGISTRE AVEC SUCCES !!!");             
                    $("#"+form).get(0).reset();
                    setTimeout(function(){
                        window.location.reload(true);
                    }, 3000)
                }else{
                    $(".alert").removeClass('alert-success').addClass('alert-danger').show()
                    $(".alert-message").text(data.message+ ' '+data.httpStatus);  
                    $('.btn_submit').prop('disabled', false);
                }

            },
            error: function(xhr, status, error) {
                if (xhr.status == 500) {
                    console.log('Erreur 500 : ', xhr.responseText);
                    $(".alert").removeClass('alert-success').addClass('alert-danger').show()
                    $(".alert-message").text('Une erreur est survenue durant le traitement de votre requête');
                    $('.btn_submit').prop('disabled', false);
                } else {
                    console.log('Erreur : ', xhr.responseText, error);
                    var errorMessage = JSON.parse(xhr.responseText).message;
                    $(".alert").removeClass('alert-success').addClass('alert-danger').show()
                    $(".alert-message").text(errorMessage);
                    $('.btn_submit').prop('disabled', false);
                }
            }
        });
    }else if (mode == "edit") {
        var farmId = $('#'+form).attr('data-id');
        $.ajax({
            url: URI+'/api/farms/'+farmId,
            type: "PUT",
            contentType: 'application/json',
            data: all_JSON,
            dataType: "json",
            beforeSend: function() {
                $('.btn_submit').prop('disabled', true);
            },
            success: function(data,status, xhr) {
                console.log(data,status,xhr);
                if (xhr.status == 200 || xhr.status == 201) {
                    $(".alert").removeClass('alert-danger').addClass('alert-success').show()
                    $(".alert-message").text(data.name.toUpperCase()+ " MODIFIE AVEC SUCCES !!!");             
                    $("#"+form).get(0).reset();
                    setTimeout(function(){
                        window.location.reload(true);
                    }, 3000)
                }else{
                    $(".alert").removeClass('alert-success').addClass('alert-danger').show()
                    $(".alert-message").text(data.message+ ' '+data.httpStatus);  
                    $('.btn_submit').prop('disabled', false);
                }

            },
            error: function(xhr, status, error) {
                if (xhr.status == 500) {
                    console.log('Erreur 500 : ', xhr.responseText);
                    $(".alert").removeClass('alert-success').addClass('alert-danger').show()
                    $(".alert-message").text('Une erreur est survenue durant le traitement de votre requête');
                    $('.btn_submit').prop('disabled', false);
                } else {
                    console.log('Erreur : ', xhr.responseText, error);
                    var errorMessage = JSON.parse(xhr.responseText).message;
                    $(".alert").removeClass('alert-success').addClass('alert-danger').show()
                    $(".alert-message").text(errorMessage);
                    $('.btn_submit').prop('disabled', false);
                }
            }
        });
    }
}
// GET LIST PARCELLES BY CHAMPS
function getDataParcelByFarm(farmId){
    tabBody = [];
    $.ajax({
        url: URI+'/api/parcels/farm/'+farmId,
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {

            if (xhr.status == 200) {
                tab = data;
                if ($.isArray(tab) && tab.length > 0) {
                    $.each(tab, function(index, item) {
                        var lb_latitude = item.geographicalPos.leftBottom.latitude;
                        var lb_longitude = item.geographicalPos.leftBottom.longitude;
                        var lt_latitude = item.geographicalPos.leftTop.latitude;
                        var lt_longitude = item.geographicalPos.leftTop.longitude;

                        var rb_latitude = item.geographicalPos.rightBottom.latitude;
                        var rb_longitude = item.geographicalPos.rightBottom.longitude;
                        var rt_latitude = item.geographicalPos.rightTop.latitude;
                        var rt_longitude = item.geographicalPos.rightTop.longitude;
                        
                        console.log('testLong==' +rt_longitude);
                        // Ajouter les données de chaque élément à la liste tabBody
                        tabBody.push([item.id, item.name, item.speculation, item.geneticRessource,item.farm, item.farmType, item.soil, item.pollinisation, convertTimestampToDate(item.creationDate)]);
                    });
                    tabHeaders = ["#ID", "name", "speculation", "geneticRessource","Farm", "farmType", "soil", "pollinisation", "creationDate"];
                    displayTabHeader(tabHeaders);
                    displayTabBody(tabBody, tabHeaders);
                    console.log(tabBody);
                    
                }else{
                    displayTabHeader([]);
                    displayTabBody(["DATA NOT FOUND"],[]);
                    console.log('Le tableau est vide pour le champ ' + farmId);
                }
            }
          
        },
        error: function(xhr, status, error) {
            console.error(status + ' : ' + error);
        }
    });
}
// GET LIST ALL FARMS
function allFarms(){
    tabBody = [];
    $.ajax({
        url: URI+'/api/farms/all',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {

            if (xhr.status == 200) {
                var tab ;
                tab = data;
                console.log(`all data farms`, tab);
                if ($.isArray(tab) && tab.length > 0) {
                    $.each(tab, function(index, item) {
                       // Ajouter les données de chaque élément à la liste tabBody
                       tabBody.push([
                            item.id, item.name, item.initialArea, item.lastArea, item.initialDensity, item.lastDensity, item.farmType, convertTimestampToDate(item.creationDate)
                        ]);
                    });
                        
                    tabHeaders = ["#ID", "name", "Zone Initiale", "Zone Actuelle", "Densité Initiale", "Densité Actuelle", "Type de ferme", "creationDate"];
                    displayTabHeader(tabHeaders);
                    displayTabBody(tabBody, tabHeaders);
                    console.log(tabBody);
                    
                }else{
                    displayTabHeader([]);
                    displayTabBody(["DATA NOT FOUND"],[]);
                    console.log('Le tableau est vide pour tous les farms');
                }
            }
          
        },
        error: function(xhr, status, error) {
            displayTabHeader([]);
            displayTabBody(["URL API  NOT FOUND"],[]);
            console.error(status + ' : ' + error);
        }
    });
}
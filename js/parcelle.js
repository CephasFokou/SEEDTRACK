/** GET DATA PARCELS */
function getDataParcels(){
    $.ajax({
        url: URI+'/api/parcels',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            console.log('all parcels' ,data);
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
                        console.log("parcels", lb_latitude)
                        var content =`<li class="sidebar-item"> `;
                            content +=      `<a data-bs-target="#parcel_${item.id}" data-bs-toggle="collapse" class="sidebar-link collapsed">
                                                ${item.name.toUpperCase()}<br/>
                                                <span class="text-body-tertiary small">${item.geneticRessource}</span>
                                            </a>`;
                            content +=`<div class="d-flex end-0 float-end mt-2 position-absolute position-relative top-0">`;
                                            content +=      `<i class="fas fa-eye action_icon view_icon" id="view_icon_${item.id}" title="Lister de toutes des ligne de la parcerelle" onclick="viewList('${item.name}', 'lines', ${item.id})"></i>`;
                            if(roleUser == "ADMINISTRATEUR" || roleUser == "AGENT VALIDATEUR"){
                                content +=  `<i class="fas fa-pencil action_icon edit_icon" title="Cliquez pour editer" onclick="openModalParcel('${item.id}')"></i>`;
                            }
                            content +=      `<i class="fas fa-map-marked-alt action_icon map_icon" id="action_icon map_icon_${item.id}" title="Afficher localisation" 
                                                onclick="updateMap('${lt_latitude}','${lt_longitude}','${lb_latitude}','${lb_longitude}','${rt_latitude}','${rt_longitude}','${rb_latitude}','${rb_longitude}','${item.name.toUpperCase()}')">
                                            </i>`;	  
                            if(roleUser == "ADMINISTRATEUR" || roleUser == "AGENT VALIDATEUR"){
                                content +=     `<i class="fas fa-trash-alt action_icon delete_icon" id="delete_icon_${item.id}" title="Cliquez pour supprimer" onclick="confirmDeleteItem('sites', ${item.id})"></i>`;
                            }
                            content += `</div>`;
                            content += `<ul class="collapse cursor-default mb-3 sidebar-dropdown width-p" id="parcel_${item.id}" data-bs-parent="#parcel_${item.id}">
                                            <div class="card-body p-3 bg-body-tertiary">
                                                <div class="row">
                                                    <div class="d-flex gap-1 gm-ui-hover-effect small w-auto">
                                                        <div class="col-md-6 d-grid">
                                                            <span class="px-2 bg- small"><b>${item.percentageFarmSite}%</b> champs</span>
                                                            <span class="px-2 bg- small"><b>${item.numberMaleTreeNotNormal}%</b> arbre male NC</span>
                                                            <span class="px-2 bg- small"><b>${item.numberMaleTreeNormal}%</b> arbre male C</span>
                                                            <span class="px-2 bg- small"><b>${item.numberFemaleTreeNotNormal}%</b> arbre femelle NC</span>
                                                            <span class="px-2 bg- small"><b>${item.numberFemaleTreeNormal}%</b> arbre femelle C</span>
                                                        </div>
                                                        <div class="col-md-6 d-grid">
                                                            <span class="px-2 bg- small"><b>${item.numberFemaleTree}%</b> arbre manquant</span>
                                                            <span class="px-2 bg- small"><b>${item.percentageMaleTreeMissing}%</b> arbre M manquant</span>
                                                            <span class="px-2 bg- small"><b>${item.numberFemaleTreeMissing}%</b> arbre F manquant</span>
                                                            <span class="px-2 bg- small"><b>${item.percentageMaleLine}%</b> ligne male</span>
                                                            <span class="px-2 bg- small"><b>${item.percentageFemaleLine}%</b> ligne femelle</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>`;
                        $('#all_parcels').append(content);
                        // $("#site_name").text(item.name.toUpperCase());
                        //console.log(item.name);
                    })
                    var options = "";
                    for (var i = 0; i < tab.length; i++) {
                        options += '<option value="' + tab[i].id + '">' + tab[i].name.toUpperCase() + '</option>';
                    }
                    $('#parcelId').html(options);
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
function openModalParcel(parcelId) {
    //alert(parcelId);
    getDataParcelById(parcelId);
    $('#addParcerelle').appendTo('body');
    $('#addParcerelle').modal('show');

}
function openAddParcelModal(){
    //alert(237)
    $("#add_parcerelle").get(0).reset();
    //$('#add_site').trigger('reset');
    $('#addParcerelle').modal('show');
    $('#titleParcel').text("Enregistrement d'une parcerelle");
    $('#add_parcerelle').attr('data-mode', 'add');
    //alert(userId)
    $('#userId').val(userId);
    
}
function getDataParcelById(parcelId){
    $.ajax({
        url: URI+'/api/parcels/'+parcelId,
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
                var farm = data.farm;
                var geneticRessource = data.geneticRessource;
                var speculation  = data.speculation;
                var farmType  = data.farmType;
                var pollinisation  = data.pollinisation;
                var initialDensity = data.initialDensity;
                var actualDensity = data.actualDensity;
                var initialArea = data.initialArea;
                var actuelArea = data.actualArea;
                //alert(farm)
                $('#titleParcel').text('Edition de la parcerelle '+name)
                $('#add_parcerelle').attr('data-mode', 'edit');
                $('#add_parcerelle').attr('data-id', data.id);
                $('#nameParcel').val(name);
                //$('#farmIdParcel').val(farm);
                $('#farmTypeParcel').val(farmType);
                $('#geneticRessourceParcel').val(geneticRessource);
                $('#speculationParcel').val(speculation);
                $('#initialDensityParcel').val(initialDensity);
                $('#actualDensityParcel').val(actualDensity);
                $('#initialAreaParcel').val(initialArea);
                $('#actualAreaParcel').val(actuelArea);
                $('#pollinisationParcel').val(pollinisation);
                
                $('#lb_latitude_parcel').val(lb_latitude);
                $('#lb_longitude_parcel').val(lb_longitude);
                $('#lt_latitude_parcel').val(lt_latitude);
                $('#lt_longitude_parcel').val(lt_longitude);
                $('#rb_latitude_parcel').val(rb_latitude);
                $('#rb_longitude_parcel').val(rb_longitude);
                $('#rt_latitude_parcel').val(rt_latitude);
                $('#rt_longitude_parcel').val(rt_longitude);
                //$('#name').val(name);
                
            }
          
        },
        error: function(xhr, status, error) {
            console.error(status + ' URL NOT FOUND : ' + error);
        }
    });
}
/**POST DATA PARCELS */
function sendDataParcelWithFormData(e,form){
    e.preventDefault();
    var form_ = $('#'+form)[0];
    var formData = new FormData(form_);

    // Ajout de données supplémentaires à l'objet FormData existant
    var secondJSON = {
        geographicalPos: {
            leftBottom: { 
                latitude: $('#lb_latitude_parcel').val() == null ? 0 : $('#lb_latitude_parcel').val(),
                longitude: $('#lb_longitude_parcel').val() == null ? 0 : $('#lb_longitude_parcel').val()
            },
            leftTop: { 
                latitude: $('#lt_latitude_parcel').val() == null ? 0 : $('#lt_latitude_parcel').val(), 
                longitude: $('#lt_longitude_parcel').val() == null ? 0 : $('#lt_longitude_parcel').val() 
            },
            rightBottom: { 
                latitude: $('#rb_latitude_parcel').val() == null ? 0 : $('#rb_latitude_parcel').val(), 
                longitude: $('#rb_longitude_parcel').val() == null ? 0 : $('#rb_longitude_parcel').val() 
            },
            rightTop: { 
                latitude: $('#rt_latitude_parcel').val() == null ? 0 : $('#rt_latitude_parcel').val(), 
                longitude: $('#rt_longitude_parcel').val() == null ? 0 : $('#rt_longitude_parcel').val()
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
            url: URI+'/api/parcels',
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
                    $(".alert-message").text(data.name.toUpperCase()+ " ENREGISTREE AVEC SUCCES !!!");             
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
    } else if(mode == "edit") {
        var parcelId = $('#'+form).attr('data-id');
        $.ajax({
            url: URI+'/api/parcels/'+parcelId,
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
                    $(".alert-message").text(data.name.toUpperCase()+ " MODIFIEE AVEC SUCCES !!!");             
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

// GET LIST LINE BY PARCELS
function getDataLineByParcel(parcelId){
    tabBody = [];
    $.ajax({
        url: URI+'/api/lines/parcel/'+parcelId,
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {

            if (xhr.status == 200) {
                tab = data;
                //alert(tab);
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
                        tabBody.push([
                            item.id,
                            // '<img src="' + URI + '/api/images/' + item.image + '">',
                            item.name,
                            convertTimestampToDate(item.creationDate)
                        ]);                   
                    });
                        
                    tabHeaders = ["#ID", "Name","creationDate"];
                    displayTabHeader(tabHeaders);
                    displayTabBody(tabBody, tabHeaders);
                    console.log(tabBody);
                    
                }else{
                    displayTabHeader([]);
                    displayTabBody(["DATA NOT FOUND"],[]);
                    console.log('Le tableau est vide pour la parcel ' + parcelId);
                }
            }
          
        },
        error: function(xhr, status, error) {
            console.error(status + ' : ' + error);
        }
    });
}

// GET LIST ALL PARCELS
function allParcels(){
    tabBody = [];
    $.ajax({
        url: URI+'/api/parcels/all',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {

            if (xhr.status == 200) {
                var tab ;
                tab = data;
                console.log(`all data parcels`, tab);
                if ($.isArray(tab) && tab.length > 0) {
                    $.each(tab, function(index, item) {
                       // Ajouter les données de chaque élément à la liste tabBody
                       tabBody.push([
                            item.id, item.name, item.speculation, item.geneticRessource,item.farm, item.farmType, item.soil, item.pollinisation, convertTimestampToDate(item.creationDate)
                        ]);
                                            
                    });
                        
                    tabHeaders = ["#ID", "name", "speculation", "geneticRessource","Farm", "farmType", "soil", "pollinisation", "creationDate"];
                    displayTabHeader(tabHeaders);
                    displayTabBody(tabBody, tabHeaders);
                    console.log(tabBody);
                    
                }else{
                    displayTabHeader([]);
                    displayTabBody(["DATA NOT FOUND"],[]);
                    console.log('Le tableau est vide pour tous les Parcerelles');
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
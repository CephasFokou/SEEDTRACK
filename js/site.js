let ParcelleSite = [];
let tabHeaders = [];
let tabBody = [] 

/** GET DATA SITE */
function getDataSite(){
    $.ajax({
        url: URI+'/api/sites',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            console.log('all sites' ,data);
            if (xhr.status == 200) {
                tab = data.data;
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
                        
                        console.log(rt_longitude);
                        var content =`<li class="sidebar-item" data-id="${item.id}">`;
                        content += `<a data-bs-target="#site_${item.id}" data-bs-toggle="collapse" class="sidebar-link collapsed">
                                            ${item.name.toUpperCase()}<br/>
                                            <span class="text-body-tertiary small">${item.geneticRessource}</span>
                                        </a>`;
                        content +=`<div class="d-flex end-0 float-end mt-2 position-absolute position-relative top-0">`;
                        content +=      `<i class="fas fa-eye action_icon view_icon" id="view_icon_${item.id}" title="Lister champs du site" onclick="viewList('${item.name}', 'champs', ${item.id})"></i>`;
                        if(roleUser == "ADMINISTRATEUR" || "ROLE_ADMIN" || roleUser == "AGENT VALIDATEUR"){
                            content +=      `<i class="fas fa-toggle-off action_icon valid_icon" data-status="off" title="Cliquez pour activer" id="validSite${item.id}" onclick="validerAction('${item.id}')"></i>`;
                            content +=      `<i class="fas fa-pencil action_icon edit_icon" title="Cliquez pour editer" onclick="openModalSite('${item.id}')"></i>`;
                        }
                        content +=      `<i class="fas fa-map-marked-alt action_icon map_icon" id="action_icon map_icon_${item.id}" title="Afficher localisation" 
                                            onclick="updateMap('${lt_latitude}','${lt_longitude}','${lb_latitude}','${lb_longitude}','${rt_latitude}','${rt_longitude}','${rb_latitude}','${rb_longitude}','${item.name.toUpperCase()}')">
                                        </i>`;	  
                        if(roleUser == "ADMINISTRATEUR" || roleUser == "AGENT VALIDATEUR"){
                            content +=     `<i class="fas fa-trash-alt action_icon delete_icon" id="delete_icon_${item.id}" title="Cliquez pour supprimer" onclick="confirmDeleteItem('sites', ${item.id})"></i>`;
                        }

                        content += `</div>`;
                        content +=     `<ul class="collapse cursor-default mb-3 sidebar-dropdown width-p" id="site_${item.id}" data-bs-parent="#site_${item.id}">
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
                                                            <span class="px-2 bg- small"><b>${item.percentageMaleTreeMissing}%</b> arbre male manquant</span>
                                                            <span class="px-2 bg- small"><b>${item.numberFemaleTreeMissing}%</b> arbre femelle manquant</span>
                                                            <span class="px-2 bg- small"><b>${item.percentageMaleLine}%</b> ligne male</span>
                                                            <span class="px-2 bg- small"><b>${item.percentageFemaleLine}%</b> ligne femelle</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>`;
                        $('#all_sites').append(content);
                        $("#site_name").text(item.name.toUpperCase());
                    })
                    //APPEL SITE SELECT BOX
                    var options = "";
                    for (var i = 0; i < tab.length; i++) {
                        options += '<option value="' + tab[i].id + '">' + tab[i].name.toUpperCase() + '</option>';
                    }
                    $('.siteId').html(options);
                    ///console.log(options);

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

/** POST DATA SITE */
function sendDataWithFormData(e,form){
    e.preventDefault();
    var form_ = $('#'+form)[0];
    var formData = new FormData(form_);

    // Ajout de données supplémentaires à l'objet FormData existant
    var secondJSON = {
        geographicalPos: {
            leftBottom: { 
                latitude: $('#lb_latitude').val() == null ? 0 : $('#lb_latitude').val(),
                longitude: $('#lb_longitude').val() == null ? 0 : $('#lb_longitude').val()
            },
            leftTop: { 
                latitude: $('#lt_latitude').val() == null ? 0 : $('#lt_latitude').val(), 
                longitude: $('#lt_longitude').val() == null ? 0 : $('#lt_longitude').val() 
            },
            rightBottom: { 
                latitude: $('#rb_latitude').val() == null ? 0 : $('#rb_latitude').val(), 
                longitude: $('#rb_longitude').val() == null ? 0 : $('#rb_longitude').val() 
            },
            rightTop: { 
                latitude: $('#rt_latitude').val() == null ? 0 : $('#rt_latitude').val(), 
                longitude: $('#rt_longitude').val() == null ? 0 : $('#rt_longitude').val()
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

    if(mode == "add"){
        $.ajax({
            url: URI+'/api/sites',
            type: "POST",
            contentType: 'application/json',
            data: all_JSON,
            dataType: "json",
            beforeSend: function() {
                $('.btn_submit').prop('disabled', true);
            },
            success: function(data,status, xhr) {
                console.log(data);
                if (xhr.status == 200 || xhr.status == 201) {
                    $(".alert").removeClass('alert-danger').addClass('alert-success').show()
                    $(".alert-message").text(data.name.toUpperCase()+ " ENREGISTRE AVEC SUCCES !!!");             
                    $("#"+form).get(0).reset();
                    setTimeout(function () {
                        window.location.reload(true);
                    }, 2000);
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
            },
            complete: function () {
                $('.btn_submit').prop('disabled', false);
            }
        });
    }else if(mode == "edit"){
        var id_site_edit = $('#'+form).attr('data-id');
        //alert(id_site_edit)
        $.ajax({
            url: URI+'/api/sites/'+id_site_edit,
            type: "PUT",
            contentType: 'application/json',
            data: all_JSON,
            dataType: "json",
            beforeSend: function() {
                $('.btn_submit').prop('disabled', true);
            },
            success: function(data,status, xhr) {
                console.log(data);
                if (xhr.status == 200 || xhr.status == 201) {
                    $(".alert").removeClass('alert-danger').addClass('alert-success').show()
                    $(".alert-message").text(data.name.toUpperCase()+ " MODIFIE AVEC SUCCES !!!");             
                    $("#"+form).get(0).reset();
                    setTimeout(function () {
                        window.location.reload(true);
                    }, 2000);
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
            },
            complete: function () {
                $('.btn_submit').prop('disabled', false);
            }
        });
    }

}
// function openModalSiteEdit() {
//     // Gestionnaire d'événements pour l'icône d'édition avec délégation d'événements
//     $('#all_sites').on('click', '.edit_icon', function() {
//         var siteId = $(this).closest('.sidebar-item').data('id');
//         openModalSite(siteId); // Appel de la fonction pour ouvrir le modal
//     });
// }
function openModalSite(siteId) {
    //alert(siteId);
    getDataSiteById(siteId);
    $('#addSite').appendTo('body');
    $('#addSite').modal('show');

}
function openAddSiteModal(){
    //alert(237)
    $("#add_site").get(0).reset();
    //$('#add_site').trigger('reset');
    $('#addSite').modal('show');
    $('#titleSite').text("Enregistrement d'un site ");
    $('#add_site').attr('data-mode', 'add');
    //alert(userId)
    $('#userId').val(userId);
    
}
function getDataSiteById(siteId){
    $.ajax({
        url: URI+'/api/sites/'+siteId,
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            if (xhr.status == 200) {
                console.log(`data site by`, data);
                var lb_latitude = data.geographicalPos.leftBottom.latitude;
                var lb_longitude = data.geographicalPos.leftBottom.longitude;
                var lt_latitude = data.geographicalPos.leftTop.latitude;
                var lt_longitude = data.geographicalPos.leftTop.longitude;

                var rb_latitude = data.geographicalPos.rightBottom.latitude;
                var rb_longitude = data.geographicalPos.rightBottom.longitude;
                var rt_latitude = data.geographicalPos.rightTop.latitude;
                var rt_longitude = data.geographicalPos.rightTop.longitude;
                var name = data.name;
                var geneticRessource = data.geneticRessource;
                var speculation  = data.speculation;

                //alert(siteId)
                $('#titleSite').text('Edition du site '+name)
                $('#add_site').attr('data-mode', 'edit');
                $('#add_site').attr('data-id', data.id);
                $('#nameSite').val(name);
                $('#geneticRessource').val(geneticRessource);
                $('#speculation').val(speculation);
                $('#lb_latitude').val(lb_latitude);
                $('#lb_longitude').val(lb_longitude);
                $('#lt_latitude').val(lt_latitude);
                $('#lt_longitude').val(lt_longitude);
                $('#rb_latitude').val(rb_latitude);
                $('#rb_longitude').val(rb_longitude);
                $('#rt_latitude').val(rt_latitude);
                $('#rt_longitude').val(rt_longitude);
                //$('#name').val(name);
                
            }
          
        },
        error: function(xhr, status, error) {
            console.error(status + ' URL NOT FOUND : ' + error);
        }
    });
}
// GET LIST PARCELLES SITES
function getDataFarmsSite(siteId){
    tabBody = [];
    $.ajax({
        url: URI+'/api/farms/site/'+siteId,
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            console.log(`data farm by idSite`, data);
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
                        tabBody.push([item.id, item.name, item.initialArea, item.lastArea, item.initialDensity, item.lastDensity, item.farmType, convertTimestampToDate(item.creationDate)]);
                    });
                    tabHeaders = ["#ID", "name", "Zone Initiale", "Zone Actuelle", "Densité Initiale", "Densité Actuelle", "Type de ferme", "creationDate"];
                    displayTabHeader(tabHeaders);
                    displayTabBody(tabBody, tabHeaders);
                    console.log(tabBody);
                    
                }else{
                    displayTabHeader([]);
                    displayTabBody(["DATA NOT FOUND"],[]);
                    console.log('Le tableau est vide pour le site ' + siteId);
                }
            }
          
        },
        error: function(xhr, status, error) {
            console.error(status + ' : ' + error);
        }
    });
}
// GET LIST ALL SITES
function allSites(){
    tabBody = [];
    $.ajax({
        url: URI+'/api/sites/all',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {

            if (xhr.status == 200) {
                var tab ;
                tab = data;
                console.log(`all data sites`, tab);
                if ($.isArray(tab) && tab.length > 0) {
                    $.each(tab, function(index, item) {
                       // Ajouter les données de chaque élément à la liste tabBody
                       tabBody.push([
                        item.id, item.name, item.speculation, item.geneticRessource,item.user, convertTimestampToDate(item.creationDate)
                    ]);
                    });
                        
                    tabHeaders = ["#ID", "name", "speculation", "geneticRessource","User","creationDate"];
                    displayTabHeader(tabHeaders);
                    displayTabBody(tabBody, tabHeaders);
                    console.log(tabBody);
                    
                }else{
                    displayTabHeader([]);
                    displayTabBody(["DATA NOT FOUND"],[]);
                    console.log('Le tableau est vide pour tous les sites');
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

$(document).ready(function() {
    $('#all_sites').on('click', '.edit_icon', function() {
        // Obtient l'identifiant du site en utilisant les attributs de données
        var siteId = $(this).closest('.sidebar-item').data('id');
        
        // Ouvre le modal pour le site spécifique
        openModalSite(siteId);
    });
});
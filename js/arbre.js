/** GET DATA TREE */
function getDataTree(){
    //alert(237)
    $.ajax({
        url: URI+'/api/trees',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            console.log('all arbre' ,data);
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
                        var content =`
                                    <li class="sidebar-item">
                                        <a data-bs-target="#tree_${item.id}" data-bs-toggle="collapse" class="sidebar-link collapsed">
                                            ${item.name.toUpperCase()}<br/>
                                            <span class="text-body-tertiary small">${item.name}</span>
                                        </a>
                                        <div class="d-flex end-0 float-end mt-2 position-absolute position-relative top-0">
                                            <i class="fas fa-eye action_icon view_icon" id="view_icon_${item.id}" title="Lister fruits d'un arbre'" onclick="viewList('${item.name}', 'fruits', ${item.id})"></i>
                                            <i class="fas fa-pencil action_icon edit_icon" id="edit_icon_${item.id}" title="Cliquez pour editer" onclick="openModalTree(${item.id})"></i>
                                            <i class="fas fa-map-marked-alt action_icon map_icon" id="action_icon map_icon_${item.id}" title="Afficher localisation" 
                                                onclick="updateMap('${lt_latitude}','${lt_longitude}','${lb_latitude}','${lb_longitude}','${rt_latitude}','${rt_longitude}','${rb_latitude}','${rb_longitude}','${item.name.toUpperCase()}')">
                                            </i>	  
                                            <i class="fas fa-trash-alt action_icon delete_icon" id="delete_icon_${item.id}" title="Cliquez pour supprimer" onclick="confirmDeleteItem('trees', ${item.id})"></i>	  
                                        </div>
                                        <div class="collapse sidebar-dropdown border-1 border-bottom mx-4 row" id="tree_${item.id}">
                                            <div class="col-6 d-grid justify-content-center p-0">
                                                <div class="card card-image">
                                                    <img src="${URI}/api/images/${item.image}" onerror="this.onerror=null; this.src='./img/standard-img.png';" alt="" class="img-tree image-fuild">
                                                </div>
                                            </div>
                                            <div class="col-6 lh-base p-0  text-capitalize text-muted">
                                                <div class="d-grid">
                                                    <div class="d-flex">
                                                        <span class=""><strong>Nbr Parent M :</strong> </span>
                                                        <span class="">${item.parentMale}</span>
                                                    </div>
                                                    <div class="d-flex">
                                                        <span class=""><strong>Nbr Parent F :</strong> </span>
                                                        <span class="">${item.parentMale}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>`;
                        $('#all_trees').append(content);
                        // $("#site_name").text(item.name.toUpperCase());
                        //console.log(item.name);
                    })
                    var options = "";
                    for (var i = 0; i < tab.length; i++) {
                        options += '<option value="' + tab[i].id + '">' + tab[i].name.toUpperCase() + '</option>';
                    }
                    $('#treeId_fruit').html(options);
                    $('#treeId_leave').html(options);
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

function openModalTree(TreeId) {
    //alert(parcelId);
    getDataTreeById(TreeId);
    //$('#addFarms').appendTo('body');
    $('#addTree').modal('show');

}
function openAddTreeModal(){
    //alert(237)
    $("#add_tree").get(0).reset();
    //$('#add_site').trigger('reset');
    $('#addTree').modal('show');
    $('#titleTree').text("Enregistrement d'un arbre");
    $('#add_tree').attr('data-mode', 'add');
    //alert(userId)
    //$('#userId').val(userId);
    
}
function getDataTreeById(TreeId){
    $.ajax({
        url: URI+'/api/trees/'+TreeId,
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            if (xhr.status == 200) {
                console.log(`data Tree by`, data);
                var lb_latitude = data.geographicalPos.leftBottom.latitude;
                var lb_longitude = data.geographicalPos.leftBottom.longitude;
                var lt_latitude = data.geographicalPos.leftTop.latitude;
                var lt_longitude = data.geographicalPos.leftTop.longitude;

                var rb_latitude = data.geographicalPos.rightBottom.latitude;
                var rb_longitude = data.geographicalPos.rightBottom.longitude;
                var rt_latitude = data.geographicalPos.rightTop.latitude;
                var rt_longitude = data.geographicalPos.rightTop.longitude;
                var name = data.name;
                var line = data.line;
                var parentMale = data.parentMale;
                var parentFemale = data.parentFemale;
                var altitude = data.altitude;
               
                //alert(farm)
                $('#titleTree').text("Edition de l'arbre "+name)
                $('#add_tree').attr('data-mode', 'edit');
                $('#add_tree').attr('data-id', data.id);
                $('#nameTree').val(name);
                //$('#lineId_tree').val(line);
                $('#parentMale').val(parentMale);
                $('#parentFemale').val(parentFemale);
                $('#altitude_tree').val(altitude);

                $('#lb_latitude_tree').val(lb_latitude);
                $('#lb_longitude_tree').val(lb_longitude);
                $('#lt_latitude_tree').val(lt_latitude);
                $('#lt_longitude_tree').val(lt_longitude);
                $('#rb_latitude_tree').val(rb_latitude);
                $('#rb_longitude_tree').val(rb_longitude);
                $('#rt_latitude_tree').val(rt_latitude);
                $('#rt_longitude_tree').val(rt_longitude);
                //$('#name').val(name);
                
            }
          
        },
        error: function(xhr, status, error) {
            console.error(status + ' URL NOT FOUND : ' + error);
        }
    });
}

/** POST DATA TREE */
function sendDataTreeWithFormData(e,form){
    e.preventDefault();
    var form_ = $('#'+form)[0];
    var formData = new FormData(form_);

    // Ajout de données supplémentaires à l'objet FormData existant
    var secondJSON = {
        geographicalPos: {
            leftBottom: { 
                latitude: $('#lb_latitude_tree').val() == null ? 0 : $('#lb_latitude_tree').val(),
                longitude: $('#lb_longitude_tree').val() == null ? 0 : $('#lb_longitude_tree').val()
            },
            leftTop: { 
                latitude: $('#lt_latitude_tree').val() == null ? 0 : $('#lt_latitude_tree').val(), 
                longitude: $('#lt_longitude_tree').val() == null ? 0 : $('#lt_longitude_tree').val() 
            },
            rightBottom: { 
                latitude: $('#rb_latitude_tree').val() == null ? 0 : $('#rb_latitude_tree').val(), 
                longitude: $('#rb_longitude_tree').val() == null ? 0 : $('#rb_longitude_tree').val() 
            },
            rightTop: { 
                latitude: $('#rt_latitude_tree').val() == null ? 0 : $('#rt_latitude_tree').val(), 
                longitude: $('#rt_longitude_tree').val() == null ? 0 : $('#rt_longitude_tree').val()
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
            url: URI+'/api/trees',
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
                    itemId = data.id;
                    typeForm = "tree";
                    setTimeout(function(){
                        $('#addTree').modal('hide');
                        $('#addItem').modal('show');
                        $('#addItem').modal({
                            backdrop: 'static',
                            keyboard: false
                        });
                        $('#nameItem').text(data.name.toUpperCase());
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
    }else if(mode == "edit"){
        var treeId = $('#'+form).attr('data-id');
        $.ajax({
            url: URI+'/api/trees/'+treeId,
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
                    itemId = data.id;
                    typeForm = "tree";
                    setTimeout(function(){
                        $('#addTree').modal('hide');
                        $('#addItem').modal('show');
                        $('#addItem').modal({
                            backdrop: 'static',
                            keyboard: false
                        });
                        $('#nameItem').text(data.name.toUpperCase());
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







function getTreeById(treeId){
    $.ajax({
        url: URI+'/api/trees/'+treeId,
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            console.log('treeData' ,data);
            if (xhr.status == 200) {
                        var lb_latitude = data.geographicalPos.leftBottom.latitude;
                        var lb_longitude = data.geographicalPos.leftBottom.longitude;
                        var lt_latitude = data.geographicalPos.leftTop.latitude;
                        var lt_longitude = data.geographicalPos.leftTop.longitude;

                        var rb_latitude = data.geographicalPos.rightBottom.latitude;
                        var rb_longitude = data.geographicalPos.rightBottom.longitude;
                        var rt_latitude = data.geographicalPos.rightTop.latitude;
                        var rt_longitude = data.geographicalPos.rightTop.longitude;
                        var content =`
                        <div class="card" style="width: 18rem;">
                            <img src="${URI}/api/images/${data.image}" onerror="this.onerror=null; this.src='./img/standard-img.png';" alt="" class="card-img-top">
                                <div class="card-body">
                                    <div class="d-flex icone-content">
                                    <i class="fas fa-eye action_icon view_icon" id="view_icon_${data.id}" title="Lister fruits d'un arbre'" onclick="viewList('${data.name}', 'fruits', ${data.id})"></i>
                                    <i class="fas fa-pencil action_icon edit_icon" id="edit_icon_${data.id}" title="Cliquez pour editer" onclick="editArbre(${data.id})"></i>
                                    <i class="fas fa-map-marked-alt action_icon map_icon" id="action_icon map_icon_${data.id}" title="Afficher localisation" 
                                        onclick="updateMap('${lt_latitude}','${lt_longitude}','${lb_latitude}','${lb_longitude}','${rt_latitude}','${rt_longitude}','${rb_latitude}','${rb_longitude}','${data.name.toUpperCase()}')">
                                    </i>	  
                                    <i class="fas fa-trash-alt action_icon delete_icon" id="delete_icon_${data.id}" title="Cliquez pour supprimer" onclick="confirmDeleteItem('trees', ${data.id})"></i>	  
                                    </div>
                                    <div class="col-6 lh-base p-0  text-capitalize text-muted">
                                        <div class="d-grid">
                                            <div class="d-flex">
                                                <span class=""><strong>Nbr Parent M :</strong> </span>
                                                <span class="">${data.parentMale}</span>
                                            </div>
                                            <div class="d-flex">
                                                <span class=""><strong>Nbr Parent F :</strong> </span>
                                                <span class="">${data.parentMale}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>`;

                        $("#alertModal .modal-title").text(data.name)
                        setContentInModal("alertModal", content, "left");
                        
            }
          
        },
        error: function(xhr, status, error) {
            console.error(status + ' : ' + error);
        }
    });
}
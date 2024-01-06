/** GET DATA FRUIT */
function getDataLeave(){
    //alert(237)
    $.ajax({
        url: URI+'/api/leaves',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            console.log('all leaves' ,data);
            if (xhr.status == 200) {
                tab = data;
                if ($.isArray(tab) && tab.length > 0) {
                    $.each(tab, function(index, item) {
                        var content =`<li class="sidebar-item">
                                        <a data-bs-target="#leave_${index}" data-bs-toggle="collapse" class="sidebar-link collapsed">
                                            ${item.shape.toUpperCase()}<br/>
                                            <span class="text-body-tertiary small">${item.type}</span>
                                        </a>
                                        <div class="d-flex end-0 float-end mt-2 position-absolute position-relative top-0">
                                            <i class="fas fa-eye action_icon view_icon" id="view_icon_${item.id}" title="Voir arbre" onclick="getTreeById(${item.id})"></i>
                                            <i class="fas fa-pencil action_icon edit_icon" id="edit_icon_${item.id}" title="Cliquez pour editer" onclick="openModalLeave(${item.id})"></i>       
                                            <i class="fas fa-trash-alt action_icon delete_icon" id="delete_icon_${item.id}" title="Cliquez pour supprimer" onclick="confirmDeleteItem('trees', ${item.id})"></i>
                                        </div>
                                        <div class="collapse sidebar-dropdown border-1 border-bottom mx-4 row" id="leave_${index}" data-bs-parent="#leave_${index}">
                                            <div class="col-6 d-grid justify-content-center p-0">
                                                <div class="card card-image">
                                                    <img src="${URI}/api/images/${item.image}" onerror="this.onerror=null; this.src='./img/standard-img.png';" alt="" class="img-tree image-fuild">
                                                </div>
                                            </div>
                                            <div class="col-6 lh-base p-0  small text-capitalize text-muted">
                                                <div class="d-grid">
                                                    <div class="d-flex">
                                                        <span class=""><strong>Size : </strong> </span>
                                                        <span class="">${item.size}</span>
                                                    </div>
                                                    <div class="d-flex">
                                                        <span class=""><strong>Poids : </strong> </span>
                                                        <span class="">${item.weight}</span>
                                                    </div>
                                                    
                                                    <div class="d-flex">
                                                        <span class=""><strong>Couleur : </strong> </span>
                                                        <span class=" mx-1"> <i class="fas fa-circle" style="color:${item.color}"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>`;
                        $('#all_leaves').append(content);
                        // $("#site_name").text(item.name.toUpperCase());
                        //console.log(item.name);
                    })
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
function openModalLeave(leaveId) {
    //alert(parcelId);
    getDataLeaveById(leaveId);
    //$('#addFarms').appendTo('body');
    $('#addLeave').modal('show');

}
function openAddLeaveModal(){
    //alert(237)
    $("#add_leave").get(0).reset();
    //$('#add_site').trigger('reset');
    $('#addLeave').modal('show');
    $('#titleLeave').text("Enregistrement d'une feuille");
    $('#add_leave').attr('data-mode', 'add');
    //alert(userId)
    //$('#userId').val(userId);
    
}
function getDataLeaveById(leaveId){
    $.ajax({
        url: URI+'/api/leaves/'+leaveId,
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            if (xhr.status == 200) {
                console.log(`data Fruit by`, data);
             
                var shape = data.shape;
                var tree = data.treeId;
                var size = data.size;
                var weight = data.weight;
                var type = data.type;
                var color = data.color;
               
                //alert(farm)
                $('#titleLeave').text("Edition de la feuille "+shape)
                $('#add_leave').attr('data-mode', 'edit');
                $('#add_leave').attr('data-id', data.id);
                $('#shape').val(shape);
                //$('#treeId_leave').val(tree);
                $('#size_leave').val(size);
                $('#weight_leave').val(weight);

                $('#color_leave').val(color);
                $('#typeLeave').val(type);
                
            }
          
        },
        error: function(xhr, status, error) {
            console.error(status + ' URL NOT FOUND : ' + error);
        }
    });
}
/**POST DATA LEAVE */
function sendDataLeaveWithFormData(e,form){
    e.preventDefault();
    var form_ = $('#'+form)[0];
    var formData = new FormData(form_);

    //formData.append('picture', globalImageContent);

    var formDataObj = {};
    formData.forEach(function(value, key){
        formDataObj[key] = value;
    });

    var all_JSON = JSON.stringify(formDataObj);
    // Affichage du premier objet JSON mis à jour dans la console
    console.log('ALL JSON',all_JSON);
    var mode = $('#'+form).attr('data-mode');
    if (mode == "add") {    
        $.ajax({
            url: URI+'/api/leaves',
            type: "POST",
            enctype: 'multipart/form-data',
            contentType: 'application/json',
            data: all_JSON,
            dataType: "json",
            // processData: false,
            beforeSend: function() {
                $('.btn_submit').prop('disabled', true);
            },
            success: function(data,status, xhr) {
                console.log(data,status,xhr);
                if (xhr.status == 200 || xhr.status == 201) {
                    $(".alert").removeClass('alert-danger').addClass('alert-success').show()
                    $(".alert-message").text(data.shape+ " ENREGISTRE AVEC SUCCES !!!");             
                    $("#"+form).get(0).reset();
                    itemId = data.id;
                    typeForm = "leave";
                    setTimeout(function(){
                        $('#addLeave').modal('hide');
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
        var leaveId = $('#'+form).attr('data-id');
        $.ajax({
            url: URI+'/api/leaves/'+leaveId,
            type: "PUT",
            enctype: 'multipart/form-data',
            contentType: 'application/json',
            data: all_JSON,
            dataType: "json",
            // processData: false,
            beforeSend: function() {
                $('.btn_submit').prop('disabled', true);
            },
            success: function(data,status, xhr) {
                console.log(data,status,xhr);
                if (xhr.status == 200 || xhr.status == 201) {
                    $(".alert").removeClass('alert-danger').addClass('alert-success').show()
                    $(".alert-message").text(data.shape+ " MODIFIE AVEC SUCCES !!!");             
                    $("#"+form).get(0).reset();
                    itemId = data.id;
                    typeForm = "leave";
                    setTimeout(function(){
                        $('#addLeave').modal('hide');
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
// GET LIST ALL LEAVES
function allLeaves(){
    tabBody = [];
    $.ajax({
        url: URI+'/api/leaves/all',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {

            if (xhr.status == 200) {
                var tab ;
                tab = data;
                console.log(`all data leaves`, tab);
                if ($.isArray(tab) && tab.length > 0) {
                    $.each(tab, function(index, item) {
                       // Ajouter les données de chaque élément à la liste tabBody
                       tabBody.push([
                            item.id,
                            '<img src="' + URI + '/api/images/' + item.image + '">',
                            item.shape,
                            item.type,
                            item.size,
                            item.weight,
                            '<span class=" mx-1"> <i class="fas fa-circle" style="color:'+item.color+'"></i></span>',
                            convertTimestampToDate(item.creationDate)
                        ]);                                            
                    });
                        
                    tabHeaders = ["#ID", "Image", "shape", "type", "Size","weight", "Color", "creationDate"];
                    displayTabHeader(tabHeaders);
                    displayTabBody(tabBody, tabHeaders);
                    console.log(tabBody);
                    
                }else{
                    displayTabHeader([]);
                    displayTabBody(["DATA NOT FOUND"],[]);
                    console.log('Le tableau est vide pour tous les feuilles');
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
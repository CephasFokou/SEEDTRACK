/** GET DATA FRUIT */
function getDataFruit(){
    //alert(237)
    $.ajax({
        url: URI+'/api/fruits',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            console.log('all fruit' ,data);
            if (xhr.status == 200) {
                tab = data;
                if ($.isArray(tab) && tab.length > 0) {
                    $.each(tab, function(index, item) {
                        var content =`<li class="sidebar-item">
                                        <a data-bs-target="#fruit_${index}" data-bs-toggle="collapse" class="sidebar-link collapsed">
                                            ${item.name.toUpperCase()}<br/>
                                            <span class="text-body-tertiary small">${item.type}</span>
                                        </a>	 	  
                                        <div class="d-flex end-0 float-end mt-2 position-absolute position-relative top-0">
                                            <i class="fas fa-eye action_icon map_icon" id="view_icon_${item.id}" title="Voir arbre" onclick="getTreeById(${item.TreeId})"></i>
                                            <i class="fas fa-pencil action_icon edit_icon" id="edit_icon_${item.id}" title="Cliquez pour editer" onclick="openModalFruit(${item.id})"></i>	  
                                            <i class="fas fa-trash-alt action_icon delete_icon" id="delete_icon_${item.id}" title="Cliquez pour supprimer" onclick="confirmDeleteItem('fruits', ${item.id})"></i>	 	  
                                        </div>
                                        <div class="collapse sidebar-dropdown border-1 border-bottom mx-4 row" id="fruit_${index}" data-bs-parent="#fruit_${index}">
                                            <div class="col-6 d-grid justify-content-center p-0">
                                                <div class="card card-image">
                                                    <img src="${URI}/api/images/${item.image}" onerror="this.onerror=null; this.src='./img/standard-img.png';" alt="" class="img-tree image-fuild">
                                                </div>
                                            </div>
                                            <div class="col-6 lh-base p-0 small text-capitalize text-muted">
                                                <div class="d-grid">
                                                    <div class="d-flex">
                                                        <span class=""><strong>Largeur : </strong> </span>
                                                        <span class="">${item.width}</span>
                                                    </div>
                                                    <div class="d-flex">
                                                        <span class=""><strong>Longueur : </strong> </span>
                                                        <span class="">${item.length}</span>
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
                        $('#all_fruits').append(content);
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

function openModalFruit(fruitId) {
    //alert(parcelId);
    getDataFruitById(fruitId);
    //$('#addFarms').appendTo('body');
    $('#addFruit').modal('show');

}
function openAddFruitModal(){
    //alert(237)
    $("#add_fruit").get(0).reset();
    //$('#add_site').trigger('reset');
    $('#addFruit').modal('show');
    $('#titleFruit').text("Enregistrement d'un Fruit");
    $('#add_fruit').attr('data-mode', 'add');
    //alert(userId)
    //$('#userId').val(userId);
    
}
function getDataFruitById(fruitId){
    $.ajax({
        url: URI+'/api/fruits/'+fruitId,
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            if (xhr.status == 200) {
                console.log(`data Fruit by`, data);
             
                var name = data.name;
                var tree = data.treeId;
                var width = data.width;
                var weight = data.weight;
                var type = data.type;
                var color = data.color;
                var length = data.length;
               
                //alert(farm)
                $('#titleFruit').text("Edition du fruit "+name)
                $('#add_fruit').attr('data-mode', 'edit');
                $('#add_fruit').attr('data-id', data.id);
                $('#name_fruit').val(name);
                //$('#treeId_fruit').val(tree);
                $('#width_fruit').val(width);
                $('#length_fruit').val(length);
                $('#weight_fruit').val(weight);

                $('#color_fruit').val(color);
                $('#typeFruit').val(type);
                
            }
          
        },
        error: function(xhr, status, error) {
            console.error(status + ' URL NOT FOUND : ' + error);
        }
    });
}

/**POST DATRA FRUIT */
function sendDataFruitWithFormData(e,form){
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
    //console.log('pictureImage',globalImageContent);
    console.log('ALL JSON',all_JSON);
    var mode = $('#'+form).attr('data-mode');
    if (mode == "add") {
        $.ajax({
            url: URI+'/api/fruits',
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
                    $(".alert-message").text(data.name.toUpperCase()+ " ENREGISTRE AVEC SUCCES !!!");             
                    $("#"+form).get(0).reset();
                    itemId = data.id;
                    typeForm = "fruit";
                    setTimeout(function(){
                        $('#addFruit').modal('hide');
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
        var fruitId = $('#'+form).attr('data-id');
        $.ajax({
            url: URI+'/api/fruits/'+fruitId,
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
                    $(".alert-message").text(data.name.toUpperCase()+ " MODIFIE AVEC SUCCES !!!");             
                    $("#"+form).get(0).reset();
                    itemId = data.id;
                    typeForm = "fruit";
                    setTimeout(function(){
                        $('#addFruit').modal('hide');
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


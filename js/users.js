
/** GET DATA Users */
function getProprio(){
    var options = '';
    $.ajax({
        url: URI+'/api/users/all',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            if (xhr.status == 200) {
                tab = data;
                if ($.isArray(tab) && tab.length > 0) {
                    $.each(tab, function(index, item) {
                        //console.log('.....----////');
                        // Vérifie si le rôle "ROLE_ADMIN" est présent dans les rôles de l'utilisateur
                        if (item.roles.some(role => role.name === "PROPRIETAIRE")) {
                            options += '<option value="' + item.id + '">' + item.firstname + ' ' + item.lastname + '</option>';
                        }
                    })
                    $('.proprietaire').html(options);
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

/** GET DATA Users */
function getDataUsers(){
    $.ajax({
        url: URI+'/api/users',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            if (xhr.status == 200) {
                tab = data.data;
                console.log('all users' ,data);
                if ($.isArray(tab) && tab.length > 0) {
                    $.each(tab, function(index, item) {
                        var content =`<li class="sidebar-item">
                                        <a data-bs-target="#site_${item.id}" data-bs-toggle="collapse" class="sidebar-link collapsed">
                                            ${item.lastname.toUpperCase()} ${item.firstname.toUpperCase()}<br/>
                                            <span class="text-body-tertiary small">${item.roles[0].name}</span>
                                        </a>
                                        <div class="d-flex end-0 float-end mt-2 position-absolute position-relative top-0">
                                            <i class="fas fa-eye action_icon view_icon" id="view_icon_${item.id}" title="Lister Info Users" onclick="viewList('User ${item.lastname}', 'users', ${item.id})"></i>
                                            <i class="fas fa-pencil action_icon edit_icon" id="edit_icon_${item.id}" style="right: 35px !important" title="Cliquez pour editer" onclick="openModalUser(${item.id})"></i>	  
                                            <i class="fas fa-trash-alt action_icon delete_icon" id="delete_icon_${item.id}" title="Cliquez pour supprimer" onclick="confirmDeleteItem('users', ${item.id})"></i>
                                        </div>
                                            <ul class="collapse cursor-default mb-3 sidebar-dropdown width-p" id="site_${item.id}" data-bs-parent="#site_${item.id}">
                                            <div class="card-body p-3 bg-body-tertiary">
                                                <div class="row">
                                                    <div class="d-flex gap-1 gm-ui-hover-effect small w-auto">
                                                        <div class="col-md-12 d-grid">
                                                            <span class="px-2 bg- small">Username : <b>${item.username}</b></span>
                                                            <span class="px-2 bg- small">Email : <b>${item.email}</b></span>
                                                            <span class="px-2 bg- small">Phone Number : <b>${item.phonenumber}</b></span>
                                                            <span class="px-2 bg- small">Contact Urg : <b>${item.contact}</b></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>`;
                        $('#all_users').append(content);
                    })
                    //APPEL SITE SELECT BOX
                    // var options = "";
                    // for (var i = 0; i < tab.length; i++) {
                    //     options += '<option value="' + tab[i].id + '">' + tab[i].name.toUpperCase() + '</option>';
                    // }
                    // $('#siteId').html(options);
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

function openModalUser(userId) {
    //alert(parcelId);
    getDataUserEditById(userId);
    //$('#addFarms').appendTo('body');
    $('#addUser').modal('show');

}
function openAddUserModal(){
    //alert(237)
    $("#add_user").get(0).reset();
    //$('#add_site').trigger('reset');
    $('#addUser').modal('show');
    $('#titleUser').text("Enregistrement d'un utilisateur");
    $('#add_user').attr('data-mode', 'add');
    //alert(userId)
    //$('#userId').val(userId);
    
}
function getDataUserEditById(userId){
    $.ajax({
        url: URI+'/api/users/'+userId,
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            if (xhr.status == 200) {
                console.log(`data User by`, data);
             
                var lastname = data.lastname;
                var firstname = data.firstname;
                var username = data.username;
                var email = data.email;
                var role = data.roles[0].name;
                var phonenumber = data.phonenumber;
                var name =  lastname+' '+firstname;
                //alert(farm)
                $('#titleUser').text("Edition de l'utilisateur "+name)
                $('#add_user').attr('data-mode', 'edit');
                $('#add_user').attr('data-id', data.id);
                $('#lastname').val(lastname);
                //$('#treeId_leave').val(tree);
                $('#firstname').val(firstname);
                $('#username').val(username);
                $('#roleUser').val(role);
                $('#email').val(email);
                $('#phonenumber').val(phonenumber);
                
            }
          
        },
        error: function(xhr, status, error) {
            console.error(status + ' URL NOT FOUND : ' + error);
        }
    });
}

    /**POST DATA USERS */
function sendDataFormDataSignup(e, form) {
    e.preventDefault();
    //alert(237)
    var formElement = $('#' + form)[0];
    var formData = new FormData(formElement);
    var rolesArray = $('#roleUser').val();
    // Ajout du champ 'role' aux données du formulaire
    // formData.append('roles', rolesArray);
    var formDataObj = {};
    formData.forEach(function(value, key){
        formDataObj[key] = value;
    });

    var resultObject = {
        role: [rolesArray]
      };
      Object.assign(formDataObj, resultObject);

    var all_JSON = JSON.stringify(formDataObj);
    console.log(`all JSON`, all_JSON);
    var mode = $('#'+form).attr('data-mode');
    if (mode == "add") {
        $.ajax({
            url: URI + '/api/auth/signup', // Remplacez URI par votre URL
            type: 'POST',
            data: all_JSON,
            enctype: 'multipart/form-data',
            contentType: 'application/json',
            dataType: "json",
            beforeSend: function() {
                $('.btn_submit').prop('disabled', true);
            },
            success: function(data, status, xhr) {
                console.log(data, status, xhr);
                if (xhr.status == 200 || xhr.status == 201) {
                    $(".alert").removeClass('alert-danger').addClass('alert-success').show()
                    $(".alert-message").text("USER ENREGISTRE AVEC SUCCES !!!");
                    $("#" + form).get(0).reset();
                    itemId = data.id;
                    typeForm = "users";
                    setTimeout(function() {
                        window.location.reload(true);
                    }, 3000)
                } else {
                    $(".alert").removeClass('alert-success').addClass('alert-danger').show()
                    $(".alert-message").text(data.message + ' ' + data.httpStatus);
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
        let userId = $('#'+form).attr('data-id');
        $.ajax({
            url: URI + '/api/users/'+userId, // Remplacez URI par votre URL
            type: 'PUT',
            data: all_JSON,
            enctype: 'multipart/form-data',
            contentType: 'application/json',
            dataType: "json",
            beforeSend: function() {
                $('.btn_submit').prop('disabled', true);
            },
            success: function(data, status, xhr) {
                console.log(data, status, xhr);
                if (xhr.status == 200 || xhr.status == 201) {
                    $(".alert").removeClass('alert-danger').addClass('alert-success').show()
                    $(".alert-message").text("USER MODIFIE AVEC SUCCES !!!");
                    $("#" + form).get(0).reset();
                    itemId = data.id;
                    typeForm = "users";
                    setTimeout(function() {
                        //window.location.reload(true);
                    }, 3000)
                } else {
                    $(".alert").removeClass('alert-success').addClass('alert-danger').show()
                    $(".alert-message").text(data.message + ' ' + data.httpStatus);
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
// GET LIST USER BY ID
function getDataUserById(userId){
    tabBody = [];
    $.ajax({
        url: URI+'/api/users/'+userId,
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {

            if (xhr.status == 200) {
                var item ;
                item = data;
                console.log(`data users by id`, item);
                if (typeof item !== 'undefined' && item !== null) {                    
                    
                    tabBody.push([item.id, item.username, item.lastname, item.firstname, item.roles[0].name, item.email, item.phonenumber, convertTimestampToDate(item.creationDate)]);

                    tabHeaders = ["#ID", "Username", "Nom", "Prenom", "Role", "Email", "Phone Number", "creationDate"];
                    displayTabHeader(tabHeaders);
                    displayTabBody(tabBody, tabHeaders);
                    console.log(tabBody);
                    
                }else{
                    console.log('Object user est vide.');
                }
            }
          
        },
        error: function(xhr, status, error) {
            console.error(status + ' : ' + error);
        }
    });
}


// GET LIST ALL USERS
function allUsers(){
    tabBody = [];
    $.ajax({
        url: URI+'/api/users/all',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {

            if (xhr.status == 200) {
                var tab ;
                tab = data;
                console.log(`all data users`, tab);
                if ($.isArray(tab) && tab.length > 0) {
                    $.each(tab, function(index, item) {
                                                // Ajouter les données de chaque élément à la liste tabBody
                        tabBody.push([item.id, item.username, item.lastname, item.firstname, item.roles[0].name, item.email, item.phonenumber, convertTimestampToDate(item.creationDate)]);
                  
                    });
                        
                    tabHeaders = ["#ID", "Username", "Nom", "Prenom", "Role", "Email", "Phone Number", "creationDate"];
                    displayTabHeader(tabHeaders);
                    displayTabBody(tabBody, tabHeaders);
                    console.log(tabBody);
                    
                }else{
                    displayTabHeader([]);
                    displayTabBody(["DATA NOT FOUND"],[]);
                    console.log('Le tableau est vide pour tous les users');
                }
            }
          
        },
        error: function(xhr, status, error) {
            console.error(status + ' : ' + error);
        }
    });
}


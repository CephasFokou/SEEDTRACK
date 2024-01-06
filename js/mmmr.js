
if(getAuth) {
	var getUser_decode =  JSON.parse(getAuth); 
	var userId = getUser_decode.id;         
	var roleUser = getUser_decode.roles[0];        
	console.log(`user`, userId+ ' vs '+ roleUser);
    getExitAuth(userId)
}
if(navigator.onLine) {
    console.log('Connexion internet active');
}else{
    alert('Vérifier votre connexion')
    setTimeout(function(){
        window.location.reload();
    },2000)
}
function toogleInput(element) {
    $("#" + element).toggle(1000);
}
function filterData(value,type) {
    //alert(value)
    var filterText = value; // Récupère le texte du champ d'entrée en minuscules
    var regex = new RegExp(filterText, "i"); // Crée une expression régulière avec le texte saisi (insensible à la casse)
    if (type =="site") {
        $("#all_sites li").each(function () {
            var text = $(this).text().toLowerCase(); // Récupère le texte de chaque élément de la liste en minuscules
            if (filterText.length >= 3 && regex.test(text)) {
                // Vérifie si le texte de l'élément correspond à l'expression régulière après trois caractères
                $(this).show(); // Affiche l'élément
                // $(this).find('.collapse').collapse('show');
                console.log($(this).show());
            } else if (filterText.length === 0) {
                // Si l'input est vide, affiche tous les éléments
                $("#all_sites li").show();
                //$(this).find('.collapse').collapse('hide');
                // $(this).find('.collapse').collapse('show');
            } else {
                $(this).hide(); // Cache les éléments qui ne correspondent pas ou si moins de trois caractères ont été saisis
                console.log("data not found");
            }
        });
    } else if(type =="parcels") {
        $("#all_parcels li").each(function () {
            var text = $(this).text().toLowerCase(); // Récupère le texte de chaque élément de la liste en minuscules
            if (filterText.length >= 3 && regex.test(text)) {
                // Vérifie si le texte de l'élément correspond à l'expression régulière après trois caractères
                $(this).show(); // Affiche l'élément
                // $(this).find('.collapse').collapse('show');
                console.log($(this).show());
            } else if (filterText.length === 0) {
                // Si l'input est vide, affiche tous les éléments
                $("#all_parcels li").show();
                //$(this).find('.collapse').collapse('hide');
                // $(this).find('.collapse').collapse('show');
            } else {
                $(this).hide(); // Cache les éléments qui ne correspondent pas ou si moins de trois caractères ont été saisis
                console.log("data not found");
            }
        });
    }else if(type =="farms") {
        $("#all_farms li").each(function () {
            var text = $(this).text().toLowerCase(); // Récupère le texte de chaque élément de la liste en minuscules
            if (filterText.length >= 3 && regex.test(text)) {
                // Vérifie si le texte de l'élément correspond à l'expression régulière après trois caractères
                $(this).show(); // Affiche l'élément
                // $(this).find('.collapse').collapse('show');
                console.log($(this).show());
            } else if (filterText.length === 0) {
                // Si l'input est vide, affiche tous les éléments
                $("#all_farms li").show();
                //$(this).find('.collapse').collapse('hide');
                // $(this).find('.collapse').collapse('show');
            } else {
                $(this).hide(); // Cache les éléments qui ne correspondent pas ou si moins de trois caractères ont été saisis
                console.log("data not found");
            }
        });
    }else if(type =="lines") {
        $("#all_lines li").each(function () {
            var text = $(this).text().toLowerCase(); // Récupère le texte de chaque élément de la liste en minuscules
            if (filterText.length >= 3 && regex.test(text)) {
                // Vérifie si le texte de l'élément correspond à l'expression régulière après trois caractères
                $(this).show(); // Affiche l'élément
                // $(this).find('.collapse').collapse('show');
                console.log($(this).show());
            } else if (filterText.length === 0) {
                // Si l'input est vide, affiche tous les éléments
                $("#all_lines li").show();
                //$(this).find('.collapse').collapse('hide');
                // $(this).find('.collapse').collapse('show');
            } else {
                $(this).hide(); // Cache les éléments qui ne correspondent pas ou si moins de trois caractères ont été saisis
                console.log("data not found");
            }
        });
    }else if(type =="trees") {
        $("#all_trees li").each(function () {
            var text = $(this).text().toLowerCase(); // Récupère le texte de chaque élément de la liste en minuscules
            if (filterText.length >= 3 && regex.test(text)) {
                // Vérifie si le texte de l'élément correspond à l'expression régulière après trois caractères
                $(this).show(); // Affiche l'élément
                // $(this).find('.collapse').collapse('show');
                console.log($(this).show());
            } else if (filterText.length === 0) {
                // Si l'input est vide, affiche tous les éléments
                $("#all_trees li").show();
                //$(this).find('.collapse').collapse('hide');
                // $(this).find('.collapse').collapse('show');
            } else {
                $(this).hide(); // Cache les éléments qui ne correspondent pas ou si moins de trois caractères ont été saisis
                console.log("data not found");
            }
        });
    }else if(type =="fruits") {
        $("#all_fruits li").each(function () {
            var text = $(this).text().toLowerCase(); // Récupère le texte de chaque élément de la liste en minuscules
            if (filterText.length >= 3 && regex.test(text)) {
                // Vérifie si le texte de l'élément correspond à l'expression régulière après trois caractères
                $(this).show(); // Affiche l'élément
                // $(this).find('.collapse').collapse('show');
                console.log($(this).show());
            } else if (filterText.length === 0) {
                // Si l'input est vide, affiche tous les éléments
                $("#all_fruits li").show();
                //$(this).find('.collapse').collapse('hide');
                // $(this).find('.collapse').collapse('show');
            } else {
                $(this).hide(); // Cache les éléments qui ne correspondent pas ou si moins de trois caractères ont été saisis
                console.log("data not found");
            }
        });
    }else if(type =="leaves") {
        $("#all_leaves li").each(function () {
            var text = $(this).text().toLowerCase(); // Récupère le texte de chaque élément de la liste en minuscules
            if (filterText.length >= 3 && regex.test(text)) {
                // Vérifie si le texte de l'élément correspond à l'expression régulière après trois caractères
                $(this).show(); // Affiche l'élément
                // $(this).find('.collapse').collapse('show');
                console.log($(this).show());
            } else if (filterText.length === 0) {
                // Si l'input est vide, affiche tous les éléments
                $("#all_leaves li").show();
                //$(this).find('.collapse').collapse('hide');
                // $(this).find('.collapse').collapse('show');
            } else {
                $(this).hide(); // Cache les éléments qui ne correspondent pas ou si moins de trois caractères ont été saisis
                console.log("data not found");
            }
        });
    }else if(type =="users") {
        $("#all_users li").each(function () {
            var text = $(this).text().toLowerCase(); // Récupère le texte de chaque élément de la liste en minuscules
            if (filterText.length >= 3 && regex.test(text)) {
                // Vérifie si le texte de l'élément correspond à l'expression régulière après trois caractères
                $(this).show(); // Affiche l'élément
                // $(this).find('.collapse').collapse('show');
                console.log($(this).show());
            } else if (filterText.length === 0) {
                // Si l'input est vide, affiche tous les éléments
                $("#all_users li").show();
                //$(this).find('.collapse').collapse('hide');
                // $(this).find('.collapse').collapse('show');
            } else {
                $(this).hide(); // Cache les éléments qui ne correspondent pas ou si moins de trois caractères ont été saisis
                console.log("data not found");
            }
        });
    }
    
   
}
// GET AUTH CHECK USER
function getExitAuth(userId){
    //alert(userId)
    $.ajax({
        url: URI+'/api/users/'+userId,
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {

            if (xhr.status == 200 || xhr.status == 201) {
                if(data){
                    console.log(`Auth exit in BD`);
                    //alert(data);
                }else{
                    console.log(`Auth not exit in BD`);
                    window.location.href="login.html";
                }
            }else{
                window.location.href="login.html";
            }
          
        },
        error: function(xhr, status, error) {
            console.error(status + ' : ' + error);
            window.location.href="login.html";
        }
    });
}


function convertTimestampToDate(timestamp) {
    // Créer un objet Date en utilisant le timestamp
    const date = new Date(timestamp);

    // Formater la date selon vos besoins
    const options = { year: 'numeric', month: 'numeric', day: 'numeric'};
    const formattedDate = date.toLocaleDateString('fr-FR', options);

    return formattedDate;
}

// Fonction pour convertir l'image en base64
function getImageAsBase64(inputId, callback) {
    var input = document.getElementById(inputId);

    input.addEventListener('change', function() {
        var file = this.files[0]; // Récupère le fichier image sélectionné

        if (file) {
            var reader = new FileReader(); // Crée un objet FileReader

            reader.onload = function(event) {
                var base64Image = event.target.result; // Contient les données base64 de l'image
                callback(base64Image); // Appelle la fonction de rappel avec les données base64
            };

            reader.readAsDataURL(file); // Lit le contenu du fichier en tant que données base64
        }
    });

    // Vérification si une image est déjà présente (par exemple, si le champ est rempli par défaut)
    if (input.files && input.files[0]) {
        var file = input.files[0];
        var reader = new FileReader();

        reader.onload = function(event) {
            var base64Image = event.target.result;
            callback(base64Image);
        };

        reader.readAsDataURL(file);
    }
}

function contentImage(value){
    return value;
}
function processBase64Image(base64Image) {
    //console.log('Image convertie en données base64 :', base64Image);
    globalImageContent  = contentImage(base64Image);
}

//getImageAsBase64('picture', processBase64Image);

var urlEnd ="";
function submitFormImage(event){
    event.preventDefault();
    var form_ = $('#add_image_item')[0];
    var formData = new FormData(form_);

    var fileInput = document.getElementById('fileImageItem');
    formData.append("file", fileInput.files[0]);

    console.log('DATA FILE', formData);
    if (fileInput.files.length > 0) {
        //alert(typeForm+' '+itemId)
        if(typeForm == "tree"){
            urlEnd = URI+'/api/trees/'+itemId+'/image';
        }else if(typeForm == "fruit"){
            urlEnd = URI+'/api/fruits/'+itemId+'/image';
        }else if(typeForm == "leave"){
            urlEnd = URI+'/api/leaves/'+itemId+'/image';
        }else{
            alert("URL UNDEFINED")
            window.location.reload(true);
        }
        $.ajax({
            url: urlEnd,
            type: "POST",
            data: formData,
            processData: false, // Ne pas traiter les données
            contentType: false, // Ne pas définir de type de contenu
            beforeSend: function () {
                $('.btn_submit').prop('disabled', true);
            },
            success: function (data, status, xhr) {
                console.log(data);
                if (xhr.status === 200 || xhr.status === 201) {
                    $(".alert").removeClass('alert-danger').addClass('alert-success').show();
                    $(".alert-message").text("IMAGE ENREGISTRÉE AVEC SUCCÈS !!!");
                    setTimeout(function () {
                        window.location.reload(true);
                    }, 3000);
                } else {
                    $(".alert").removeClass('alert-success').addClass('alert-danger').show();
                    $(".alert-message").text(data.message + ' ' + data.httpStatus);
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
    }else {
        console.log('Aucun fichier sélectionné');
    } 
}

console.log(`window`, window.location);

function authLogout(event){
    event.preventDefault();
    if (confirm('Voulez-vous vraiment vous deconnectez ?')) {
        // Code à exécuter si l'utilisateur clique sur "OK"
        localStorage.removeItem('auth');
        window.location.href="login.html";
    }
}
function tooglePassword(input, elt) {
    //alert(input);
    $("." + elt).toggleClass("fa-eye fa-eye-slash");
    var div = $("#" + input);
    if (div.attr("type") == "password") {
        div.attr("type", "text");
    } else {
        div.attr("type", "password");
    }
}
$(document).ready(function () {
    // $('.collapse').on('show.bs.collapse', function () {
    //     // Fermer tous les éléments Collapse qui ne sont pas celui en train de s'ouvrir
    //     $('.collapse').not($(this)).collapse('hide');
    // });
    $(window).on("load", function() {
        $('.preloader-wrap').addClass('loaded');
        //$('.preloader-wrap').fadeOut('slow');
        //alert('237')
    });
});

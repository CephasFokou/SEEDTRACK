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
if(getAuth){
    window.location.href='index.html';
}
function authLogin(e,form){
    e.preventDefault();
    var form_ = $('#'+form)[0];
    var formData = new FormData(form_);

    var formDataObj = {};
    formData.forEach(function(value, key){
        formDataObj[key] = value;
    });

    var all_JSON = JSON.stringify(formDataObj);
    // Affichage du premier objet JSON mis à jour dans la console
    console.log('ALL JSON',all_JSON);
    $.ajax({
        url: URI+'/api/auth/signin',
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
            if (xhr.status == 200 || xhr.status == 201) {
                console.log(data);
                localStorage.setItem('auth', JSON.stringify(data));
                $(".alert").removeClass('alert-danger').addClass('alert-success').show()
                $(".alert-message").text("CONNEXION EFFECTUEE AVEC SUCCES !!!");             
                $("#"+form).get(0).reset();
                setTimeout(function(){
                    $(".alert-message").text("Vous serez rediriger vers une autre page !!!").fadeIn(1000);
                    window.location.href="index.html";
                 }, 3000)
            }else{
                $(".alert").removeClass('alert-success').addClass('alert-danger').show()
                $(".alert-message").text(data.message+ ' '+data.httpStatus);  
                $('.btn_submit').prop('disabled', false);
            }

        },
        error: function(xhr, status, error) {
            var errorMessage = JSON.parse(xhr.responseText).message;
            if (xhr.status == 500) {
                console.log('Erreur 500 : ', xhr.responseText);
                $(".alert").removeClass('alert-success').addClass('alert-danger').show()
                $(".alert-message").text(errorMessage);
                $('.btn_submit').prop('disabled', false);
            } else {
                console.log('Erreur : ', xhr.responseText, error);
                $(".alert").removeClass('alert-success').addClass('alert-danger').show()
                $(".alert-message").text(errorMessage);
                $('.btn_submit').prop('disabled', false);
            }
        }
    });
}

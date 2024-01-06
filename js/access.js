
$(document).ready(function () {
    //alert(roleUser)
    if(roleUser == "ADMINISTRATEUR"){
        $("#li_users").show();            
    }
    if(roleUser == "AGENT VALIDATEUR"){
        $("#li_users").hide();            
    }
    if(roleUser == "AGENT DE TERRAIN"){
        $("#li_users").hide();            
    }
});
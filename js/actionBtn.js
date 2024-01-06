
function validerAction(item) {
    alert("Implementer Api de validation. Puis changer fa-toggle-off en fa-toggle-on");
    const $validBtn = $("#validSite"+item);
    const validBtnStatus = $("#validSite"+item).attr("status");
    if (validBtnStatus=='on') {
        $validBtn.removeClass("fa-toggle-on");
        $validBtn.addClass("fa-toggle-off");
    } else {
        $validBtn.removeClass("fa-toggle-off");
        $validBtn.addClass("fa-toggle-on");
    }
}

function viewList(parent, child, parentId){
    console.log(parentId);
    //alert(child)
    $("#map").hide();
    $("#resetMainBtn").show();
    $("#list").show();
    $("#tableTitle1").text(child).show();
    $("#tableTitle2").text(parent).show();
    $("#ofListe").show();
    $("#site_name").text(parent);
    if (child == "champs") {
        getDataFarmsSite(parentId);
    } else if(child == "users"){
        getDataUserById(parentId);
    }else if (child == "parcels") {
        getDataParcelByFarm(parentId);
    }else if (child == "lines") {
        getDataLineByParcel(parentId);
    }
    else if (child == "arbres") {
        getDataTreeByLine(parentId);
    }
    else if (child == "fruits") {
        getDataFruitsByTrees(parentId);
    }
}
function viewAll(child){
    $("#map").hide();
    $("#resetMainBtn").show();
    $("#list").show();
    $("#tableTitle1").text(child);
    $("#tableTitle2").hide();
    $("#ofListe").hide();
    //alert(child)
    if(child == "Users"){
        allUsers();
    }else if(child == "Leaves"){
        allLeaves();
    }else if(child == "Fruits"){
        allFruits();
    }else if(child == "Trees"){
        allTrees();
    }else if(child == "Lines"){
        allLines();
    }else if(child == "Parcels"){
        allParcels();
    }else if(child == "Farms"){
        allFarms();
    }else if(child == "Sites"){
        allSites();
    }else{
        alert("Child not found")
        window.location.reload(true);
    }
    
}
function resetContent(){
    $("#map").show();
    $("#list").hide();
    $("#resetMainBtn").hide();
    $("#site_name").text("GEOLOCALISATION");
}

function displayTabHeader(tabHeaders){
    $("#TableHeader").html('');
    for (let index = 0; index < tabHeaders.length; index++) {
        const element = tabHeaders[index];
        $("#TableHeader").append(`
        ${index==0 ? "<tr>":""}
        <th>${element}</th>
        ${index==tabHeaders.length ? "</tr>":""}
        `);
    }
}

function displayTabBody(tabBody) {
    $("#list tbody").html('');
    for (let rowIndex = 0; rowIndex < tabBody.length; rowIndex++) {
        const rowValues = tabBody[rowIndex];

        // Créer une nouvelle ligne <tr>
        const newRow = $("<tr></tr>");

        // Ajouter les cellules <td> à la ligne en fonction des valeurs de la ligne actuelle
        for (let colIndex = 0; colIndex < rowValues.length; colIndex++) {
            const cellValue = rowValues[colIndex];

            // Ajouter une cellule <td> à la ligne
            newRow.append(`<td>${cellValue}</td>`);
        }

        // Ajouter la ligne complète au tbody
        $("#list tbody").append(newRow);
    }
}

function editItem(item) {
    console.log(item);
    
}

function confirmDeleteItem(item, itemId) {
    $("#confirmDelete").attr("itemId", itemId);
    $("#confirmDelete").attr("item", item)
    showModal("confirmDelete");
    
}

function deleteItem(){
    let itemId = $("#confirmDelete").attr("itemId");
    let item = $("#confirmDelete").attr("item");
    // Loading()
    $.ajax({
        url: URI+'/api/'+item+'/'+itemId,
        method: 'DELETE',
        dataType: 'json',
        success: function(data,status, xhr) {
            console.log('all sites' ,data);
                $("#row_"+itemId).remove();
                closeModal("confirmDelete");
                showAlertSuccess();
                // StopLoading();
            
        }, 
        error: function(err) {
            showAlertFailed();
            closeModal("confirmDelete");
            setTimeout(function() {
                window.location.reload(true);
            }, 2000)
            console.log(err);
        }
    });
}


// Fonction pour afficher le modal
function showModal(modalId) {
    $(`#${modalId}`).modal('show');
}

// Fonction pour fermer le modal
function closeModal(modalId) {
    $(`#${modalId}`).modal('hide');
}

// Fonction pour afficher un contenu spécifique dans le modal
function setContentInModal(modalId, content, position) {
    $(`#${modalId} .modal-body`).html(content);
    $('.modal').addClass(position);
    showModal(modalId);
}

function showAlertModal(title, content, iconClass) {
    // Remplacer le contenu et l'icône
    $('#alertModalTitle').text(title);
    $('#alertModalContent').html(`<i class="${iconClass} fa-3x"></i><p>${content}</p>`);

    // Afficher le modal
    $('#alertModal').modal('show');
}

// Fonction pour afficher le modal de succès
function showAlertSuccess() {
    const title = 'Succès';
    const content = 'L\'opération a été effectuée avec succès.';
    const iconClass = 'fa-3x fa-5x  my-1 fas fa-check-circle text-success';
    showAlertModal(title, content, iconClass);
}

// Fonction pour afficher le modal d'échec
function showAlertFailed() {
    const title = 'Échec';
    const content = 'Une erreur est survenue lors de l\'opération.';
    const iconClass = 'fa-3x fa-5x my-1 fas fa-exclamation-circle text-danger';
    showAlertModal(title, content, iconClass);
}

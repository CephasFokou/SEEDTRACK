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
                                        <i class="fas fa-sort-numeric-down action_icon map_icon" id="action_icon map_icon_${index}" title=""></i>	  
                                        
                                        <div class="collapse sidebar-dropdown border-1 border-bottom mx-4 row" id="fruit_${index}" data-bs-parent="#fruit_${index}">
                                            <div class="col-6 d-grid justify-content-center p-0">
                                                <div class="card card-image">
                                                    <img src="${URI}/api/images/${item.image}" onerror="this.onerror=null; this.src='./img/standard-img.png';" alt="" class="img-abre image-fuild">
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

function getDataFruitsByTrees(TreeId){
    tabBody = [];
    $.ajax({
        url: URI+'/api/fruits/trees/'+TreeId,
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {

            if (xhr.status == 200) {
                tab = data;
                if ($.isArray(tab) && tab.length > 0) {
                    $.each(tab, function(index, item) {
                        
                        // Ajouter les données de chaque élément à la liste tabBody
                        tabBody.push([
                            item.id,
                            '<img class="img-tree" src="' + URI + '/api/images/' + item.image + '">',
                            item.name,
                            item.type,
                            item.width,
                            item.weight,
                            item.shape
                        ]);                    
                    });
                    tabHeaders = ["#ID", "Image","Name","type","width","weight","shape"];
                    displayTabHeader(tabHeaders);
                    displayTabBody(tabBody, tabHeaders);
                    console.log(tabBody)
                    
                }else{
                    displayTabHeader([]);
                    displayTabBody(["DATA NOT FOUND"],[]);
                    console.log('Le tableau est vide pour le champ ' + lineId);
                }
            }
          
        },
        error: function(xhr, status, error) {
            displayTabHeader([]);
            displayTabBody(["URL API NOT FOUND"],[])
            console.error(status + ' : ' + error);
        }
    });
}
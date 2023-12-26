/** GET DATA PARCELS */
function getDataFarms(){
    //alert(237)
    $.ajax({
        url: URI+'/api/farms',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {
            console.log('all farms' ,data);
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

                        var content =`<li class="sidebar-item">`;
                            content +=      `<a data-bs-target="#site_${item.id}" data-bs-toggle="collapse" class="sidebar-link collapsed">
                                                ${item.name.toUpperCase()}<br/>
                                                <span class="text-body-tertiary small">${item.farmType}</span>
                                            </a>`;
                            content +=      `<i class="fas fa-eye action_icon view_icon" id="view_icon_${item.id}" title="Lister de tous les parcerelles du champ" onclick="viewList('${item.name}', 'parcels', ${item.id})"></i>`;
                            if(roleUser == "ADMINISTRATEUR" || roleUser == "AGENT VALIDATEUR"){
                                content +=  `<i class="fas fa-pencil action_icon edit_icon" title="Cliquez pour editer"></i>`;
                            }
                            content +=      `<i class="fas fa-map-marked-alt action_icon map_icon" id="action_icon map_icon_${item.id}" title="Afficher localisation" 
                                                onclick="updateMap('${lt_latitude}','${lt_longitude}','${lb_latitude}','${lb_longitude}','${rt_latitude}','${rt_longitude}','${rb_latitude}','${rb_longitude}','${item.name.toUpperCase()}')">
                                            </i>`;	  
                            if(roleUser == "ADMINISTRATEUR" || roleUser == "AGENT VALIDATEUR"){
                                content +=     `<i class="fas fa-trash-alt action_icon delete_icon" id="delete_icon_${item.id}" title="Cliquez pour supprimer" onclick="confirmDeleteItem('sites', ${item.id})"></i>`;
                            }
                            content +=     `<ul class="collapse cursor-default mb-3 sidebar-dropdown width-p" id="farms_${item.id}" data-bs-parent="#farms_${item.id}">
                                            <div class="card-body p-3 bg-body-tertiary">
                                                <div class="row">
                                                    <div class="d-flex gap-1 gm-ui-hover-effect small w-auto">
                                                        <div class="col-md-6 d-grid">
                                                            <span class="px-2 bg- small"><b>${item.initialArea}%</b> champs</span>
                                                            <span class="px-2 bg- small"><b>${item.initialDensity}%</b> arbre male NC</span>
                                                            <span class="px-2 bg- small"><b>${item.lastArea}%</b> arbre male C</span>
                                                            <span class="px-2 bg- small"><b>${item.lastDensity}%</b> arbre femelle NC</span>
                                                            <span class="px-2 bg- small"><b>${item.floorType}%</b> arbre femelle C</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>`;
                        $('#all_farms').append(content);
                        // $("#site_name").text(item.name.toUpperCase());
                        //console.log(item.name);
                    })
                    var options = "";
                    for (var i = 0; i < tab.length; i++) {
                        options += '<option value="' + tab[i].id + '">' + tab[i].name.toUpperCase() + '</option>';
                    }
                    $('.farmId').html(options);
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

// GET LIST PARCELLES BY CHAMPS
function getDataParcelByFarm(farmId){
    tabBody = [];
    $.ajax({
        url: URI+'/api/parcels/farm/'+farmId,
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {

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
                        tabBody.push([item.id, item.name, item.speculation, item.geneticRessource,item.farm, item.farmType, item.soil, item.pollinisation, convertTimestampToDate(item.creationDate)]);
                    });
                    tabHeaders = ["#ID", "name", "speculation", "geneticRessource","Farm", "farmType", "soil", "pollinisation", "creationDate"];
                    displayTabHeader(tabHeaders);
                    displayTabBody(tabBody, tabHeaders);
                    console.log(tabBody);
                    
                }else{
                    displayTabHeader([]);
                    displayTabBody(["DATA NOT FOUND"],[]);
                    console.log('Le tableau est vide pour le champ ' + farmId);
                }
            }
          
        },
        error: function(xhr, status, error) {
            console.error(status + ' : ' + error);
        }
    });
}
// GET LIST ALL FARMS
function allFarms(){
    tabBody = [];
    $.ajax({
        url: URI+'/api/farms/all',
        method: 'GET',
        dataType: 'json',
        success: function(data,status, xhr) {

            if (xhr.status == 200) {
                var tab ;
                tab = data;
                console.log(`all data farms`, tab);
                if ($.isArray(tab) && tab.length > 0) {
                    $.each(tab, function(index, item) {
                       // Ajouter les données de chaque élément à la liste tabBody
                       tabBody.push([
                            item.id, item.name, item.initialArea, item.lastArea, item.initialDensity, item.lastDensity, item.farmType, convertTimestampToDate(item.creationDate)
                        ]);
                    });
                        
                    tabHeaders = ["#ID", "name", "Zone Initiale", "Zone Actuelle", "Densité Initiale", "Densité Actuelle", "Type de ferme", "creationDate"];
                    displayTabHeader(tabHeaders);
                    displayTabBody(tabBody, tabHeaders);
                    console.log(tabBody);
                    
                }else{
                    displayTabHeader([]);
                    displayTabBody(["DATA NOT FOUND"],[]);
                    console.log('Le tableau est vide pour tous les farms');
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
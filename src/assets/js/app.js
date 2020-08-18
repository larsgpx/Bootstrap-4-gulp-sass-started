$( document ).ready(function() {
    
    $("#sel-marca").click(function(){
        console.log('asd');
        if($('#ul-marca .dropdown-item').length < 1){
            var marcasFiltradas = [];                        
            //filtrar por marca
            $.getJSON('assets/js/carritos.json', function(marcas) {                 
                $.each(marcas, function (index, value) {
                    if ($.inArray(value.marca, marcas) == -1) {
                        marcas.push(value.marca);
                        marcasFiltradas.push(value);
                        $('#ul-marca').append(`<a class="dropdown-item" value="${value.marca}">${value.marca}</a>`);
                    }
                });  
                var modeloFiltradas = [];                   
                $('#ul-marca .dropdown-item').click(function(){  
                    //vacia el dropdown modelo
                    $('#ul-modelo .dropdown-item').remove();                  
                    $('#sel-modelo').text('Selecciona el modelo');                  
                    //vacia el dropdown fabricacion
                    $('#ul-ano .dropdown-item').remove();                  
                    $('#sel-ano').text('año de fabricacion');                  
                    //vacia el dropdown kilometraje
                    $('#ul-kilometraje .dropdown-item').remove();                  
                    $('#sel-kilometraje').text('Kilometraje');                  
                    //actualiza el nombre del dropdown btn
                    $('#sel-marca').text($(this).text());
                    $('#ul-marca .dropdown-item').removeClass('selected');
                    $(this).addClass('selected');
                    //filtrar por modelo
                    $.getJSON('assets/js/carritos.json', function(modelo) {     
                        $.each(modelo, function (index, value) {
                            if ($.inArray(value.modelo, modelo) == -1 && value.marca == $('#ul-marca .dropdown-item.selected').text()) {
                                modelo.push(value.modelo);
                                modeloFiltradas.push(value);
                                $('#ul-modelo').append(`<a class="dropdown-item" value="${value.modelo}">${value.modelo}</a>`);
                            }
                        });

                        var anoFabricacion = [];
                        $('#ul-modelo .dropdown-item').click(function(){                    
                            $('#sel-modelo').text($(this).text());
                            $('#ul-modelo .dropdown-item').removeClass('selected');   
                            //vacia el dropdown kilometraje
                            $('#ul-kilometraje .dropdown-item').remove();                  
                            $('#sel-kilometraje').text('Kilometraje'); 
                            //filtrar por año
                            $.getJSON('assets/js/carritos.json', function(ano) {     
                                $.each(ano, function (index, value) {                                         
                                    if ($.inArray(value.ano, ano) == -1 && value.marca == $('#ul-marca .dropdown-item.selected').text()) {
                                        ano.push(value.ano);
                                        anoFabricacion.push(value);
                                        $('#ul-ano').append(`<a class="dropdown-item" value="${value.ano}">${value.ano}</a>`);
                                    }
                                });

                                var kilometrajeArr = [];
                                $('#ul-ano .dropdown-item').click(function(){                    
                                    $('#sel-ano').text($(this).text());
                                    $('#ul-ano .dropdown-item').removeClass('selected');

                                     //filtrar por año
                                    $.getJSON('assets/js/carritos.json', function(kilometraje) {     
                                        $.each(kilometraje, function (index, value) {                                         
                                            if ($.inArray(value.kilometraje, kilometraje) == -1 && value.marca == $('#ul-marca .dropdown-item.selected').text()) {
                                                kilometraje.push(value.kilometraje);
                                                kilometrajeArr.push(value);
                                                $('#ul-kilometraje').append(`<a class="dropdown-item" value="${value.kilometraje}">${value.kilometraje}</a>`);
                                            }
                                        });                                        
                                        $('#ul-kilometraje .dropdown-item').click(function(){                    
                                            $('#sel-kilometraje').text($(this).text());
                                            $('#ul-kilometraje .dropdown-item').removeClass('selected');  
                                            
                                            $.getJSON('assets/js/carritos.json', function(carro) {     
                                                $.each(carro, function (index, value) {                                                       
                                                    if (value.marca == $('#ul-marca .dropdown-item.selected').text() && value.ano == $('#sel-ano').text() && value.modelo == $('#sel-modelo').text() && value.kilometraje == $('#sel-kilometraje').text()) {
                                                     $('#car-price').html(`El valor del carro es de ${value.precio}`);
                                                     console.log('dentro del if');
                                                    }
                                                });                                                                                       
                                            });   
                                        });   
                                        }); //json kilometraje
                                });   
                            }); //json ano
                        });   
                    }); //json modelo
                });   
                
            });     //json marca    
        }        
    });  
});
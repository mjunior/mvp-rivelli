var checkNow
var waitingList = []
var erroBlock = true;
//wizard with options and events
$(document).ready(function() {
    //verifica se tem conexão
    if(navigator.onLine) {
      $('#status_rede').text('Você está online!');
      //Verifica se tem objetos salvos em localStorage.

      if(localStorage.waitingList){
        waitingList = JSON.parse(localStorage.waitingList);
        //vê se tem checklist pendentes e envia p/ API
        if(waitingList.itens.length > 0){

          /*
            EM PRODUÇÃO:
            Quando o usuário retornar a conexão com a internet, todos os checklist criados
            enquanto offline devem ser enviadas a rivelli.

            Neste trecho é onde devemos percorrer toda a lista de espera (waitingList) e realizar um
            $.POST enviando as informações.

          */


          alert('\n\n\n\n\n\nVocê fez '+waitingList.itens.length+' cadastros offline. \n\n Vamos enviar essas informações...\n\n\n\n\n\n');

          //zera pois ja enviamos.
          waitingList.itens = [];

          //zera o localStorage. Escreve o obj sem itens
          localStorage.setItem("waitingList",JSON.stringify(waitingList));
      }
      }
    }else{
      $('#status_rede').text('Você está offline!');
    }

  hasChecklist();

  // Cria uma copia do objeto checkList
  // para checkNow, que é a checklist que esta sendo preenchida.
  checkNow = checklist;

    $('#rootwizard').bootstrapWizard({
        tabClass: 'nav nav-pills',
        onNext: function(tab, navigation, index) {
          var errors = []
            switch(index) {
          case 1:

            var tipo_carga = $('#tipo_carga').val();
            var placa = $('#placa').val();
            if(tipo_carga == "0"){
              errors.push("Selecione o TIPO de carga");
            }
            if(placa == "0"){
              errors.push("Selecione A PLACA do veículo.");
            }
            checkNow.INFO.tipo_carga = tipo_carga
            checkNow.INFO.placa = placa;
            console.log(checkNow);
              break;
          case 2:
            // Validações referente ao negócio da empresa devem ser adicionadas aqui
              break;
          case 3:
            // Validações referente ao negócio da empresa devem ser adicionadas aqui
              break;
          case 4:
            // Validações referente ao negócio da empresa devem ser adicionadas aqui
              break;
          case 5:
            // Validações referente ao negócio da empresa devem ser adicionadas aqui
              break;
            case 6:
              // Validações referente ao negócio da empresa devem ser adicionadas aqui
              break;
          case 7:
            // Validações referente ao negócio da empresa devem ser adicionadas aqui
              break;
          default:
            // Validações referente ao negócio da empresa devem ser adicionadas aqui
              break;
      }

      if(errors.length > 0){
        var msg = ""
        for(i in errors){
          msg += errors[i]+"\n";
        }
        alert(msg);
        return false;
      }
      console.log(checkNow);
    }
  });


  //Pega o click de OK e preenche o JSON
  $('.option.ok').click(function(){
      var tag = $(this).attr('data-tag');
      $('.error_block.'+tag).hide();

      //marca opção
      $('button[data-tag="'+tag+'"]').removeClass('active');
      $(this).addClass('active');

      checkNow[tag].error = false;
      checkNow[tag].error_description = "N/A";
      checkNow[tag].correct = true;

  })
  //Decide o que deve ser feito com as informações da checklist
  // no momento em que o usuário finaliza e clica em SALVAR
  $('#salvar').click(function(){
    if(navigator.onLine) {

      //Se online adicionamos aqui um metodo POST na
      //URL do backend desenvolvido em PHP

    alert('Chamada API será feita! Online.');
  }else{

    //Se offline apenas guardamos essa informação para envio futuro.

    alert('\n\n\nVocê está offline.\n\n\n Suas informações foram salvas \n\n\n Conecte-se para enviar as informações a central.');
        waitingList = JSON.parse(localStorage.waitingList);
        waitingList.itens.push(checkNow);
        console.log(waitingList);
        localStorage.setItem("waitingList",JSON.stringify(waitingList));
  }

  })

  //Pega o click de ERROR e preenche o JSON
  //Generico, funciona pra qualquer elemento de checklist
  $('.option.error').click(function(){
      var tag = $(this).attr('data-tag');

      $('button[data-tag="'+tag+'"]').removeClass('active');
      $(this).addClass('active');

      checkNow[tag].error = true;
      checkNow[tag].error_description = "N/A";
      checkNow[tag].correct = false;
      $('.error_block.'+tag).show();
  })

  //Detecta a mudança de algum objeto de erro.
  //Caso o usuario selecione uma opção e depois troque.
  $('.error_description').change(function(){
    var tag = $(this).attr('data-tag');
    checkNow[tag].error_description = $(this).val();
    console.log('??')
    erroBlock = false;
    console.log(erroBlock);
  })


}); //Fim Document Ready


// Verifica se no localStorage existe informações na lista de espera.
// Se não existir criamos o elemento waitingList no localstorage, ele será
// responsavel por  armazenas todas as checklist que estão na lisa de espera
// para serem enviadas ao backend.

function hasChecklist(){
  waitingList = localStorage.waitingList
  if(!waitingList){
    console.log('localStorage criado!')
    localStorage.setItem("waitingList",JSON.stringify({itens:[]}));
  }else{
    console.log('localStorage existente.');
    console.log(JSON.parse(waitingList));
  }
}

// De acordo com o tipo de carga as placas são exibidas.
// As placas estão cadastradas no arquivo placa.json
// que estara em cache quando offline.

function carrega_placas(){
  carga = $('#tipo_carga').val();
  $( "#placa" ).empty();
  var placas = []

  //Percorre todos os tipos de cargas
  for(i in tipos_carga){
    //Encontra o tipo selecionado
    if(tipos_carga[i].type == carga)
    {
      //obtem as placas
      for(k in tipos_carga[i].placas)
      {
        placas.push(tipos_carga[i].placas[k]);
      }

      var htmlOption = '<option class="placa_item" value="#PLACA#" > #PLACA# </option>';
      //constrói o HTML
      $('#placa').append('<option class="placa_item" value="0" selected="selected"> - Seleciona uma placa -  </option>')
      for(k in placas){
        var op = htmlOption.replace('#PLACA#',placas[k]);
        op = op.replace('#PLACA#',placas[k]);
        $('#placa').append(op)
      }
      $('#placa_input').fadeIn();
    }
  }

}

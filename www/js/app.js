
var app = angular.module('todoapp', ['ionic']);

app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state('list',{
    url:'/list',
    templateUrl: 'templates/lista.html'
  });
  $stateProvider.state('new',{
    url:'/new',
    templateUrl: 'templates/novo.html',
    controller: 'NovoCtrl'
  });
  $stateProvider.state('edit',{
    url:'/edit/:indice',
    templateUrl: 'templates/novo.html',
    controller: 'EditCtrl'
  });


  $urlRouterProvider.otherwise('/list');
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
  
    if(window.cordova && window.cordova.plugins.Keyboard) {
      
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

       cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {

      StatusBar.styleDefault();
    }
  });
});


app.controller('ListaCtrl', function($scope, $state){
  //Aqui vem a implementação do meu controller:
$scope.tarefas = tarefaService.lista();

$scope.concluir = function(indice){
$scope.tarefas[indice].feita=true;
}

$scope.apagar = function(indice){
$scope.tarefaService.apagar;
}

$scope.editar = function(indice){
  $state.go('edit', {indice : indice});
}

  $scope.mensagem = 'Hello World';
});

app.controller('NovoCtrl', function($scope,$state){ 
$scope.tarefa = {
    "texto" : $scope.texto,       //<input ng-model ="texto"...
    "data" : new Date(),
    "feita" : false
  };

  $scope.salvar = function(){

    tarefaService.inserir($scope.tarefa);
    $state.go('list');
  }
});
app.controller('EditCtrl', function($scope,$state,$stateParams){ 
  $scope.indice = $stateParams.indice;
  $scope.tarefa = angular.copy(tarefaService.obtem($scope.indice));
    $scope.salvar = function(){
    
      tarefaService.alterar($scope.indice, $scope.tarefa)
     
      tarefas[$scope.indice] = $scope.tarefa;
      $state.go('list');
    }
  });

  app.factory('TarefaService', function(){
    var tarefas = [];
    

      return{
        lista: function() {
          return tarefas;
        },
        obtem: function(indice){
          return tarefas[indice];
        },
        create: function(tarefa){
          tarefas.push($scope.tarefa);
        },
        alterar: function(indice, tarefa){
            tarefas[indice]=tarefa;
        },
        apagar: function(indice){
          tarefas.splice(indice,1)
        }
      }

  });
  
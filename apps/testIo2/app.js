/*

*/
var app = angular.module('app', [
  'ui.router',
  'mio'
  ]);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
  $stateProvider.state('api', {
    url: '/api/:lid', 
    templateUrl: 'lid.html', 
    controller: 'AppCtrl',
  });
  $stateProvider.state('bye', {
    url: '/bye', 
    template: "<div>hey7 what</div"
  });
  $urlRouterProvider.otherwise('/bye');	
}]);


app.controller('AppCtrl', [ '$scope', '$stateParams', 'ioService', function($scope, $stateParams, ioService){
    $scope.lid =$stateParams.lid;
    $scope.port = ioService.port;
    var io = ioService.socket;   
    console.log(ioService)
}]);

app.directive('ioD',['ioService', '$state', function(ioService, $state){
    return {
        restrict:'E',
        scope: {},
        templateUrl: "io-d.html",
        link: function(scope, element, attrs){
            var io= ioService.socket;
            io.on('itemChanged', function(data){
                console.log(JSON.stringify(data))
                document.getElementById('chatlog').innerHTML += '<br>' + JSON.stringify(data);
            })
            scope.port = ioService.port;
            scope.lid=attrs.lid;
            scope.options = [
                {label:'Jutebi', value: 'Jutebi'},
                {label:'Qitula', value: 'Qitula'},
                {label:'Camala', value: 'Camala'},
                {label:'Minohu', value: 'Minohu'},
            ];
            scope.elected= scope.options[1]       
            scope.changeLid = function(){
                console.log(scope.elected)
                $state.go('api'+{lid:scope.elected.value})
                io.emit('switchLid', scope.elected.value);
            }
            scope.sendMessage =  function(){
                console.log('sentMessage to console')
                io.emit('message', {lid: scope.elected.value, item: 'frogfood'})               
            }    
        }
    }
}]); 



var mio = angular.module('mio',[]);

mio.service("ioService", function($q, $timeout) {  
	console.log('ioservice')
	var port = 1222; 	
	var socket = io.connect('localhost:' + port);
	var service = {
		dog: 'fred',
		socket: socket,
		port: port
	}
    	return service;
});


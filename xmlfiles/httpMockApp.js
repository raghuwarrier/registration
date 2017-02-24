// This module has implemented http mock using $httpbackend.
// Currently backend calls from SignUpApp modules are mocked.
var httpMockApp = angular.module('httpMockApp', ['shiftIControlApp', 'ngMockE2E']);
httpMockApp.run(function($httpBackend) {
    // Mocking http POST call for /register url.
    // This mock operation will return status code 201 in all cases expect for email a@b.com.
    // In case of email a@b.com it will return status code 500 with error message

        $httpBackend.whenPOST('/login').respond(function(method, url, data,callback, headers){
            console.log('Received this data:', method, url, data,callback,headers);
            var payload = angular.fromJson(data);
            if(payload.userName=="shrijay"){
                return [400, {errorMessage : "User Does not exist in the system"}, {}];
            }
         return [200, {}, {}];
         });
    // Passed through calls for which mocking is not required.
        $httpBackend.whenGET('views/login.html').passThrough();
        $httpBackend.whenGET('views/register.html').passThrough();
        $httpBackend.whenGET('views/success.html').passThrough();
        $httpBackend.whenGET('http://127.0.0.1:50526/app/data/overview.json').passThrough();
        $httpBackend.whenGET('milestoneDetails.html').passThrough();
        $httpBackend.whenGET('http://127.0.0.1:50526/app/data/milestone.json').passThrough();
});

httpMockApp.config(function($provide) {
    // Added service decorator to intercept httpBackend service call to introduce delay in sending response
    // back to caller.
    $provide.decorator('$httpBackend', function($delegate) {
        var proxy = function(method, url, data, callback, headers) {
            var delay;
            if(method=='POST'){
                delay=1000;
            }
            var interceptor = function() {
                var _this = this,
                    _arguments = arguments;
                setTimeout(function() {
                    callback.apply(_this, _arguments);
                }, delay);
            };
            return $delegate.call(this, method, url, data, interceptor, headers);
        };
        for(var key in $delegate) {
            proxy[key] = $delegate[key];
        }
        return proxy;
    });
});
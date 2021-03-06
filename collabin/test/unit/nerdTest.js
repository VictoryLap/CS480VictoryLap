describe('My app controllers', function(){
  describe('NerdController', function(){
    var scope, ctrl;

    beforeEach(module('NerdCtrl'));

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('NerdController', {$scope:scope});
    }));

    it('should create inventory model with 6 items', function() {
      expect(scope.inventory.length).toBe(6);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('name');
    });
  });
});
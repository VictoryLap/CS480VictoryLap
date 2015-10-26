describe('MainController', function() {

    beforeEach(module('MainCtrl'));

    var MainController, scope;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        MainController = $controller('MainController', {
            $scope: scope
        });
    }));

    it('says An Inventory for Everyone', function () {
        expect(scope.tagline).toEqual("An inventory for everyone");
    });
});
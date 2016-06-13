export function LoadController(componentModule, deliver, done, controllerScope = {}) {
    inject(function($rootScope, $componentController) {
        deliver($componentController(componentModule, {
            $scope: $rootScope.$new(true)
        }, controllerScope));
    });
    done();
}

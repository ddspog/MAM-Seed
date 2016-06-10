export function LoadController(componentModule, deliver, done) {
    inject(function($rootScope, $componentController) {
        deliver($componentController(componentModule, {
            $scope: $rootScope.$new(true)
        }));
    });
    done();
}

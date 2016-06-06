import {
    name as PartiesList
} from '../partiesList';
import 'angular-mocks';

describe('PartiesList', function() {
    beforeEach(function() {
        window.module(PartiesList);
    });

    describe('controller', function() {
        let controller;

        beforeEach(function() {
            inject(function($rootScope, $componentController) {
                controller = $componentController(PartiesList, {
                    $scope: $rootScope.$new(true)
                });
            });
        });

        it('should have perPage that equals 3 by default', function() {
            expect(controller.perPage).toEqual(3);
        });

        it('should have page that equals 1 by default', function() {
            expect(controller.page).toEqual(1);
        });

        it('should sort by name - ASC', function() {
            expect(controller.sort).toEqual({
                name: 1
            });
        });

        it('should be able to change sorting', function() {
            controller.sortChanged({
                name: -1
            });

            expect(controller.sort).toEqual({
                name: -1
            });
        });

        it('should be able to change page', function() {
            controller.pageChanged(2);

            expect(controller.page).toEqual(2);
        });
    });
});

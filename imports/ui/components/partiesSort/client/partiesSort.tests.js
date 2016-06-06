import {
    name as PartiesSort
} from '../partiesSort';
import 'angular-mocks';

describe('PartiesSort', function() {
    beforeEach(function() {
        window.module(PartiesSort);
    });

    describe('controller', function() {
        let controller;
        const onChange = function() {};
        const property = 'name';
        const order = -1;

        beforeEach(function() {
            inject(function($rootScope, $componentController) {
                controller = $componentController(PartiesSort, {
                    $scope: $rootScope.$new(true)
                }, {
                    onChange,
                    property,
                    order
                });
            });
        });

        it('should set property', function() {
            expect(controller.property).toEqual(property);
        });

        it('should set an order', function() {
            expect(controller.order).toEqual(order);
        });

        it('should set onChange', function() {
            expect(controller.onChange).toBe(onChange);
        });

        describe('changed()', function() {
            it('should call onChange expression', function() {
                spyOn(controller, 'onChange');

                controller.changed();

                expect(controller.onChange).toHaveBeenCalledWith({
                    sort: {
                        [property]: order
                    }
                });
            });
        });
    });
});

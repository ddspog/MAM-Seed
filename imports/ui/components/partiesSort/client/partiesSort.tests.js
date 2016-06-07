import {
    name as PartiesSort
} from '../partiesSort';

import 'angular-mocks';

import {
    chai
} from 'meteor/practicalmeteor:chai';

import {
    sinon
} from 'meteor/practicalmeteor:sinon';

should();

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
            expect(controller.property).to.be.equal(property);
        });

        it('should set an order', function() {
            expect(controller.order).to.be.equal(order);
        });

        it('should set onChange', function() {
            expect(controller.onChange).to.be.an(typeof onChange);
        });

        describe('changed()', function() {
            beforeEach(function() {
              spies.restoreAll();
            });

            it('should call onChange expression', function() {
                spies.create('onChange', controller, 'onChange');

                controller.changed();

                expect(spies.onChange).to.have.been.calledWith({
                    sort: {
                        [property]: order
                    }
                });
            });
        });
    });
});

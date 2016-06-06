import {
    Meteor
} from 'meteor/meteor';
import {
    name as PartyAdd
} from '../partyAdd';
import {
    Parties
} from '../../../../api/parties';
import 'angular-mocks';

describe('PartyAdd', function() {
    // Initialize module
    beforeEach(function() {
        window.module(PartyAdd);
    });

    // Test inside controller
    describe('controller', function() {
        let controller;
        const party = {
            name: 'Foo',
            description: 'Birthday of Foo',
            public: true
        };
        const user = {
            _id: 'userId'
        }

        // Initialize controller
        beforeEach(function() {
            inject(function($rootScope, $componentController) {
                controller = $componentController(PartyAdd, {
                    $scope: $rootScope.$new(true)
                });
            });

            spyOn(Meteor, 'user').and.returnValue(user);
        });

        describe('reset()', function() {
            it('should clean up party object', function() {
                controller.party = party;
                controller.reset();

                expect(controller.party).toEqual({});
            });
        });

        describe('submit()', function() {
            // Monitors insert, reset on submit calls
            beforeEach(function() {
                spyOn(Parties, 'insert');
                spyOn(controller, 'reset').and.callThrough();

                controller.party = party;

                controller.submit();
            });

            it('should insert a new party', function() {
                expect(Parties.insert).toHaveBeenCalledWith({
                    name: party.name,
                    description: party.description,
                    public: party.public,
                    owner: user._id
                });
            });

            it('should call reset()', function() {
                expect(controller.reset).toHaveBeenCalled();
            });
        });
    });
});

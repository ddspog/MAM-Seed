import {
    name as Auth
} from '../auth';

import 'angular-mocks';

import {
    Meteor
} from 'meteor/meteor';

import {
    chai
} from 'meteor/practicalmeteor:chai';

should();


describe('Auth', function() {
    beforeEach(function() {
        window.module(Auth);
    });

    describe('controller', function() {
        let controller;

        beforeEach(function() {
            inject(function($rootScope, $componentController) {
                controller = $componentController(Auth, {
                    $scope: $rootScope.$new(true)
                });
            });
        });

        describe('isLoggedIn', function() {
            it('should returns Meteor.userId() if no one it\'s logged', function() {
                Meteor.logout();

                expect(controller.isLoggedIn).to.be.equal(!!Meteor.userId());
            });

            it('should returns Meteor.userId() if someone it\'s logged', function() {
                Meteor.insecureUserLogin('userLoggedName');

                expect(controller.isLoggedIn).to.be.equal(!!Meteor.userId());
            });
        });

        describe('currentUser', function() {
            it('should returns Meteor.user() if no one it\'s logged', function() {
                Meteor.logout();

                expect(controller.currentUser).to.be.equal(Meteor.user());
            });

            it('should returns Meteor.user() if someone it\'s logged', function() {
                Meteor.insecureUserLogin('userLoggedName');

                expect(controller.currentUser).to.be.equal(Meteor.user());
            });
        });

        describe('logout()', function() {
            it('should logout when user is logged', function() {
                Meteor.insecureUserLogin('userLoggedName');

                controller.logout();

                expect(Meteor.userId()).to.be.null;
            });

            it('should do nothing when user isn\'t logged', function() {
                Meteor.logout();

                controller.logout();

                expect(Meteor.userId()).to.be.null;
            })
        });
    });
});

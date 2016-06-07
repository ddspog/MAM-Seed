import {
    name as Login
} from '../login';

import 'angular-mocks';

import {
    Meteor
} from 'meteor/meteor';

import {
    sinon
} from 'meteor/practicalmeteor:sinon';

describe('Login', function() {
    beforeEach(function() {
        window.module(Login);

        spies.restoreAll();
    });

    describe('controller', function() {
        let controller;

        beforeEach(function() {
            inject(function($rootScope, $componentController) {
                controller = $componentController(Login, {
                    $scope: $rootScope.$new(true)
                });
            });
        });

        it('should have credentials all empty by default', function() {
            expect(controller.credentials).to.be.deep.equal({
                email: '',
                password: ''
            });
        });

        it('should have error empty by default', function() {
            expect(controller.error).to.be.equal('');
        });

        describe('login()', function() {
            let validEmail = 'validEmail';
            let validPassword = 'validPassword';

            it('should call Meteor.loginWithPassword', function() {
                spies.create('login', Meteor, 'loginWithPassword');

                controller.credentials = {
                    email: validEmail,
                    password: validPassword
                };
                controller.login();

                expect(spies.login).to.be.calledWith(validEmail, validPassword);

                spies.login.restore();
            });
        });

        describe('loginGoogle()', function() {
            it('should call Meteor.loginWithGoogle', function() {
                spies.create('login', Meteor, 'loginWithGoogle');

                controller.loginGoogle();

                expect(spies.login).to.be.called;

                spies.login.restore();
            });
        });

        describe('loginFacebook()', function() {
            it('should call Meteor.loginWithFacebook', function() {
                spies.create('login', Meteor, 'loginWithFacebook');

                controller.loginFacebook();

                expect(spies.login).to.be.called;

                spies.login.restore();
            });
        });
    });
});

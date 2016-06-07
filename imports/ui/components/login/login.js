import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import {
    Meteor
} from 'meteor/meteor';
import {
    Accounts
} from 'meteor/accounts-base';

import template from './login.html';

import {
    name as Register
} from '../register/register';

import {
    name as MDIIconFilter
} from '../../filters/mdiIcon/mdiIconFilter';

import MonitorProvider from '../../services/monitor/monitor';

class Login {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        this.credentials = {
            email: '',
            password: ''
        };

        this.error = '';
    }

    login() {
        Meteor.loginWithPassword(this.credentials.email, this.credentials.password,
            this.$bindToContext((err) => {
                if (err) {
                    this.error = err.reason;
                } else {
                    this.$state.go('parties');
                }
            })
        );
    }

    loginGoogle() {
        Meteor.loginWithGoogle({
            requestPermissions: ['profile', 'email']
        }, (err) => {
            if (err) {
                this.error = err.reason;
            } else {
                this.$state.go('parties');
            }
        });
    }

    loginFacebook() {
        Meteor.loginWithFacebook({
            requestPermissions: ['public_profile', 'email']
        }, (err) => {
            if (err) {
                this.error = err.reason;
            } else {
                this.$state.go('parties');
            }
        });
    }
}

const name = 'login';

// create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter,
        MDIIconFilter
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: Login
    })
    .config(config)
    .service('Monitor', MonitorProvider)
    .run(run);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('login', {
        url: '/login',
        template: '<login></login>'
    });
}

// Fix to https://github.com/angular/material/issues/1376
function run(Monitor) {
    'ngInject';

    Monitor.whenAutofill('input.fix-float', (elem) => {
        elem.parent().addClass('md-input-has-value');
    });
}

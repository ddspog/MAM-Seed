import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import {
    Counts
} from 'meteor/tmeasday:publish-counts';

import template from './partiesList.html';
import {
    Parties
} from '../../../api/parties/index';
import {
    name as PartiesSort
} from '../partiesSort/partiesSort';
import {
    name as PartyAdd
} from '../partyAdd/partyAdd';
import {
    name as PartyRemove
} from '../partyRemove/partyRemove';

class PartiesList {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.perPage = 3;
        this.page = 1;
        this.sort = {
            name: 1
        };
        this.searchString = '';

        this.subscribe('parties', () => [{
            limit: parseInt(this.perPage),
            skip: parseInt((this.getReactively('page') - 1) * this.perPage),
            sort: this.getReactively('sort')
        }, this.getReactively('searchString')]);

        this.helpers({
            parties() {
                return Parties.find({}, {
                    sort: this.getReactively('sort')
                });
            },
            partiesCount() {
                return Counts.get('numberOfParties');
            }
        });
    }

    pageChanged(newPage) {
        this.page = newPage;
    }

    sortChanged(sort) {
        this.sort = sort;
    }
}

const name = 'partiesList';

// Create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter,
        utilsPagination,
        PartiesSort,
        PartyAdd,
        PartyRemove
    ]).component(name, {
        template,
        controllerAs: name,
        controller: PartiesList
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('parties', {
            url: '/parties',
            template: '<parties-list></parties-list>'
        });
}

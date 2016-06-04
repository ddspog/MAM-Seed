export function ConfigGoogleMap(uiGmapGoogleMapApiProvider) {
    'ngInject';

    Meteor.call('getGoogleAPIBrowserConfiguration', (error, result) => {
        if (error) {
            console.error('Oops, unable to get API Key!');
        } else {
            uiGmapGoogleMapApiProvider.configure(result);
        }
    });
}

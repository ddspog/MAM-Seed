Package.onTest(function (api) {
  api.use([
    'practicalmeteor:chai',
    'practicalmeteor:mocha',
    'practicalmeteor:sinon'
  ]);

  api.addFiles('./imports/test.js');
});

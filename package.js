Package.onTest(function (api) {
  api.use([
    'angular-babel',
    'practicalmeteor:chai',
    'practicalmeteor:mocha',
    'practicalmeteor:sinon'
  ]);

  api.addFiles('import/test.js');
});

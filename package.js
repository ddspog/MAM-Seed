Package.onTest(function (api) {
  api.use([
    'pbastowski:angular-babel',
    'practicalmeteor:chai',
    'practicalmeteor:mocha',
    'practicalmeteor:sinon'
  ]);

  api.addFiles('./imports/test.js');
});

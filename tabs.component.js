var tab = {
    bindings: {
        label: '@',
    },
    require: {
        parent: '^tabs'
    },
    transclude: true,
    controller: function() {
        var self = this;
        self.selected = false;
        self.$onInit = function () {
            this.parent.addTab(self);    
        };
    },
    template: function ($element, $attrs) {
        return `
            <div class="tabs_content" ng-if="$ctrl.selected">
                <div ng-transclude></div>
            </div>
        ` 
    } 
};

var tabs = {
    bindings: {
        active: '@'
    },
    transclude: true,
    controller: function (){
        this.tabs  = [];
        this.addTab = function(tab){
            this.tabs.push(tab);  
        }

        this.selectTab = function(index) {
            for(var i=0 ; i< this.tabs.length; i++){
                this.tabs[i].selected = false; 
            }
            this.tabs[index].selected = true;
        }

        this.$postLink = function () {
            this.selectTab(this.active || 0)
        };
    },
    template: function($element,$attrs){
        return `
            <div class="tabs">
                <ul class="tabs_list">
                    <li ng-repeat="tab in $ctrl.tabs">
                        <a href="" ng-bind="tab.label" ng-click="$ctrl.selectTab($index)"></a>
                    </li>
                </ul>
                <div class="tabs_content" ng-transclude></div>
            </div>
        `
    }
};

angular.module('tabApp', [])
       .component('tab', tab)
       .component('tabs', tabs);
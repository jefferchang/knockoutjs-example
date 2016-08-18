(function ($, ko){
    $(function () {
        
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        module("paging view model - base Pager - empty initializer");
            var pager = new ko.bindingHandlers.pagedForeach.Pager();
        
        test("inital pages are empty", function () {
            QUnit.deepEqual(pager.pagedItems(), [], "paged items");
        });
        test("inital page is 1", function () {
            QUnit.equal(pager.page(), 1, "page");
        });
        test("inital itemsPerPage is 10", function () {
            QUnit.equal(pager.itemsPerPage(), 10, "itemsPerPage");
        });
        test("inital allowChangePageSize is false", function () {
            QUnit.equal(pager.allowChangePageSize(), false, "allowChangePageSize");
        });
        test("inital totalPages is 0", function () {
            QUnit.equal(pager.totalPages(), 0, "totalPages");
        });
        test("inital relativePages are empty", function () {
            QUnit.deepEqual(pager.relativePages(), [], "relativePages");
        });
        
        
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        module("paging view model - ClientPager - empty initializer");
            var observableArray = ko.observableArray([]);
            var clientPager = new ko.bindingHandlers.pagedForeach.ClientPager(observableArray);
        
        test("inital pages are empty", function () {
            QUnit.deepEqual(clientPager.pagedItems(), [], "paged items");
        });
        test("inital page is 1", function () {
            QUnit.equal(clientPager.page(), 1, "page");
        });
        test("inital itemsPerPage is 10", function () {
            QUnit.equal(clientPager.itemsPerPage(), 10, "itemsPerPage");
        });
        test("inital allowChangePageSize is false", function () {
            QUnit.equal(clientPager.allowChangePageSize(), false, "allowChangePageSize");
        });
        test("inital totalPages is 0", function () {
            QUnit.equal(clientPager.totalPages(), 0, "totalPages");
        });
        test("inital relativePages are empty", function () {
            QUnit.deepEqual(clientPager.relativePages(), [], "relativePages");
        });
        
        
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        module("paging view model - ClientPager - updates to observableArray");
            
        test("pager updates with observableArray", function(){
            var array = [0, 1, 2, 3, 4, 5];
            observableArray(array);
            expect(2);
            QUnit.deepEqual(clientPager.pagedItems(), array, "paged items");
            QUnit.deepEqual(clientPager.relativePages(), [1], "relativePages");
        });
        test("page cannot go below 1", function () {
            expect(2);
            pager.page(0);
            QUnit.equal(clientPager.page(), 1, "page");
            pager.page(-1);
            QUnit.equal(clientPager.page(), 1, "page");
        });
        test("page cannot go past last page with single page of data", function () {
            expect(2);
            pager.page(2);
            QUnit.equal(clientPager.page(), 1, "page");
            pager.page(10);
            QUnit.equal(clientPager.page(), 1, "page");
        });
        test("relativePages only show available pages", function(){
            expect(2);
            QUnit.deepEqual(clientPager.relativePages(), [1], "relativePages");
            var array = ko.utils.range(0, 25);
            observableArray(array);
            QUnit.deepEqual(clientPager.relativePages(), [1, 2, 3], "relativePages");
        });
        test("page cannot go past last page with multiple pages of data", function () {
            var array = ko.utils.range(0,25);
            observableArray(array);
            expect(2);
            clientPager.page(4);
            QUnit.equal(clientPager.page(), 3, "page");
            clientPager.page(10);
            QUnit.equal(clientPager.page(), 3, "page");
        });
        test("pager updates with observableArray and only displays one page", function(){
            var array = ko.utils.range(0,100);
            observableArray(array);
            expect(2);
            QUnit.deepEqual(clientPager.pagedItems(), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "paged items");
            QUnit.deepEqual(clientPager.relativePages(), [1, 2, 3, 4, 5], "relativePages");
        });
        test("page can update with multiple pages of data", function () {
            expect(2);
            clientPager.page(2);
            QUnit.equal(clientPager.page(), 2, "page");
            clientPager.page(3);
            QUnit.equal(clientPager.page(), 3, "page");
        });
        test("changing the page updates the relativePages", function () {
            expect(2);
            clientPager.page(5);
            QUnit.deepEqual(clientPager.relativePages(), [3, 4, 5, 6, 7], "relativePages");
            clientPager.page(11);
            QUnit.deepEqual(clientPager.relativePages(), [7, 8, 9, 10, 11], "relativePages");
        });
        
        
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        module("paging view model - ServerPager - empty initializer");
        function serverfunction(itemsPerPage, page){
                var indexOfFirstItemOnCurrentPage = ((page - 1) * itemsPerPage);
                var pageArray = ko.utils.range(indexOfFirstItemOnCurrentPage, 
                                            indexOfFirstItemOnCurrentPage + itemsPerPage - 1);
                return pageArray;
            }
        
        test("inital page is 1", function () {
            var totalItems = ko.observable(0);
            var serverPager = new ko.bindingHandlers.pagedForeach.ServerPager(serverfunction, totalItems);
            QUnit.equal(serverPager.page(), 1, "page");
        });
        test("inital itemsPerPage is 10", function () {
            var totalItems = ko.observable(0);
            var serverPager = new ko.bindingHandlers.pagedForeach.ServerPager(serverfunction, totalItems);
            QUnit.equal(serverPager.itemsPerPage(), 10, "itemsPerPage");
        });
        test("inital allowChangePageSize is false", function () {
            var totalItems = ko.observable(0);
            var serverPager = new ko.bindingHandlers.pagedForeach.ServerPager(serverfunction, totalItems);
            QUnit.equal(serverPager.allowChangePageSize(), false, "allowChangePageSize");
        });
        test("inital totalPages is 0", function () {
            var totalItems = ko.observable(0);
            var serverPager = new ko.bindingHandlers.pagedForeach.ServerPager(serverfunction, totalItems);
            QUnit.equal(serverPager.totalPages(), 0, "totalPages");
        });
        test("inital relativePages are empty", function () {
            var totalItems = ko.observable(0);
            var serverPager = new ko.bindingHandlers.pagedForeach.ServerPager(serverfunction, totalItems);
            QUnit.deepEqual(serverPager.relativePages(), [], "relativePages");
        });
        
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        module("paging view model - ServerPager");
        
        test("totalItems updates", function () {
            var totalItems = ko.observable(0);
            var serverPager = new ko.bindingHandlers.pagedForeach.ServerPager(serverfunction, totalItems);
            totalItems(100);
            QUnit.equal(serverPager.totalPages(), 10, "totalPages");
        });
        test("server page method is called", function () {
            var totalItems = ko.observable(0);
            var serverPager = new ko.bindingHandlers.pagedForeach.ServerPager(serverfunction, totalItems);
            totalItems(100);
            serverPager.page(2);
            QUnit.deepEqual(serverPager.pagedItems(), [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], "getPageMethod");
        });
        test("correct itemsPerPage is passed to page method", function () {
            expect(2);
            var totalItems = ko.observable(0);
            var serverPager = new ko.bindingHandlers.pagedForeach.ServerPager(serverfunction, totalItems);
            totalItems(100);
            serverPager.itemsPerPage(5);
            QUnit.deepEqual(serverPager.pagedItems(), [0, 1, 2, 3, 4], "getPageMethod");
            serverPager.itemsPerPage(10);
            QUnit.deepEqual(serverPager.pagedItems(), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "getPageMethod");
        });
        test("pager calculates relativePages based on totalItems", function(){
            expect(2);
            var totalItems = ko.observable(0);
            var serverPager = new ko.bindingHandlers.pagedForeach.ServerPager(serverfunction, totalItems);
            serverPager.itemsPerPage(10);
            totalItems(100);
            QUnit.deepEqual(serverPager.relativePages(), [1, 2, 3, 4, 5], "relativePages");
            totalItems(20);
            QUnit.deepEqual(serverPager.relativePages(), [1, 2], "relativePages");
        });
        
        
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        module("pagingForeach binding - observableArray");
        
        var array = [], array2 = [], array3 = [], array6 = [];
        for(var c=1;c<1000;c++){
            array.push( { key: 'key_1_' + c, value: 'value ' + c } );
            array2.push( { key: 'key_2_' + c, value: 'value ' + c } );
            array3.push( { key: 'key_3_' + c, value: 'value ' + c } );
            array6.push( { key: 'key_6_' + c, value: 'value ' + c } );
        }
        var viewModel = { 
            observableArray: ko.observableArray(array),
            pageSize: ko.observable(25)
        };
        ko.applyBindings(viewModel, $('#testBinding')[0]);
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        module("pagingForeach binding - static array");
        var viewModel2 = {
            array: array2,
            pageSize: ko.observable(10)
        };
        ko.applyBindings(viewModel2, $('#testBinding2')[0]);
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        module("pagingForeach binding - static pageSize");
        var viewModel3 = {
            observableArray: ko.observableArray(array3),
            pageSize: 25
        };
        ko.applyBindings(viewModel3, $('#testBinding3')[0]);
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        module("pagingForeach binding - serverMethod");
        
        var viewModel4 = { 
            serverMethod: function (itemsPerPage, page){
                var indexOfFirstItemOnCurrentPage = ((page - 1) * itemsPerPage);
                var pageArray = [];
                for(var c = indexOfFirstItemOnCurrentPage; c < indexOfFirstItemOnCurrentPage + itemsPerPage; c++) {
                    pageArray.push( { key: 'key_4_' + c, value: 'value ' + c } );
                }
                return pageArray;
            },
            totalItems: ko.observable(100),
            pageSize: ko.observable(25)
        };
        ko.applyBindings(viewModel4, $('#testBinding4')[0]);
        
        test("pageSize binding adds 25 rows", function () {
            viewModel4.serverMethod.pager.itemsPerPage(25);
            QUnit.equal($('#testBinding4').find('tbody').children('tr').length, 25, "pageSize");
        });
        test("user can still change page size", function () {
            viewModel4.serverMethod.pager.itemsPerPage(10);
            QUnit.equal($('#testBinding4').find('tbody').children('tr').length, 10, "pageSize");
        });
        
        
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        module("pagingForeach binding - serverMethod");
        
        var viewModel5 = { 
            currentItems: ko.observableArray(),
            totalItems: ko.observable(100),
            pageSize: ko.observable(10)
        };
        viewModel5.serverMethod = function (itemsPerPage, page){
                var indexOfFirstItemOnCurrentPage = ((page - 1) * itemsPerPage);
                var pageArray = [];
                for(var c = indexOfFirstItemOnCurrentPage; c < indexOfFirstItemOnCurrentPage + itemsPerPage; c++) {
                    pageArray.push( { key: 'key_5_' + c, value: 'value ' + c } );
                }
                viewModel5.currentItems(pageArray);
                return pageArray;
            };
        ko.applyBindings(viewModel5, $('#testBinding5')[0]);
        
        test("pageSize binding adds 25 rows", function () {
            viewModel5.serverMethod.pager.itemsPerPage(25);
            QUnit.equal($('#testBinding5').find('tbody').children('tr').length, 25, "pageSize");
        });
        test("user can still change page size", function () {
            viewModel5.serverMethod.pager.itemsPerPage(10);
            QUnit.equal($('#testBinding5').find('tbody').children('tr').length, 10, "pageSize");
        });
        
        
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        module("pagingForeach binding - All");
        
        var viewModel6 = { 
            observableArray: ko.observableArray(array6),
            pageSize: ko.observable(10)
        };
        ko.applyBindings(viewModel6, $('#testBinding6')[0]);
               
        test("pageSize binding adds All rows", function () {
            QUnit.equal($('#testBinding6').find('select').children('option').length, 5, "pageSize options");
            QUnit.equal($('#testBinding6').find('select').children('option').last().text(), 'All', "pageSize - All");
        });
        
        
        
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
        module("pagingForeach binding - All - serverMethod");
        
        var viewModel7 = { 
            currentItems: ko.observableArray(),
            totalItems: ko.observable(200),
            pageSize: ko.observable(10)
        };
        viewModel7.serverMethod = function (itemsPerPage, page){
                var indexOfFirstItemOnCurrentPage = ((page - 1) * itemsPerPage);
                var pageArray = [];
                for(var c = indexOfFirstItemOnCurrentPage; c < indexOfFirstItemOnCurrentPage + itemsPerPage; c++) {
                    pageArray.push( { key: 'key_7_' + c, value: 'value ' + c } );
                }
                viewModel7.currentItems(pageArray);
                return pageArray;
            };
        ko.applyBindings(viewModel7, $('#testBinding7')[0]);
        
        viewModel7.pageSize(10);
               
        test("pageSize binding adds All rows", function () {
            QUnit.equal($('#testBinding7').find('select').children('option').length, 5, "pageSize options");
            QUnit.equal($('#testBinding7').find('select').children('option').last().text(), 'All', "pageSize - All");
        });
        
        
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    });
}(jQuery, ko));

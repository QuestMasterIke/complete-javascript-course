// BUDGET CONTROLLER

var budgetController = (function () {



})();



// UI CONTROLLER 

var uiController = (function () {



})();



// GLOBAL APP CONTROLLER


var controller = (function (budgetCtrl,uiCtrl) {


    var ctrlAddItem = function()
    {
                // 1. get input of field
        // 2. Add item to budget controller
        // 3. add item to ui
        // 4. calc budget
        // 5. Display budget on UI
        console.log("Hello");
    };


    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem );

    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

})(budgetController,uiController);
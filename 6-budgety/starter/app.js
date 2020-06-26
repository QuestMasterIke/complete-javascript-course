// BUDGET CONTROLLER

var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.desciption = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.desciption = description;
        this.value = value;
    };


    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

})();



// UI CONTROLLER 

var uiController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn:'.add__btn'
    }


    return {
        getInput: function () {

            return {
                type: document.querySelector(DOMstrings.inputType).value, //will be exp or inc
                desciption: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDom: function () {
            return DOMstrings;
            

        }

    }

})();



// GLOBAL APP CONTROLLER


var controller = (function (budgetCtrl, uiCtrl) {

    var setupEventListeners = function () {
        var DOM = uiController.getDom();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

    }


    var ctrlAddItem = function()
    {
                // 1. get input of field
        var input = uiController.getInput();
        console.log(input);
        // 2. Add item to budget controller
        // 3. add item to ui
        // 4. calc budget
        // 5. Display budget on UI
    
    };

    return {
        init: function () {
            console.log("Hello - Budgetty started!");
            setupEventListeners();
        }
    };
  
})(budgetController, uiController);


controller.init();
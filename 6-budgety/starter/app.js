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

    return {
        addItem: function (type, des, val) {
            var newItem;

            //create new id 
            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }
          


            //create new item based on inc or exp type
            if (type === 'exp') {
                newItem = new Expense(id, des, val);
            }
            else if (type === 'inc') {
                newItem = new Income(id, des, val);
            }


            data.allItems[type].push(newItem);
            return newItem; 
         
        },


        testing: function () {
            console.log(data)
        }
    };

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

        var input;
        var newItem;
                // 1. get input of field
       input = uiController.getInput();
        console.log(input);
        // 2. Add item to budget controller
       newItem = budgetController.addItem(input.type,input.desciption,input.value); 
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
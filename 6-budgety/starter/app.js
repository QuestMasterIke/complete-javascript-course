// BUDGET CONTROLLER

var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
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
        },
        budget: 0,
        percentage: -1
    }

    var calcTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
            data.totals[type] = sum;
        })
    };

    return {
        addItem: function (type, des, val) {
            var newItem,id;

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
           // console.log(newItem);
            return newItem; 
         
        },



        calcBudget: function () {
            //calc total income and expenses
            calcTotal('exp');
            calcTotal('inc');

            //calc budget: incme minus expenses
            data.budget = data.totals.inc - data.totals.exp;
            if (data.totals.inc > 0) {
                //calc percentages
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        
        },

        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentages: data.percentage
            }
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
        inputBtn:'.add__btn',
        incomeContainer: '.income__list',
        excpenseContainer: '.expenses__list'
    }



    return {
        getInput: function () {

            return {
                type: document.querySelector(DOMstrings.inputType).value, //will be exp or inc
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function(obj,type){
            var html, newHtml, element;
            //1. HTML String with placeholder text
            if (type==='inc'){
                element=DOMstrings.incomeContainer;
                html= '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            }else if (type==='exp'){           
                element=DOMstrings.excpenseContainer;
                html= '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
            //2. replace placeholder
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //3. insert html into the dom
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);

        },

        clearFields: function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(cur, i, array){
                cur.value="";
            });

            fieldsArr[0].focus();
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
    
    var updateBudget =function(){

        //calc budget
        budgetController.calcBudget();

        //return budget
        var budget = budgetController.getBudget();

        //display budghet on ui
        console.log(budget);

    };

    var ctrlAddItem = function()
    {

        var input;
        var newItem;

                // 1. get input of field
       input = uiCtrl.getInput();
        //console.log(input);

        // 2. Add item to budget controller

         if(input.description !=="" && !isNaN(input.value) && input.value > 0 )
         {
            newItem = budgetCtrl.addItem(input.type,input.description,input.value); 

           // 3. add item to ui
            uiCtrl.addListItem(newItem,input.type);

           //cöear föleids
           uiCtrl.clearFields();


            // 4. calc budget and update budget
            updateBudget();

         }

       

    };

    return {
        init: function () {
            console.log("Hello - Budgetty started!");
            setupEventListeners();
        }
    };
  
})(budgetController, uiController);


controller.init();
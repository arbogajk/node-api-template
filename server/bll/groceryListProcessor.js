const _ = require('lodash');
///This likely needs to be more sophisticated about looking at measurements too, but works for now.
module.exports.processGroceryList = function (groceryList) {
    var groceryItemList = [];
    var processedList = [];
    if(groceryList) {
        groceryList.forEach( ing => 
            {
                var item = new groceryItem(ing.amount, ing.name, ing.measurement);
                groceryItemList.push(item);          
            });   
    }
    var uniqueIngredients = [...new Set(groceryItemList.map(item => item.name))];
    _.forEach(uniqueIngredients, (n) => {
        let temp = _.filter(groceryItemList, (i)=> i.name === n);
        let sum = 0;
        _.forEach(temp, (i) => {
            sum += i.amount;
        })
        let groceryItem = _.first(temp);
        groceryItem.amount = sum;
        processedList.push(groceryItem);
    });
    
    return processedList;
}

var groceryItem = function(amount, name, measurement) {
        this.amount = amount;
        this.name = name;
        this.measurement = measurement;
};
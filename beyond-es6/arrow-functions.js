var controller = {
    makeRequest: function () {
        btn.addEventListeners("click", () => {
            this.makeRequest(); // this points to the 'this keyword of the enclosing function'
        });
    }
};

var controller = {
    makeRequest: () => {
        this.helper(); // This reference here fails because 'this' points to the global scope because that is the enclosing function/file of the arrow function
    },

    helper: () => { }
};

// ? Have a lexical 'this' meaning it inherits 'this' from the parent lexical scope
// ? Have lexical 'arguments' 
// ? Have lexical 'super'
// ? Have lexical 'new.target'


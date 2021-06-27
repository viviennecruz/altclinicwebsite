// Function to verify that the phone number is correct.
// Here, I validate for (12345), but you have to change that for a phone validation
// Tutorials on Regular expressions
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
// https://flaviocopes.com/javascript-regular-expressions/
// Regular expressions can get complex, you can think in terms of a series of characters
// or numbers
function validatePhone(txtPhone) {
    var a = document.getElementById(txtPhone).value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits
    var filter = /^(\([-+]?[0-9]+)\)$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}

function validateCreditCard(ccard) {
    var a = document.getElementById(ccard).value;
    var filter = /^\d{16}$/;
    if (filter.test(a)) {
        return true;
    } else {
        return false;
    }
}

function validateCvv(cvv) {
    var a = document.getElementById(cvv).value;
    var filter = /^\d{3}$/;
    if (filter.test(a)) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    var a = document.getElementById(email).value;
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (filter.test(a)) {
        return true;
    } else {
        return false;
    }
}

// Using date restrictions on datepicker
// Document of datepicker is here: https://api.jqueryui.com/datepicker/
// The following code shows how to set specific dates to exclude, as well as Sundays (Day 0)
// Make sure in your version that you associate Days to remove with Experts (e.g. John doesn't work Mondays)
var doctorChosen;
var unavailableDates;
const setDateFormat = "mm/dd/yy";

function disableDates(date) {
    // Sunday is Day 0, disable all Sundays
    if (date.getDay() === 0)
        return [false];
    var string = jQuery.datepicker.formatDate(setDateFormat, date);
    return [ unavailableDates.indexOf(string) === -1 ]
}


// HERE, JQuery "LISTENING" starts
$(document).ready(function(){

    // phone validation, it calls validatePhone
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the phone input
    // The "error" class in style.css defines yellow background and red foreground
    $("#phone").on("change", function(){
        if (!validatePhone("phone")){
            alert("Wrong format for phone. Please enter a phone number enclosed within brackets.");
            $("#phone").val("(xxxx)");
            $("#phone").addClass("error");
        }
        else {
            $("#phone").removeClass("error");
        }
    });

    $("#debit").on("change", function(){
        if (!validateCreditCard("debit")){
            alert("Wrong format for card number. Please enter a 16 digit card number (no spaces).");
            $("#debit").val("xxxxxxxxxxxx");
            $("#debit").addClass("error");
        }
        else {
            $("#debit").removeClass("error");
        }
    });

    $("#cvv").on("change", function(){
        if (!validateCvv("cvv")){
            alert("Wrong format for cvv. Please enter a 3 digit cvv number (found on the back of your credit card).");
            $("#cvv").val("xxx");
            $("#cvv").addClass("error");
        }
        else {
            $("#cvv").removeClass("error");
        }
    });

    $("#email").on("change", function(){
        if (!validateEmail("email")){
            alert("Wrong format for email. Please enter an email address with the following format: name@email.com");
            $("#email").val("name@email.com");
            $("#email").addClass("error");
        }
        else {
            $("#email").removeClass("error");
        }
    });

    $("#selectExpert").on("change", function(){
        if(this.value == "cruz") {
            unavailableDates = ["06/3/2021","06/10/2021","06/17/2021","06/24/2021", "07/1/2021", "07/8/2021"];
            doctorChosen = "Dr. Vivienne Cruz";
        } else if (this.value == "yee") {
            unavailableDates = ["06/4/2021","06/11/2021","06/18/2021","06/25/2021", "07/2/2021", "07/9/2021"];
            doctorChosen = "Dr. Vivianne Yee";
        } else if (this.value == "loodu"){
            unavailableDates = ["06/2/2021","06/9/2021","06/16/2021","06/23/2021", "06/30/2021", "07/7/2021"];
            doctorChosen = "Dr. Taj Loodu";
        }
    });

    // $("selectExpert").on("click", function(){
        if($("#selectExpert").val() == "cruz") {
            unavailableDates = ["06/3/2021","06/10/2021","06/17/2021","06/24/2021", "07/1/2021", "07/8/2021"];
            doctorChosen = "Dr. Vivienne Cruz";
        } 
        // if ($("#selectExpert").val() == "yee") {
        //     unavailableDates = ["06/4/2021","06/11/2021","06/18/2021","06/25/2021", "07/2/2021", "07/9/2021"];
        //     console.log("yee");
        // } 
        // if ($("#selectExpert").val() == "loodu"){
        //     unavailableDates = ["06/2/2021","06/9/2021","06/16/2021","06/23/2021", "06/30/2021", "07/7/2021"];
        //     console.log("taj");
        // }
    // });
    function greet( event ) {
        alert(event.data.name + "check your email for a confirmation email.");
      }
      $( "#apptsubmit" ).on( "click", {
        name: "Your appointment with " + doctorChosen + " on " + $( "#dateInput" ).val() + " has been successfully booked, "
      }, greet );
      $( "#qasubmit" ).on( "click", {
        name: "Your inquiry has been successfully sent, "
      }, greet );
    // To change the style of the calender, look in jqueryui.com, under Themes, in the ThemeRoller Gallery
    // You can try different themes (the names are under the calendars) / This is Excite Bike
    // To use a different theme you must include its css in your HTML file.
    // The one I included in my HTML is the Excite Bike, but you can try others

    // Also, here is a good tutorial for playing with the datepicker in https://webkul.com/blog/jquery-datepicker/
    // Datepicker is also documented as one of the widgets here: https://api.jqueryui.com/category/widgets/
    $( "#dateInput" ).datepicker(
        {
            dateFormat: setDateFormat,
            // no calendar before June 1rst 2021
            minDate: new Date('06/01/2021'),
            maxDate: '+4M',
            // used to disable some dates
            beforeShowDay: disableDates
        }
    );


    // Look at the different events on which an action can be performed
    // https://www.w3schools.com/jquery/jquery_events.asp
    // Here, we put
    $("#debit").on("mouseenter", function(){
        $("#debit").addClass("showInput");
    });

    $("#debit").on("mouseleave", function(){
        $("#debit").removeClass("showInput");
    });

    $("#paymentinfo").on("mouseenter", function(){
        $("#paymentinfo").addClass("showInput");
    });

    $("#paymentinfo").on("mouseleave", function(){
        $("#paymentinfo").removeClass("showInput");
    });

    // https://jqueryui.com/tooltip/
    // The class "highlight" used here is predefined in JQuery UI
    // the message of the tooltip is encoded in the input (in the HTML file)
    $("#paymentinfo").tooltip({
        classes: {
            "ui-tooltip": "highlight"
        }
    });


});
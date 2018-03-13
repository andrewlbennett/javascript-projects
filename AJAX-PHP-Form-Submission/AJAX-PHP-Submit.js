/*
	A base for AJAX form submission.
	jQuery required
	This is only checking if the verify is true on the server end to help protect against spambots.
*/

$(document).ready(function () {
	$('form').submit(function(event) {
		// Clear any previous errors
		$('.help-block').remove();
		// Form Data
		var formData = {
		  	'name'   	: $('input[name=name]').val(),
		  	'email'    	: $('input[name=email]').val(),
		  	'msg'       : $('textarea[name=msg]').val(),
		  	'verify'    : $('input[name=verify]').val()
		};
		// Handle Post data
		$.ajax({
		  	type: 'POST',
		  	url: './js/form-process.php',
		  	data: formData, // Great for simple object posting
		  	dataType: 'json',
		  	encode: true
		})
		.done(function(data) {
	        console.log(data);
	        // Error Handling
	        if (!data.success) { //If data.success = false
	        	// Show errors in the html however you like
	        	// You can pull the error information from the JSON object that got passed back by the server.
	        	// Show spambot verification error
	        	if(data.errors.verify) {
	        		// Do something
	        	}
	        } else {
	        	// Show form success message
	        	alert(data.successMsg)
	        }
	    });
	    // Prevent page reload
	    event.preventDefault();
    });
});



// ******** //
//	PHP
// ******** //
// PHP will recieve a JSON Object.
// You can the values by assigning them variables in the php file. Example: $name = "name";
// Run the values through additional cleaning and verification if needed.
// Have the PHP file pass back 
<?php
	
	$errors = array(''); // Array to hold validation errors
	$data = array(''); // Array to hold success data

	$name 	= trim(filter_input(INPUT_POST, "name", FILTER_SANITIZE_STRING));
	$email 	= trim(filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL));
	$msg 	= trim(filter_input(INPUT_POST, "msg", FILTER_SANITIZE_FULL_SPECIAL_CHARS));

	// Spam Check
	if ($_POST["verify"] != "") {
		$errors['verify'] = 'Spambot Detected!';
	}

	// Check if their are errors in the error array
	if (!empty($errors)) {

        $data['success'] = false; // {data: {success: false}}
        $data['errors']  = $errors; // {data: {errors: {verify:"Spambot Detected"}}}
    
    } else {

    	// **
        // DO all your form processing here and return a success message to the front-end.
        // **
        
        $data['success'] = true; // {data: {success: true}}
        $data['successMsg'] = 'Form Submitted Successfully'; // {data: {successMsg: 'Form Submitted Successfully'}}
    }

    // Send back a json object to the form-process.js file with success and error information
	echo json_encode($data);

?>
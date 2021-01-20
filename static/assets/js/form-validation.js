// Wait for the DOM to be ready
$(function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("form[name='registration']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      first_name: "required",
      email: {
        required: true,
        // Specify that email should be validated
        // by the built-in "email" rule
        email: true
      },
      password1: {
        required: true,
        minlength: 6
      },
      password2: {
        required: true,
        minlength: 6,
        equalTo: "#password"
      },
      hear_about_dia:{
        required: true,
          
      }
    },
    // Specify validation error messages
    messages: {
      first_name: "Please enter your first name",
      password1: {
        required: "Please provide a password",
        minlength: "Your password must be at least 6 characters long"
      },
      password2: {
        required: "Please provide a confirm password",
        minlength: "Your password must be at least 6 characters long",
        equalTo: "Enter the same password as above"
      },
      email: "Please enter a valid email address", 
      hear_about_dia: "Please select at least one choice",
    },

    errorPlacement: function(error, element){
          if(element.attr('name') == 'hear_about_dia'){
            console.log('x')
            element.closest('div').append(error);
          } else {
            console.log('y')
            error.insertAfter(element);
          }
        },

    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });
});
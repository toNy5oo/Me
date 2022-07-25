// Init service
(function initEmailService() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init('5kw9qgz7s0v3j2W16');
})();

const MESSAGE_SUCCESS = "Your message has been sent. A trained pigeon will deliver it soon. I'll do my best to answer as soon as I'll have fed my fellow bird."
const MESSAGE_FAILURE = "There was a problem. Please try again to send a message. If the error persist, please consider sending a message using social media."

$(document).ready(function() {
    //Hide the success message
    $('#success').hide()

    function resetForm() {
        $('#send_button').text('Send')
        $('#form_message').text('')
    }

    function showLoadingSpinner() {
        const htmlSpinner = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true">'
        $('#send_button').html(htmlSpinner)
    }

    function toggleFormSections(msg) {

        $('#message_status').text(msg)

        $('#contact').fadeOut(250, function() {
            $('#success').fadeIn(250)
        })
        $('#new_message').click(function(e) {
            e.preventDefault();
            resetForm();
            $('#success').fadeOut(250, function() {
                $('#contact').fadeIn(250)
            })
        })
    }

    window.onload = function() {
        $('#contact-form').submit(function(event) {
            event.preventDefault();
            showLoadingSpinner();
            // generate a five digit number for the contact_number variable
            this.contact_number.value = Math.random() * 100000 | 0;
            // these IDs from the previous steps
            emailjs.sendForm('contact_service', 'contact_form', this)
                .then(function() {
                    toggleFormSections(MESSAGE_SUCCESS);
                }, function(error) {
                    toggleFormSections(MESSAGE_FAILURE);
                });
        });
    }
});
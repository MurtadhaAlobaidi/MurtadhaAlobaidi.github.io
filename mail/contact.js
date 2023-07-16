$(document).ready(function () {
    const contactForm = $("#contactForm");
    const formFields = $('#name, #email, #subject, #message');
    const successMessage = $('#success');

    $("a[data-toggle=\"tab\"]").click(handleTabClick);
    formFields.focus(clearValidationAndSuccessMessages);

    contactForm.on("submit", handleSubmit);

    function handleTabClick(e) {
        e.preventDefault();
        $(this).tab("show");
    }

    function clearValidationAndSuccessMessages() {
        successMessage.empty();
        $(this).next('.help-block').text('');
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (isFormValid()) {
            submitForm();
        }
    }

    function isFormValid() {
        let isValid = true;
        formFields.each(function () {
            if ($(this).val() === '') {
                isValid = false;
                $(this).next('.help-block').text('This field is required.');
            } else {
                $(this).next('.help-block').text('');
            }
        });
        return isValid;
    }

    function submitForm() {
        $.ajax({
            url: contactForm.attr('action'),
            method: contactForm.attr('method'),
            data: contactForm.serialize(),
            dataType: "json"
        })
            .done(handleFormSuccess)
            .fail(handleFormFailure);
    }

    function handleFormSuccess(response) {
        successMessage.html('<div class="alert alert-success">Your message has been sent!</div>');
        contactForm[0].reset();
    }

    function handleFormFailure() {
        successMessage.html('<div class="alert alert-danger">An error occurred. Please try again later.</div>');
    }
});

$(function () {
    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });

    $('#name').focus(function () {
        $('#success').html('');
    });

    // when the form is submitted
    $("#contactForm").on("submit", function (event) {
        // prevent the form from being submitted
        event.preventDefault();

        // perform form validation
        let isValid = true;
        $('#name, #email, #subject, #message').each(function () {
            if ($(this).val() === '') {
                isValid = false;
                $(this).next('.help-block').text('This field is required.');
            } else {
                $(this).next('.help-block').text('');
            }
        });

        // if the form is valid
        if (isValid) {
            // submit the form
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize(),
                dataType: "json"
            })
                .done(function (response) {
                    // if submission is successful
                    $('#success').html('<div class="alert alert-success">Your message has been sent!</div>');
                    window.location.replace("https://murtadhaalobaidi.github.io");
                })
                .fail(function () {
                    // if submission fails
                    $('#success').html('<div class="alert alert-danger">An error occurred. Please try again later.</div>');
                });
        }
    });

    $('#name, #email, #subject, #message').focus(function () {
        $('#success').html('');
        $(this).next('.help-block').text('');
    });
});

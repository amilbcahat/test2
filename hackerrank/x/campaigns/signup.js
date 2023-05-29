function checkForValidationErrors (data) {
  if (data.errors) {
    for (key in data.errors) {
      value = data.errors[key];
      if (value !== "Success") {
        $('span.validation_error[data-field=' + key + ']').html(data.errors[key]).removeClass('hidden');
      } else {
        $('span.validation_error[data-field=' + key + ']').html("").addClass('hidden');
      }
    }
  }
};

$(document).ready(function() {
  $("form[name=signup-form]").submit(function(e) {
    e.preventDefault();
    $("div.alert").addClass('hidden');

    $form = $(this);

    if( $form.find('input[name=full_name]').length > 0) {
      full_name = $form.find('input[name=full_name]').val();
      first_name = full_name.split(" ")[0];
      last_name = full_name.replace(first_name, "").trim();
    } else {
      first_name = $form.find('input[name=first_name]').val();
      last_name = $form.find('input[name=last_name]').val();
    }

    signup_data = {
      first_name: first_name,
      last_name: last_name,
      email: $("input[name=email]").val(),
      password: $('input[name=password]').val(),
      company: $('input[name=company]').val(),
      phone: $('input[name=phone]').val(),
      role: $('select[name=role]').val(),
      campaign: $('body').attr('id'),
      timezone: jstz.determine_timezone().timezone.olson_tz
    };

    $(".signup-msg").html("Checking Signup ...").removeClass('hidden');

    $.post('/x/signup/',signup_data,
    function (data) {
      $(".signup-msg").addClass('hidden');
      checkForValidationErrors(data);
      if (data.status == true) {
          $(".signup-msg").html("Signup Successful. Redirecting to dashboard").removeClass('hidden');

          //mixpanel track and on success redirect to internal page.
          if (typeof mixpanel != "undefined") {
            mixpanel.push(['track', 'Signed up', {
              'Name' : signup_data['first_name'] + " " + signup_data['last_name'],
              'Email': signup_data['email'],
              'Company': signup_data['company'],
              'Source': "Campaign Page",
              'Campaign': $('body').attr('id')
            }, function() {
              window.location.href = "/x/tests";
            }]);
          }

          // if the tracking failed for some reason, or took too long, redirect.
          setTimeout(function () {
            window.location.href = "/x/tests"
          }, 6000);
      }
    });
  });
});
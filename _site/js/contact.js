$(document).foundation({
  abide : {
    patterns: {
      phone: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    }
  }
});

var $contact  = $('#contact-form'),
    $message  = $('.contact-message'),
    $submit   = $contact.find('button[type="submit"]'),
    messageTimer;

$contact.on('valid.fndtn.abide', function (e) {
  if(e.namespace != 'abide.fndtn') {
    return;
  }

  $submit.attr('disabled', true);

  $.ajax({
    dataType: 'jsonp',
    url: "http://getsimpleform.com/messages/ajax?form_api_token=aaede9209746a6f2b1b9b9325f7d468c",
    data: $contact.serialize()
  }).done(function() {
    $message.text('Your message has been submitted.').removeClass('negative-message').addClass('positive-message').show();
    $contact[0].reset();

    if(messageTimer) clearTimeout(messageTimer);
      messageTimer = setTimeout(function(){
      $message.hide();
    }, 5000);
  }).always(function(){
    $submit.attr('disabled', false);
  }).fail(function(jqXHR, textStatus){
    if(messageTimer) clearTimeout(messageTimer);
    $message.text('An error has occurred ['+textStatus+'].').removeClass('positive-message').addClass('negative-message').show();
  });
});

$contact.on('focus', 'input, textarea', function(){
  if(messageTimer) clearTimeout(messageTimer);
  $message.hide();
});

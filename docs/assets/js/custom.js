// Track premium feature requested
$('.modal-activator').click(function () {
  $('input#mce-FEATURE').val($(this).data('feature'));
});

// Fill in a sample
$('#view-sample').click(function () {
  $('form#email-options input[name="header[title]"]').val('Tech Crunch Newsletter');
  $('form#email-options input[name="feeds[][url]"]').val('http://feeds.feedburner.com/TechCrunch/');
  $('form#email-options input[name="accentColor"]').val('#00a562');
  $('form#email-options input[name="header[banner]"]').val('https://i.imgur.com/Zpr0Gyf.png');
  $('form#email-options input[name="header[link]"]').val('https://techcrunch.com/');
  $('form#email-options').submit();

  return false;
});

// Handle form submission
var baseUrl = 'https://rss-to-email.karllhughes.now.sh';
$('form#email-options').submit(function () {
  $('#alert-dialog').hide();
  // Get the form data
  var formData = formToObject('email-options');
  formData.feeds = Object.values(formData.feeds);
  // Merge it with default data
  var data = getDefaultData();
  $.extend(data, formData);

  // Show loading indicators
  $('#preview-b1 h1').html('<i class="fa fa-spin fa-spinner"></i>');
  $('#html-b1 h1').html('<i class="fa fa-spin fa-spinner"></i>');
  $('#submit-options-form').prop('disabled', true);

  $.ajax(baseUrl, {
    data : JSON.stringify(data),
    dataType: 'html',
    contentType : 'application/json',
    type : 'POST',
    success: function (response) {
      $('#preview-b1').html(response);
      response = $('<div/>').text(response).html();
      $('#html-b1').html('<pre><code>' + response + '</code></pre>');
    },
    error: function () {
      $('#alert-dialog').text('Something went wrong. Please refresh the page and try again.');
      $('#alert-dialog').show();
    },
    complete: function () {
      $('#submit-options-form').prop('disabled', false);
    },
  });

  return false;
});

function getDefaultData() {
  return {
    "accentColor": "#333333",
    "header": {
      "banner": "",
      "link": "https://email.pcto.co/",
      "title": "",
    },
    "intro": "",
    "feeds": [
      {
        "description": "",
        "title": "",
        "url": "",
      },
    ],
    "outro": "",
    "format": "html",
  };
}

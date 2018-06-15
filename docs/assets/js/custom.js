// Track premium feature requested
$('.modal-activator').click(function () {
  $('input#mce-FEATURE').val($(this).data('feature'));
});

// Handle form submission
var baseUrl = 'https://wt-972cd1bf439680cd8845b3d13ca8326e-0.sandbox.auth0-extend.com/rss-to-email-webtask';
$('form#email-options').submit(function () {
  // Get the form data
  var formData = formToObject('email-options');
  formData.feeds = Object.values(formData.feeds);

  // Get default data
  var data = getDefaultData();

  $.extend(data, formData);

  console.log(data);

  $.ajax(baseUrl, {
    data : JSON.stringify(data),
    dataType: 'html',
    contentType : 'application/json',
    type : 'POST',
    success: function (response) {
      console.log(response);
      $('#preview-b1').html(response);
      response = $('<div/>').text(response).html();
      $('#html-b1').html('<pre><code>' + response + '</code></pre>');
    }
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
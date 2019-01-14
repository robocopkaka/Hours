/* global Pikaday, Tagger, TagExpander */

//= require jquery
//= require jquery_ujs
//= require jquery.atwho
//= require moment
//= require pikaday
//= require chartjs
//= require select2
//= require i18n
//= require billables
//= require date-formatter
//= require feed
//= require_tree .


var Hours = Hours || {
  dismissModal: function() {
    $('.modal-state').attr('checked', false);
  }
};

function setLanguage() {
  if (I18n[$('body').data('language')] === undefined) {
    return I18n['en'];
  } else {
    return I18n[$('body').data('language')];
  }
};

$('.datepicker').each(function () {
  var language = setLanguage();
  new Pikaday({
    field: this,
    format: language.date.format
  });
});

$('.alert').ready(function() {
  setTimeout(function() {
    $('#flash').fadeOut();
  }, 5000);
});

$(document).ready(function() {
  $('.submit-button').prop('disabled', true);
  $('#content').keyup(function() {
    $('.submit-button').prop('disabled', $(this).val() === '');
  });

  $('.modal-window').on('click', Hours.dismissModal).
    on('click', 'div', function(e) { e.stopPropagation();
  });

  $('#hour_project_id').select2();
  $('#hour_category_id').select2();
  $('#mileage_project_id').select2();
  $('#project_client_id').select2();

  if ($('body').hasClass('projects-index')) {
    new Tagger($('.taggable'));
  }

  if ($('.tags-list').length > 0) {
    new TagExpander();
  }

  $('#hour_description').atwho({
    at: '#',
    data: $('#hour_description').data('data')
  });

  $('.modal-window')
    .on('click', Hours.dismissModal)
    .on('click', 'div', function(e) { e.stopPropagation(); });
});

$(document).keyup(function(event) {
  var ESCAPE_KEY = 27;

  if (event.keyCode === ESCAPE_KEY) {
    Hours.dismissModal();
  }
});

$(".project_billable > checkbox").ready(function () {
  enableBillableCheckbox();
});

$("#project_client_id").change(function () {
  enableBillableCheckbox();
});

var enableBillableCheckbox = function () {
  var disable = $("#project_client_id").val() === "";
  $("#project_billable").prop("disabled", disable);
}

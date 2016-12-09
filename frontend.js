$('document').ready(function() {
  var API_URL = 'http://127.0.0.1:8000/api/students/'

  var fetch_students = function() {
    $.getJSON(API_URL, function(data) {
      refresh_students(data);
    });
  };

  var refresh_students = function(students) {
    var table = '<table class="table">';
    table += '<th>Name</th><th>Grades</th>';
    students.forEach(function(e) {
      table += '<tr>';
      table += '<td>' + e.name + '</td>';
      var grades = e.grades.toString().replace(/\,/g, ', ');
      table += '<td>' + grades + '</td>';
      table += '</tr>';
    });
    table += '</table>';
    console.log(table);
    $('#students').html(table);
  };

  // first time call
  fetch_students();

  $('#insert').click(function() {
    var name = $('#name').val();
    var grades_string = $('#grades').val();
    grades_string = grades_string.replace(/\,/g, ' ');
    var grades_list = grades_string.split(' ');
    var grades = []
    grades_list.forEach(function(e) {
      x = parseInt(e)
      if (!isNaN(x)) {
        grades.push(x);
      }
    });
    var data = {'name': name, 'grades': grades};
    console.log(data);
    $.post({
      'url': API_URL,
      'data': JSON.stringify(data),
      'dataType': 'json',
      'success': function(data) {
        if (data.status == 'student inserted') {
          fetch_students();
        }
      }
    });
  });

  $('#refresh').click(function() {
    fetch_students();
  });
});

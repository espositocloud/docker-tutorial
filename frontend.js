$('document').ready(function() {
  var API_URL = '/api/students/'

  var round = function(x) {
    return Math.round(x * 100) / 100;
  }

  var average = function(grades) {
    sum = grades.reduce(function(y, x) {
      return y + x;
    })
    return sum / grades.length;
  }

  var fetch_students = function() {
    $.getJSON(API_URL, function(data) {
      refresh_students(data);
    });
  };

  var refresh_students = function(students) {
    var table = '<table class="table">';
    table += '<th>Name</th><th>Grades</th><th>Average</th>';
    students.forEach(function(e) {
      table += '<tr>';
      table += '<td>' + e.name + '</td>';
      var grades = e.grades.toString().replace(/\,/g, ', ');
      table += '<td>' + grades + '</td>';
      // get and round the avg
      var avg = round(average(e.grades)).toString();
      table += '<td>' + avg + '</td>';
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

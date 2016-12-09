import json
from flask import Flask, request, render_template
from pymongo import MongoClient

app = Flask(__name__)

db = MongoClient('db')


@app.route('/')
def root():
    # ugly static file serving :-)
    with open('index.html', 'r') as f:
        return f.read()

@app.route('/frontend.js')
def js():
    # ugly static file serving :-)
    with open('frontend.js', 'r') as f:
        return f.read()


@app.route('/api/students/', methods=['POST', 'GET'])
def student():
    if request.method == 'POST':
        # get the json
        student = request.get_json(force=True)

        # check data
        if not 'name' in student.keys():
            return json.dumps({
                'status': 'error: student must have a name'
            }), 400
        elif not 'grades' in student.keys():
            return json.dumps({
                'status': 'error: student must have grades'
            }), 400

        # insert in db
        students = db.app.students
        students.insert_one(student)

        return json.dumps({'status': 'student inserted'})
    else:
        # return the students in db
        students = []
        for s in db.app.students.find():
            students.append({'name': s['name'], 'grades': s['grades']})
        return json.dumps(students)


app.run(host='0.0.0.0', port=8000)

# Eric "Morty" Lau
# SoftDev1 pd1
# K11 -- Ay Mon Go Git It From Yer Flask
# 2020-03-17

from flask import Flask, render_template, request
import flask
from os import urandom
from utl import db_init, my_mongo

app = Flask(__name__)
app.secret_key = urandom(32)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/results', methods = ['GET', 'POST'])
def results():
	if request.method == 'GET':
		return flask.redirect(flask.url_for('index'))
	elif request.method == 'POST':
		data = [request.form['parameter'], request.form['value']]
		if 'RG' in data[0]:
			data[0] = data[0][3:]
			print(f'Querying regents dataset for {data[0]}, with value {data[1]}')
			#query regents dataset
			data = my_mongo.grad_find({data[0]: data[1]})
		elif 'JP' in data[0]:
			data[0] = data[0][3:]
			print(f'Querying jeopardy questions dataset for {data[0]}, with value {data[1]}')
			# query jeapordy dataset
			if data[0] == "value":
				data = my_mongo.quiz_find({data[0]: f"${data[1]}"})
			else:
				data = my_mongo.quiz_find({data[0]: data[1]})
		return render_template('results.html', data=data)

application = app
if __name__ == '__main__':
			db_init.insert_jeopardy()
			db_init.insert_grad_results()
			app.run(debug=True)
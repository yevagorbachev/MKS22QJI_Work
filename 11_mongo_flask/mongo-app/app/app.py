#Yevgeniy Gorbachev
#SoftDev1 pd1
#K<n> -- <K<n>.__name__>
#ISO 8601 Date

from flask import Flask, render_template, request
import flask
from os import urandom
# from utils.mongo import query


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
		elif 'JP' in data[0]:
			data[0] = data[0][3:]
			print(f'Querying jeapordy questions dataset for {data[0]}, with value {data[1]}')
			# query jeapordy dataset
		return render_template('results.html', data=data)

application = app
if __name__ == '__main__':
	app.run(debug=True)

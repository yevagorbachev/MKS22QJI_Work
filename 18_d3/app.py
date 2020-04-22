#Yevgeniy Gorbachev
#SoftDev1 pd1
#K<n> -- <K<n>.__name__>
#ISO 8601 Date

from flask import *
from os import urandom


app = Flask(__name__)
app.secret_key = urandom(32)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
	files = {
		'dataset1':'data/CAERS_ASCII_2004_2017Q2.csv' # REPLACE WHEN IN USE
	}
	try:
		return send_from_directory('csv', files[request.args['file']])
	except KeyError:
		abort(404)

application = app
if __name__ == '__main__':
    app.run()

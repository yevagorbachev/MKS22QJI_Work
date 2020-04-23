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
		'dataset1':'data/data.csv'
	}
	try:
		return send_file(files[request.args['file']], attachment_filename='dataset1.csv')
	except KeyError as kerr:
		print(kerr)
		abort(404)

application = app
if __name__ == '__main__':
    app.run(debug=True)

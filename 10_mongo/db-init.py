import json
import sys
from pprint import pprint
from pymongo import MongoClient



client = MongoClient('localhost', 27017)  # default mongo port is 27017
schools = client['schools'].collection

def generate_json(csvpath, outpath):
    '''uses the given csv file path to generate corresponding json'''
    from csv import DictReader
    
    with open(csvpath, 'r') as csvfile:
        reader = DictReader(csvfile)
        lines = [line for line in reader]

    with open(outpath,'w') as outfile:
        outfile.write(json.dumps(lines))

def insert_db(jsonpath):
    '''inserts contents of jsonpath into db.schools.collection'''
    from bson.json_util import loads as bson_loads
    
    with open(jsonpath, 'r') as datafile:
        data = json.loads(datafile.read())
    schools.drop()
    for record in data:
        # data is a dict - must be re-strung, then inserted as bson
        result = schools.insert_one(bson_loads(json.dumps(record)))
                                    
def main(argv = None):
    if not argv:
        argv = sys.argv
    if len(argv) == 1:
        print('Usage: \n\t-g: generates json from \"grad.csv\"\n\t-i: inserts contents of \"grad_results.json\" into local mongo')
        return
    
    flags = argv[1]
    if 'g' in flags:
        generate_json('grad.csv', 'grad_results.json')
    if 'i' in flags:
        insert_db('grad_results.json')
    
main()

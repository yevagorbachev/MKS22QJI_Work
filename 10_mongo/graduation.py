import json
import csv
from pprint import pprint
from pymongo import MongoClient
from bson.json_util import loads

def generate_json(csvpath, outpath):
    with open(csvpath, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        lines = [line for line in reader]

    with open(outpath,'w') as outfile:
        outfile.write(json.dumps(lines))

# generate_json('grad.csv','grad_results.json')

def insert_db():
    db = client['schools']
    client = MongoClient('localhost', 27017)  # default mongo port is 27017
    schools = db['schools-collection']
    # schools.insert_many(json.loads(data))
    with open('grad_results.json', 'r') as data:
        one = data.readline()
        while one:
            print(one)
            schools.insert_one(loads(data))
            one = data.readline()

insert_db()
# client = MongoClient()
# db = client.schools
# db.data.drop()
# data=db.data
# file = open("grad_results.json", "r")
# doc = file.readlines()
# for line in doc:
#     data.insert_one(loads(line))

# {
#     "address": {
#         "building": "1007",
#         "coord": [-73.856077, 40.848447],
#         "street": "Morris Park Ave",
#         "zipcode": "10462"
#                 },
#     "borough": "Bronx",
#     "cuisine": "Bakery",
#     "grades": [{"date":
#                     {"$date": 1393804800000},
#                     "grade": "A",
#                     "score": 2},
#                {"date":
#                     {"$date": 1378857600000},
#                     "grade": "A",
#                     "score": 6},
#                 ],
#      "name": "Morris Park Bake Shop",
#      "restaurant_id": "30075445"
# }
#
# {
#     "Cohort Year": "2001",
#     "Cohort Category": "4 Year  June",
#     "Demographic": "English Language Learner",
#     "# Total Cohort": "10540",
#     "# Total Grads": "2791",
#     "% of cohort Total Grads": "26.5",
#     "# of cohort Total Grads": "992",
#     "% of cohort Total Regents": "9",
#     "% of grads  Total Regents": "35.5",
#     "# of grads  Total Regents": "315",
#     "% of cohort  Advanced Regents": "3",
#     "% of grads  Advanced Regents": "11.3",
#     "# of grads  Advanced Regents": "677",
#     "% of cohort  Regents w/o Advanced": "6.4",
#     "% of grads  Regents w/o Advanced": "24.3",
#     "# of grads  Regents w/o Advanced": "1803",
#     "% of cohort Local": "17.1",
#     "% of grads Local": "64.6",
#     "# Still Enrolled": "3895",
#     "% of cohort Still Enrolled": "37",
#     "# Dropped Out": "3220",
#     "% of cohort Dropped Out": "30.6"
# }

#given demographic, cohort year, and cohort category get dropout rate
def findDropout(year,cat,dem):
    cursor = db.schools.find({'Demographics': dem})
    for c in cursor:
        pprint(c)
        #return db.schools.find({"Cohort Year": year, "Cohort Category": cat, "Demographic": dem},{"% of cohort Dropped Out":1, '_id':0})

print(3)
print(findDropout(2001, '4 Year June', 'English Language Learner'))

#% of cohort Dropped Out, % of cohort  Advanced Regents, % of cohort Total Grads
#ELLs w/ dropout rate less than 20%

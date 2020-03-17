# Eric "Morty" Lau
# SoftDev1 pd1
# K11 -- Ay Mon Go Git It From Yer Flask
# 2020-03-17

from pymongo import MongoClient

client = MongoClient("localhost", 27017)
quiz = client['sitedata'].jeopardy
grad = client['sitedata'].grad_results

def quiz_find(dict_query):
    return quiz.find(dict_query)

def grad_find(dict_query):
    return grad.find(dict_query)
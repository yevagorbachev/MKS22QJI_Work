#!/usr/bin/python3
import sys
sys.path.insert(0,'/var/www/mongo_app/')
sys.path.insert(0,'/var/www/mongo_app/mongo_app/')

import logging
logging.basicConfig(stream=sys.stderr)

from mongo_app import app as application

#!/usr/bin/python3
import sys
APPNAME='app'
sys.path.insert(0,f'/var/www/{APPNAME}/')
sys.path.insert(0,f'/var/www/{APPNAME}/{APPNAME}/')

import logging
logging.basicConfig(stream=sys.stderr)

from APPNAME import app as application

####################
# Imports
####################

import flask
from flask import Flask, request, abort, redirect
from flask_cors import CORS
import util.utilities as util
from util.utilities import wrap_response
from util.send_sms import send_sms
import configparser
import os
import logging
import json
from pymongo import MongoClient
from bson.objectid import ObjectId
import werkzeug.datastructures

####################
# Initialize
####################

# parse config for hash / secret 
config = configparser.ConfigParser()
config.read(os.path.join("config", "config.ini"))

# initialize flask app
app = Flask(__name__)
app.config.update(
    SECRET_KEY = config["DEFAULT"]["SECRET_KEY"],
)
CORS(app, supports_credentials=True)

# FIXME these lines introduce security problems; for development environment only
app.config["Access-Control-Allow-Origin"] = "*"
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

# logging 
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# database
mongo_client = MongoClient("mongodb://mongodb:27017/")
db = mongo_client["dev"]

####################
# API Resources 
####################


@app.route("/api/register", methods=["POST"])
def register() -> flask.Response:
    """
    Register a new phone number.
    """
    phone = request.form.get("phone")
    phone = util.parse_phone_number(phone)
    if phone is None:
        return wrap_response({"errors": ["Invalid phone number or format."]}, 400)

    subs = db["subscribers"]
    subs.insert_one({"phone": phone})
    
    return wrap_response({"message": "success"}, 200)


@app.route("/api/send_dummy", methods=["POST"])
def send_dummy() -> flask.Response:
    """
    Text out our pre-made dummy message.
    """
    subs = db["subscribers"]
    people = subs.find()
    for person in people:
        send_sms(person["phone"], "test msg")

    return wrap_response({"message": "success"}, 200)

####################
# Main
####################

def main():
    print("starting app!")

    # FIXME remove me
    db["subscribers"].drop()

    # FIXME get port from config file
    # debug=True allows us to see print statements in the terminal
    app.run(debug=True, host="0.0.0.0", port=5432)


if __name__ == "__main__":
    main()

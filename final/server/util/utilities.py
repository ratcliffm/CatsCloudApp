####################
# Imports
####################

from os import urandom
from base64 import b64encode
import flask
import os
import logging
from typing import Tuple
import re

####################
# Initialize
####################

# for printing
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

####################
# Functions
####################

def wrap_response(data: dict, *args, **kwargs) -> flask.Response:
    """
    Wraps json response in flask Response object with appropriate headers.
    Returns:
        response:   flask response
    """
    json = flask.jsonify(data)
    response = flask.make_response(json, *args, **kwargs)
    # FIXME possible security issue
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = True
    return response


def parse_phone_number(number: str) -> str:
    pattern = r"^(\d\d\d)-?(\d\d\d)-?(\d\d\d\d)$"
    match = re.match(pattern, number)
    if match is None:
        return None

    return "".join(match.groups())

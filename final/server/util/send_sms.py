####################
# Imports
####################

import configparser
from twilio.rest import Client
import os

####################
# Initialize
####################

config = configparser.ConfigParser()
config.read(os.path.join("config", "config.ini"))

client = Client(config["Twilio"]["SID"], config["Twilio"]["TOKEN"])

####################
# Functions
####################

def send_sms(to: str, message: str):
    """
    Sends sms to the given number.
    """
    client.messages.create(
        body=message,
        from_=config["Twilio"]["NUMBER"],
        to=to
    )

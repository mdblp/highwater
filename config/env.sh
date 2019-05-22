export PORT=9191
export LOG_LEVEL=debug
export SALT_DEPLOY="gf78fSEI7tOQQP9xfXMO9HfRyMnW4Sx88Q"
export DISCOVERY_HOST="localhost:8000"
export PUBLISH_HOST="localhost:8000"
export SERVER_SECRET="This needs to be the same secret everywhere. YaHut75NsK1f9UKUXuWqxNN0RUwHFBCy"
export SERVICE_NAME="highwater"
export USER_API_SERVICE='{"type": "static", "hosts": [{"protocol": "http", "host": "localhost:9107"}]}'
# export METRICS_APIKEY=
# export METRICS_UCSF_APIKEY=
# variable to enable metrics features
# - none: no metrics
# - kiss: events are sent to 
# - file: log events to a file
# - all: file + kiss
export METRICS=file
# path to file that is used to store events when "file" is enabled
# the folder is not created if it does not exist
# By default the files are rotated every day and we keep 7 days of history.
export METRICS_FILENAME="file.log"

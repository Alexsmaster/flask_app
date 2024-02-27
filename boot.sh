#!/bin/bash
source venv/bin/activate
#exec gunicorn -w 4 -b :5000 --access-logfile - --error-logfile - api:app
exec gunicorn -w 4 -b :5000 --access-logfile - --error-logfile - visionsPlotly:app
echo hello
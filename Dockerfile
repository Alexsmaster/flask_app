#FROM python:latest
#
#COPY requirements.txt requirements.txt
#RUN pip install -r requirements.txt
#RUN pip install gunicorn
#
#COPY app app
##COPY migrations migrations
#COPY visionsPlotly.py config.py boot.sh ./
#RUN chmod a+x boot.sh
#
#ENV FLASK_APP visionsPlotly.py
##RUN flask translate compile
#
#EXPOSE 5000
#CMD ["flask", "run", "--host", "0.0.0.0", "--port", "5000"]
#ENTRYPOINT ["./boot.sh"]




FROM python:3.8-slim-buster

RUN apt-get update
RUN mkdir /code
WORKDIR /code

COPY requirements.txt requirements.txt
RUN python -m venv venv
RUN venv/bin/pip install --default-timeout=100 -r requirements.txt
RUN venv/bin/pip install gunicorn

COPY app app
#COPY migrations migrations
#COPY api.py config.py boot.sh ./
#RUN chmod u+x boot.sh

COPY visionsPlotly.py config.py boot.sh ./
RUN chmod a+x boot.sh

ENV FLASK_APP visionsPlotly.py
#RUN flask translate compile


EXPOSE 5000
ENTRYPOINT ["./boot.sh"]
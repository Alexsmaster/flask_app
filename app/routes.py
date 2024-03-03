from flask import render_template, flash, redirect, url_for, request, jsonify
from app import app
from app.forms import AddDotsForm, DropDots
from app.models import Dots, db
import timeit

import plotly.express as px
import random

clicked_points = []
clicked_points_color = {}

@app.route('/add_new_dots', methods=['GET', 'POST'])
def add_new_dots():
    form = AddDotsForm()
    if form.validate_on_submit():
        for _ in range(int(form.numb.data)):
            point = Dots(x=random.randint(0, 1000), y=random.randint(0, 1000), color = '#333333')

            db.session.add(point)
        db.session.commit()
        db.session.close_all()
        return redirect(url_for('draw'))
    return render_template('create_dots.html',  title='Add', form=form)


@app.route('/')
@app.route('/dra')
def draw():
    return render_template('draw_dots.html')


@app.route('/draw/data_request', methods=['GET'])
def draw_data_request():
    start_timer = timeit.default_timer()
    points = Dots.query.all()
    data = {
        'x': [point.x for point in points],
        'y': [point.y for point in points],
        'color': [point.color for point in points]
    }
    diff =  timeit.default_timer() - start_timer
    # app.logger.info(diff)
    return jsonify({'points': data})


# @app.route('/api/push_points', methods=['POST'])
# def push_points():
#     content = request.json
#     print(content)
#     # app.logger.warning('testing warning log')
#     # app.logger.error('testing error log')
#     app.logger.info(content)
#     return jsonify(content)

@app.route('/api/push_points_change_color', methods=['POST'])
def push_points_change_color():
    start_timer = timeit.default_timer()
    content = request.json
    for each in content:
        Dots_temp = db.session.execute(db.select(Dots).filter_by(x = each['x'], y = each['y'])).scalar()
        Dots_temp.color = each['color']
    db.session.commit()
    # db.session.close_all()
    diff = timeit.default_timer() - start_timer
    app.logger.info(diff)
    return jsonify(content)


@app.route('/drop_dots', methods=['GET', 'POST'])
def drop_dots():
    form = DropDots()
    if form.validate_on_submit():
        Dots.query.delete()
        db.session.commit()
        return redirect(url_for('draw'))
    return render_template('dropdb.html',  title='DropDB', form=form)

# @app.route('/plotly_python', methods=['GET', 'POST'])
# def test():
#     return render_template('dropdb.html')
#

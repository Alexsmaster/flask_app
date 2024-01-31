from flask import render_template, flash, redirect, url_for, request, jsonify
from app import app
from app.forms import LoginForm, AddDotsForm, DropDots
from app.models import Dots, db


import plotly.express as px
import random

clicked_points = []
clicked_points_color = {}
@app.route('/')  
@app.route('/index')
def index():
    user = {'username': 'Alex'}
    posts = [
        {
            'author': {'username': 'John'},
            'body': 'Beautiful day in Portland!'
        },
        {
            'author': {'username': 'Susan'},
            'body': 'The Avengers movie was so cool!'
        }
    ]
    return render_template('index.html', title='Home', user=user, posts=posts)


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        flash('Login requested for user {}, remember_me={}'.format(
            form.username.data, form.remember_me.data))
        return redirect(url_for('index'))
    return render_template('login.html',  title='Sign In', form=form)


@app.route('/add_new_dots', methods=['GET', 'POST'])
def add_new_dots():
    form = AddDotsForm()
    if form.validate_on_submit():
        #flash('Login requested for user {}, remember_me={}'.format(
        #    form.username.data, form.remember_me.data))
        for _ in range(int(form.numb.data)):
            point = Dots(x=random.uniform(0, 1000), y=random.uniform(0, 1000))
            db.session.add(point)
        db.session.commit()
        return redirect(url_for('draw'))
    return render_template('create_dots.html',  title='Add', form=form)

@app.route('/draw', methods=['GET', 'POST'])
def draw():
    points = Dots.query.all()
    data = {
        'x': [point.x for point in points],
        'y': [point.y for point in points]
    }
    # app.logger.warning('testing warning log')
    # app.logger.error('testing error log')

    fig = px.scatter(data, x='x', y='y', title='Scatter Plot')
    #f = open("demofile3.txt", "w")

    plot_div = fig.to_html(full_html=False, div_id='plot_div')
    #f.write(plot_div)
    #f.close()
    #fig = px.scatter(x=[point.x for point in points], y=[point.y for point in points])
    #print(plot_div)
    return render_template('draw_dots.html', plot_div=plot_div)

@app.route('/click_handler', methods=['GET', 'POST'])
def click_handler():
    data = request.get_json()
    x_val = data['x']
    y_val = data['y']
    if (x_val, y_val) not in clicked_points:
        clicked_points.append((x_val, y_val))
        clicked_points_color.update({"color": '#FFFF00'})
        # clicked_points_color.update({"color": clicked_points_color.get("color").append('#FF0000') })
    app.logger.info("tracker #1: " + str(x_val) + ' ' + str(y_val))
    app.logger.info(data)
    app.logger.info(clicked_points)
    app.logger.info(clicked_points_color)
    # return jsonify({"message": "Клик был записан: " + str(x_val) + ' ' + str(y_val)})
    return jsonify(clicked_points_color)


@app.route('/drop_dots', methods=['GET', 'POST'])
def drop_dots():
    form = DropDots()
    if form.validate_on_submit():
        Dots.query.delete()
        db.session.commit()
        return redirect(url_for('draw'))
    return render_template('dropdb.html',  title='DropDB', form=form)


@app.route('/drawtest')
def drawtest():
    '''
    points = Dots.query.all()
    data = {
        'x': [point.x for point in points],
        'y': [point.y for point in points]
    }
    #fig = px.scatter(data, x='x', y='y', title='Scatter Plot')
    #f = open("demofile3.txt", "w")

    plot_div = fig.to_html(full_html=False)
    #f.write(plot_div)
    #f.close()
    #fig = px.scatter(x=[point.x for point in points], y=[point.y for point in points])
    #print(plot_div)
    '''

    return render_template('drawtest.html')



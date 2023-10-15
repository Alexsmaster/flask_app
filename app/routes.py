from flask import render_template, flash, redirect, url_for
from app import app
from app.forms import LoginForm, AddDotsForm
from app.models import Dots, db


import plotly.express as px
import random



@app.route('/')
@app.route('/index')
def index():
    user = {'username': 'Miguel'}
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
        for _ in range(1000):
            point = Dots(x=random.uniform(0, 1000), y=random.uniform(0, 1000))
            db.session.add(point)
        db.session.commit()
        return redirect(url_for('draw'))
    return render_template('create_dots.html',  title='Add', form=form)

@app.route('/draw')
def draw():
    points = Dots.query.all()
    data = {
        'x': [point.x for point in points],
        'y': [point.y for point in points]
    }
    fig = px.scatter(data, x='x', y='y', title='Scatter Plot')
    plot_div = fig.to_html(full_html=False)
    #fig = px.scatter(x=[point.x for point in points], y=[point.y for point in points])
    return render_template('draw.html', plot_div=plot_div)

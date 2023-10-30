from app import app, db
from app.models import User, Post, Dots


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Post': Post, 'Dots': Dots}

# That decorator passout error when db not found
# inspect that
@app.before_first_request
def create_tables():
    db.create_all()



from app import app, db
from app.models import Dots


@app.shell_context_processor
def make_shell_context():
    return {'Dots': Dots}

# That decorator passout error when db not found
# inspect that
@app.before_first_request
def create_tables():
    db.create_all()



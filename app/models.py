from datetime import datetime
from app import db

class Dots(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    x = db.Column(db.Integer)
    y = db.Column(db.Integer)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    color = db.Column(db.String(16), index=True, default='#0000ff')

    def __repr__(self):
        return '<dot at x={}, y={}>'.format(self.x, self.y)

from flask import Flask, request, jsonify, send_from_directory
from flask_pymongo import PyMongo
from bson.json_util import dumps

app = Flask(__name__)

# 配置 MongoDB
app.config['MONGO_URI'] = 'mongodb://localhost:27017/strainsDB'
mongo = PyMongo(app)

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/api/strains', methods=['GET'])
def get_strains():
    temperature = request.args.get('temperature')
    humidity = request.args.get('humidity')
    soil_ph = request.args.get('soil_ph')

    query = {}
    
    if temperature:
        temp = float(temperature)
        query['min_temperature'] = {'$lte': temp}
        query['max_temperature'] = {'$gte': temp}
    
    if humidity:
        hum = float(humidity)
        query['min_humidity'] = {'$lte': hum}
        query['max_humidity'] = {'$gte': hum}
    
    if soil_ph:
        ph = float(soil_ph)
        query['min_soil_ph'] = {'$lte': ph}
        query['max_soil_ph'] = {'$gte': ph}

    strains = mongo.db.strains.find(query)
    result = dumps(strains)
    
    return result

@app.route('/api/strain-library', methods=['GET'])
def get_strain_library():
    strains = mongo.db.strains.find({})
    result = dumps(strains)
    
    return result

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

@app.route('/testdb', methods=['GET'])
def test_db():
    try:
        client = mongo.cx
        db_names = client.list_database_names()
        return jsonify({"status": "success", "databases": db_names})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    app.run(debug=True)

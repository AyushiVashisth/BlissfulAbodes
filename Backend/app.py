from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson import ObjectId

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/blissful_abodes'
mongo = PyMongo(app)


# Hosts

@app.route('/hosts', methods=['GET'])
def get_hosts():
    hosts = mongo.db.hosts.find()
    return jsonify({'hosts': hosts}), 200

@app.route('/hosts', methods=['POST'])
def add_host():
    host = request.json
    host_id = mongo.db.hosts.insert_one(host).inserted_id
    host['_id'] = str(host_id)
    return jsonify({'host': host}), 201

@app.route('/hosts/<string:host_id>', methods=['GET'])
def get_host(host_id):
    host = mongo.db.hosts.find_one({'_id': ObjectId(host_id)})
    if host:
        return jsonify({'host': host}), 200
    return jsonify({'message': 'Host not found'}), 404

@app.route('/hosts/<string:host_id>', methods=['PUT'])
def update_host(host_id):
    host = request.json
    result = mongo.db.hosts.update_one({'_id': ObjectId(host_id)}, {'$set': host})
    if result.modified_count > 0:
        host['_id'] = host_id
        return jsonify({'host': host}), 200
    return jsonify({'message': 'Host not found'}), 404

@app.route('/hosts/<string:host_id>', methods=['DELETE'])
def delete_host(host_id):
    result = mongo.db.hosts.delete_one({'_id': ObjectId(host_id)})
    if result.deleted_count > 0:
        return jsonify({'message': 'Host deleted'}), 200
    return jsonify({'message': 'Host not found'}), 404


# Properties

@app.route('/hosts/<string:host_id>/properties', methods=['GET'])
def get_properties(host_id):
    properties = mongo.db.properties.find({'host_id': host_id})
    return jsonify({'properties': properties}), 200

@app.route('/hosts/<string:host_id>/properties', methods=['POST'])
def add_property(host_id):
    property = request.json
    property['host_id'] = host_id
    property_id = mongo.db.properties.insert_one(property).inserted_id
    property['_id'] = str(property_id)
    return jsonify({'property': property}), 201

@app.route('/hosts/<string:host_id>/properties/<string:property_id>', methods=['GET'])
def get_property(host_id, property_id):
    property = mongo.db.properties.find_one({'_id': ObjectId(property_id), 'host_id': host_id})
    if property:
        return jsonify({'property': property}), 200
    return jsonify({'message': 'Property not found'}), 404

@app.route('/hosts/<string:host_id>/properties/<string:property_id>', methods=['PUT'])
def update_property(host_id, property_id):
    property = request.json
    result = mongo.db.properties.update_one({'_id': ObjectId(property_id), 'host_id': host_id}, {'$set': property})
    if result.modified_count > 0:
        property['_id'] = property_id
        return jsonify({'property': property}), 200
    return jsonify({'message': 'Property not found'}), 404

@app.route('/hosts/<string:host_id>/properties/<string:property_id>', methods=['DELETE'])
def delete_property(host_id, property_id):
    result = mongo.db.properties.delete_one({'_id': ObjectId(property_id), 'host_id': host_id})
    if result.deleted_count > 0:
        return jsonify({'message': 'Property deleted'}), 200
    return jsonify({'message': 'Property not found'}), 404


# Guests

@app.route('/guests', methods=['GET'])
def get_guests():
    guests = mongo.db.guests.find()
    return jsonify({'guests': guests}), 200

@app.route('/guests', methods=['POST'])
def add_guest():
    guest = request.json
    guest_id = mongo.db.guests.insert_one(guest).inserted_id
    guest['_id'] = str(guest_id)
    return jsonify({'guest': guest}), 201

@app.route('/guests/<string:guest_id>', methods=['GET'])
def get_guest(guest_id):
    guest = mongo.db.guests.find_one({'_id': ObjectId(guest_id)})
    if guest:
        return jsonify({'guest': guest}), 200
    return jsonify({'message': 'Guest not found'}), 404

@app.route('/guests/<string:guest_id>', methods=['PUT'])
def update_guest(guest_id):
    guest = request.json
    result = mongo.db.guests.update_one({'_id': ObjectId(guest_id)}, {'$set': guest})
    if result.modified_count > 0:
        guest['_id'] = guest_id
        return jsonify({'guest': guest}), 200
    return jsonify({'message': 'Guest not found'}), 404

@app.route('/guests/<string:guest_id>', methods=['DELETE'])
def delete_guest(guest_id):
    result = mongo.db.guests.delete_one({'_id': ObjectId(guest_id)})
    if result.deleted_count > 0:
        return jsonify({'message': 'Guest deleted'}), 200
    return jsonify({'message': 'Guest not found'}), 404


# Bookings

@app.route('/bookings', methods=['GET'])
def get_bookings():
    bookings = mongo.db.bookings.find()
    return jsonify({'bookings': bookings}), 200

@app.route('/bookings', methods=['POST'])
def add_booking():
    booking = request.json
    booking_id = mongo.db.bookings.insert_one(booking).inserted_id
    booking['_id'] = str(booking_id)
    return jsonify({'booking': booking}), 201

@app.route('/bookings/<string:booking_id>', methods=['GET'])
def get_booking(booking_id):
    booking = mongo.db.bookings.find_one({'_id': ObjectId(booking_id)})
    if booking:
        return jsonify({'booking': booking}), 200
    return jsonify({'message': 'Booking not found'}), 404

@app.route('/bookings/<string:booking_id>', methods=['PUT'])
def update_booking(booking_id):
    booking = request.json
    result = mongo.db.bookings.update_one({'_id': ObjectId(booking_id)}, {'$set': booking})
    if result.modified_count > 0:
        booking['_id'] = booking_id
        return jsonify({'booking': booking}), 200
    return jsonify({'message': 'Booking not found'}), 404

@app.route('/bookings/<string:booking_id>', methods=['DELETE'])
def delete_booking(booking_id):
    result = mongo.db.bookings.delete_one({'_id': ObjectId(booking_id)})
    if result.deleted_count > 0:
        return jsonify({'message': 'Booking deleted'}), 200
    return jsonify({'message': 'Booking not found'}), 404


if __name__ == '__main__':
    app.run(debug=True)



from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId

# Create the Flask app
app = Flask(__name__)

# Configure MongoDB connection
client = MongoClient('mongodb://localhost:27017')
db = client['blissful_abodes']
hosts_collection = db['hosts']
properties_collection = db['properties']
guests_collection = db['guests']
bookings_collection = db['bookings']

# Hosts Endpoints
@app.route('/api/hosts', methods=['GET'])
def get_hosts():
    hosts = list(hosts_collection.find())
    return jsonify(hosts)

@app.route('/api/hosts/<string:host_id>', methods=['GET'])
def get_host(host_id):
    host = hosts_collection.find_one({'_id': ObjectId(host_id)})
    if host:
        return jsonify(host)
    return jsonify({'message': 'Host not found'}), 404

@app.route('/api/hosts', methods=['POST'])
def create_host():
    data = request.json
    host_id = hosts_collection.insert_one(data).inserted_id
    return jsonify({'message': 'Host created', 'host_id': str(host_id)}), 201

@app.route('/api/hosts/<string:host_id>', methods=['PUT'])
def update_host(host_id):
    data = request.json
    hosts_collection.update_one({'_id': ObjectId(host_id)}, {'$set': data})
    return jsonify({'message': 'Host updated'}), 200

@app.route('/api/hosts/<string:host_id>', methods=['DELETE'])
def delete_host(host_id):
    hosts_collection.delete_one({'_id': ObjectId(host_id)})
    return jsonify({'message': 'Host deleted'}), 200


# Properties Endpoints
@app.route('/api/properties', methods=['GET'])
def get_properties():
    properties = list(properties_collection.find())
    return jsonify(properties)

@app.route('/api/properties/<string:property_id>', methods=['GET'])
def get_property(property_id):
    property = properties_collection.find_one({'_id': ObjectId(property_id)})
    if property:
        return jsonify(property)
    return jsonify({'message': 'Property not found'}), 404

@app.route('/api/properties', methods=['POST'])
def create_property():
    data = request.json
    property_id = properties_collection.insert_one(data).inserted_id
    return jsonify({'message': 'Property created', 'property_id': str(property_id)}), 201

@app.route('/api/properties/<string:property_id>', methods=['PUT'])
def update_property(property_id):
    data = request.json
    properties_collection.update_one({'_id': ObjectId(property_id)}, {'$set': data})
    return jsonify({'message': 'Property updated'}), 200

@app.route('/api/properties/<string:property_id>', methods=['DELETE'])
def delete_property(property_id):
    properties_collection.delete_one({'_id': ObjectId(property_id)})
    return jsonify({'message': 'Property deleted'}), 200


# Guests Endpoints
@app.route('/api/guests', methods=['GET'])
def get_guests():
    guests = list(guests_collection.find())
    return jsonify(guests)

@app.route('/api/guests/<string:guest_id>', methods=['GET'])
def get_guest(guest_id):
    guest = guests_collection.find_one({'_id': ObjectId(guest_id)})
    if guest:
        return jsonify(guest)
    return jsonify({'message': 'Guest not found'}), 404

@app.route('/api/guests', methods=['POST'])
def create_guest():
    data = request.json
    guest_id = guests_collection.insert_one(data).inserted_id
    return jsonify({'message': 'Guest created', 'guest_id': str(guest_id)}), 201

@app.route('/api/guests/<string:guest_id>', methods=['PUT'])
def update_guest(guest_id):
    data = request.json
    guests_collection.update_one({'_id': ObjectId(guest_id)}, {'$set': data})
    return jsonify({'message': 'Guest updated'}), 200

@app.route('/api/guests/<string:guest_id>', methods=['DELETE'])
def delete_guest(guest_id):
    guests_collection.delete_one({'_id': ObjectId(guest_id)})
    return jsonify({'message': 'Guest deleted'}), 200


# Bookings Endpoints
@app.route('/api/bookings', methods=['GET'])
def get_bookings():
    bookings = list(bookings_collection.find())
    return jsonify(bookings)

@app.route('/api/bookings/<string:booking_id>', methods=['GET'])
def get_booking(booking_id):
    booking = bookings_collection.find_one({'_id': ObjectId(booking_id)})
    if booking:
        return jsonify(booking)
    return jsonify({'message': 'Booking not found'}), 404

@app.route('/api/bookings', methods=['POST'])
def create_booking():
    data = request.json
    booking_id = bookings_collection.insert_one(data).inserted_id
    return jsonify({'message': 'Booking created', 'booking_id': str(booking_id)}), 201

@app.route('/api/bookings/<string:booking_id>', methods=['PUT'])
def update_booking(booking_id):
    data = request.json
    bookings_collection.update_one({'_id': ObjectId(booking_id)}, {'$set': data})
    return jsonify({'message': 'Booking updated'}), 200

@app.route('/api/bookings/<string:booking_id>', methods=['DELETE'])
def delete_booking(booking_id):
    bookings_collection.delete_one({'_id': ObjectId(booking_id)})
    return jsonify({'message': 'Booking deleted'}), 200


if __name__ == '__main__':
    app.run(debug=True)


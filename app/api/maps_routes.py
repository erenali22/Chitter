from flask import Blueprint, current_app

maps_routes = Blueprint('maps', __name__)

@maps_routes.route('/key', methods=['POST'])
def get_maps_key():
    return {'googleMapsAPIKey': current_app.config['MAPS_API_KEY']}

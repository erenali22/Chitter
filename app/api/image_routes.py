from flask import Blueprint, request, jsonify
from app.models import db, Image
from flask_login import current_user, login_required
from app.api_helpers.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)
from app.config import GIPHY_API_KEY
import giphy_client
from giphy_client.rest import ApiException

image_routes = Blueprint("images", __name__)


@image_routes.route("", methods=["POST"])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_image = Image(user=current_user, url=url)
    db.session.add(new_image)
    db.session.commit()
    return {"url": url}

@image_routes.route('/giphy-search', methods=['GET'])
def giphy_search():
    query = request.args.get('query', '')
    limit = request.args.get('limit', 25)
    offset = request.args.get('offset', 0)

    api_instance = giphy_client.DefaultApi()
    try:
        # Search Giphy
        api_response = api_instance.gifs_search_get(GIPHY_API_KEY, query, limit=limit, offset=offset)
        return jsonify(api_response.to_dict())
    except ApiException as e:
        return jsonify({'message': f"Exception when calling DefaultApi->gifs_search_get: {e}"})

import datetime
import json

from .utils.uk_covid import get_paginated_dataset

from flask import (
    Blueprint, redirect, url_for, flash
)
from werkzeug.exceptions import abort

bp = Blueprint('covid', __name__, url_prefix='/covid')


def get_cases():
    query_filters = [
        f"areaType=overview"
    ]

    query_structure = {
        "date": "date",
        "daily": "newCasesByPublishDate",
        "cumulative": "cumCasesByPublishDate"
    }

    return get_paginated_dataset(query_filters, query_structure)


def get_deaths():
    query_filters = [
        f"areaType=overview"
    ]

    query_structure = {
        "date": "date",
        "daily": "newDeaths28DaysByPublishDate",
        "cumulative": "cumDeaths28DaysByPublishDate"
    }

    return get_paginated_dataset(query_filters, query_structure)


@bp.route('/get_all_cases')
def get_all_cases():
    cases_data = get_cases()
    return json.dumps(cases_data)


@bp.route('/get_all_deaths')
def get_all_deaths():
    death_data = get_deaths()
    return json.dumps(death_data)


@bp.route('/<string:date_str>/get_all_cases')
def get_all_cases_by_date(date_str):
    cases = None
    try:
        date = datetime.datetime.strptime(date_str, '%Y%m%d').date()
        cases_list = get_cases()
        for day_dict in cases_list:
            day_date = day_dict["date"]
            if day_date == date.strftime('%Y-%m-%d'):
                return day_dict
    except ValueError as e:
        flash(e.__str__())
        abort(404)

    abort(404)

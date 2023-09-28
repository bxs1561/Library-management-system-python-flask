from .db_utils import *


def rebuild_tables():
    """re-build the tables"""
    exec_sql_file('src/db/schema.sql')

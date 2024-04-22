import unittest
from src.tests.test_utils import *
from src.db.users import rebuild_tables
import json
from src.db.users import *

class TestUsers(unittest.TestCase):
    def setUp(self):
        """set up table"""
        rebuild_tables()
        insert_test_data()

    def test_user_list(self):
        """Test list of all users"""
        expected = 2
        header = {'content-type': 'application/json'}
        actual = get_rest_call(self, 'http://localhost:5000/users', get_header=header)
        self.assertEqual(expected, len(actual))

    def test_add_user(self):
        data = dict(first_name='Bikrams',last_name='sub',username='Bikram12',password='Bikidada+1',date_of_birth='12-29-2001',
                    address='parks', phone_number='585-454-6981',email='bik@gmail.com',role_name='student'
                    )
        jdata = json.dumps(data)
        header = {'content-type': 'application/json'}
        result = post_rest_call(self,'http://localhost:5000/user/add',jdata,header)
        print("user add test begin")
        # self.assertTrue(result)
        print(result)


    # def test_add_admin(self):
    #     data = dict(first_name='Bikrams',last_name='sub',username='Bikram12',password='Bikidada+1',
    #                 phone_number='585-454-6981',email='bik@gmail.com'
    #                 )
    #     jdata = json.dumps(data)
    #     header = {'content-type': 'application/json'}
    #     result = post_rest_call(self,'http://localhost:5000/admin/add',jdata,header)
    #     print("admin add test begin")
    #     self.assertTrue(result)


    # def test_user_already_exist(self):
    #     data=dict(user_id=1, first_name='john', last_name='smith', username='mary',password='Bikidada+1',
    #               date_of_birth='12-29-2001',address='parks', phone_number='585-454-6981',email='bik@gmail.com',role_name='student')
    #     jdata = json.dumps(data)
    #     header = {'content-type': 'application/json'}
    #     result = post_rest_call(self,'http://localhost:5000/user/add',jdata,header)
    #     print("user add already exist test begin")
    #     self.assertFalse(result)
    #
    # def test_login_success(self):
    #     data = dict(user_id=3, first_name='Bikrams',last_name='sub',username='Bikram12',password='Bikidada+1',date_of_birth='12-29-2001',
    #                 address='parks', phone_number='585-454-6981',email='bik@gmail.com',role_name='student'
    #                 )
    #     jdata = json.dumps(data)
    #     header = {'content-type': 'application/json'}
    #     post_rest_call(self, 'http://localhost:5000/user/add', jdata, header)
    #     # login user
    #     data = dict(username='Bikram12', password="Bikidada+1")
    #     jdata = json.dumps(data)
    #     header = {'content-type': 'application/json'}
    #     result = post_rest_call(self, 'http://localhost:5000/user/login', jdata, header)
    #     print('user login test begin')
    #     self.assertEqual('login successfully', result['message'])
    #
    # def test_login_empty_username(self):
    #     data = dict(user_id=3, first_name='Bikrams',last_name='sub',username='Bikram12',password='Bikidada+1',date_of_birth='12-29-2001',
    #                 address='parks', phone_number='585-454-6981',email='bik@gmail.com',role_name='student'
    #                 )
    #     jdata = json.dumps(data)
    #     header = {'content-type': 'application/json'}
    #     post_rest_call(self, 'http://localhost:5000/user/add', jdata, header)
    #     # login user
    #     data = dict(username='', password="Bikidada+1")
    #     jdata = json.dumps(data)
    #     header = {'content-type': 'application/json'}
    #     result = post_rest_call(self, 'http://localhost:5000/user/login', jdata, header)
    #     print('empty user name test begin')
    #     self.assertEqual('Please fill in the email or password',result['error'])
    #
    # def test_login_empty_password(self):
    #     data = dict(user_id=3, first_name='Bikrams',last_name='sub',username='Bikram12',password='Bikidada+1',date_of_birth='12-29-2001',
    #                 address='parks', phone_number='585-454-6981',email='bik@gmail.com',role_name='student'
    #                 )
    #     jdata = json.dumps(data)
    #     header = {'content-type': 'application/json'}
    #     post_rest_call(self, 'http://localhost:5000/user/add', jdata, header)
    #     # login user
    #     data = dict(username='', password="")
    #     jdata = json.dumps(data)
    #     header = {'content-type': 'application/json'}
    #     result = post_rest_call(self, 'http://localhost:5000/user/login', jdata, header)
    #     print('empty password test begin')
    #     self.assertEqual('Please fill in the email or password',result['error'])
    #
    # def test_fail_login(self):
    #     data = dict(user_id=3, first_name='Bikrams',last_name='sub',username='Bikram12',password='Bikidada+1',date_of_birth='12-29-2001',
    #                 address='parks', phone_number='585-454-6981',email='bik@gmail.com',role_name='student'
    #                 )
    #     jdata = json.dumps(data)
    #     header = {'content-type': 'application/json'}
    #     post_rest_call(self, 'http://localhost:5000/user/add', jdata, header)
    #     # login user
    #     data = dict(username='Bikram12', password="Bikidada+12")
    #     jdata = json.dumps(data)
    #     header = {'content-type': 'application/json'}
    #     result = post_rest_call(self, 'http://localhost:5000/user/login', jdata, header)
    #     print('login fail test begin')
    #     self.assertEqual('login failed',result['error'])
    #
    #
    #
    #
    #
    #
    #
    #
    #
    #
    #
    #
    #
    #
    #
    #
    #

import _ from 'lodash'
import person1 from "../images/person1.jpg"

export const userData = {
    1: {
      user_id: 1,
      FirstName: 'smith',
      LastName: 'Sub',
      username: 'bik1',
      password: 'Bikram+!',
      DateOfBirth: '12-29-2002',
      Address: 'Driving park',
      PhoneNumber: '5678679876',
      Email: 'bushan1#gmail.com',
      image:person1,
      Role: {
        role_id: '1',
        role_name: 'Admin'
      },
      member_status: {
        user_status_id: '1',
        status_value: 'False'
      },
      session_key:'lol',
      CreatedOn:'12-29-2023'
    },
    2: {
        user_id: '2',
        FirstName: 'Bik',
        LastName: 'Sub',
        username: 'bik1',
        password: 'Bikram+!',
        DateOfBirth: '12-29-2002',
        Address: 'Driving park',
        PhoneNumber: '5678679876',
        Email: 'bushan1#gmail.com',
        image:person1,
        Role: {
          role_id: '1',
          role_name: 'Admin'
        },
        member_status: {
          user_status_id: '1',
          status_value: 'False'
        },
        session_key:'lol',
        CreatedOn:'12-29-2023'
      },
      3: {
        user_id: '3',
        FirstName: 'Bik',
        LastName: 'Sub',
        username: 'bik1',
        password: 'Bikram+!',
        DateOfBirth: '12-29-2002',
        Address: 'Driving park',
        PhoneNumber: '5678679876',
        Email: 'bushan1#gmail.com',
        image:person1,
        Role: {
          role_id: '1',
          role_name: 'Admin'
        },
        member_status: {
          user_status_id: '1',
          status_value: 'False'
        },
        session_key:'lol',
        CreatedOn:'12-29-2023'
      },
    }
  

export const userDataArray = () => _.values(userData)

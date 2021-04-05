import datetime
import json


def generate_UserProfile(size):
    data = []
    for i in range(size):
        currentUP = {
            'id': 'id_{}'.format(i),
            'username': 'username_{}'.format(i),
            'email': 'email_{}@email.com'.format(i),
            'telephone': '+30000{}'.format(i),
            'role': 'EMPLOYEE',
            'name': 'name_{}'.format(i),
            'fathers_name': 'fathers_name_{}'.format(i),
            'address': 'address_{}'.format(i),
            'zip_code': '71414',
            'mobile': '+3000{}'.format(i),
            'tin': '{}'.format(i),
            'family_name': 'family_name_{}'.format(i),
            'gender': 'gender_{}'.format(i % 10),
            'birthdate': datetime.datetime.now().isoformat(),
            'city': 'city_{}'.format(i),
            'profilePicture': {
                'level': '',
                'idToken': '',
                'filePath': '',
                'filename': '',
                'contentType': '',
            },
            'preferences': {},
            'locale': 'el-GR',
            'files': [{
                'level': '',
                'idToken': '',
                'filePath': '',
                'filename': '',
                'contentType': '',
            }, {
                'level': '',
                'idToken': '',
                'filePath': '',
                'filename': '',
                'contentType': '',
            }]
        }
        data.append(currentUP)
    return data


if __name__ == '__main__':
    data = {}
    data['UserProfile'] = generate_UserProfile(100)
    with open('data1.json', 'w') as outfile:
        json.dump(data, outfile)

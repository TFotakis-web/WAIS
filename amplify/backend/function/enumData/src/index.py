import boto3
import json

def handler(event, context):
  print('received event:')
  print(event)
  return {
    'message': 'Hello from your new Amplify Python lambda!'
  }


def upload(event, context):
    AWS_BUCKET_NAME = 'wais-system-files'
    s3 = boto3.resource('s3')
    bucket = s3.Bucket(AWS_BUCKET_NAME)
    
    path = 'config/enumData.json'
    data = json.dumps(event).encode('utf-8')

    bucket.put_object(
        ACL='public-read',
        ContentType='application/json',
        Key=path,
        Body=data,
    )

    body = {
        "uploaded": "true",
        "bucket": AWS_BUCKET_NAME,
        "path": path,
    }
    
    return {
        "statusCode": 200,
        "body": json.dumps(body)
    }


def download(event, context):
  s3_obj =boto3.client('s3')

  s3_clientobj = s3_obj.get_object(Bucket='wais-system-files', Key='config/enumData.json')
  s3_clientdata = s3_clientobj['Body'].read().decode('utf-8')

  data=json.loads(s3_clientdata)

  return {
      "statusCode": 200,
      "body": json.dumps(data)
  }
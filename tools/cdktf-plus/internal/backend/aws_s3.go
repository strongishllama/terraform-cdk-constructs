package backend

import (
	"context"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	dynamodb_types "github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	s3_types "github.com/aws/aws-sdk-go-v2/service/s3/types"
)

func (c client) NewAWSS3Backend(ctx context.Context, bucketName, tableName string) error {
	if err := c.newS3Bucket(ctx, bucketName); err != nil {
		return err
	}
	if err := c.newDynamoDBTable(ctx, tableName); err != nil {
		return err
	}
	return nil
}

func (c client) newS3Bucket(ctx context.Context, name string) error {
	_, err := c.s3Client.CreateBucket(ctx, &s3.CreateBucketInput{
		Bucket: &name,
		ACL:    s3_types.BucketCannedACLPrivate,
		CreateBucketConfiguration: &s3_types.CreateBucketConfiguration{
			LocationConstraint: s3_types.BucketLocationConstraintApSoutheast2,
		},
	})
	if err != nil {
		return err
	}

	_, err = c.s3Client.PutPublicAccessBlock(ctx, &s3.PutPublicAccessBlockInput{
		Bucket: &name,
		PublicAccessBlockConfiguration: &s3_types.PublicAccessBlockConfiguration{
			BlockPublicAcls:       true,
			BlockPublicPolicy:     true,
			IgnorePublicAcls:      true,
			RestrictPublicBuckets: true,
		},
	})
	if err != nil {
		return err
	}

	return nil
}

func (c client) newDynamoDBTable(ctx context.Context, name string) error {
	_, err := c.dynamoDBClient.CreateTable(ctx, &dynamodb.CreateTableInput{
		AttributeDefinitions: []dynamodb_types.AttributeDefinition{
			{
				AttributeName: aws.String("LockID"),
				AttributeType: dynamodb_types.ScalarAttributeTypeS,
			},
		},
		KeySchema: []dynamodb_types.KeySchemaElement{
			{
				AttributeName: aws.String("LockID"),
				KeyType:       dynamodb_types.KeyTypeHash,
			},
		},
		TableName:   &name,
		BillingMode: dynamodb_types.BillingModePayPerRequest,
	})
	if err != nil {
		return err
	}

	return nil
}

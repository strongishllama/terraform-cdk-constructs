package backend

import (
	"cloud.google.com/go/storage"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func NewClient(options ...clientOption) (*client, error) {
	c := &client{}
	for _, o := range options {
		o.apply(c)
	}

	return c, nil
}

type client struct {
	dynamoDBClient     *dynamodb.Client
	s3Client           *s3.Client
	cloudStorageClient *storage.Client
}

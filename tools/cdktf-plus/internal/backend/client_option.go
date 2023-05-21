package backend

import (
	"context"

	"cloud.google.com/go/storage"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func WithAWSAuthentication(ctx context.Context) clientOption {
	return &awsAuthentication{}
}

func WithGoogleAuthentication(ctx context.Context) clientOption {
	return &googleAuthentication{}
}

type awsAuthentication struct {
	ctx context.Context
}

func (a awsAuthentication) apply(c *client) error {
	cfg, err := config.LoadDefaultConfig(a.ctx)
	if err != nil {
		return err
	}

	c.dynamoDBClient = dynamodb.NewFromConfig(cfg)
	c.s3Client = s3.NewFromConfig(cfg)

	return nil
}

type googleAuthentication struct {
	ctx context.Context
}

func (g googleAuthentication) apply(c *client) error {
	var err error
	c.cloudStorageClient, err = storage.NewClient(g.ctx)
	if err != nil {
		return err
	}

	return nil
}

type clientOption interface {
	apply(*client) error
}

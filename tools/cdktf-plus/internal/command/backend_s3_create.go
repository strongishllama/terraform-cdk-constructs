package command

import (
	"github.com/spf13/cobra"

	"github.com/strongishllama/terraform-cdk-constructs/tools/cdktf-plus/internal/backend"
)

func backendS3CreateCommand() *cobra.Command {
	command := &cobra.Command{
		Use:     "create [flags]",
		Short:   "Create a CDKTF S3 backend.",
		Example: "cdktf-plus backend s3 create --bucket-name=BUCKET_NAME --table-name=TABLE_NAME",
		Run: func(cmd *cobra.Command, args []string) {
			bucketName := cmd.Flag("bucket-name").Value.String()
			tableName := cmd.Flag("table-name").Value.String()

			client, err := backend.NewClient(backend.WithAWSAuthentication(cmd.Context()))
			if err != nil {
				exit(err)
			}
			if err := client.NewAWSS3Backend(cmd.Context(), bucketName, tableName); err != nil {
				exit(err)
			}
		},
	}
	command.SetHelpFunc(defaultHelp(command))

	command.PersistentFlags().String("bucket-name", "", "(required) The name of the S3 bucket to create.")
	command.MarkPersistentFlagRequired("bucket-name")
	command.PersistentFlags().String("table-name", "", "(required) The name of the DynamoDB table to create.")
	command.MarkPersistentFlagRequired("bucket-name")

	return command
}

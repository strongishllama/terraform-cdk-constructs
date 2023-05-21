package command

import (
	"github.com/spf13/cobra"

	"github.com/strongishllama/terraform-cdk-constructs/tools/cdktf-plus/internal/backend"
)

func backendGCSCreateCommand() *cobra.Command {
	command := &cobra.Command{
		Use:     "create [flags]",
		Short:   "Create a CDKTF GCS backend.",
		Example: "cdktf-plus backend gcs create --project-id=PROJECT_ID --location=LOCATION --bucket-name=BUCKET_NAME",
		Run: func(cmd *cobra.Command, args []string) {
			projectID := cmd.Flag("project-id").Value.String()
			location := cmd.Flag("location").Value.String()
			bucketName := cmd.Flag("bucket-name").Value.String()

			client, err := backend.NewClient(backend.WithGoogleAuthentication(cmd.Context()))
			if err != nil {
				exit(err)
			}
			if err := client.NewGoogleCloudStorageBackend(cmd.Context(), projectID, location, bucketName); err != nil {
				exit(err)
			}
		},
	}
	command.SetHelpFunc(defaultHelp(command))

	command.PersistentFlags().String("project-id", "", "(required) The ID of the Google Cloud project to use.")
	command.MarkPersistentFlagRequired("project-id")
	command.PersistentFlags().String("location", "", "(required) The name of the Google Cloud location to use.")
	command.MarkPersistentFlagRequired("location")
	command.PersistentFlags().String("bucket-name", "", "(required) The name of the GCS bucket to create.")
	command.MarkPersistentFlagRequired("bucket-name")

	return command
}

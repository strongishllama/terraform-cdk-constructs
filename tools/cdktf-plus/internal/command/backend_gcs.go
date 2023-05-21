package command

import "github.com/spf13/cobra"

func backendGCSCommand() *cobra.Command {
	command := &cobra.Command{
		Use:     "gcs [flags]",
		Short:   "Perform actions against CDKTF GCS backends.",
		Example: "cdktf-plus backend gcs create --project-id=PROJECT_ID --location=LOCATION --bucket-name=BUCKET_NAME",
	}
	command.SetHelpFunc(defaultHelp(command))
	command.AddCommand(backendGCSCreateCommand())

	return command
}

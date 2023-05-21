package command

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func Execute() {
	command := rootCommand()
	command.AddCommand(backendCommand())

	if err := command.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func rootCommand() *cobra.Command {
	command := &cobra.Command{
		Use:     "cdktf-plus",
		Short:   "A CLI tool to help fill some gaps missing in the cdktf CLI.",
		Example: "cdktf-plus backend s3 create --bucket-name=BUCKET_NAME --table-name=TABLE_NAME",
	}
	command.SetHelpFunc(defaultHelp(command))

	return command
}

package command

import (
	"fmt"
	"os"
)

func exit(msg any) {
	fmt.Println(msg)
	os.Exit(1)
}

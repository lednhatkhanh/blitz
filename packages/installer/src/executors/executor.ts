export interface BaseExecutor {
  stepId: string | number
  stepName: string
  // a bit to display to the user to give context to the change
  explanation: string
}

type dynamicExecutorArgument<T> = (cliArgs: any) => T

function isDynamicExecutorArgument<T>(input: executorArgument<T>): input is dynamicExecutorArgument<T> {
  return typeof (input as dynamicExecutorArgument<T>) === 'function'
}

export type executorArgument<T> = T | dynamicExecutorArgument<T>

export function getExecutorArgument<T>(input: executorArgument<T>, cliArgs: any): T {
  if (isDynamicExecutorArgument(input)) {
    return input(cliArgs)
  }
  return input
}

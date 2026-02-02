import { ErrorState, ErrorStateTitle, ErrorStateDescription } from "@/components/error-state"

export const LoadingErrorState = ({errorMessage}: {errorMessage: string}) => {
  return (
    <ErrorState>
      <ErrorStateTitle>There was an error loading the images</ErrorStateTitle>
      <ErrorStateDescription>{errorMessage}</ErrorStateDescription>
    </ErrorState>
  )
}

import { useQuery } from 'react-query'
import { getPipelinePage } from '../pipelineApiCalls'

const usePipelinePage = (
  page: number,
  pageSize: number,
  column?: string,
  direction?: string
) => {
  return useQuery(
    ['pipeline-page', page, pageSize, column, direction],
    () => getPipelinePage(page, pageSize, column, direction),
    { keepPreviousData: true, refetchOnWindowFocus: false }
  )
}

export default usePipelinePage

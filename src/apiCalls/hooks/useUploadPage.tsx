import { useQuery } from 'react-query'
import { getUploadPage } from '../uploadApiCalls'

const useUploadPage = (
  page: number,
  pageSize: number,
  column?: string,
  direction?: string
) => {
  return useQuery(
    ['upload-page', page, pageSize, column, direction],
    () => getUploadPage(page, pageSize, column, direction),
    { keepPreviousData: true, refetchOnWindowFocus: false }
  )
}

export default useUploadPage

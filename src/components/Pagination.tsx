import ReactPaginate from 'react-paginate'

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (selectedPage: number) => void
}

export function Pagination({ currentPage, totalPages, setCurrentPage }: PaginationProps) {
  return (
    <ReactPaginate 
      forcePage={currentPage}
      pageCount={totalPages}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={(data) => setCurrentPage(data.selected)}
      previousLabel="Previous"
      nextLabel="Next"
      breakLabel="..."
      containerClassName="w-full tabletlg:w-2/4 mt-8 flex items-center justify-evenly list-none cursor-pointer"
      nextLinkClassName="p-3 rounded-lg bg-[#24325FFF] text-[#FFFFFF] font-roboto font-medium"
      previousLinkClassName="p-3 rounded-lg bg-[#24325FFF] mr-auto text-[#FFFFFF] font-roboto font-medium"
      pageLinkClassName="p-3 rounded-lg hidden tabletlg:inline border-[1px] border-solid border-[#24325FFF] text-[#FFFFFF] font-roboto font-medium"
      activeLinkClassName="bg-[#24325FFF]"
      breakLinkClassName="text-[#FFFFFF] hidden tabletlg:inline"
      disabledClassName="hidden"
    />
  )
}
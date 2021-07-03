import ReactPaginate from 'react-paginate'

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (selectedPage: number) => void
}

// Componente de paginação que utiliza os parâmetros
// currentPage - página atual
// totalPages - número de paginas
// setCurrentPage - função que atualiza o estado de currentPage(SearchPage) para a página selecionada pelo usuário
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
      containerClassName="w-full tabletlg:w-2/4 flex items-center justify-evenly list-none cursor-pointer mt-8"
      nextLinkClassName="p-3 rounded-lg bg-[#24325FFF] font-roboto font-medium text-[#FFFFFF]"
      previousLinkClassName="p-3 rounded-lg bg-[#24325FFF] font-roboto font-medium text-[#FFFFFF] mr-auto"
      pageLinkClassName="p-3 rounded-lg hidden tabletlg:inline border-[1px] border-solid border-[#24325FFF] font-roboto font-medium text-[#FFFFFF]"
      activeLinkClassName="bg-[#24325FFF]"
      breakLinkClassName="text-[#FFFFFF] hidden tabletlg:inline"
      disabledClassName="hidden"
    />
  )
}
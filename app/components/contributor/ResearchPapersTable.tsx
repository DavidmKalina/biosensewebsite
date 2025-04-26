import { Box, Spinner, Text, Table } from '@chakra-ui/react';
import { useEffect, useCallback, useMemo } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender, getSortedRowModel, CellContext } from '@tanstack/react-table';
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'
import type { ResearchPaper } from '~/types';

const PAGE_SIZE = 10;

interface ResearchPapersTableProps {
  contributorApiId?: string;
}

function isValidDate(d: unknown): d is Date {
  return d instanceof Date && !isNaN(d.getTime());
}
const linkcell: ColumnDef<ResearchPaper>['cell'] = (info) => (
  <a href={info.row.original.url} target="_blank" rel="noopener noreferrer">
    {`${info.getValue()}`}
  </a>
);
const datecell: ColumnDef<ResearchPaper>['cell'] = (info) => info.getValue() && isValidDate(new Date(info.getValue()as string)) ? new Date(info.getValue() as string).toLocaleDateString() : '-';

const columns: ColumnDef<ResearchPaper>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: linkcell,
  },
  {
    accessorKey: 'publishDate',
    header: 'Publish Date',
    cell: datecell,
    sortingFn: 'datetime',
  },
] as const;

const getRowId = (originalRow: ResearchPaper) => 'id' in originalRow ? `${originalRow.id}` : '';
const sortingMode = {
  sorting: [{ id: 'publishDate', desc: true }],
};

const ResearchPapersTable: React.FC<ResearchPapersTableProps> = ({ contributorApiId }) => {
  const { ref, inView } = useInView();

  const fetchNext = useCallback(async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch(`https://api.semanticscholar.org/graph/v1/author/${contributorApiId}/papers?fields=url,title,publicationDate,paperId&offset=${pageParam}&limit=${PAGE_SIZE}`)
    const result = (await response.json()) as {
      data?: {
        title: string,
        url: string,
        publicationDate: string,
        paperId: string
      }[],
      next?: number,
      offset?: number,
    };
    const papers: ResearchPaper[] = (result.data || []).map((p) => ({
      title: p.title,
      url: p.url,
      publishDate: p.publicationDate,
      id: p.paperId
    }));
    return {
      data: papers,
      previousId: result.offset,
      nextId: result.next,
    };
  }, [contributorApiId])

  const {
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['papers', contributorApiId],
    queryFn: fetchNext,
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.previousId,
    getNextPageParam: (lastPage) => lastPage.nextId,
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  const preparedData = useMemo(
    () => data?.pages.map(page => page.data).flat() || [], 
    [data?.pages.length ?? 0]);
  const table = useReactTable({
    data: preparedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: true,
    getRowId: getRowId,
    state: sortingMode,
  });

  if (error) return <Text color="red.500">{typeof error === 'string' ? error : 'An error occurred.'}</Text>;
  if (!preparedData.length && isFetching) return <Spinner my={2} />;
  if (!preparedData.length) return <Text>No research papers available yet.</Text>;

  return (
    <Box width="100%" minWidth="400px" maxH="400px" overflowY="auto" mt={1}>
      <Table.Root variant="line" size="sm">
        <Table.Header>
          <Table.Row>
            {table.getHeaderGroups().map(headerGroup =>
              headerGroup.headers.map(header => (
                <Table.ColumnHeader key={header.id} width={header.column.id === 'title' ? '70%' : '30%'}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </Table.ColumnHeader>
              ))
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map(row => (
            <Table.Row key={row.id}>
              {row.getVisibleCells().map(cell => (
                <Table.Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      {hasNextPage && <Box key="loadmore" ref={ref} textAlign="center" py={2}>Loading...</Box>}
      {isFetching && !isFetchingNextPage && <Spinner key="loader" my={2} />}
    </Box>
  );
};

export default ResearchPapersTable;

import { Box, Spinner, Text, Table } from '@chakra-ui/react';
import { useEffect, useCallback, useMemo } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender, getSortedRowModel } from '@tanstack/react-table';
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'
import type { ResearchPaper } from '../../types';

const PAGE_SIZE = 10;

interface ResearchPapersTableProps {
  contributorApiId?: string;
}

const ResearchPapersTable: React.FC<ResearchPapersTableProps> = ({ contributorApiId }) => {
  const { ref, inView } = useInView();

  const fetchNext = useCallback(async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch(`https://api.semanticscholar.org/graph/v1/author/${contributorApiId}/papers?fields=url,title,publicationDate,paperId&offset=${pageParam}&limit=${PAGE_SIZE}`)
    const result = await response.json();
    const papers = (result.data || []).map((p: any) => ({
      title: p.title,
      url: p.url,
      publishDate: p.publicationDate ? new Date(p.publicationDate) : null,
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

  const columns: ColumnDef<ResearchPaper>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: info => (
        <a href={info.row.original.url} target="_blank" rel="noopener noreferrer">
          {`${info.getValue()}`}
        </a>
      ),
    },
    {
      accessorKey: 'publishDate',
      header: 'Publish Date',
      cell: info => info.getValue() ? (info.getValue() as Date).toLocaleDateString() : '-',
      sortingFn: 'datetime',
    },
  ];

  const preparedData = useMemo(
    () => data?.pages.map(page => page.data).flat() || [], 
    [data?.pages.length ?? 0]);
  const table = useReactTable({
    data: preparedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: true,
    getRowId: originalRow => originalRow.id,
    state: {
      sorting: [{ id: 'publishDate', desc: true }],
    },
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
      {hasNextPage && <Box ref={ref} textAlign="center" py={2}>Loading...</Box>}
      {isFetching && !isFetchingNextPage && <Spinner my={2} />}
    </Box>
  );
};

export default ResearchPapersTable;

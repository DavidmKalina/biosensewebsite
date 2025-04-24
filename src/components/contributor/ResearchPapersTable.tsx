import { Paper, Typography, CircularProgress, Box } from '@mui/material';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useInView } from 'react-intersection-observer'
import {
  useInfiniteQuery,
} from '@tanstack/react-query'
import type { ResearchPaper } from '../../types';

const PAGE_SIZE = 10;

interface ResearchPapersTableProps {
  contributorApiId?: string;
  localPapers?: ResearchPaper[];
}

const ResearchPapersTable: React.FC<ResearchPapersTableProps> = ({ contributorApiId, localPapers }) => {
  const { ref, inView } = useInView();

  const fetchNext = useCallback(async ({
    pageParam,
  }: {
    pageParam: number
  }): Promise<{
    data: Array<ResearchPaper>
    previousId: number
    nextId: number
  }> => {
    const response = await fetch(`https://api.semanticscholar.org/graph/v1/author/${contributorApiId}/papers?fields=url,title,publicationDate&offset=${pageParam}&limit=${PAGE_SIZE}`)
    const result = await response.json()
    const papers = (result.data || []).map((p: any) => ({
      title: p.title,
      url: p.url,
      publishDate: p.publicationDate || '',
    }));
    return {
      data: papers,
      previousId: result.offset,
      nextId: result.next,
    };
  }, [contributorApiId])

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
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
      cell: info => info.getValue() ? new Date(info.getValue() as string).toLocaleDateString() : '-',
    },
  ];


  const preparedData = useMemo(
    () => data?.pages.map(page => page.data).flat().sort((a, b) => b.publishDate.localeCompare(a.publishDate)) || [], 
    [data?.pages.length ?? 0]);
  const table = useReactTable({
    data: preparedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (error) return <Typography color="error">{typeof error === 'string' ? error : 'An error occurred.'}</Typography>;
  if (!preparedData.length && isFetching) return <CircularProgress sx={{ my: 2 }} />;
  if (!preparedData.length) return <Typography>No research papers available yet.</Typography>;

  return (
    <Paper sx={{ width: '100%', minWidth: 400, height: 400, overflow: 'auto', mt: 1 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '70%' }} />
          <col style={{ width: '30%' }} />
        </colgroup>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} style={{ textAlign: 'left', padding: 8, background: '#f5f5f5', borderBottom: '1px solid #ddd', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return <tr key={row.id}>
            {row.getVisibleCells().map(cell => {
              return (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              )
            })}
          </tr>
          })}
        </tbody>
      </table>
      <div>
        {hasNextPage && <div
          ref={ref}
        >
          Loading...
        </div>}
      </div>
      {isFetching && !isFetchingNextPage && <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}><CircularProgress size={24} /></Box>}
    </Paper>
  );
};

export default ResearchPapersTable;

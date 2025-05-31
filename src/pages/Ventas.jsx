import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Table, Form, Container, Button, Row, Col } from 'react-bootstrap';
import Papa from 'papaparse';

// Función preparada para obtener ventas desde el backend (aún no se usa)
// async function fetchVentas() {
//   try {
//     const response = await fetch('https://tu-api.com/api/ventas'); // reemplaza con tu URL real
//     if (!response.ok) {
//       throw new Error('Error al obtener ventas');
//     }
//     const data = await response.json();
//     console.log('Ventas obtenidas:', data);
//     return data;
//   } catch (error) {
//     console.error('Error al obtener ventas:', error);
//     return [];
//   }
// }

// Datos de prueba (esto se puede reemplazar por lo que venga de fetchVentas)
const ventasData = [
  { id: 1, producto: 'Producto A', cantidad: 2, precio: 1000, total: 2000 },
  { id: 2, producto: 'Producto B', cantidad: 1, precio: 3000, total: 3000 },
  { id: 3, producto: 'Producto C', cantidad: 5, precio: 500, total: 2500 },
  { id: 4, producto: 'Producto D', cantidad: 3, precio: 1500, total: 4500 },
  { id: 5, producto: 'Producto E', cantidad: 4, precio: 2000, total: 8000 },
  { id: 6, producto: 'Producto F', cantidad: 1, precio: 2500, total: 2500 },
  { id: 7, producto: 'Producto G', cantidad: 6, precio: 900, total: 5400 },
  { id: 8, producto: 'Producto H', cantidad: 2, precio: 1000, total: 2000 },
  { id: 9, producto: 'Producto I', cantidad: 1, precio: 3000, total: 3000 },
  { id: 10, producto: 'Producto J', cantidad: 5, precio: 500, total: 2500 },
  { id: 11, producto: 'Producto K', cantidad: 3, precio: 1500, total: 4500 },
  { id: 12, producto: 'Producto L', cantidad: 4, precio: 2000, total: 8000 },
  { id: 13, producto: 'Producto M', cantidad: 1, precio: 2500, total: 2500 },
  { id: 14, producto: 'Producto N', cantidad: 6, precio: 900, total: 5400 },
];

export default function Ventas() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(() => [
    { accessorKey: 'id', header: () => 'ID' },
    { accessorKey: 'producto', header: () => 'Producto' },
    { accessorKey: 'cantidad', header: () => 'Cantidad' },
    { accessorKey: 'precio', header: () => 'Precio Unitario' },
    { accessorKey: 'total', header: () => 'Total' },
  ], []);

  const table = useReactTable({
    data: ventasData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
  });

  const exportCSV = () => {
    const dataToExport = table.getFilteredRowModel().rows.map(row => row.original);
    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ventas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container className="mt-5 pt-5">
      <h2 className="mb-4">Mis Ventas</h2>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Buscar..."
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
          />
        </Col>
        <Col md={6} className="text-md-end mt-2 mt-md-0">
          <Button variant="success" onClick={exportCSV}>
            Exportar CSV
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const isSorted = header.column.getIsSorted();
                return (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ cursor: 'pointer' }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {isSorted === 'asc' ? ' 🔼' : isSorted === 'desc' ? ' 🔽' : ''}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr><td colSpan={columns.length} className="text-center">Sin resultados</td></tr>
          ) : (
            table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center">
        <span>
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
        <div className="btn-group">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </Container>
  );
}

import React, { useMemo, useState,useEffect } from 'react';
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

  



export default function Ventas() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const userId = localUser.id;

  useEffect(() => {
    // Simular carga de datos desde backend
    setTimeout(() => {
      fetchVentas() //setPedidos(pedidosData); //cambiar por fetchPedidos()
      setLoading(false);
    }, 500);
  }, []);

  // Función preparada para obtener ventas desde el backend (aún no se usa)
  async function fetchVentas() {
    try {
      const response = await fetch(`http://localhost:3000/ventas/${userId}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localUser.token}`
        }
      }); // reemplaza con tu URL real
      if (!response.ok) {
        throw new Error('Error al obtener ventas');
      }
      const data = await response.json();
      console.log('Ventas obtenidas:', data);
      setVentas(data);
      return data;
    } catch (error) {
      console.error('Error al obtener ventas:', error);
      return [];
    }
  }



  const columns = useMemo(() => [
    { accessorKey: 'order_id', header: () => 'ID' },
    { accessorKey: 'product_name', header: () => 'Producto' },
    { accessorKey: 'quantity', header: () => 'Cantidad' },
    { accessorKey: 'unit_price', header: () => 'Precio Unitario' },
    { accessorKey: 'total_earned', header: () => 'Total' },
  ], []);

  const table = useReactTable({
    data: ventas,
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

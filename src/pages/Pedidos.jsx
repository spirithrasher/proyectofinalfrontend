import React, { useMemo, useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Table, Form, Container, Button, Row, Col, Spinner } from 'react-bootstrap';
import Papa from 'papaparse';
import { API_URL } from '../utils/apiConfig';

const pedidosData = [
  { id: 1, producto: 'Producto A', fecha: '2025-05-01', estado: 'Enviado', cantidad: 2, total: 2000 },
  { id: 2, producto: 'Producto B', fecha: '2025-05-03', estado: 'Pendiente', cantidad: 1, total: 3000 },
  { id: 3, producto: 'Producto C', fecha: '2025-05-05', estado: 'Entregado', cantidad: 3, total: 4500 },
  { id: 4, producto: 'Producto D', fecha: '2025-05-08', estado: 'Cancelado', cantidad: 1, total: 1500 },
];

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [loading, setLoading] = useState(true);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const userId = localUser.id;

  useEffect(() => {
    // Simular carga de datos desde backend
    setTimeout(() => {
      fetchPedidos() //setPedidos(pedidosData); //cambiar por fetchPedidos()
      setLoading(false);
    }, 500);
  }, []);

  //Función preparada para usar en el futuro (aún no se llama)
  const fetchPedidos = async () => {
    try {
      const response = await fetch(`${API_URL}/pedidos/${userId}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localUser.token}`
        }
      }
      ); // Ajusta tu URL/API
      if (!response.ok) throw new Error('Error al obtener pedidos');
      const data = await response.json();
      console.log(data)
      setPedidos(data);
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(() => [
    { accessorKey: 'order_id', header: () => 'ID' },
    { accessorKey: 'product_name', header: () => 'Producto' },
    { accessorKey: 'created_at', header: () => 'Fecha' },
    { accessorKey: 'orden_status', header: () => 'Estado' },
    { accessorKey: 'quantity', header: () => 'Cantidad' },
    { accessorKey: 'unit_price', header: () => 'Total' },
  ], []);

  const table = useReactTable({
    data: pedidos,
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
    link.setAttribute('download', 'pedidos.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container className="mt-5 pt-5">
      <h2 className="mb-4">Mis Compras</h2>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Buscar..."
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            disabled={loading}
          />
        </Col>
        <Col md={6} className="text-md-end mt-2 mt-md-0">
          <Button variant="success" onClick={exportCSV} disabled={loading}>
            Exportar CSV
          </Button>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Cargando pedidos...</p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </Container>
  );
}

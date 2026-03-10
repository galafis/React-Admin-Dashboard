/**
 * React Admin Dashboard
 * Data visualization dashboard with KPI cards, charts, tables, and filtering.
 * @author Gabriel Demetrios Lafis
 */

import React, { useState, useMemo } from 'react';

// --- Mock Data ---

const generateSalesData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, i) => ({
        month,
        revenue: Math.floor(30000 + Math.random() * 50000),
        orders: Math.floor(200 + Math.random() * 400),
        customers: Math.floor(100 + Math.random() * 200),
        growth: parseFloat((Math.random() * 20 - 5).toFixed(1))
    }));
};

const generateRecentOrders = () => {
    const statuses = ['Completed', 'Processing', 'Shipped', 'Cancelled'];
    const products = ['Widget Pro', 'Dashboard Kit', 'Analytics Suite', 'Cloud Service', 'API Gateway'];
    return Array.from({ length: 20 }, (_, i) => ({
        id: `ORD-${String(1000 + i).padStart(5, '0')}`,
        customer: `Customer ${i + 1}`,
        product: products[i % products.length],
        amount: parseFloat((50 + Math.random() * 500).toFixed(2)),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: new Date(Date.now() - Math.random() * 30 * 86400000).toISOString().split('T')[0]
    }));
};

const generateUserActivity = () => {
    return Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return {
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            active: Math.floor(500 + Math.random() * 1000),
            new: Math.floor(50 + Math.random() * 150)
        };
    });
};

// --- KPI Card Component ---

function KPICard({ title, value, change, prefix = '', suffix = '' }) {
    const isPositive = change >= 0;
    return (
        <div style={styles.kpiCard}>
            <div style={styles.kpiTitle}>{title}</div>
            <div style={styles.kpiValue}>{prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}</div>
            <div style={{ ...styles.kpiChange, color: isPositive ? '#10b981' : '#ef4444' }}>
                {isPositive ? '+' : ''}{change}% vs last period
            </div>
        </div>
    );
}

// --- Simple Bar Chart ---

function BarChart({ data, dataKey, label, color = '#3b82f6' }) {
    const maxVal = Math.max(...data.map(d => d[dataKey]));
    return (
        <div style={styles.chartContainer}>
            <h3 style={styles.chartTitle}>{label}</h3>
            <div style={styles.barChartArea}>
                {data.map((d, i) => (
                    <div key={i} style={styles.barGroup}>
                        <div style={styles.barWrapper}>
                            <div style={{
                                ...styles.bar,
                                height: `${(d[dataKey] / maxVal) * 100}%`,
                                backgroundColor: color
                            }} title={`${d.month}: ${d[dataKey].toLocaleString()}`} />
                        </div>
                        <span style={styles.barLabel}>{d.month}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// --- Data Table Component ---

function DataTable({ data, columns, sortable = true }) {
    const [sortKey, setSortKey] = useState(null);
    const [sortDir, setSortDir] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    const sorted = useMemo(() => {
        if (!sortKey) return data;
        return [...data].sort((a, b) => {
            const aVal = a[sortKey];
            const bVal = b[sortKey];
            const cmp = typeof aVal === 'string' ? aVal.localeCompare(bVal) : aVal - bVal;
            return sortDir === 'asc' ? cmp : -cmp;
        });
    }, [data, sortKey, sortDir]);

    const paged = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const totalPages = Math.ceil(data.length / pageSize);

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    };

    const statusColor = (status) => {
        const colors = { Completed: '#10b981', Processing: '#f59e0b', Shipped: '#3b82f6', Cancelled: '#ef4444' };
        return colors[status] || '#6b7280';
    };

    return (
        <div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th key={col.key} style={styles.th}
                                onClick={() => sortable && handleSort(col.key)}>
                                {col.label} {sortKey === col.key ? (sortDir === 'asc' ? ' ^' : ' v') : ''}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paged.map((row, i) => (
                        <tr key={i} style={i % 2 === 0 ? styles.trEven : {}}>
                            {columns.map(col => (
                                <td key={col.key} style={styles.td}>
                                    {col.key === 'status' ? (
                                        <span style={{ ...styles.statusBadge, backgroundColor: statusColor(row[col.key]) + '20', color: statusColor(row[col.key]) }}>
                                            {row[col.key]}
                                        </span>
                                    ) : col.key === 'amount' ? (
                                        `$${row[col.key].toFixed(2)}`
                                    ) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={styles.pagination}>
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} style={styles.pageBtn}>Prev</button>
                <span style={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} style={styles.pageBtn}>Next</button>
            </div>
        </div>
    );
}

// --- Activity Chart ---

function ActivityChart({ data }) {
    const maxVal = Math.max(...data.map(d => d.active));
    return (
        <div style={styles.chartContainer}>
            <h3 style={styles.chartTitle}>User Activity (7 days)</h3>
            <div style={styles.activityGrid}>
                {data.map((d, i) => (
                    <div key={i} style={styles.activityItem}>
                        <div style={styles.activityBarWrap}>
                            <div style={{ ...styles.activityBar, height: `${(d.active / maxVal) * 100}%`, backgroundColor: '#8b5cf6' }} />
                            <div style={{ ...styles.activityBar, height: `${(d.new / maxVal) * 100}%`, backgroundColor: '#06b6d4' }} />
                        </div>
                        <span style={styles.activityLabel}>{d.day}</span>
                    </div>
                ))}
            </div>
            <div style={styles.legend}>
                <span><span style={{ ...styles.legendDot, backgroundColor: '#8b5cf6' }}></span> Active</span>
                <span><span style={{ ...styles.legendDot, backgroundColor: '#06b6d4' }}></span> New</span>
            </div>
        </div>
    );
}

// --- Main App ---

function App() {
    const [salesData] = useState(generateSalesData);
    const [orders] = useState(generateRecentOrders);
    const [activity] = useState(generateUserActivity);
    const [statusFilter, setStatusFilter] = useState('All');

    const totalRevenue = salesData.reduce((s, d) => s + d.revenue, 0);
    const totalOrders = salesData.reduce((s, d) => s + d.orders, 0);
    const totalCustomers = salesData.reduce((s, d) => s + d.customers, 0);
    const avgGrowth = parseFloat((salesData.reduce((s, d) => s + d.growth, 0) / salesData.length).toFixed(1));

    const filteredOrders = statusFilter === 'All' ? orders : orders.filter(o => o.status === statusFilter);

    const orderColumns = [
        { key: 'id', label: 'Order ID' },
        { key: 'customer', label: 'Customer' },
        { key: 'product', label: 'Product' },
        { key: 'amount', label: 'Amount' },
        { key: 'status', label: 'Status' },
        { key: 'date', label: 'Date' }
    ];

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Admin Dashboard</h1>
                <div style={styles.headerRight}>
                    <span style={styles.dateText}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </header>

            <div style={styles.kpiGrid}>
                <KPICard title="Total Revenue" value={totalRevenue} change={12.5} prefix="$" />
                <KPICard title="Total Orders" value={totalOrders} change={8.2} />
                <KPICard title="Total Customers" value={totalCustomers} change={15.3} />
                <KPICard title="Avg Growth" value={avgGrowth} change={avgGrowth} suffix="%" />
            </div>

            <div style={styles.chartsRow}>
                <div style={styles.chartHalf}>
                    <BarChart data={salesData} dataKey="revenue" label="Monthly Revenue" color="#3b82f6" />
                </div>
                <div style={styles.chartHalf}>
                    <ActivityChart data={activity} />
                </div>
            </div>

            <div style={styles.tableSection}>
                <div style={styles.tableHeader}>
                    <h3 style={{ margin: 0 }}>Recent Orders</h3>
                    <div style={styles.filterGroup}>
                        {['All', 'Completed', 'Processing', 'Shipped', 'Cancelled'].map(s => (
                            <button key={s} onClick={() => setStatusFilter(s)}
                                style={statusFilter === s ? styles.filterBtnActive : styles.filterBtn}>
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
                <DataTable data={filteredOrders} columns={orderColumns} />
            </div>
        </div>
    );
}

// --- Styles ---

const styles = {
    container: { fontFamily: "'Segoe UI', Roboto, sans-serif", maxWidth: '1200px', margin: '0 auto', padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
    title: { fontSize: '28px', fontWeight: '700', color: '#1e293b', margin: 0 },
    headerRight: { display: 'flex', alignItems: 'center', gap: '16px' },
    dateText: { color: '#64748b', fontSize: '14px' },
    kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' },
    kpiCard: { backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
    kpiTitle: { fontSize: '13px', color: '#64748b', fontWeight: '500', marginBottom: '8px' },
    kpiValue: { fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' },
    kpiChange: { fontSize: '13px', fontWeight: '500' },
    chartsRow: { display: 'flex', gap: '16px', marginBottom: '24px' },
    chartHalf: { flex: 1 },
    chartContainer: { backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', height: '320px' },
    chartTitle: { fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '16px', marginTop: 0 },
    barChartArea: { display: 'flex', alignItems: 'flex-end', gap: '8px', height: '220px', paddingBottom: '24px' },
    barGroup: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' },
    barWrapper: { flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' },
    bar: { width: '70%', borderRadius: '4px 4px 0 0', transition: 'height 0.3s', cursor: 'pointer', minHeight: '4px' },
    barLabel: { fontSize: '11px', color: '#94a3b8', marginTop: '6px' },
    activityGrid: { display: 'flex', alignItems: 'flex-end', gap: '12px', height: '200px', paddingBottom: '24px' },
    activityItem: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' },
    activityBarWrap: { flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '3px' },
    activityBar: { width: '40%', borderRadius: '3px 3px 0 0', minHeight: '4px' },
    activityLabel: { fontSize: '11px', color: '#94a3b8', marginTop: '6px' },
    legend: { display: 'flex', gap: '16px', justifyContent: 'center', fontSize: '12px', color: '#64748b' },
    legendDot: { display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', marginRight: '4px' },
    tableSection: { backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
    tableHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
    filterGroup: { display: 'flex', gap: '6px' },
    filterBtn: { padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: '#fff', cursor: 'pointer', fontSize: '12px', color: '#64748b' },
    filterBtnActive: { padding: '6px 12px', border: '1px solid #3b82f6', borderRadius: '6px', backgroundColor: '#eff6ff', cursor: 'pointer', fontSize: '12px', color: '#3b82f6', fontWeight: '500' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '12px 16px', borderBottom: '2px solid #e2e8f0', fontSize: '13px', fontWeight: '600', color: '#475569', cursor: 'pointer' },
    td: { padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontSize: '13px', color: '#334155' },
    trEven: { backgroundColor: '#f8fafc' },
    statusBadge: { padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' },
    pagination: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '16px' },
    pageBtn: { padding: '6px 16px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: '#fff', cursor: 'pointer', fontSize: '13px' },
    pageInfo: { fontSize: '13px', color: '#64748b' }
};

export default App;

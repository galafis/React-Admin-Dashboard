# React Admin Dashboard

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![License-MIT](https://img.shields.io/badge/License--MIT-yellow?style=for-the-badge)

</div>


Administrative dashboard built with React featuring KPI cards, interactive bar charts, sortable data tables with pagination, status filtering, and user activity visualization.

[English](#english) | [Portugues](#portugues)

---

## English

### Overview

A comprehensive admin dashboard that displays business metrics through KPI cards, revenue charts, user activity graphs, and a sortable orders table with status filtering and pagination. Built with React hooks and inline styles without external charting libraries.

### Architecture

```mermaid
graph TB
    subgraph Dashboard UI
        A[App] --> B[KPI Cards Grid]
        A --> C[Charts Row]
        A --> D[Data Table Section]
    end

    subgraph Visualization
        C --> E[BarChart - Revenue]
        C --> F[ActivityChart - Users]
    end

    subgraph Data Table
        D --> G[Column Sorting]
        D --> H[Status Filtering]
        D --> I[Pagination]
    end

    subgraph Data Layer
        J[Sales Data Generator]
        K[Orders Generator]
        L[Activity Generator]
    end

    B --> J
    E --> J
    D --> K
    F --> L

    style Dashboard UI fill:#e1f5fe
    style Visualization fill:#e8f5e9
    style Data Table fill:#fff3e0
    style Data Layer fill:#f3e5f5
```

### Features

- KPI cards with revenue, orders, customers, and growth metrics
- Bar chart for monthly revenue visualization
- Stacked activity chart showing active and new users
- Sortable data table with column-based ordering
- Status badge filtering (All, Completed, Processing, Shipped, Cancelled)
- Client-side pagination
- Responsive grid layout
- Mock data generation for demonstration

### Quick Start

```bash
git clone https://github.com/galafis/React-Admin-Dashboard.git
cd React-Admin-Dashboard
npm install
npm start
```

### License

MIT License - see [LICENSE](LICENSE) for details.

### Author

**Gabriel Demetrios Lafis**
- GitHub: [@galafis](https://github.com/galafis)
- LinkedIn: [Gabriel Demetrios Lafis](https://linkedin.com/in/gabriel-demetrios-lafis)

---

## Portugues

### Visao Geral

Dashboard administrativo abrangente que exibe metricas de negocios atraves de cards KPI, graficos de receita, graficos de atividade de usuarios e tabela de pedidos com ordenacao, filtragem por status e paginacao. Construido com React hooks e estilos inline.

### Arquitetura

```mermaid
graph TB
    subgraph Interface do Dashboard
        A[App] --> B[Grade de Cards KPI]
        A --> C[Linha de Graficos]
        A --> D[Secao de Tabela]
    end

    subgraph Visualizacao
        C --> E[Grafico de Barras - Receita]
        C --> F[Grafico de Atividade - Usuarios]
    end

    subgraph Tabela de Dados
        D --> G[Ordenacao por Coluna]
        D --> H[Filtragem por Status]
        D --> I[Paginacao]
    end

    A --> J[Geradores de Dados Mock]

    style Interface do Dashboard fill:#e1f5fe
    style Visualizacao fill:#e8f5e9
    style Tabela de Dados fill:#fff3e0
```

### Funcionalidades

- Cards KPI com receita, pedidos, clientes e metricas de crescimento
- Grafico de barras para visualizacao de receita mensal
- Grafico de atividade mostrando usuarios ativos e novos
- Tabela de dados ordenavel por coluna
- Filtragem por badges de status
- Paginacao no lado do cliente
- Layout de grade responsivo

### Inicio Rapido

```bash
git clone https://github.com/galafis/React-Admin-Dashboard.git
cd React-Admin-Dashboard
npm install
npm start
```

### Licenca

Licenca MIT - veja [LICENSE](LICENSE) para detalhes.

### Autor

**Gabriel Demetrios Lafis**
- GitHub: [@galafis](https://github.com/galafis)
- LinkedIn: [Gabriel Demetrios Lafis](https://linkedin.com/in/gabriel-demetrios-lafis)

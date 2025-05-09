
  // البيانات المرسلة من Django
  const networkTraffic = JSON.parse('{{ network_data|safe|escapejs }}');

  function countProtocols(data) {
    const protocolStats = {};
  
    data.forEach(entry => {
      const key = `${entry.protocol}_${entry.status}`;
      if (!protocolStats[key]) {
        protocolStats[key] = { protocol: entry.protocol, count: 0, status: entry.status };
      }
      protocolStats[key].count++;
    });
  
    return Object.values(protocolStats);
  }

  function renderProtocolTable() {
    const stats = countProtocols(networkTraffic);
    const tbody = document.getElementById('protocolTableBody');
    tbody.innerHTML = '';
  
    stats.forEach(item => {
      const row = document.createElement('tr');
      const statusClass = item.status === 'ATTACK' ? 'status-attack' : 'status-normal';
  
      row.innerHTML = `
        <td>${item.protocol}</td>
        <td>${item.count}</td>
        <td class="${statusClass}">${item.status}</td>
      `;
      tbody.appendChild(row);
    });
  }

  document.addEventListener('DOMContentLoaded', renderProtocolTable);


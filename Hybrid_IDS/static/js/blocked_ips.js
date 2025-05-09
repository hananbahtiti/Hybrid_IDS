// Initial arrays
let allIPs = [
    { ip: '192.168.1.10', attackType: 'Brute Force', status: 'Active' },
    { ip: '192.168.1.20', attackType: 'DDoS', status: 'Active' }
];

let blockedIPs = [
    { ip: '192.168.1.30', attackType: 'Phishing', status: 'Blocked' }
];

// Update Blocked IPs Table
function updateBlockedTable() {
    const tbody = document.getElementById('blockedTableBody');
    tbody.innerHTML = '';

    blockedIPs.forEach(ip => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ip.ip}</td>
            <td>${ip.attackType}</td>
            <td class="status-alert">${ip.status}</td>
            <td><button class="btn-unblock" onclick="handleUnblockIP('${ip.ip}')">Unblock</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Update All IPs Table
function updateAllTable() {
    const tbody = document.getElementById('allTableBody');
    tbody.innerHTML = '';

    allIPs.forEach(ip => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><button class="btn-block" onclick="handleBlockIP('${ip.ip}')">Block</button></td>
            <td>${ip.ip}</td>
            <td>${ip.attackType}</td>
            <td class="status-active">${ip.status}</td>


        `;
        tbody.appendChild(row);
    });
}

// Handle manual block
function handleBlockManually() {
    const ipInput = document.getElementById('ipInput');
    const attackInput = document.getElementById('attackTypeInput');
    const ip = ipInput.value.trim();
    const attackType = attackInput.value.trim();

    if (!ip || !attackType) {
        alert('Please fill in both IP Address and Attack Type');
        return;
    }

    if (blockedIPs.find(item => item.ip === ip)) {
        alert('This IP is already blocked!');
        return;
    }

    // Remove from allIPs if exists
    allIPs = allIPs.filter(item => item.ip !== ip);
    blockedIPs.push({ ip: ip, attackType: attackType, status: 'Blocked' });

    ipInput.value = '';
    attackInput.value = '';

    updateBlockedTable();
    updateAllTable();
}

// Handle IP block from All IPs Table
function handleBlockIP(ipAddress) {
    const ipData = allIPs.find(ip => ip.ip === ipAddress);
    if (ipData) {
        allIPs = allIPs.filter(ip => ip.ip !== ipAddress);
        blockedIPs.push({ ip: ipData.ip, attackType: ipData.attackType, status: 'Blocked' });
        updateBlockedTable();
        updateAllTable();
    }
}

// Handle Unblock
function handleUnblockIP(ipAddress) {
    const ipData = blockedIPs.find(ip => ip.ip === ipAddress);
    if (ipData) {
        blockedIPs = blockedIPs.filter(ip => ip.ip !== ipAddress);
        allIPs.push({ ip: ipData.ip, attackType: ipData.attackType, status: 'Active' });
        updateBlockedTable();
        updateAllTable();
    }
}

// Export (placeholder)
function handleExport(type) {
    alert(`Exporting ${type === 'blocked' ? 'Blocked IPs' : 'All Network IPs'} as CSV/Excel`);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateBlockedTable();
    updateAllTable();

    const manualBtn = document.getElementById('manualBlockBtn');
    if (manualBtn) {
        manualBtn.addEventListener('click', handleBlockManually);
    }
});

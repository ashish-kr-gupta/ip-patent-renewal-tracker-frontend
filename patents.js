// Extended patents data
const allPatentsData = [
  {
    id: "US10123456",
    title: "Advanced Machine Learning Algorithm for Predictive Analytics",
    status: "Active",
    nextRenewal: "2024-03-15",
    fee: "$1,600",
    priority: "High",
    daysLeft: 30,
    filed: "2020-03-15",
    inventor: "Dr. Sarah Johnson",
    assignee: "TechCorp Inc.",
  },
  {
    id: "US10234567",
    title: "Quantum Computing Circuit Design and Implementation",
    status: "Pending",
    nextRenewal: "2024-02-28",
    fee: "$1,200",
    priority: "Medium",
    daysLeft: 15,
    filed: "2019-02-28",
    inventor: "Prof. Michael Chen",
    assignee: "QuantumTech LLC",
  },
  {
    id: "US10345678",
    title: "Renewable Energy Storage System with Smart Grid Integration",
    status: "Active",
    nextRenewal: "2024-04-10",
    fee: "$2,100",
    priority: "High",
    daysLeft: 56,
    filed: "2021-04-10",
    inventor: "Dr. Emily Rodriguez",
    assignee: "GreenEnergy Solutions",
  },
  {
    id: "US10456789",
    title: "Biomedical Device Interface for Patient Monitoring",
    status: "Expired",
    nextRenewal: "N/A",
    fee: "N/A",
    priority: "Low",
    daysLeft: -30,
    filed: "2018-01-15",
    inventor: "Dr. James Wilson",
    assignee: "MedTech Innovations",
  },
  {
    id: "US10567890",
    title: "Autonomous Vehicle Navigation and Safety System",
    status: "Active",
    nextRenewal: "2024-05-22",
    fee: "$1,800",
    priority: "High",
    daysLeft: 98,
    filed: "2020-05-22",
    inventor: "Dr. Lisa Park",
    assignee: "AutoDrive Technologies",
  },
  {
    id: "US10678901",
    title: "Blockchain-based Supply Chain Management",
    status: "Active",
    nextRenewal: "2024-06-30",
    fee: "$1,400",
    priority: "Medium",
    daysLeft: 137,
    filed: "2021-06-30",
    inventor: "Alex Thompson",
    assignee: "ChainLogistics Inc.",
  },
  {
    id: "US10789012",
    title: "Advanced Solar Panel Technology with Efficiency Optimization",
    status: "Pending",
    nextRenewal: "2024-04-05",
    fee: "$1,900",
    priority: "Medium",
    daysLeft: 51,
    filed: "2020-04-05",
    inventor: "Dr. Maria Garcia",
    assignee: "SolarTech Innovations",
  },
  {
    id: "US10890123",
    title: "Artificial Intelligence for Medical Diagnosis",
    status: "Active",
    nextRenewal: "2024-07-15",
    fee: "$2,200",
    priority: "High",
    daysLeft: 152,
    filed: "2021-07-15",
    inventor: "Dr. Robert Kim",
    assignee: "AI Medical Systems",
  },
]

let filteredPatents = [...allPatentsData]
let currentView = "table"

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  loadPatentsTable()
  setupEventListeners()
})

// Load patents table
function loadPatentsTable() {
  const tableBody = document.getElementById("patentsTableBody")
  if (!tableBody) return

  tableBody.innerHTML = filteredPatents
    .map((patent) => {
      const statusClass = getStatusClass(patent.status)
      const priorityClass = getPriorityClass(patent.priority)

      return `
            <tr>
                <td class="patent-id">${patent.id}</td>
                <td class="patent-title">
                    <div class="title-container">
                        <span class="title">${patent.title}</span>
                        <small class="inventor">by ${patent.inventor}</small>
                    </div>
                </td>
                <td><span class="badge ${statusClass}">${patent.status}</span></td>
                <td class="renewal-date">
                    ${patent.nextRenewal !== "N/A" ? formatDate(patent.nextRenewal) : "N/A"}
                    ${patent.daysLeft > 0 ? `<small>(${patent.daysLeft} days)</small>` : ""}
                </td>
                <td class="fee">${patent.fee}</td>
                <td><span class="badge ${priorityClass}">${patent.priority}</span></td>
                <td class="actions">
                    <button class="btn btn-sm btn-outline" onclick="viewPatent('${patent.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="editPatent('${patent.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    ${
                      patent.status === "Active"
                        ? `<button class="btn btn-sm btn-primary" onclick="renewPatent('${patent.id}')">
                            <i class="fas fa-sync"></i>
                        </button>`
                        : ""
                    }
                </td>
            </tr>
        `
    })
    .join("")
}

// Load patents cards
function loadPatentsCards() {
  const cardsContainer = document.getElementById("patentsCards")
  if (!cardsContainer) return

  cardsContainer.innerHTML = filteredPatents
    .map((patent) => {
      const statusClass = getStatusClass(patent.status)
      const priorityClass = getPriorityClass(patent.priority)

      return `
            <div class="patent-card">
                <div class="patent-card-header">
                    <h3>${patent.id}</h3>
                    <div class="patent-badges">
                        <span class="badge ${statusClass}">${patent.status}</span>
                        <span class="badge ${priorityClass}">${patent.priority}</span>
                    </div>
                </div>
                <div class="patent-card-content">
                    <h4>${patent.title}</h4>
                    <div class="patent-meta">
                        <p><i class="fas fa-user"></i> ${patent.inventor}</p>
                        <p><i class="fas fa-building"></i> ${patent.assignee}</p>
                        <p><i class="fas fa-calendar"></i> Filed: ${formatDate(patent.filed)}</p>
                        ${
                          patent.nextRenewal !== "N/A"
                            ? `<p><i class="fas fa-clock"></i> Next Renewal: ${formatDate(patent.nextRenewal)}</p>`
                            : ""
                        }
                        <p><i class="fas fa-dollar-sign"></i> Fee: ${patent.fee}</p>
                    </div>
                </div>
                <div class="patent-card-actions">
                    <button class="btn btn-outline" onclick="viewPatent('${patent.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-outline" onclick="editPatent('${patent.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    ${
                      patent.status === "Active"
                        ? `<button class="btn btn-primary" onclick="renewPatent('${patent.id}')">
                            <i class="fas fa-sync"></i> Renew
                        </button>`
                        : ""
                    }
                </div>
            </div>
        `
    })
    .join("")
}

// Setup event listeners
function setupEventListeners() {
  // Search functionality
  const patentSearch = document.getElementById("patentSearch")
  if (patentSearch) {
    patentSearch.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase()
      filterPatents()
    })
  }

  // Filter functionality
  const statusFilter = document.getElementById("statusFilter")
  const priorityFilter = document.getElementById("priorityFilter")

  if (statusFilter) {
    statusFilter.addEventListener("change", filterPatents)
  }

  if (priorityFilter) {
    priorityFilter.addEventListener("change", filterPatents)
  }

  // Clear filters
  const clearFilters = document.getElementById("clearFilters")
  if (clearFilters) {
    clearFilters.addEventListener("click", () => {
      document.getElementById("patentSearch").value = ""
      document.getElementById("statusFilter").value = ""
      document.getElementById("priorityFilter").value = ""
      filterPatents()
    })
  }

  // View controls
  const tableView = document.getElementById("tableView")
  const cardView = document.getElementById("cardView")

  if (tableView) {
    tableView.addEventListener("click", () => {
      switchView("table")
    })
  }

  if (cardView) {
    cardView.addEventListener("click", () => {
      switchView("cards")
    })
  }
}

// Filter patents
function filterPatents() {
  const searchTerm = document.getElementById("patentSearch").value.toLowerCase()
  const statusFilter = document.getElementById("statusFilter").value
  const priorityFilter = document.getElementById("priorityFilter").value

  filteredPatents = allPatentsData.filter((patent) => {
    const matchesSearch =
      patent.title.toLowerCase().includes(searchTerm) ||
      patent.id.toLowerCase().includes(searchTerm) ||
      patent.inventor.toLowerCase().includes(searchTerm)

    const matchesStatus = !statusFilter || patent.status === statusFilter
    const matchesPriority = !priorityFilter || patent.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  if (currentView === "table") {
    loadPatentsTable()
  } else {
    loadPatentsCards()
  }
}

// Switch view
function switchView(view) {
  currentView = view

  const tableContainer = document.querySelector(".patents-table-container")
  const cardsContainer = document.getElementById("patentsCards")
  const tableBtn = document.getElementById("tableView")
  const cardBtn = document.getElementById("cardView")

  if (view === "table") {
    tableContainer.style.display = "block"
    cardsContainer.style.display = "none"
    tableBtn.classList.add("active")
    cardBtn.classList.remove("active")
    loadPatentsTable()
  } else {
    tableContainer.style.display = "none"
    cardsContainer.style.display = "grid"
    cardBtn.classList.add("active")
    tableBtn.classList.remove("active")
    loadPatentsCards()
  }
}

// Utility functions
function getStatusClass(status) {
  switch (status) {
    case "Active":
      return "status-active"
    case "Pending":
      return "status-pending"
    case "Expired":
      return "status-expired"
    default:
      return "status-default"
  }
}

function getPriorityClass(priority) {
  switch (priority) {
    case "High":
      return "priority-high"
    case "Medium":
      return "priority-medium"
    case "Low":
      return "priority-low"
    default:
      return "priority-default"
  }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Action functions
function viewPatent(patentId) {
  const patent = allPatentsData.find((p) => p.id === patentId)
  if (patent) {
    alert(
      `Viewing details for patent ${patentId}:\n\nTitle: ${patent.title}\nInventor: ${patent.inventor}\nStatus: ${patent.status}\nNext Renewal: ${patent.nextRenewal}`,
    )
  }
}

function editPatent(patentId) {
  alert(`Opening edit form for patent ${patentId}`)
}

function renewPatent(patentId) {
  if (confirm(`Are you sure you want to initiate renewal for patent ${patentId}?`)) {
    alert(`Renewal process initiated for patent ${patentId}`)
  }
}

// Add additional CSS for patents page
const patentsCSS = `
.patents-page {
    padding: 2rem;
}

.page-header {
    margin-bottom: 2rem;
}

.page-header h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.page-header p {
    color: #64748b;
}

.patents-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.filters {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.filter-select {
    padding: 0.5rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    background: white;
    font-size: 0.875rem;
}

.filter-select:focus {
    outline: none;
    border-color: #3b82f6;
}

.view-controls {
    display: flex;
    gap: 0.5rem;
}

.btn-outline {
    background: white;
    border: 1px solid #e2e8f0;
    color: #64748b;
}

.btn-outline:hover,
.btn-outline.active {
    background: #f1f5f9;
    border-color: #3b82f6;
    color: #3b82f6;
}

.patents-table-container {
    overflow-x: auto;
}

.table-wrapper {
    min-width: 800px;
}

.patents-table {
    width: 100%;
    border-collapse: collapse;
}

.patents-table th,
.patents-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
}

.patents-table th {
    background: #f8fafc;
    font-weight: 600;
    color: #374151;
}

.patent-id {
    font-family: monospace;
    font-weight: 600;
    color: #3b82f6;
}

.title-container {
    display: flex;
    flex-direction: column;
}

.title {
    font-weight: 500;
    margin-bottom: 0.25rem;
}

.inventor {
    color: #64748b;
    font-size: 0.75rem;
}

.renewal-date small {
    display: block;
    color: #64748b;
    font-size: 0.75rem;
}

.actions {
    display: flex;
    gap: 0.5rem;
}

.btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
}

.patents-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
}

.patent-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
}

.patent-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.patent-card-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.patent-card-header h3 {
    font-family: monospace;
    color: #3b82f6;
    font-size: 1rem;
}

.patent-badges {
    display: flex;
    gap: 0.5rem;
}

.patent-card-content {
    padding: 1.5rem;
}

.patent-card-content h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    line-height: 1.4;
}

.patent-meta {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.patent-meta p {
    font-size: 0.875rem;
    color: #64748b;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.patent-meta i {
    width: 16px;
    color: #94a3b8;
}

.patent-card-actions {
    padding: 1rem 1.5rem;
    border-top: 1px solid #e2e8f0;
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
}

.badge.status-active {
    background: #dcfce7;
    color: #16a34a;
}

.badge.status-pending {
    background: #fed7aa;
    color: #ea580c;
}

.badge.status-expired {
    background: #fecaca;
    color: #dc2626;
}

.badge.priority-high {
    background: #fecaca;
    color: #dc2626;
}

.badge.priority-medium {
    background: #fed7aa;
    color: #ea580c;
}

.badge.priority-low {
    background: #dcfce7;
    color: #16a34a;
}

@media (max-width: 768px) {
    .patents-controls {
        flex-direction: column;
        align-items: stretch;
    }
    
    .filters {
        flex-wrap: wrap;
    }
    
    .patents-cards {
        grid-template-columns: 1fr;
    }
    
    .patent-card-actions {
        flex-wrap: wrap;
    }
}
`

// Inject patents CSS
const style = document.createElement("style")
style.textContent = patentsCSS
document.head.appendChild(style)

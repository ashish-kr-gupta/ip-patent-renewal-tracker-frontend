// Sample data
const patentsData = [
  {
    id: "US10123456",
    title: "Advanced Machine Learning Algorithm",
    status: "Active",
    nextRenewal: "2024-03-15",
    fee: "$1,600",
    priority: "High",
    daysLeft: 30,
  },
  {
    id: "US10234567",
    title: "Quantum Computing Circuit Design",
    status: "Pending",
    nextRenewal: "2024-02-28",
    fee: "$1,200",
    priority: "Medium",
    daysLeft: 15,
  },
  {
    id: "US10345678",
    title: "Renewable Energy Storage System",
    status: "Active",
    nextRenewal: "2024-04-10",
    fee: "$2,100",
    priority: "High",
    daysLeft: 56,
  },
  {
    id: "US10567890",
    title: "Autonomous Vehicle Navigation",
    status: "Active",
    nextRenewal: "2024-05-22",
    fee: "$1,800",
    priority: "Low",
    daysLeft: 98,
  },
]

const activitiesData = [
  {
    type: "success",
    message: "Patent US10987654 renewed successfully",
    time: "2 hours ago",
    icon: "fas fa-check-circle",
  },
  {
    type: "warning",
    message: "Renewal deadline approaching for US10234567",
    time: "1 day ago",
    icon: "fas fa-clock",
  },
  {
    type: "error",
    message: "Payment failed for US10456789",
    time: "2 days ago",
    icon: "fas fa-exclamation-circle",
  },
  {
    type: "info",
    message: "New patent application US11123456 filed",
    time: "3 days ago",
    icon: "fas fa-file-alt",
  },
  {
    type: "success",
    message: "Patent US10345678 renewal scheduled",
    time: "1 week ago",
    icon: "fas fa-check-circle",
  },
]

const calendarData = [
  {
    date: "Feb 28",
    patents: [{ id: "US10234567", title: "Quantum Computing Circuit", urgency: "urgent" }],
  },
  {
    date: "Mar 15",
    patents: [{ id: "US10123456", title: "ML Algorithm", urgency: "medium" }],
  },
  {
    date: "Apr 10",
    patents: [
      { id: "US10345678", title: "Energy Storage", urgency: "low" },
      { id: "US10789012", title: "Solar Panel Tech", urgency: "medium" },
    ],
  },
  {
    date: "May 22",
    patents: [{ id: "US10567890", title: "Autonomous Vehicle", urgency: "low" }],
  },
]

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  loadUpcomingRenewals()
  loadRecentActivity()
  loadPatentSummary()
  loadCalendarEvents()
  setupEventListeners()
})

// Load upcoming renewals
function loadUpcomingRenewals() {
  const renewalList = document.getElementById("renewalList")
  if (!renewalList) return

  const upcomingPatents = patentsData.filter((patent) => patent.daysLeft <= 90).sort((a, b) => a.daysLeft - b.daysLeft)

  renewalList.innerHTML = upcomingPatents
    .map((patent) => {
      const urgencyClass = patent.daysLeft <= 30 ? "urgent" : patent.daysLeft <= 60 ? "medium" : "low"
      const urgencyText = patent.daysLeft <= 30 ? "urgent" : patent.daysLeft <= 60 ? "medium" : "low"

      return `
            <div class="renewal-item">
                <div class="renewal-info">
                    <h4>${patent.id}</h4>
                    <p>${patent.title}</p>
                    <div class="renewal-meta">
                        <span><i class="fas fa-calendar"></i> ${patent.nextRenewal}</span>
                        <span><i class="fas fa-clock"></i> ${patent.daysLeft} days left</span>
                        <span><i class="fas fa-dollar-sign"></i> ${patent.fee}</span>
                    </div>
                </div>
                <div class="renewal-actions">
                    <span class="badge ${urgencyClass}">${urgencyText}</span>
                    <button class="btn btn-primary" onclick="renewPatent('${patent.id}')">Renew</button>
                </div>
            </div>
        `
    })
    .join("")
}

// Load recent activity
function loadRecentActivity() {
  const activityList = document.getElementById("activityList")
  if (!activityList) return

  activityList.innerHTML = activitiesData
    .map(
      (activity) => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <p>${activity.message}</p>
                <span>${activity.time}</span>
            </div>
        </div>
    `,
    )
    .join("")
}

// Load patent summary
function loadPatentSummary() {
  const patentSummary = document.getElementById("patentSummary")
  if (!patentSummary) return

  const activePatents = patentsData.filter((p) => p.status === "Active").length
  const pendingPatents = patentsData.filter((p) => p.status === "Pending").length
  const totalFees = patentsData.reduce((sum, p) => {
    const fee = Number.parseInt(p.fee.replace(/[$,]/g, ""))
    return sum + (isNaN(fee) ? 0 : fee)
  }, 0)

  patentSummary.innerHTML = `
        <div class="summary-stats">
            <div class="summary-item">
                <h3>${activePatents}</h3>
                <p>Active Patents</p>
            </div>
            <div class="summary-item">
                <h3>${pendingPatents}</h3>
                <p>Pending Renewals</p>
            </div>
            <div class="summary-item">
                <h3>$${totalFees.toLocaleString()}</h3>
                <p>Total Renewal Fees</p>
            </div>
        </div>
        <div class="summary-chart">
            <div class="chart-placeholder">
                <i class="fas fa-chart-pie" style="font-size: 3rem; color: #cbd5e1;"></i>
                <p>Portfolio Distribution Chart</p>
            </div>
        </div>
    `
}

// Load calendar events
function loadCalendarEvents() {
  const calendarEvents = document.getElementById("calendarEvents")
  if (!calendarEvents) return

  calendarEvents.innerHTML = calendarData
    .map(
      (event) => `
        <div class="calendar-event">
            <div class="calendar-date">${event.date}</div>
            <div class="calendar-patents">
                ${event.patents
                  .map(
                    (patent) => `
                    <div class="calendar-patent">
                        <div class="calendar-patent-info">
                            <h5>${patent.id}</h5>
                            <p>${patent.title}</p>
                        </div>
                        <span class="badge ${patent.urgency}">${patent.urgency}</span>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
    `,
    )
    .join("")
}

// Setup event listeners
function setupEventListeners() {
  // Global search
  const globalSearch = document.getElementById("globalSearch")
  if (globalSearch) {
    globalSearch.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase()
      // Implement search functionality here
      console.log("Searching for:", searchTerm)
    })
  }

  // Mobile menu toggle (for responsive design)
  const menuToggle = document.createElement("button")
  menuToggle.className = "menu-toggle"
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>'
  menuToggle.style.display = "none"

  // Add mobile menu functionality
  if (window.innerWidth <= 768) {
    const header = document.querySelector(".header-left")
    if (header) {
      header.prepend(menuToggle)
      menuToggle.style.display = "block"
    }
  }

  // Window resize handler
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) {
      menuToggle.style.display = "block"
    } else {
      menuToggle.style.display = "none"
    }
  })
}

// Utility functions
function renewPatent(patentId) {
  alert(`Initiating renewal process for patent ${patentId}`)
  // Implement renewal logic here
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function calculateDaysLeft(dateString) {
  const targetDate = new Date(dateString)
  const today = new Date()
  const diffTime = targetDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Add some additional CSS for the summary stats
const additionalCSS = `
.summary-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.summary-item {
    text-align: center;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 0.5rem;
}

.summary-item h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    color: #3b82f6;
}

.summary-item p {
    color: #64748b;
    font-size: 0.875rem;
}

.chart-placeholder {
    text-align: center;
    padding: 2rem;
    background: #f8fafc;
    border-radius: 0.5rem;
}

.chart-placeholder p {
    margin-top: 0.5rem;
    color: #64748b;
}

.menu-toggle {
    background: none;
    border: none;
    font-size: 1.25rem;
    color: #64748b;
    cursor: pointer;
    padding: 0.5rem;
    margin-right: 1rem;
}

@media (max-width: 768px) {
    .summary-stats {
        grid-template-columns: 1fr;
    }
}
`

// Inject additional CSS
const style = document.createElement("style")
style.textContent = additionalCSS
document.head.appendChild(style)

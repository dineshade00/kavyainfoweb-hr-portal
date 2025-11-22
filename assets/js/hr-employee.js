// Employee Management JavaScript

// Sample employee data
const employeesData = [
  {
    id: 'EMP001',
    name: 'John Smith',
    email: 'john.smith@company.com',
    department: 'IT',
    jobTitle: 'Senior Software Engineer',
    status: 'Active',
    dateJoined: '2022-01-15',
    phone: '+1 234-567-8901',
    location: 'New York'
  },
  {
    id: 'EMP002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'HR',
    jobTitle: 'HR Manager',
    status: 'Active',
    dateJoined: '2021-08-10',
    phone: '+1 234-567-8902',
    location: 'Los Angeles'
  },
  {
    id: 'EMP003',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    department: 'IT',
    jobTitle: 'Frontend Developer',
    status: 'Active',
    dateJoined: '2023-03-20',
    phone: '+1 234-567-8903',
    location: 'San Francisco'
  },
  {
    id: 'EMP004',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    department: 'Finance',
    jobTitle: 'Financial Analyst',
    status: 'Active',
    dateJoined: '2022-09-05',
    phone: '+1 234-567-8904',
    location: 'Chicago'
  },
  {
    id: 'EMP005',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    department: 'Operations',
    jobTitle: 'Operations Manager',
    status: 'Active',
    dateJoined: '2021-11-12',
    phone: '+1 234-567-8905',
    location: 'Seattle'
  },
  {
    id: 'EMP006',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@company.com',
    department: 'IT',
    jobTitle: 'Backend Developer',
    status: 'Active',
    dateJoined: '2023-01-08',
    phone: '+1 234-567-8906',
    location: 'Austin'
  },
  {
    id: 'EMP007',
    name: 'Robert Martinez',
    email: 'robert.martinez@company.com',
    department: 'Sales',
    jobTitle: 'Sales Representative',
    status: 'Active',
    dateJoined: '2022-06-18',
    phone: '+1 234-567-8907',
    location: 'Miami'
  },
  {
    id: 'EMP008',
    name: 'Jennifer Taylor',
    email: 'jennifer.taylor@company.com',
    department: 'Marketing',
    jobTitle: 'Marketing Specialist',
    status: 'Active',
    dateJoined: '2023-05-14',
    phone: '+1 234-567-8908',
    location: 'Boston'
  },
  {
    id: 'EMP009',
    name: 'Christopher Brown',
    email: 'christopher.brown@company.com',
    department: 'IT',
    jobTitle: 'DevOps Engineer',
    status: 'Active',
    dateJoined: '2022-12-03',
    phone: '+1 234-567-8909',
    location: 'Denver'
  },
  {
    id: 'EMP010',
    name: 'Amanda Garcia',
    email: 'amanda.garcia@company.com',
    department: 'HR',
    jobTitle: 'Recruiter',
    status: 'Active',
    dateJoined: '2023-02-28',
    phone: '+1 234-567-8910',
    location: 'Phoenix'
  },
  {
    id: 'EMP011',
    name: 'James Rodriguez',
    email: 'james.rodriguez@company.com',
    department: 'Finance',
    jobTitle: 'Accountant',
    status: 'On Leave',
    dateJoined: '2021-07-22',
    phone: '+1 234-567-8911',
    location: 'Dallas'
  },
  {
    id: 'EMP012',
    name: 'Maria Gonzalez',
    email: 'maria.gonzalez@company.com',
    department: 'Operations',
    jobTitle: 'Quality Assurance',
    status: 'Active',
    dateJoined: '2023-04-11',
    phone: '+1 234-567-8912',
    location: 'Portland'
  },
  {
    id: 'EMP013',
    name: 'Thomas Lee',
    email: 'thomas.lee@company.com',
    department: 'IT',
    jobTitle: 'Data Scientist',
    status: 'Active',
    dateJoined: '2022-10-16',
    phone: '+1 234-567-8913',
    location: 'San Diego'
  },
  {
    id: 'EMP014',
    name: 'Nancy White',
    email: 'nancy.white@company.com',
    department: 'Sales',
    jobTitle: 'Sales Manager',
    status: 'Active',
    dateJoined: '2021-05-30',
    phone: '+1 234-567-8914',
    location: 'Las Vegas'
  },
  {
    id: 'EMP015',
    name: 'Kevin Harris',
    email: 'kevin.harris@company.com',
    department: 'IT',
    jobTitle: 'Full Stack Developer',
    status: 'Active',
    dateJoined: '2023-06-25',
    phone: '+1 234-567-8915',
    location: 'Nashville'
  }
];

// Global variables
let currentEmployees = [...employeesData];
let currentPage = 1;
let itemsPerPage = 10;
let sortColumn = '';
let sortDirection = 'asc';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  loadEmployees();
  setupEventListeners();
  updateStats();
});

// Setup event listeners
function setupEventListeners() {
  // Search functionality
  const searchInput = document.querySelector('input[placeholder="Search employees..."]');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      searchEmployees(e.target.value);
    });
  }

  // Department filter
  const departmentFilter = document.querySelector('select');
  if (departmentFilter) {
    departmentFilter.addEventListener('change', function(e) {
      filterByDepartment(e.target.value);
    });
  }

  // Add Employee button
  const addButton = document.querySelector('button[onclick*="empFormBox"]');
  if (addButton) {
    addButton.onclick = () => openEmployeeModal();
  }
}

// Load and display employees
function loadEmployees() {
  displayTable();
  displayCards();
  updatePagination();
}

// Display employees in table format (desktop)
function displayTable() {
  const tbody = document.getElementById('employeeTableBody');
  if (!tbody) return;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEmployees = currentEmployees.slice(startIndex, endIndex);

  tbody.innerHTML = paginatedEmployees.map(employee => `
    <tr>
      <td style="padding:15px;">
        <div class="d-flex align-items-center">
          <div class="avatar me-3" style="width:40px;height:40px;border-radius:50%;background:#0b7368;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;">
            ${employee.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style="font-weight:600;">${employee.name}</div>
            <div style="color:#6c757d;font-size:12px;">${employee.id}</div>
            <div style="color:#6c757d;font-size:12px;">${employee.email}</div>
          </div>
        </div>
      </td>
      <td style="padding:15px;">${employee.department}</td>
      <td style="padding:15px;">${employee.jobTitle}</td>
      <td style="padding:15px;">
        <span class="badge ${getStatusBadgeClass(employee.status)}">${employee.status}</span>
      </td>
      <td style="padding:15px;">${formatDate(employee.dateJoined)}</td>
      <td style="padding:15px;">
        <div class="btn-group" role="group">
          <button class="btn btn-sm btn-outline-primary" onclick="viewEmployee('${employee.id}')" title="View">
            <i class="fas fa-eye"></i>
          </button>
          <button class="btn btn-sm btn-outline-secondary" onclick="editEmployee('${employee.id}')" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteEmployee('${employee.id}')" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Display employees in card format (mobile)
function displayCards() {
  const cardsContainer = document.getElementById('employeeCards');
  if (!cardsContainer) return;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEmployees = currentEmployees.slice(startIndex, endIndex);

  cardsContainer.innerHTML = paginatedEmployees.map(employee => `
    <div style="padding:20px;border-bottom:1px solid #e5e7eb;">
      <div class="d-flex justify-content-between align-items-start mb-3">
        <div class="d-flex align-items-center">
          <div class="avatar me-3" style="width:50px;height:50px;border-radius:50%;background:#0b7368;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;">
            ${employee.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style="font-weight:600;font-size:16px;">${employee.name}</div>
            <div style="color:#6c757d;font-size:14px;">${employee.id}</div>
          </div>
        </div>
        <span class="badge ${getStatusBadgeClass(employee.status)}">${employee.status}</span>
      </div>
      
      <div style="margin-bottom:15px;">
        <div style="margin-bottom:5px;"><i class="fas fa-envelope me-2 text-muted"></i><span style="font-size:14px;">${employee.email}</span></div>
        <div style="margin-bottom:5px;"><i class="fas fa-briefcase me-2 text-muted"></i><span style="font-size:14px;">${employee.jobTitle}</span></div>
        <div style="margin-bottom:5px;"><i class="fas fa-building me-2 text-muted"></i><span style="font-size:14px;">${employee.department}</span></div>
        <div><i class="fas fa-calendar me-2 text-muted"></i><span style="font-size:14px;">${formatDate(employee.dateJoined)}</span></div>
      </div>
      
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-outline-primary flex-fill" onclick="viewEmployee('${employee.id}')">
          <i class="fas fa-eye me-1"></i>View
        </button>
        <button class="btn btn-sm btn-outline-secondary flex-fill" onclick="editEmployee('${employee.id}')">
          <i class="fas fa-edit me-1"></i>Edit
        </button>
        <button class="btn btn-sm btn-outline-danger flex-fill" onclick="deleteEmployee('${employee.id}')">
          <i class="fas fa-trash me-1"></i>Delete
        </button>
      </div>
    </div>
  `).join('');
}

// Get status badge class
function getStatusBadgeClass(status) {
  switch(status) {
    case 'Active': return 'bg-success';
    case 'On Leave': return 'bg-warning';
    case 'Inactive': return 'bg-secondary';
    default: return 'bg-secondary';
  }
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Sort table
function sortTable(columnIndex) {
  const columns = ['name', 'department', 'jobTitle', 'status', 'dateJoined'];
  const column = columns[columnIndex];
  
  if (sortColumn === column) {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn = column;
    sortDirection = 'asc';
  }

  currentEmployees.sort((a, b) => {
    let aVal = a[column];
    let bVal = b[column];

    if (column === 'dateJoined') {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    } else {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });

  loadEmployees();
  updateSortIcons(columnIndex);
}

// Update sort icons
function updateSortIcons(activeColumnIndex) {
  const headers = document.querySelectorAll('th[onclick*="sortTable"]');
  headers.forEach((header, index) => {
    const icon = header.querySelector('i');
    if (index === activeColumnIndex) {
      icon.className = sortDirection === 'asc' ? 'fas fa-sort-up ms-1' : 'fas fa-sort-down ms-1';
    } else {
      icon.className = 'fas fa-sort ms-1';
    }
  });
}

// Search employees
function searchEmployees(searchTerm) {
  const filtered = employeesData.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  currentEmployees = filtered;
  currentPage = 1;
  loadEmployees();
}

// Filter by department
function filterByDepartment(department) {
  if (department === 'All Departments') {
    currentEmployees = [...employeesData];
  } else {
    currentEmployees = employeesData.filter(emp => emp.department === department);
  }
  
  currentPage = 1;
  loadEmployees();
}

// Update pagination
function updatePagination() {
  const totalPages = Math.ceil(currentEmployees.length / itemsPerPage);
  const pagination = document.getElementById('pagination');
  const showingFrom = document.getElementById('showingFrom');
  const showingTo = document.getElementById('showingTo');
  const totalEmployees = document.getElementById('totalEmployees');

  if (totalEmployees) totalEmployees.textContent = currentEmployees.length;
  
  if (showingFrom && showingTo) {
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, currentEmployees.length);
    showingFrom.textContent = startIndex;
    showingTo.textContent = endIndex;
  }

  if (pagination) {
    pagination.innerHTML = '';
    
    // Previous button
    pagination.innerHTML += `
      <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
      </li>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pagination.innerHTML += `
          <li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
          </li>
        `;
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pagination.innerHTML += '<li class="page-item disabled"><span class="page-link">...</span></li>';
      }
    }

    // Next button
    pagination.innerHTML += `
      <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
      </li>
    `;
  }
}

// Change page
function changePage(page) {
  const totalPages = Math.ceil(currentEmployees.length / itemsPerPage);
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    loadEmployees();
  }
}

// Employee CRUD operations
function openEmployeeModal() {
  const modal = document.getElementById('empFormBox');
  if (modal) {
    modal.style.display = 'block';
    // Reset form
    modal.querySelector('form').reset();
    modal.querySelector('h4').textContent = 'Add New Employee';
  }
}

function viewEmployee(employeeId) {
  const employee = employeesData.find(emp => emp.id === employeeId);
  if (!employee) return;

  // Create view modal content
  const viewContent = `
    <div style="max-height:60vh;overflow-y:auto;">
      <div class="text-center mb-4">
        <div style="width:80px;height:80px;border-radius:50%;background:#0b7368;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:24px;margin:0 auto 15px;">
          ${employee.name.split(' ').map(n => n[0]).join('')}
        </div>
        <h5 class="mb-1">${employee.name}</h5>
        <p class="text-muted mb-0">${employee.jobTitle}</p>
      </div>
      
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label fw-bold">Employee ID</label>
          <div class="p-2 bg-light rounded">${employee.id}</div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label fw-bold">Email</label>
          <div class="p-2 bg-light rounded">${employee.email}</div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label fw-bold">Department</label>
          <div class="p-2 bg-light rounded">${employee.department}</div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label fw-bold">Status</label>
          <div class="p-2 bg-light rounded">
            <span class="badge ${getStatusBadgeClass(employee.status)}">${employee.status}</span>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label fw-bold">Date Joined</label>
          <div class="p-2 bg-light rounded">${formatDate(employee.dateJoined)}</div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label fw-bold">Phone</label>
          <div class="p-2 bg-light rounded">${employee.phone}</div>
        </div>
        <div class="col-12">
          <label class="form-label fw-bold">Location</label>
          <div class="p-2 bg-light rounded">${employee.location}</div>
        </div>
      </div>
    </div>
  `;

  showModal('Employee Details', viewContent);
}

function editEmployee(employeeId) {
  const employee = employeesData.find(emp => emp.id === employeeId);
  if (!employee) return;

  // Switch to edit mode in the existing form
  const modal = document.getElementById('empFormBox');
  if (modal) {
    modal.style.display = 'block';
    modal.querySelector('h4').textContent = 'Edit Employee';
    
    // Populate form fields
    const form = modal.querySelector('form');
    const inputs = form.querySelectorAll('input, select');
    inputs[0].value = employee.name; // Full Name
    inputs[1].value = employee.id; // Employee ID
    inputs[2].value = employee.email; // Email
    inputs[3].value = employee.phone; // Phone
    inputs[4].value = employee.dateJoined; // Date of Joining
    inputs[5].value = employee.jobTitle; // Job Role
    
    // Handle department and other selects
    const selects = form.querySelectorAll('select');
    selects[0].value = employee.department; // Department
    selects[1].value = 'Select IT Team'; // IT Sub-Department (if needed)
    selects[2].value = 'Full Time'; // Employment Type
  }
}

function deleteEmployee(employeeId) {
  if (confirm('Are you sure you want to delete this employee?')) {
    const index = employeesData.findIndex(emp => emp.id === employeeId);
    if (index !== -1) {
      employeesData.splice(index, 1);
      currentEmployees = [...employeesData];
      loadEmployees();
      updateStats();
    }
  }
}

// Show modal
function showModal(title, content) {
  // Create modal if it doesn't exist
  let modal = document.getElementById('viewModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'viewModal';
    modal.style.cssText = `
      display: none;
      position: fixed;
      left: 50%;
      top: 15%;
      transform: translateX(-50%);
      width: 90%;
      max-width: 600px;
      background: #fff;
      border: 1px solid #d1d5db;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      z-index: 1000;
      max-height: 70vh;
      overflow: hidden;
    `;
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid #e6e6e6; padding-bottom:10px;">
      <h4 style="margin:0; color:#0b7368; font-weight:700;">${title}</h4>
      <button onclick="document.getElementById('viewModal').style.display='none';" style="border:none;background:none;font-size:22px;font-weight:700;color:#333;">&times;</button>
    </div>
    ${content}
    <div style="text-align:right;margin-top:20px;">
      <button class="btn btn-secondary" onclick="document.getElementById('viewModal').style.display='none'">Close</button>
    </div>
  `;
  
  modal.style.display = 'block';
}

// Update statistics
function updateStats() {
  const totalEmployees = employeesData.length;
  const activeEmployees = employeesData.filter(emp => emp.status === 'Active').length;
  const newThisMonth = employeesData.filter(emp => {
    const joinDate = new Date(emp.dateJoined);
    const currentDate = new Date();
    return joinDate.getMonth() === currentDate.getMonth() && 
           joinDate.getFullYear() === currentDate.getFullYear();
  }).length;
  const resignedThisMonth = Math.floor(Math.random() * 5) + 3; // Mock data

  // Update the stat cards if they exist
  const statCards = document.querySelectorAll('.stat-card');
  if (statCards.length >= 4) {
    statCards[0].querySelector('div:last-child').textContent = totalEmployees;
    statCards[1].querySelector('div:last-child').textContent = activeEmployees;
    statCards[2].querySelector('div:last-child').textContent = newThisMonth;
    statCards[3].querySelector('div:last-child').textContent = resignedThisMonth;
  }
}
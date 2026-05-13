/**
 * app.js — UI, Routing, and Layout Logic
 * ระบบบริหารภาระงานอัจฉริยะ — มหาวิทยาลัย (มอดูล 4)
 */

const AppState = {
  currentUser: null,
  currentRole: null, // 'HR' or 'DH'
  history: []
};

const UI = {
  showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type === 'danger' ? 'bg-danger' : ''}`;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
  },

  showModal(title, body, confirmText, onConfirm) {
    const overlay = document.getElementById('modal-overlay');
    const box = document.getElementById('modal-box');

    let actionsHtml = confirmText ? `
      <div class="modal-actions mt-4">
        <button class="btn btn-outline" onclick="UI.hideModal()">ยกเลิก</button>
        <button class="btn btn-primary" id="modal-confirm-btn">${confirmText}</button>
      </div>` : `
      <div class="modal-actions mt-4">
        <button class="btn btn-primary" onclick="UI.hideModal()">ตกลง</button>
      </div>`;

    box.innerHTML = `
      <div class="modal-title">${title}</div>
      <div class="modal-body">${body}</div>
      ${actionsHtml}`;

    overlay.classList.remove('hidden');

    if (confirmText && onConfirm) {
      document.getElementById('modal-confirm-btn').onclick = () => {
        onConfirm();
        this.hideModal();
      };
    }
  },

  hideModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
  },

  renderChart(canvasId, type, labels, datasets, extraOptions = {}) {
    setTimeout(() => {
      const ctx = document.getElementById(canvasId);
      if (!ctx) return;
      // Destroy existing chart if any
      if (ctx._chartInstance) ctx._chartInstance.destroy();
      const chart = new Chart(ctx, {
        type,
        data: { labels, datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { font: { family: 'Sarabun', size: 13 } } } },
          ...extraOptions
        }
      });
      ctx._chartInstance = chart;
    }, 150);
  },

  renderLayout(content, title, currentMenuId) {
    const menuItems = AppState.currentRole === 'HR' ? this.getHRMenu() : this.getDHMenu();
    const currentUserData = DB.get('users').find(u => u.role === AppState.currentRole);
    const displayName = currentUserData ? currentUserData.name.replace(/^(นาย|นาง|นางสาว)\s*/, '').split(' ')[0] : AppState.currentUser;

    let menuHtml = menuItems.map(item => `
      <a class="menu-item ${item.id === currentMenuId ? 'active' : ''}" onclick="Router.navigate('${item.route}')">
        <i class="${item.icon}"></i>
        <span>${item.label}</span>
        ${item.badge ? `<span class="menu-badge">${item.badge}</span>` : ''}
      </a>
    `).join('');

    return `
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo-wrap">
            <div class="sidebar-logo"><i class="ph-fill ph-graduation-cap"></i></div>
            <div class="sidebar-logo-text">
              <div class="sidebar-uni">มทส. — SUT</div>
              <div class="sidebar-sys">ระบบบริหารภาระงานอัจฉริยะ</div>
            </div>
          </div>
          <div style="font-size:0.7rem; color:var(--text-muted); padding: 0 16px 4px; line-height:1.4;">มหาวิทยาลัยเทคโนโลยีสุรนารี</div>
          <div class="sidebar-role-tag">${AppState.currentRole === 'HR' ? '🏛 กองบริหารทรัพยากรบุคคล' : '🖥 กองเทคโนโลยีสารสนเทศ'}</div>
        </div>
        <div class="sidebar-menu">
          ${menuHtml}
        </div>
        <div class="sidebar-footer-area">
          <div class="sidebar-user-card">
            <div class="sidebar-user-avatar"><i class="ph-fill ph-user"></i></div>
            <div class="sidebar-user-info">
              <div class="sidebar-user-name">${displayName}</div>
              <div class="sidebar-user-role">${AppState.currentRole === 'HR' ? 'เจ้าหน้าที่ฝ่ายบุคคล' : 'หัวหน้ากองเทคโนโลยีสารสนเทศ'}</div>
            </div>
          </div>
          <a class="menu-item logout-item" onclick="Router.navigate('${AppState.currentRole === 'HR' ? 'hr-43' : 'dh-57'}')">
            <i class="ph ph-sign-out"></i> <span>ออกจากระบบ</span>
          </a>
        </div>
      </aside>
      <main class="main-content">
        <header class="topbar">
          <div class="topbar-left">
            <div class="topbar-breadcrumb">
              <span class="topbar-system">มหาวิทยาลัยเทคโนโลยีสุรนารี</span>
              <i class="ph ph-caret-right" style="font-size:0.75rem; color:var(--text-muted)"></i>
              <span class="topbar-system">ระบบบริหารภาระงานอัจฉริยะ</span>
              <i class="ph ph-caret-right" style="font-size:0.75rem; color:var(--text-muted)"></i>
              <span class="topbar-module">มอดูล 4 — บริหารศักยภาพและอัตรากำลัง</span>
            </div>
            <div style="display:flex; align-items:center; gap: 12px;">
              ${AppState.history.length > 1 ? '<button class="btn btn-outline" style="padding: 6px 12px; height: 36px; border-radius: 6px; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; background: white;" onclick="Router.goBack()"><i class="ph ph-arrow-left" style="font-size: 16px;"></i> ย้อนกลับ</button>' : ''}
              <h1 class="topbar-title" style="margin:0;">${title}</h1>
            </div>
          </div>
          <div class="topbar-right">
            <div class="topbar-date-badge">
              <i class="ph ph-calendar-blank"></i>
              ${new Date().toLocaleDateString('th-TH', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
            </div>
            <div class="user-profile topbar-badge" onclick="Router.navigate('${AppState.currentRole === 'HR' ? 'hr-45' : 'dh-59'}')">
              <span style="font-weight:600; font-size:0.85rem;">${displayName}</span>
              <div class="avatar"><i class="ph-fill ph-user"></i></div>
            </div>
          </div>
        </header>
        <div class="content-area">
          ${content}
        </div>
      </main>
    `;
  },

  getHRMenu() {
    const pendingCount = (typeof DB !== 'undefined') ? DB.get('requests').filter(r => r.status === 'รออนุมัติ').length : 0;
    return [
      { id: 'dashboard', label: 'ภาพรวมระบบ', icon: 'ph-fill ph-squares-four', route: 'hr-04' },
      { id: 'skills', label: 'เกณฑ์มาตรฐานทักษะ', icon: 'ph-fill ph-book-bookmark', route: 'hr-08' },
      { id: 'gap', label: 'วิเคราะห์ช่องว่างทักษะ', icon: 'ph-fill ph-chart-polar', route: 'hr-16' },
      { id: 'approval', label: 'อนุมัติแผนงาน', icon: 'ph-fill ph-check-square-offset', route: 'hr-28', badge: pendingCount > 0 ? pendingCount : null },
      { id: 'users', label: 'จัดการผู้ใช้งาน', icon: 'ph-fill ph-users', route: 'hr-48' }
    ];
  },

  getDHMenu() {
    return [
      { id: 'dashboard', label: 'ภาพรวมหน่วยงาน', icon: 'ph-fill ph-squares-four', route: 'dh-04' },
      { id: 'eval', label: 'ประเมินศักยภาพบุคลากร', icon: 'ph-fill ph-star', route: 'dh-05' },
      { id: 'workforce', label: 'อัตรากำลังปัจจุบัน', icon: 'ph-fill ph-users-three', route: 'dh-17' },
      { id: 'gap', label: 'วิเคราะห์อัตรากำลัง', icon: 'ph-fill ph-chart-bar', route: 'dh-26' },
      { id: 'dev-plan', label: 'แผนพัฒนาบุคลากร (IDP)', icon: 'ph-fill ph-student', route: 'dh-32' },
      { id: 'unit-plan', label: 'แผนพัฒนาหน่วยงาน', icon: 'ph-fill ph-buildings', route: 'dh-43' }
    ];
  }
};

const Router = {
  routes: {},

  init() {
    if (typeof PagesHR !== 'undefined') Object.assign(this.routes, PagesHR);
    if (typeof PagesDH !== 'undefined') Object.assign(this.routes, PagesDH);
    this.routes['login'] = this.renderLogin.bind(this);
    this.navigate('login');
    this.renderDevMenu();
  },

  renderDevMenu() {
    const devBtn = document.createElement('button');
    devBtn.className = 'dev-menu-btn';
    devBtn.innerHTML = '<i class="ph-fill ph-list-dashes"></i>';
    devBtn.onclick = () => document.getElementById('dev-menu').classList.toggle('active');
    document.body.appendChild(devBtn);

    const devMenu = document.createElement('div');
    devMenu.id = 'dev-menu';
    devMenu.className = 'dev-menu';

    // Map existing routes to the new sequential image names
    const popupsDH = ['dh-09', 'dh-23', 'dh-39', 'dh-50', 'dh-57'];
    const popupsHR = ['hr-14', 'hr-18', 'hr-21', 'hr-33', 'hr-34', 'hr-43'];

    // We use the insertion order to map sequentially
    const dhRoutes = Object.keys(this.routes).filter(r => r.startsWith('dh') && !popupsDH.includes(r));
    const hrRoutes = Object.keys(this.routes).filter(r => r.startsWith('hr') && !popupsHR.includes(r));

    let linksHtml = '';
    dhRoutes.forEach((route, index) => {
      linksHtml += `<div class="dev-link" id="dev-link-${route}" onclick="Router.devNavigate('${route}')">
        <span>DH - ${index + 1}</span>
        <span class="role-badge">DH</span>
      </div>`;
    });

    hrRoutes.forEach((route, index) => {
      linksHtml += `<div class="dev-link" id="dev-link-${route}" onclick="Router.devNavigate('${route}')">
        <span>HR - ${index + 1}</span>
        <span class="role-badge">HR</span>
      </div>`;
    });

    devMenu.innerHTML = `
      <div class="dev-menu-header">
        <span>🚀 นำทางหน้าจอ</span>
        <i class="ph ph-x" style="cursor:pointer" onclick="document.getElementById('dev-menu').classList.remove('active')"></i>
      </div>
      <div class="dev-menu-body">
        <div class="dev-link" id="dev-link-login" onclick="Router.devNavigate('login')">
          <span>Login / Logout</span>
          <span class="role-badge">ALL</span>
        </div>
        ${linksHtml}
      </div>`;
    document.body.appendChild(devMenu);
  },

  devNavigate(routeId) {
    if (routeId.startsWith('hr')) {
      AppState.currentUser = 'นางสาวจันทิมา อ่อนละมุน'; AppState.currentRole = 'HR';
    } else if (routeId.startsWith('dh')) {
      AppState.currentUser = 'นายวีระพงศ์ ตันติวิทยา'; AppState.currentRole = 'DH';
    } else {
      AppState.currentUser = null; AppState.currentRole = null;
    }
    this.navigate(routeId);
  },

  navigate(routeId, params = {}) {
    console.log(`Navigating to: ${routeId}`);
    if (this.routes[routeId]) {
      AppState.history.push(routeId);
      const html = this.routes[routeId](params);
      document.getElementById('app').innerHTML = html;
      window.scrollTo(0, 0);

      document.querySelectorAll('.dev-link').forEach(el => el.classList.remove('current-active'));
      const activeLink = document.getElementById(`dev-link-${routeId}`);
      if (activeLink) activeLink.classList.add('current-active');
    } else {
      console.error(`Route not found: ${routeId}`);
      UI.showToast(`ไม่พบหน้าจอ ${routeId}`, 'danger');
    }
  },

  goBack() {
    if (AppState.history.length > 1) {
      AppState.history.pop();
      const prev = AppState.history.pop();
      this.navigate(prev);
    }
  },

  renderLogin() {
    return `
      <div class="login-container">
        <div class="login-bg-pattern"></div>
        <div class="login-box">
          <div class="login-header">
            <div class="login-logo"><i class="ph-fill ph-graduation-cap"></i></div>
            <div class="login-uni-badge">มหาวิทยาลัยเทคโนโลยีสุรนารี</div>
            <div style="font-size:0.72rem; color:var(--text-muted); margin-top:4px; line-height:1.5;">
              Suranaree University of Technology (SUT)<br>
              111 ถนนมหาวิทยาลัย ต.สุรนารี อ.เมือง จ.นครราชสีมา 30000
            </div>
          </div>
          <h2 class="login-title">ระบบบริหารภาระงานอัจฉริยะ</h2>
          <p class="login-subtitle">มอดูล 4 — บริหารศักยภาพและอัตรากำลัง<br><small>(Capacity & Workforce Planning)</small></p>
          <p class="login-subtitle" style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">สำหรับบุคลากรสายสนับสนุน มหาวิทยาลัยเทคโนโลยีสุรนารี</p>

          <div id="login-alert" class="alert alert-danger hidden">
            <i class="ph-fill ph-warning-circle"></i>
            <span id="login-alert-text"></span>
          </div>

          <div class="input-group" style="text-align:left;">
            <label class="input-label"><i class="ph ph-user" style="margin-right:4px;"></i> ชื่อผู้ใช้งาน</label>
            <input type="text" id="username" class="input-field" placeholder="กรอกชื่อผู้ใช้งาน" value="hr"
              onkeydown="if(event.key==='Enter')Router.handleLogin()">
          </div>
          <div class="input-group" style="text-align:left;">
            <label class="input-label"><i class="ph ph-lock" style="margin-right:4px;"></i> รหัสผ่าน</label>
            <input type="password" id="password" class="input-field" placeholder="••••••" value="1234"
              onkeydown="if(event.key==='Enter')Router.handleLogin()">
          </div>

          <button class="btn btn-primary login-btn" onclick="Router.handleLogin()">
            <i class="ph ph-sign-in"></i> เข้าสู่ระบบ
          </button>

          <div class="login-demo-box">
            <div class="login-demo-title"><i class="ph ph-key"></i> บัญชีทดสอบระบบ</div>
            <div class="login-demo-row" onclick="document.getElementById('username').value='hr';document.getElementById('password').value='1234'">
              <span class="login-demo-role hr-role">HR</span>
              <span>เจ้าหน้าที่ฝ่ายบุคคล</span>
              <code>hr / 1234</code>
            </div>
            <div class="login-demo-row" onclick="document.getElementById('username').value='dh';document.getElementById('password').value='1234'">
              <span class="login-demo-role dh-role">DH</span>
              <span>หัวหน้ากองเทคโนโลยีสารสนเทศ</span>
              <code>dh / 1234</code>
            </div>
          </div>
          <div style="margin-top:20px; padding-top:16px; border-top:1px solid var(--border); text-align:center; font-size:0.72rem; color:var(--text-muted); line-height:1.6;">
            © ${new Date().getFullYear()} มหาวิทยาลัยเทคโนโลยีสุรนารี — กองบริหารทรัพยากรบุคคล<br>
            พัฒนาโดย กองเทคโนโลยีสารสนเทศ มทส. | โทร. 0-4422-3010
          </div>
        </div>
      </div>
    `;
  },

  handleLogin() {
    const user = document.getElementById('username').value.toLowerCase().trim();
    const pass = document.getElementById('password').value;
    const alertBox = document.getElementById('login-alert');
    const alertText = document.getElementById('login-alert-text');
    alertBox.classList.add('hidden');

    if (user !== 'hr' && user !== 'dh') {
      alertText.textContent = 'ไม่พบชื่อผู้ใช้งานในระบบ (ลองใช้ hr หรือ dh)';
      alertBox.classList.remove('hidden');
      return;
    }
    if (pass !== '1234') {
      alertText.textContent = 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง';
      alertBox.classList.remove('hidden');
      return;
    }

    const userData = DB.get('users').find(u => u.username === user);
    AppState.currentUser = userData ? userData.name : (user === 'hr' ? 'นางสาวจันทิมา อ่อนละมุน' : 'นายวีระพงศ์ ตันติวิทยา');
    AppState.currentRole = user === 'hr' ? 'HR' : 'DH';
    UI.showToast('เข้าสู่ระบบสำเร็จ ยินดีต้อนรับ');

    if (AppState.currentRole === 'HR') {
      this.navigate('hr-04');
    } else {
      this.navigate('dh-04');
    }
  }
};

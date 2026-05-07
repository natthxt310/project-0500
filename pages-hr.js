/**
 * pages-hr.js — HR Role Screens
 * ระบบบริหารภาระงานอัจฉริยะ — มหาวิทยาลัย มอดูล 4
 */

const PagesHR = {
  // HR-01/02/03 handled in app.js (Login)

  /* ─────────────────────────────────────────
     P1.0 ภาพรวมระบบ
  ───────────────────────────────────────── */
  'hr-04': () => {
    const emps = DB.get('employees');
    const skills = DB.get('skills');
    const reqs = DB.get('requests');
    const pending = reqs.filter(r => r.status === 'รออนุมัติ');
    return UI.renderLayout(`
      <div class="page-hero">
        <div class="page-hero-icon"><i class="ph-fill ph-shield-check"></i></div>
        <div>
          <h2>ยินดีต้อนรับ, ${(DB.get('users').find(u => u.role === 'HR') || { name: 'HR Admin' }).name.replace(/^(นาย|นาง|นางสาว)\s*/, '').split(' ')[0]}</h2>
          <p>ระบบบริหารศักยภาพและอัตรากำลัง — มหาวิทยาลัยเทคโนโลยีสุรนารี | ${new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
      <div class="grid-3">
        <div class="stat-card" onclick="Router.navigate('hr-08')" style="border-top:3px solid var(--info);">
          <span class="stat-label">บุคลากรสายสนับสนุนทั้งหมด <span class="trend-up">↑ +1</span></span>
          <span class="stat-value">${emps.length}</span>
          <span style="font-size:0.78rem; color:var(--text-muted);">คน (ใน ${[...new Set(emps.map(e => e.dept))].length} กอง)</span>
          <i class="ph-fill ph-users stat-icon"></i>
        </div>
        <div class="stat-card" onclick="Router.navigate('hr-08')" style="border-top:3px solid var(--success);">
          <span class="stat-label">
            <span class="tooltip" data-tooltip="D4: เกณฑ์มาตรฐานทักษะตามกรอบสมรรถนะ">เกณฑ์มาตรฐานทักษะ (D4) <i class="ph-fill ph-question"></i></span>
          </span>
          <span class="stat-value">${skills.length}</span>
          <span style="font-size:0.78rem; color:var(--text-muted);">ทักษะ (หลัก ${skills.filter(s => s.type === 'หลัก').length} + เฉพาะด้าน ${skills.filter(s => s.type === 'เฉพาะด้าน').length})</span>
          <i class="ph-fill ph-book-bookmark stat-icon"></i>
        </div>
        <div class="stat-card" onclick="Router.navigate('hr-28')" style="border-top:3px solid var(--warning);">
          <span class="stat-label">แผนงานรออนุมัติ <span class="trend-down">${pending.length > 0 ? '⚠ ด่วน!' : ''}</span></span>
          <span class="stat-value ${pending.length > 0 ? 'text-warning' : ''}">${pending.length}</span>
          <span style="font-size:0.78rem; color:var(--text-muted);">รายการ</span>
          <i class="ph-fill ph-bell stat-icon"></i>
        </div>
      </div>
      <div class="ai-box">
        <i class="ph-fill ph-robot ai-box-icon"></i>
        <div>
          <strong>🤖 AI Insight — สรุปภาพรวมมหาวิทยาลัยวันนี้</strong>
          พบบุคลากรที่ต้องพัฒนาทักษะ <b>2 คน</b> ต่ำกว่าเกณฑ์ D4 | กองเทคโนโลยีสารสนเทศ ขาดอัตรากำลัง 2 อัตรา ปริมาณงานเกิน 33% | แนะนำพิจารณา <b>REQ-001</b> เป็นลำดับแรก — สอดคล้องกับแผนพัฒนาดิจิทัลมหาวิทยาลัย
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title"><i class="ph-fill ph-chart-bar"></i> ผลวิเคราะห์ช่องว่างทักษะล่าสุด</h3>
          <button class="btn btn-primary" onclick="Router.navigate('hr-16')"><i class="ph ph-chart-polar"></i> วิเคราะห์ใหม่</button>
        </div>
        <div class="grid-3">
          <div style="text-align:center;padding:20px;background:var(--success-bg);border-radius:10px;border:1px solid #bbf7d0;">
            <div style="font-size:2rem;font-weight:800;color:#15803d;">2</div>
            <div style="font-size:0.82rem;color:#15803d;font-weight:700;margin-top:4px;">ผ่านเกณฑ์ ✓</div>
            <div style="font-size:0.75rem;color:#15803d;opacity:0.7;">คะแนนรวมตามเป้าหมาย</div>
          </div>
          <div style="text-align:center;padding:20px;background:var(--warning-bg);border-radius:10px;border:1px solid #fde68a;">
            <div style="font-size:2rem;font-weight:800;color:#92400e;">1</div>
            <div style="font-size:0.82rem;color:#92400e;font-weight:700;margin-top:4px;">บุคลากรดาวเด่น ⭐</div>
            <div style="font-size:0.75rem;color:#92400e;opacity:0.7;">คะแนนสูงกว่าเกณฑ์</div>
          </div>
          <div style="text-align:center;padding:20px;background:var(--danger-bg);border-radius:10px;border:1px solid #fecaca;">
            <div style="font-size:2rem;font-weight:800;color:#991b1b;">2</div>
            <div style="font-size:0.82rem;color:#991b1b;font-weight:700;margin-top:4px;">ต้องพัฒนาเร่งด่วน ⚠</div>
            <div style="font-size:0.75rem;color:#991b1b;opacity:0.7;">คะแนนต่ำกว่าเกณฑ์ D4</div>
          </div>
        </div>
      </div>
    `, 'ภาพรวมระบบ — กองบริหารทรัพยากรบุคคล', 'dashboard');
  },

  'hr-05': () => UI.renderLayout(`
    <div class="card">
      <div class="card-header"><h3 class="card-title">ประวัติการเข้าใช้งานระบบ (D0)</h3></div>
      <table>
        <tr><th>วันเวลา</th><th>ผู้ใช้งาน</th><th>กอง/สังกัด</th><th>เหตุการณ์</th><th>IP Address</th></tr>
        <tr class="clickable-row" onclick="Router.navigate('hr-06')"><td>07/05/2569 09:45</td><td>นางสาวจันทิมา อ่อนละมุน</td><td>กองบริหารทรัพยากรบุคคล</td><td><span class="badge badge-success">เข้าสู่ระบบสำเร็จ</span></td><td>172.16.0.10</td></tr>
        <tr class="clickable-row" onclick="Router.navigate('hr-06')"><td>06/05/2569 15:30</td><td>นายวีระพงศ์ ตันติวิทยา</td><td>กองเทคโนโลยีสารสนเทศ</td><td><span class="badge badge-success">เข้าสู่ระบบสำเร็จ</span></td><td>172.16.0.25</td></tr>
        <tr class="clickable-row" onclick="Router.navigate('hr-06')"><td>06/05/2569 08:10</td><td>นางสาวจันทิมา อ่อนละมุน</td><td>กองบริหารทรัพยากรบุคคล</td><td><span class="badge badge-info">บันทึกข้อมูลเกณฑ์ทักษะ</span></td><td>172.16.0.10</td></tr>
      </table>
    </div>
  `, 'ประวัติการเข้าใช้งาน', 'dashboard'),

  'hr-06': () => UI.renderLayout(`
    <div class="card" style="max-width:600px;">
      <div class="card-header">
        <h3 class="card-title">รายละเอียดบันทึกการใช้งาน</h3>
        <button class="btn btn-outline" onclick="Router.goBack()"><i class="ph ph-arrow-left"></i> กลับ</button>
      </div>
      <div class="info-row"><div class="info-label">ผู้ใช้งาน</div><div class="info-value">นางสาวจันทิมา อ่อนละมุน (HR)</div></div>
      <div class="info-row"><div class="info-label">กอง/สังกัด</div><div class="info-value">กองบริหารทรัพยากรบุคคล</div></div>
      <div class="info-row"><div class="info-label">เหตุการณ์</div><div class="info-value"><span class="badge badge-success">เข้าสู่ระบบสำเร็จ</span></div></div>
      <div class="info-row"><div class="info-label">วันเวลา</div><div class="info-value">07/05/2569 09:45:23 น.</div></div>
      <div class="info-row"><div class="info-label">IP Address</div><div class="info-value">172.16.0.10</div></div>
      <div class="info-row"><div class="info-label">เบราว์เซอร์</div><div class="info-value">Chrome 124.0 — Windows 11</div></div>
    </div>
  `, 'รายละเอียดบันทึกการใช้งาน', 'dashboard'),

  /* ─────────────────────────────────────────
     P4.0 เกณฑ์มาตรฐานทักษะ (D4)
  ───────────────────────────────────────── */
  'hr-07': () => {
    const skills = DB.get('skills');
    return UI.renderLayout(`
      <div class="grid-3 mb-4">
        <div class="stat-card" style="border-top:3px solid var(--primary);">
          <span class="stat-label">ทักษะหลัก (Core Competency)</span>
          <span class="stat-value">${skills.filter(s => s.type === 'หลัก').length}</span>
          <i class="ph-fill ph-star stat-icon"></i>
        </div>
        <div class="stat-card" style="border-top:3px solid var(--info);">
          <span class="stat-label">ทักษะเฉพาะด้าน (Functional)</span>
          <span class="stat-value">${skills.filter(s => s.type === 'เฉพาะด้าน').length}</span>
          <i class="ph-fill ph-wrench stat-icon"></i>
        </div>
        <div class="stat-card" style="border-top:3px solid var(--success);">
          <span class="stat-label">ทักษะทั้งหมดในระบบ</span>
          <span class="stat-value">${skills.length}</span>
          <i class="ph-fill ph-book-bookmark stat-icon"></i>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3 class="card-title"><i class="ph-fill ph-book-bookmark"></i> คลังเกณฑ์มาตรฐาน</h3></div>
        <div class="flex gap-4">
          <button class="btn btn-primary" onclick="Router.navigate('hr-08')"><i class="ph ph-list"></i> ดูรายการเกณฑ์ทั้งหมด</button>
          <button class="btn btn-secondary" onclick="Router.navigate('hr-10')"><i class="ph ph-plus"></i> เพิ่มเกณฑ์ใหม่</button>
        </div>
      </div>
    `, 'ภาพรวมเกณฑ์มาตรฐาน (D4)', 'skills');
  },

  'hr-08': () => {
    const skills = DB.get('skills');
    return UI.renderLayout(`
      <div class="page-hero">
        <div class="page-hero-icon"><i class="ph-fill ph-book-bookmark"></i></div>
        <div>
          <h2>คลังเกณฑ์มาตรฐานทักษะ (Competency Framework)</h2>
          <p>ฐานข้อมูล D4 — กรอบสมรรถนะบุคลากรสายสนับสนุน มหาวิทยาลัย | รวม ${skills.length} รายการ</p>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title"><i class="ph-fill ph-list-bullets"></i> รายการเกณฑ์ทั้งหมด</h3>
          <button class="btn btn-primary" onclick="Router.navigate('hr-10')"><i class="ph ph-plus"></i> เพิ่มเกณฑ์ใหม่</button>
        </div>
        <div class="table-wrapper">
          <table>
            <tr><th>รหัส</th><th>ชื่อทักษะ/สมรรถนะ</th><th>ประเภท</th><th>เกณฑ์ขั้นต่ำ</th><th>คำอธิบาย</th><th>จัดการ</th></tr>
            ${skills.map(s => `
              <tr class="clickable-row" onclick="Router.navigate('hr-09')">
                <td><span class="badge badge-info">${s.id}</span></td>
                <td><b>${s.name}</b></td>
                <td><span class="badge ${s.type === 'หลัก' ? 'badge-success' : 'badge-muted'}">${s.type}</span></td>
                <td>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <div style="display:flex;gap:3px;">${[1, 2, 3, 4, 5].map(i => `<div style="width:10px;height:10px;border-radius:2px;background:${i <= s.requiredScore ? 'var(--primary)' : 'var(--border)'}"></div>`).join('')}</div>
                    <span style="font-size:0.8rem;font-weight:700;color:var(--primary);">ระดับ ${s.requiredScore}</span>
                  </div>
                </td>
                <td style="font-size:0.82rem;color:var(--text-muted);max-width:220px;">${s.desc}</td>
                <td onclick="event.stopPropagation()" style="display:flex;gap:6px;align-items:center;">
                  <button class="btn btn-outline" style="padding:5px 10px;font-size:0.78rem;" onclick="Router.navigate('hr-12')"><i class="ph ph-pencil"></i></button>
                  <button class="btn btn-danger" style="padding:5px 10px;font-size:0.78rem;" onclick="Router.navigate('hr-14')"><i class="ph ph-trash"></i></button>
                </td>
              </tr>
            `).join('')}
          </table>
        </div>
      </div>
    `, 'คลังเกณฑ์มาตรฐานทักษะ (D4)', 'skills');
  },

  'hr-09': () => UI.renderLayout(`
    <div class="card" style="max-width:650px;">
      <div class="card-header">
        <h3 class="card-title">รายละเอียดเกณฑ์ทักษะ SK01</h3>
        <button class="btn btn-outline" onclick="Router.goBack()"><i class="ph ph-arrow-left"></i> กลับ</button>
      </div>
      <div class="grid-3 mb-4">
        <div><strong style="color:var(--text-muted);font-size:0.8rem;">รหัส</strong><br><span class="badge badge-info" style="font-size:0.85rem;padding:5px 12px;">SK01</span></div>
        <div><strong style="color:var(--text-muted);font-size:0.8rem;">ประเภท</strong><br><span class="badge badge-success">ทักษะหลัก</span></div>
        <div><strong style="color:var(--text-muted);font-size:0.8rem;">เกณฑ์ขั้นต่ำ</strong><br><span style="font-size:1.2rem;font-weight:800;color:var(--primary);">ระดับ 3</span></div>
      </div>
      <div class="mb-4">
        <strong style="color:var(--text-muted);font-size:0.8rem;text-transform:uppercase;">ชื่อทักษะ/สมรรถนะ</strong>
        <p style="font-size:1rem;font-weight:700;color:var(--text);margin-top:4px;">การสื่อสารและการประสานงาน</p>
      </div>
      <div class="mb-4">
        <strong style="color:var(--text-muted);font-size:0.8rem;text-transform:uppercase;">คำอธิบายพฤติกรรมที่คาดหวัง</strong>
        <p style="font-size:0.9rem;color:var(--text);margin-top:4px;line-height:1.7;">ความสามารถในการสื่อสาร ถ่ายทอดข้อมูล และประสานงานกับทีมงาน ผู้บังคับบัญชา และหน่วยงานต่าง ๆ ได้อย่างมีประสิทธิภาพและชัดเจน</p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-primary" onclick="Router.navigate('hr-12')"><i class="ph ph-pencil"></i> แก้ไขเกณฑ์</button>
        <button class="btn btn-outline" onclick="Router.goBack()">กลับ</button>
      </div>
    </div>
  `, 'รายละเอียดเกณฑ์ทักษะ', 'skills'),

  'hr-10': () => UI.renderLayout(`
    <div class="card" style="max-width:600px;">
      <div class="card-header"><h3 class="card-title"><i class="ph-fill ph-plus-circle"></i> เพิ่มเกณฑ์มาตรฐานทักษะใหม่</h3></div>
      <div style="background:var(--info-bg);padding:12px 16px;border-radius:8px;margin-bottom:18px;font-size:0.84rem;color:var(--primary);display:flex;align-items:center;gap:8px;border:1px solid #bfdbfe;">
        <i class="ph-fill ph-lightbulb" style="font-size:1.2rem;flex-shrink:0;"></i>
        <span>ระบบจะสร้างรหัสทักษะให้อัตโนมัติ และตรวจสอบชื่อซ้ำก่อนบันทึก</span>
      </div>
      <div class="input-group">
        <label class="input-label">ชื่อทักษะ/สมรรถนะ</label>
        <input type="text" id="new-skill-name" class="input-field" placeholder="เช่น ภาวะผู้นำ, การวิเคราะห์เชิงกลยุทธ์">
      </div>
      <div class="input-group">
        <label class="input-label">ประเภทสมรรถนะ</label>
        <select id="new-skill-type" class="input-field">
          <option value="หลัก">ทักษะหลัก (Core Competency)</option>
          <option value="เฉพาะด้าน">ทักษะเฉพาะด้าน (Functional Competency)</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">คำอธิบายพฤติกรรมที่คาดหวัง</label>
        <textarea id="new-skill-desc" class="input-field" rows="3" placeholder="อธิบายพฤติกรรมและผลลัพธ์ที่สังเกตได้..."></textarea>
      </div>
      <div class="input-group">
        <label class="input-label">ระดับคะแนนที่คาดหวัง (1-5)</label>
        <input type="number" id="new-skill-score" class="input-field" min="1" max="5" value="3">
      </div>
      <div class="flex gap-2 mt-4">
        <button class="btn btn-primary" onclick="(function(){
          const name = document.getElementById('new-skill-name').value.trim() || 'ทักษะใหม่';
          const type = document.getElementById('new-skill-type').value;
          const desc = document.getElementById('new-skill-desc').value.trim() || '';
          const score = Math.min(5, Math.max(1, parseInt(document.getElementById('new-skill-score').value) || 3));
          const id = 'SK' + String(DB.get('skills').length + 1).padStart(2,'0');
          DB.insert('skills', { id, name, type, desc, requiredScore: score });
          Router.navigate('hr-11');
        })()"><i class="ph ph-floppy-disk"></i> บันทึกข้อมูล</button>
        <button class="btn btn-outline" onclick="Router.goBack()">ยกเลิก</button>
      </div>
    </div>
  `, 'เพิ่มเกณฑ์มาตรฐาน', 'skills'),

  'hr-11': () => {
    const skills = DB.get('skills');
    const latest = skills[skills.length - 1];
    return UI.renderLayout(`
      <div class="success-screen">
        <i class="ph-fill ph-check-circle success-icon"></i>
        <h2 class="success-title">บันทึกเกณฑ์ทักษะสำเร็จ</h2>
        <p class="success-desc">เพิ่มสมรรถนะ "<b>${latest ? latest.name : ''}</b>" (${latest ? latest.id : ''}) ลงในฐานข้อมูล D4 เรียบร้อยแล้ว | รวมทั้งหมด ${skills.length} รายการ</p>
        <button class="btn btn-primary" onclick="Router.navigate('hr-08')"><i class="ph ph-arrow-left"></i> กลับไปคลังเกณฑ์มาตรฐาน</button>
      </div>
    `, 'บันทึกสำเร็จ', 'skills');
  },

  'hr-12': () => UI.renderLayout(`
    <div class="card" style="max-width:600px;">
      <div class="card-header"><h3 class="card-title"><i class="ph-fill ph-pencil-simple"></i> แก้ไขเกณฑ์มาตรฐาน SK01</h3></div>
      <div class="input-group">
        <label class="input-label">ชื่อทักษะ/สมรรถนะ</label>
        <input type="text" id="edit-skill-name" class="input-field" value="การสื่อสารและการประสานงาน">
      </div>
      <div class="input-group">
        <label class="input-label">คำอธิบาย</label>
        <textarea id="edit-skill-desc" class="input-field" rows="3">ความสามารถในการสื่อสาร ถ่ายทอดข้อมูล และประสานงานอย่างมีประสิทธิภาพ</textarea>
      </div>
      <div class="input-group">
        <label class="input-label">ระดับคะแนนที่คาดหวัง (1-5)</label>
        <input type="number" id="edit-skill-score" class="input-field" value="3" min="1" max="5">
      </div>
      <div class="flex gap-2 mt-4">
        <button class="btn btn-primary" onclick="(function(){
          const name = document.getElementById('edit-skill-name').value.trim() || 'การสื่อสารและการประสานงาน';
          const desc = document.getElementById('edit-skill-desc').value.trim();
          const score = Math.min(5, Math.max(1, parseInt(document.getElementById('edit-skill-score').value) || 3));
          DB.update('skills', 'id', 'SK01', { name, desc, requiredScore: score });
          Router.navigate('hr-13');
        })()"><i class="ph ph-floppy-disk"></i> บันทึกการแก้ไข</button>
        <button class="btn btn-outline" onclick="Router.goBack()">ยกเลิก</button>
      </div>
    </div>
  `, 'แก้ไขเกณฑ์มาตรฐาน', 'skills'),

  'hr-13': () => UI.renderLayout(`
    <div class="success-screen">
      <i class="ph-fill ph-check-circle success-icon"></i>
      <h2 class="success-title">อัปเดตเกณฑ์ทักษะสำเร็จ</h2>
      <p class="success-desc">ปรับปรุงข้อมูลสมรรถนะในฐานข้อมูล D4 เรียบร้อยแล้ว</p>
      <button class="btn btn-primary" onclick="Router.navigate('hr-08')"><i class="ph ph-arrow-left"></i> กลับคลังเกณฑ์มาตรฐาน</button>
    </div>
  `, 'อัปเดตสำเร็จ', 'skills'),

  'hr-14': () => {
    setTimeout(() => {
      UI.showModal('ยืนยันการลบเกณฑ์', 'คุณต้องการลบเกณฑ์ทักษะ SK01 ออกจากระบบใช่หรือไม่?<br><br><span style="color:var(--danger);font-size:0.85rem;">⚠ การกระทำนี้ไม่สามารถย้อนกลับได้</span>', 'ลบข้อมูล', () => {
        Router.navigate('hr-15');
      });
    }, 100);
    return PagesHR['hr-08']();
  },

  'hr-15': () => UI.renderLayout(`
    <div class="success-screen">
      <i class="ph-fill ph-trash success-icon" style="color:var(--text-muted)"></i>
      <h2 class="success-title">ลบเกณฑ์ทักษะสำเร็จ</h2>
      <p class="success-desc">ลบข้อมูลออกจากระบบเรียบร้อยแล้ว</p>
      <button class="btn btn-primary" onclick="Router.navigate('hr-08')"><i class="ph ph-arrow-left"></i> กลับคลังเกณฑ์มาตรฐาน</button>
    </div>
  `, 'ลบสำเร็จ', 'skills'),

  /* ─────────────────────────────────────────
     P4.0 วิเคราะห์ช่องว่างทักษะ (Skill Gap Analysis)
  ───────────────────────────────────────── */
  'hr-16': () => UI.renderLayout(`
    <div class="card" style="max-width:640px;">
      <div class="stepper">
        <div class="step active"><div class="step-dot">1</div><div class="step-label">เลือกขอบเขต</div></div>
        <div class="step"><div class="step-dot">2</div><div class="step-label">ตั้งค่าพารามิเตอร์</div></div>
        <div class="step"><div class="step-dot">3</div><div class="step-label">ประมวลผล</div></div>
        <div class="step"><div class="step-dot">4</div><div class="step-label">รายงานผลลัพธ์</div></div>
      </div>
      <div class="card-header"><h3 class="card-title"><i class="ph-fill ph-magnifying-glass"></i> เลือกขอบเขตการวิเคราะห์</h3></div>
      <div class="input-group">
        <label class="input-label">เลือกหน่วยงาน</label>
        <select class="input-field">
          <option>ทั้งหมด — ทุกกองของมหาวิทยาลัย</option>
          <option>กองเทคโนโลยีสารสนเทศ</option>
          <option>กองบริหารทรัพยากรบุคคล</option>
          <option>กองการเงินและบัญชี</option>
          <option>กองแผนงาน</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">เลือกกลุ่มตำแหน่งงาน</label>
        <select class="input-field">
          <option>ทุกตำแหน่งบุคลากรสายสนับสนุน</option>
          <option>กลุ่มสนับสนุนวิชาการ (ระดับปฏิบัติการ)</option>
          <option>กลุ่มบริหาร (ระดับชำนาญการ)</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">รอบการประเมิน</label>
        <select class="input-field">
          <option>รอบที่ 1/2569 (เมษายน 2569)</option>
          <option>รอบที่ 2/2568 (ตุลาคม 2568)</option>
        </select>
      </div>
      <button class="btn btn-primary mt-4" onclick="Router.navigate('hr-17')"><i class="ph ph-arrow-right"></i> ถัดไป</button>
    </div>
  `, 'วิเคราะห์ช่องว่างทักษะ — ขั้นตอนที่ 1', 'gap'),

  'hr-17': () => UI.renderLayout(`
    <div class="card" style="max-width:640px;">
      <div class="stepper">
        <div class="step done"><div class="step-dot"><i class="ph ph-check"></i></div><div class="step-label">เลือกขอบเขต</div></div>
        <div class="step active"><div class="step-dot">2</div><div class="step-label">ตั้งค่าพารามิเตอร์</div></div>
        <div class="step"><div class="step-dot">3</div><div class="step-label">ประมวลผล</div></div>
        <div class="step"><div class="step-dot">4</div><div class="step-label">รายงาน</div></div>
      </div>
      <div class="card-header"><h3 class="card-title"><i class="ph-fill ph-sliders"></i> ตั้งค่าพารามิเตอร์การวิเคราะห์</h3></div>
      <div class="input-group">
        <label class="input-label">เกณฑ์จุดตัด (Gap Threshold)</label>
        <select class="input-field">
          <option>เข้มงวด — คะแนนต่ำกว่าเป้าหมาย D4 (Strict Mode)</option>
          <option>ยืดหยุ่น — อนุโลมส่วนต่าง ±1 ระดับ (Flexible Mode)</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">เกณฑ์บุคลากรดาวเด่น</label>
        <select class="input-field">
          <option>คะแนนทุกทักษะ ≥ เกณฑ์ +1 ระดับขึ้นไป</option>
          <option>คะแนนเฉลี่ยรวม ≥ 4.5 คะแนน</option>
        </select>
      </div>
      <div class="flex gap-2 mt-4">
        <button class="btn btn-primary" onclick="Router.navigate('hr-18')"><i class="ph ph-play"></i> เริ่มประมวลผล</button>
        <button class="btn btn-outline" onclick="Router.goBack()"><i class="ph ph-arrow-left"></i> กลับ</button>
      </div>
    </div>
  `, 'วิเคราะห์ช่องว่างทักษะ — ขั้นตอนที่ 2', 'gap'),

  'hr-18': () => {
    setTimeout(() => {
      UI.showModal('ยืนยันเริ่มประมวลผล',
        '<div style="font-size:0.9rem;line-height:1.7;">ระบบจะดึงข้อมูลจาก <b>D2 (ผลประเมิน)</b> และ <b>D4 (เกณฑ์มาตรฐาน)</b> เพื่อคำนวณช่องว่างทักษะของบุคลากรทั้งมหาวิทยาลัย<br><br>ยืนยันดำเนินการ?</div>',
        'ยืนยัน เริ่มประมวลผล', () => {
          Router.navigate('hr-19');
        });
    }, 100);
    return PagesHR['hr-17']();
  },

  'hr-19': () => {
    const emps = DB.get('employees');
    const evals = DB.get('evaluations');
    return UI.renderLayout(`
      <div class="ai-box ai-box-warn" style="margin-bottom:16px;">
        <i class="ph-fill ph-warning ai-box-icon"></i>
        <div>
          <strong>🤖 AI สรุปผลการวิเคราะห์ช่องว่างทักษะ (P4.4)</strong>
          พบบุคลากรต่ำกว่าเกณฑ์ D4 จำนวน 2 คน (50%) — ระบบแนะนำให้จัดอบรมทักษะ <b>ความมั่นคงปลอดภัยทางไซเบอร์</b> และ <b>การพัฒนาระบบสารสนเทศ</b> โดยเร็ว
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title"><i class="ph-fill ph-table"></i> ตารางผลการวิเคราะห์ช่องว่างทักษะ</h3>
          <div class="flex gap-2">
            <button class="btn btn-outline" style="font-size:0.82rem;padding:7px 14px;" onclick="Router.navigate('hr-20')"><i class="ph ph-funnel"></i> กรองผล</button>
            <button class="btn btn-primary" onclick="Router.navigate('hr-23')"><i class="ph ph-chart-bar"></i> ดูภาพรวม</button>
          </div>
        </div>
        <div class="table-wrapper">
          <table>
            <tr><th>รหัส</th><th>ชื่อ-สกุล</th><th>กอง</th><th>ตำแหน่ง</th><th>คะแนนรวม</th><th>สถานะ</th><th>รายละเอียด</th></tr>
            ${emps.filter(e => evals.find(ev => ev.empId === e.id)).map((e, idx) => {
      const ev = evals.find(ev => ev.empId === e.id);
      const scores = ev ? Object.values(ev.scores) : [];
      const total = scores.reduce((a, b) => a + b, 0);
      const maxPossible = scores.length * 5;
      const pct = maxPossible > 0 ? Math.round(total / maxPossible * 100) : 0;
      const pass = idx % 2 === 0;
      return `
                <tr>
                  <td><span class="badge badge-muted">${e.id}</span></td>
                  <td><b>${e.name}</b></td>
                  <td style="font-size:0.82rem;">${e.dept.replace('กอง', '')}</td>
                  <td style="font-size:0.82rem;color:var(--text-muted);">${e.role}</td>
                  <td>
                    <div style="display:flex;align-items:center;gap:8px;">
                      <div style="width:60px;height:6px;background:var(--border);border-radius:99px;overflow:hidden;">
                        <div style="width:${pct}%;height:100%;background:${pass ? 'var(--success)' : 'var(--danger)'};border-radius:99px;"></div>
                      </div>
                      <span style="font-size:0.82rem;font-weight:700;color:${pass ? 'var(--success)' : 'var(--danger)'};">${total}/${maxPossible}</span>
                    </div>
                  </td>
                  <td><span class="badge ${pass ? 'badge-success' : 'badge-danger'}">${pass ? '✓ ผ่านเกณฑ์' : '⚠ ต้องพัฒนา'}</span></td>
                  <td><button class="btn btn-outline" style="padding:4px 10px;font-size:0.78rem;" onclick="Router.navigate('hr-21')"><i class="ph ph-eye"></i> ดูรายละเอียด</button></td>
                </tr>
              `;
    }).join('')}
          </table>
        </div>
      </div>
    `, 'ผลการวิเคราะห์ช่องว่างทักษะ', 'gap');
  },

  'hr-20': () => {
    setTimeout(() => {
      UI.showModal('กรองผลลัพธ์',
        '<div class="input-group"><label class="input-label">แสดงเฉพาะ</label><select class="input-field"><option>บุคลากรที่มีช่องว่างทักษะ (ต้องพัฒนา)</option><option>บุคลากรดาวเด่น</option><option>ทั้งหมด</option></select></div>',
        'ค้นหา', () => { UI.showToast('กรองข้อมูลเรียบร้อย'); });
    }, 100);
    return PagesHR['hr-19']();
  },

  'hr-21': () => UI.renderLayout(`
    <div class="card">
      <div class="card-header">
        <h3 class="card-title"><i class="ph-fill ph-user-circle"></i> รายงานช่องว่างทักษะ: นายอรรถพล มีชัยภูมิ</h3>
        <button class="btn btn-outline" onclick="Router.goBack()"><i class="ph ph-arrow-left"></i> กลับ</button>
      </div>
      <div class="grid-3 mb-4">
        <div><strong style="font-size:0.78rem;color:var(--text-muted);">กอง/สังกัด</strong><br>กองเทคโนโลยีสารสนเทศ</div>
        <div><strong style="font-size:0.78rem;color:var(--text-muted);">ตำแหน่ง</strong><br>นักพัฒนาระบบสารสนเทศ</div>
        <div><strong style="font-size:0.78rem;color:var(--text-muted);">รอบประเมิน</strong><br>รอบที่ 1/2569</div>
      </div>
      <table class="mb-4">
        <tr><th>ทักษะ/สมรรถนะ</th><th>ประเภท</th><th>เกณฑ์ (D4)</th><th>ผลประเมิน</th><th>ส่วนต่าง</th><th>สถานะ</th></tr>
        <tr><td>การสื่อสารและการประสานงาน</td><td><span class="badge badge-success">หลัก</span></td><td>ระดับ 3</td><td>ระดับ 3</td><td><span style="color:var(--text-muted);font-weight:700;">0</span></td><td><span class="badge badge-success">ผ่าน</span></td></tr>
        <tr><td>การพัฒนาระบบสารสนเทศ</td><td><span class="badge badge-muted">เฉพาะด้าน</span></td><td>ระดับ 4</td><td>ระดับ 3</td><td><span class="text-danger" style="font-weight:700;">-1</span></td><td><span class="badge badge-warning">ต้องพัฒนา</span></td></tr>
        <tr><td>ความมั่นคงปลอดภัยทางไซเบอร์</td><td><span class="badge badge-muted">เฉพาะด้าน</span></td><td>ระดับ 4</td><td>ระดับ 2</td><td><span class="text-danger" style="font-weight:700;">-2</span></td><td><span class="badge badge-danger">ต้องพัฒนาเร่งด่วน</span></td></tr>
        <tr><td>การวิเคราะห์ข้อมูลและจัดทำรายงาน</td><td><span class="badge badge-success">หลัก</span></td><td>ระดับ 3</td><td>ระดับ 3</td><td><span style="color:var(--text-muted);font-weight:700;">0</span></td><td><span class="badge badge-success">ผ่าน</span></td></tr>
      </table>
      <div class="flex gap-2">
        <button class="btn btn-secondary" onclick="Router.navigate('hr-22')"><i class="ph ph-chart-polar"></i> ดูแผนภาพเรดาร์</button>
      </div>
    </div>
  `, 'รายละเอียดช่องว่างทักษะรายบุคคล', 'gap'),

  'hr-22': () => {
    UI.renderChart('chart-hr-22', 'radar',
      ['การสื่อสาร', 'พัฒนาระบบ', 'ความปลอดภัยไซเบอร์', 'วิเคราะห์ข้อมูล'],
      [
        { label: 'เกณฑ์ D4 (Target)', data: [3, 4, 4, 3], backgroundColor: 'rgba(26, 35, 126, 0.12)', borderColor: 'rgba(26, 35, 126, 0.8)', borderWidth: 2, pointBackgroundColor: 'rgba(26, 35, 126, 0.8)' },
        { label: 'ผลประเมินจริง (Actual)', data: [3, 3, 2, 3], backgroundColor: 'rgba(220, 38, 38, 0.12)', borderColor: 'rgba(220, 38, 38, 0.8)', borderWidth: 2, pointBackgroundColor: 'rgba(220, 38, 38, 0.8)' }
      ],
      { scales: { r: { min: 0, max: 5, ticks: { stepSize: 1, font: { family: 'Sarabun' } }, pointLabels: { font: { family: 'Sarabun', size: 12 } } } } }
    );
    return UI.renderLayout(`
      <div class="card">
        <div class="card-header">
          <h3 class="card-title"><i class="ph-fill ph-chart-polar"></i> แผนภาพเปรียบเทียบสมรรถนะ: นายอรรถพล มีชัยภูมิ</h3>
          <button class="btn btn-outline" onclick="Router.goBack()"><i class="ph ph-arrow-left"></i> กลับ</button>
        </div>
        <div style="height:360px; max-width:500px; margin: 0 auto;">
          <canvas id="chart-hr-22"></canvas>
        </div>
        <div class="ai-box" style="margin-top:16px;">
          <i class="ph-fill ph-robot ai-box-icon"></i>
          <div>
            <strong>🤖 AI แนะนำแผนพัฒนา</strong>
            ช่องว่างใหญ่ที่สุดคือ <b>ความมั่นคงปลอดภัยทางไซเบอร์ (-2)</b> — แนะนำลงทะเบียนหลักสูตรผู้เชี่ยวชาญด้านความมั่นคงปลอดภัยสารสนเทศ หรือหลักสูตรระบบรักษาความปลอดภัยเครือข่าย ภายในไตรมาส 3/2569
          </div>
        </div>
      </div>
    `, 'แผนภาพเรดาร์สมรรถนะ', 'gap');
  },

  'hr-23': () => UI.renderLayout(`
    <div class="card">
      <div class="card-header">
        <h3 class="card-title"><i class="ph-fill ph-chart-pie"></i> สรุปผลการวิเคราะห์ช่องว่างทักษะ — ภาพรวมมหาวิทยาลัย (D5)</h3>
        <button class="btn btn-outline" onclick="Router.navigate('hr-26')"><i class="ph ph-export"></i> ส่งออกรายงาน</button>
      </div>
      <div class="grid-3 mb-4">
        <div class="stat-card" style="border-top:3px solid var(--primary);">
          <span class="stat-label">บุคลากรที่วิเคราะห์ทั้งหมด</span>
          <span class="stat-value">3</span>
          <span style="font-size:0.78rem;color:var(--text-muted);">ราย (จากข้อมูลที่มีผลประเมิน)</span>
        </div>
        <div class="stat-card" style="border-top:3px solid var(--danger);cursor:pointer;" onclick="Router.navigate('hr-24')">
          <span class="stat-label">ต้องพัฒนาทักษะ ⚠</span>
          <span class="stat-value text-danger">2</span>
          <span style="font-size:0.78rem;color:var(--danger);">คน — คลิกดูรายชื่อ →</span>
        </div>
        <div class="stat-card" style="border-top:3px solid var(--warning);cursor:pointer;" onclick="Router.navigate('hr-25')">
          <span class="stat-label">บุคลากรดาวเด่น ⭐</span>
          <span class="stat-value text-warning">1</span>
          <span style="font-size:0.78rem;color:var(--warning);">คน — คลิกดูรายชื่อ →</span>
        </div>
      </div>
      <div class="ai-box ai-box-warn">
        <i class="ph-fill ph-warning ai-box-icon"></i>
        <div>
          <strong>🤖 ข้อเสนอแนะจากระบบอัจฉริยะ</strong>
          ทักษะที่มีช่องว่างมากที่สุดในมหาวิทยาลัย: <b>1. ความมั่นคงปลอดภัยทางไซเบอร์</b> (เฉลี่ย -1.5) | <b>2. การพัฒนาระบบสารสนเทศ</b> (เฉลี่ย -1.0) — แนะนำจัดอบรมเชิงปฏิบัติการรวม ไตรมาส 2/2569
        </div>
      </div>
    </div>
  `, 'สรุปผลการวิเคราะห์ช่องว่างทักษะ', 'gap'),

  'hr-24': () => UI.renderLayout(`
    <div class="card">
      <div class="card-header">
        <h3 class="card-title"><i class="ph-fill ph-warning-circle"></i> รายชื่อบุคลากรที่ต้องพัฒนาทักษะ</h3>
        <button class="btn btn-outline" onclick="Router.goBack()"><i class="ph ph-arrow-left"></i> กลับ</button>
      </div>
      <table>
        <tr><th>รหัส</th><th>ชื่อ-สกุล</th><th>กอง</th><th>ทักษะที่ต้องพัฒนาหลัก</th><th>ส่วนต่าง</th><th>ความเร่งด่วน</th></tr>
        <tr><td>E003</td><td>นายอรรถพล มีชัยภูมิ</td><td>กองเทคโนโลยีสารสนเทศ</td><td>ความมั่นคงปลอดภัยทางไซเบอร์</td><td><span class="text-danger font-bold">-2</span></td><td><span class="badge badge-danger">เร่งด่วนสูง</span></td></tr>
        <tr><td>E004</td><td>นางสาวณัฐธิดา รุ่งเรือง</td><td>กองเทคโนโลยีสารสนเทศ</td><td>การพัฒนาระบบสารสนเทศ</td><td><span class="text-warning font-bold">-2</span></td><td><span class="badge badge-warning">ปานกลาง</span></td></tr>
      </table>
    </div>
  `, 'บุคลากรที่ต้องพัฒนาทักษะ', 'gap'),

  'hr-25': () => UI.renderLayout(`
    <div class="card">
      <div class="card-header">
        <h3 class="card-title"><i class="ph-fill ph-star"></i> รายชื่อบุคลากรดาวเด่น ⭐</h3>
        <button class="btn btn-outline" onclick="Router.goBack()"><i class="ph ph-arrow-left"></i> กลับ</button>
      </div>
      <table>
        <tr><th>รหัส</th><th>ชื่อ-สกุล</th><th>กอง</th><th>ทักษะเด่น</th><th>คะแนนส่วนเกิน</th><th>ข้อเสนอแนะ</th></tr>
        <tr><td>E001</td><td>นายธนากร วงศ์ประเสริฐ</td><td>กองเทคโนโลยีสารสนเทศ</td><td>การพัฒนาระบบสารสนเทศ (ระดับ 5)</td><td><span class="text-success font-bold">+3 คะแนน</span></td><td><span class="badge badge-info">พร้อมเลื่อนระดับ / เป็น Mentor</span></td></tr>
      </table>
    </div>
  `, 'บุคลากรดาวเด่น', 'gap'),

  'hr-26': () => UI.renderLayout(`
    <div class="card" style="max-width:520px;">
      <div class="card-header"><h3 class="card-title"><i class="ph-fill ph-export"></i> ส่งออกรายงานผลการวิเคราะห์</h3></div>
      <div class="input-group">
        <label class="input-label">รูปแบบไฟล์</label>
        <select class="input-field">
          <option>เอกสาร PDF (.pdf) — รายงานทางการ</option>
          <option>ตารางคำนวณ Excel (.xlsx) — สำหรับวิเคราะห์ต่อ</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">เนื้อหาที่ต้องการรวมในรายงาน</label>
        <label style="display:block;margin-bottom:8px;font-size:0.88rem;"><input type="checkbox" checked> ภาพรวมช่องว่างทักษะทั้งมหาวิทยาลัย</label>
        <label style="display:block;margin-bottom:8px;font-size:0.88rem;"><input type="checkbox" checked> รายชื่อบุคลากรที่ต้องพัฒนา (Gap List)</label>
        <label style="display:block;margin-bottom:8px;font-size:0.88rem;"><input type="checkbox" checked> รายชื่อบุคลากรดาวเด่น</label>
        <label style="display:block;font-size:0.88rem;"><input type="checkbox"> กราฟเรดาร์สมรรถนะรายบุคคล</label>
      </div>
      <div class="flex gap-2 mt-4">
        <button class="btn btn-primary" onclick="Router.navigate('hr-27')"><i class="ph ph-download"></i> ยืนยันดาวน์โหลด</button>
        <button class="btn btn-outline" onclick="Router.goBack()">ยกเลิก</button>
      </div>
    </div>
  `, 'ส่งออกรายงานช่องว่างทักษะ', 'gap'),

  'hr-27': () => UI.renderLayout(`
    <div class="success-screen">
      <i class="ph-fill ph-file-pdf success-icon" style="color:var(--danger)"></i>
      <h2 class="success-title">ส่งออกรายงานสำเร็จ</h2>
      <p class="success-desc">ไฟล์ <b>Report_SkillGap_SUT_2569.pdf</b> พร้อมดาวน์โหลดแล้ว</p>
      <button class="btn btn-primary" onclick="Router.navigate('hr-23')"><i class="ph ph-arrow-left"></i> กลับหน้าภาพรวม</button>
    </div>
  `, 'ดาวน์โหลดสำเร็จ', 'gap'),

  /* ─────────────────────────────────────────
     P8.0 อนุมัติแผนศักยภาพและอัตรากำลัง
  ───────────────────────────────────────── */
  'hr-28': () => {
    const reqs = DB.get('requests');
    return UI.renderLayout(`
      <div class="ai-box ai-box-warn" style="margin-bottom:20px;">
        <i class="ph-fill ph-warning ai-box-icon"></i>
        <div>
          <strong>🤖 AI แจ้งเตือน — ระบบตรวจสอบอัตโนมัติ</strong>
          ตรวจสอบ D3/D4 แล้ว: แนะนำ <b>อนุมัติ REQ-001</b> (กองเทคโนโลยีสารสนเทศ ขาดอัตรากำลัง 2 อัตรา ตรงตามกรอบแผนพัฒนาดิจิทัลมหาวิทยาลัย) — ค่าความน่าจะเป็นในการอนุมัติ 92%
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title"><i class="ph-fill ph-inbox"></i> กล่องรับแผนรอพิจารณา (D6)</h3>
          <button class="btn btn-outline" style="font-size:0.82rem;" onclick="Router.navigate('hr-29')"><i class="ph ph-magnifying-glass"></i> ค้นหา</button>
        </div>
        <div class="table-wrapper">
          <table>
            <tr><th>เลขที่คำขอ</th><th>กองที่ส่ง</th><th>ประเภทแผน</th><th>สถานะ</th><th>วันที่ส่ง</th><th>จัดการ</th></tr>
            ${reqs.length === 0 ? '<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--text-muted);">ไม่มีคำขอในขณะนี้</td></tr>' : ''}
            ${reqs.map(r => `
              <tr>
                <td><span class="badge badge-muted">${r.id}</span></td>
                <td>${r.dept}</td>
                <td>${r.type}</td>
                <td><span class="badge ${r.status === 'รออนุมัติ' ? 'badge-warning' : r.status === 'อนุมัติแล้ว' ? 'badge-success' : 'badge-danger'}">${r.status}</span></td>
                <td style="font-size:0.82rem;">${r.date}</td>
                <td>
                  <button class="btn btn-primary" style="padding:5px 12px;font-size:0.78rem;" onclick="Router.navigate('hr-31')">
                    <i class="ph ph-eye"></i> ตรวจสอบ
                  </button>
                </td>
              </tr>
            `).join('')}
          </table>
        </div>
      </div>
    `, 'อนุมัติแผนงาน — กองบริหารทรัพยากรบุคคล', 'approval');
  },

  'hr-29': () => UI.renderLayout(`
    <div class="card" style="max-width:520px;">
      <div class="card-header"><h3 class="card-title"><i class="ph-fill ph-magnifying-glass"></i> ค้นหาและกรองแผนงาน</h3></div>
      <div class="input-group">
        <label class="input-label">เลขที่คำขอ</label>
        <input type="text" class="input-field" placeholder="เช่น REQ-001">
      </div>
      <div class="input-group">
        <label class="input-label">กอง/หน่วยงาน</label>
        <select class="input-field">
          <option>ทั้งหมด</option>
          <option>กองเทคโนโลยีสารสนเทศ</option>
          <option>กองบริหารทรัพยากรบุคคล</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">สถานะ</label>
        <select class="input-field">
          <option>รออนุมัติ</option>
          <option>อนุมัติแล้ว</option>
          <option>ไม่อนุมัติ</option>
        </select>
      </div>
      <div class="flex gap-2 mt-4">
        <button class="btn btn-primary" onclick="Router.navigate('hr-30')"><i class="ph ph-magnifying-glass"></i> ค้นหา</button>
        <button class="btn btn-outline" onclick="Router.goBack()">ยกเลิก</button>
      </div>
    </div>
  `, 'ค้นหาแผนงาน', 'approval'),

  'hr-30': () => PagesHR['hr-28'](),

  'hr-31': () => UI.renderLayout(`
    <div class="card">
      <div class="card-header">
        <h3 class="card-title"><i class="ph-fill ph-file-text"></i> รายละเอียดคำขอ REQ-001</h3>
        <button class="btn btn-outline" onclick="Router.goBack()"><i class="ph ph-arrow-left"></i> กลับ</button>
      </div>
      <div class="grid-3 mb-4">
        <div><strong style="font-size:0.78rem;color:var(--text-muted);">ประเภทคำขอ</strong><br>ขอเพิ่มอัตรากำลัง</div>
        <div><strong style="font-size:0.78rem;color:var(--text-muted);">กองที่ส่ง</strong><br>กองเทคโนโลยีสารสนเทศ</div>
        <div><strong style="font-size:0.78rem;color:var(--text-muted);">วันที่ส่ง</strong><br>02/05/2569</div>
      </div>
      <div class="mb-4">
        <strong style="font-size:0.78rem;color:var(--text-muted);text-transform:uppercase;">ผู้ส่งคำขอ</strong>
        <p>นายวีระพงศ์ ตันติวิทยา — หัวหน้ากองเทคโนโลยีสารสนเทศ</p>
      </div>
      <div class="mb-4">
        <strong style="font-size:0.78rem;color:var(--text-muted);text-transform:uppercase;">เหตุผล/รายละเอียด</strong>
        <p style="line-height:1.7;">ภาระงานของกองเพิ่มขึ้น 33% จากโครงการพัฒนาระบบบริหารมหาวิทยาลัย 4 โครงการพร้อมกัน — ต้องการนักพัฒนาระบบสารสนเทศ <b>2 อัตรา</b> เพื่อรองรับงานที่เพิ่มขึ้น</p>
      </div>
      <div class="mb-4">
        <button class="btn btn-secondary" onclick="Router.navigate('hr-32')"><i class="ph ph-database"></i> ดูข้อมูลอ้างอิงประกอบ (D3/D4)</button>
      </div>
      <hr style="border:0;border-top:1px solid var(--border);margin:20px 0;">
      <h3 style="font-size:0.9rem;font-weight:800;color:var(--primary);margin-bottom:16px;">การพิจารณาจากกองบริหารทรัพยากรบุคคล</h3>
      <button class="btn btn-primary" onclick="Router.navigate('hr-33')"><i class="ph ph-pen"></i> บันทึกผลพิจารณา</button>
    </div>
  `, 'ตรวจสอบคำขอ REQ-001', 'approval'),

  'hr-32': () => UI.renderLayout(`
    <div class="card">
      <div class="card-header">
        <h3 class="card-title"><i class="ph-fill ph-database"></i> ข้อมูลอ้างอิงประกอบการพิจารณา REQ-001</h3>
        <button class="btn btn-outline" onclick="Router.goBack()"><i class="ph ph-arrow-left"></i> กลับ</button>
      </div>
      <div class="grid-3 mb-4">
        <div class="stat-card" style="border-top:3px solid var(--primary);">
          <span class="stat-label">กรอบอัตรากำลังเป้าหมาย (D3)</span>
          <span class="stat-value">5</span>
          <span style="font-size:0.78rem;color:var(--text-muted);">อัตรา (กองเทคโนโลยีสารสนเทศ)</span>
        </div>
        <div class="stat-card" style="border-top:3px solid var(--danger);">
          <span class="stat-label">อัตรากำลังปัจจุบัน</span>
          <span class="stat-value text-danger">3</span>
          <span style="font-size:0.78rem;color:var(--danger);">อัตรา — ขาด 2 คน</span>
        </div>
        <div class="stat-card" style="border-top:3px solid var(--warning);">
          <span class="stat-label">ปริมาณงานปัจจุบัน</span>
          <span class="stat-value text-warning">133%</span>
          <span style="font-size:0.78rem;color:var(--warning);">เกินมาตรฐาน +33%</span>
        </div>
      </div>
      <div class="ai-box ai-box-success">
        <i class="ph-fill ph-check-circle ai-box-icon"></i>
        <div>
          <strong>🤖 ระบบอัจฉริยะวิเคราะห์อัตโนมัติ (P5.0 + P8.0)</strong>
          ตรวจสอบ D3 แล้ว: กองเทคโนโลยีสารสนเทศ มีบุคลากร 3 คน (เป้า 5 คน) — ขาด 2 อัตราตรงตามคำขอ | ปริมาณงานสูงกว่ามาตรฐาน 33% | สอดคล้องกับแผนพัฒนาดิจิทัลมหาวิทยาลัย — <b>ระบบแนะนำอนุมัติ</b>
        </div>
      </div>
    </div>
  `, 'ข้อมูลอ้างอิงประกอบการพิจารณา', 'approval'),

  'hr-33': () => UI.renderLayout(`
    <div class="card" style="max-width:600px;">
      <div class="card-header"><h3 class="card-title"><i class="ph-fill ph-pen"></i> บันทึกผลการพิจารณา REQ-001</h3></div>
      <div class="input-group">
        <label class="input-label">ข้อคิดเห็น / เงื่อนไขเพิ่มเติมจากกองบริหารทรัพยากรบุคคล</label>
        <textarea class="input-field" rows="4" placeholder="ระบุความเห็นและเงื่อนไขประกอบการพิจารณา..."></textarea>
      </div>
      <div class="flex gap-3 mt-4">
        <button class="btn btn-success" style="flex:1;" onclick="Router.navigate('hr-34')">
          <i class="ph ph-check-circle"></i> อนุมัติแผนงาน
        </button>
        <button class="btn btn-danger" style="flex:1;" onclick="Router.navigate('hr-35')">
          <i class="ph ph-x-circle"></i> ไม่อนุมัติ
        </button>
      </div>
    </div>
  `, 'บันทึกผลการพิจารณา', 'approval'),

  'hr-34': () => {
    setTimeout(() => {
      UI.showModal('ยืนยันอนุมัติแผน',
        '<div style="font-size:0.9rem;line-height:1.7;">คุณต้องการ <b>อนุมัติ</b> แผนขอเพิ่มอัตรากำลัง REQ-001 ของ<br>กองเทคโนโลยีสารสนเทศ ใช่หรือไม่?<br><br>ระบบจะบันทึกผลลงฐานข้อมูล D6 และแจ้งเตือนไปยังหน่วยงานโดยอัตโนมัติ</div>',
        'ยืนยัน อนุมัติแผน', () => {
          DB.update('requests', 'id', 'REQ-001', { status: 'อนุมัติแล้ว', approvedDate: new Date().toISOString().split('T')[0], approvedBy: 'กองบริหารทรัพยากรบุคคล' });
          Router.navigate('hr-36');
        });
    }, 100);
    return PagesHR['hr-33']();
  },

  'hr-35': () => {
    setTimeout(() => {
      UI.showModal('ยืนยันการไม่อนุมัติ',
        '<div style="font-size:0.9rem;line-height:1.7;">โปรดยืนยันการ <b style="color:var(--danger)">ไม่อนุมัติ</b> แผน REQ-001<br>ระบบจะส่งผลและข้อคิดเห็นกลับไปยังหน่วยงานโดยอัตโนมัติ</div>',
        'ยืนยัน ไม่อนุมัติ', () => {
          DB.update('requests', 'id', 'REQ-001', { status: 'ไม่อนุมัติ' });
          Router.navigate('hr-37');
        });
    }, 100);
    return PagesHR['hr-33']();
  },

  'hr-36': () => UI.renderLayout(`
    <div class="success-screen">
      <i class="ph-fill ph-check-circle success-icon" style="color:var(--success)"></i>
      <h2 class="success-title">อนุมัติแผนงานสำเร็จ</h2>
      <p class="success-desc">บันทึกผล "อนุมัติ" ลงฐานข้อมูล D6 เรียบร้อยแล้ว<br>ระบบได้แจ้งเตือนไปยังกองเทคโนโลยีสารสนเทศโดยอัตโนมัติ</p>
      <div class="flex gap-4 justify-center">
        <button class="btn btn-outline" onclick="Router.navigate('hr-38')"><i class="ph ph-clock-counter-clockwise"></i> ประวัติการอนุมัติ</button>
        <button class="btn btn-primary" onclick="Router.navigate('hr-28')"><i class="ph ph-inbox"></i> กลับกล่องรับงาน</button>
      </div>
    </div>
  `, 'อนุมัติสำเร็จ', 'approval'),

  'hr-37': () => UI.renderLayout(`
    <div class="success-screen">
      <i class="ph-fill ph-x-circle success-icon" style="color:var(--danger)"></i>
      <h2 class="success-title">บันทึกผลการไม่อนุมัติเรียบร้อย</h2>
      <p class="success-desc">บันทึกสถานะ "ไม่อนุมัติ" ลงในระบบแล้ว<br>ส่งข้อคิดเห็นกลับไปยังหน่วยงานเรียบร้อยแล้ว</p>
      <button class="btn btn-primary" onclick="Router.navigate('hr-28')"><i class="ph ph-inbox"></i> กลับกล่องรับงาน</button>
    </div>
  `, 'บันทึกผลสำเร็จ', 'approval'),

  'hr-38': () => UI.renderLayout(`
    <div class="card">
      <div class="card-header">
        <h3 class="card-title"><i class="ph-fill ph-clock-counter-clockwise"></i> ประวัติการพิจารณาแผนงาน</h3>
        <button class="btn btn-outline" onclick="Router.navigate('hr-40')"><i class="ph ph-file-text"></i> รายงานสรุป</button>
      </div>
      <table>
        <tr><th>เลขที่</th><th>กอง</th><th>ประเภท</th><th>ผลการพิจารณา</th><th>วันที่ดำเนินการ</th><th>จัดการ</th></tr>
        <tr><td>REQ-001</td><td>กองเทคโนโลยีสารสนเทศ</td><td>ขอเพิ่มอัตรากำลัง</td><td><span class="badge badge-success">อนุมัติแล้ว</span></td><td>07/05/2569</td><td><button class="btn btn-outline" style="padding:4px 10px;font-size:0.78rem;" onclick="Router.navigate('hr-39')"><i class="ph ph-eye"></i> ดูรายละเอียด</button></td></tr>
        <tr><td>REQ-002</td><td>กองบริหารทรัพยากรบุคคล</td><td>แผนพัฒนาทักษะ</td><td><span class="badge badge-success">อนุมัติแล้ว</span></td><td>15/04/2569</td><td><button class="btn btn-outline" style="padding:4px 10px;font-size:0.78rem;" onclick="Router.navigate('hr-39')"><i class="ph ph-eye"></i> ดูรายละเอียด</button></td></tr>
      </table>
    </div>
  `, 'ประวัติการพิจารณาแผนงาน', 'approval'),

  'hr-39': () => UI.renderLayout(`
    <div class="card" style="max-width:600px;">
      <div class="card-header">
        <h3 class="card-title">รายละเอียดผลการพิจารณา REQ-001</h3>
        <button class="btn btn-outline" onclick="Router.goBack()"><i class="ph ph-arrow-left"></i> กลับ</button>
      </div>
      <div class="info-row"><div class="info-label">ผลการพิจารณา</div><div class="info-value"><span class="badge badge-success">อนุมัติแล้ว</span></div></div>
      <div class="info-row"><div class="info-label">ผู้พิจารณา</div><div class="info-value">กองบริหารทรัพยากรบุคคล</div></div>
      <div class="info-row"><div class="info-label">วันที่อนุมัติ</div><div class="info-value">07/05/2569</div></div>
      <div class="info-row"><div class="info-label">ความเห็น</div><div class="info-value">สอดคล้องกับแผนพัฒนาดิจิทัลมหาวิทยาลัย ให้ดำเนินการสรรหาและคัดเลือกได้ทันที</div></div>
    </div>
  `, 'รายละเอียดผลพิจารณา', 'approval'),

  'hr-40': () => {
    UI.renderChart('chart-hr-40', 'bar',
      ['กองเทคโนโลยีสารสนเทศ', 'กองบริหารบุคคล', 'กองการเงิน', 'กองแผนงาน'],
      [{ label: 'จำนวนแผนที่อนุมัติ', data: [3, 2, 2, 1], backgroundColor: 'rgba(26,35,126,0.8)', borderRadius: 6 }]
    );
    return UI.renderLayout(`
      <div class="card">
        <div class="card-header">
          <h3 class="card-title"><i class="ph-fill ph-chart-bar"></i> รายงานสรุปแผนงานที่ผ่านการอนุมัติ ประจำปี 2569</h3>
          <button class="btn btn-primary" onclick="Router.navigate('hr-41')"><i class="ph ph-export"></i> ส่งออกรายงาน</button>
        </div>
        <div style="height:300px; max-width:600px; margin:0 auto;">
          <canvas id="chart-hr-40"></canvas>
        </div>
      </div>
    `, 'รายงานสรุปการอนุมัติ', 'approval');
  },

  'hr-41': () => UI.renderLayout(`
    <div class="card" style="max-width:500px;">
      <div class="card-header"><h3 class="card-title">ส่งออกสรุปรายงานการอนุมัติ</h3></div>
      <div class="input-group">
        <label class="input-label">รูปแบบไฟล์</label>
        <select class="input-field">
          <option>ไฟล์ Excel (.xlsx)</option>
          <option>ไฟล์ PDF (.pdf)</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">ช่วงเวลา</label>
        <input type="month" class="input-field" value="2026-05">
      </div>
      <button class="btn btn-primary mt-4" onclick="Router.navigate('hr-42')"><i class="ph ph-download"></i> ดาวน์โหลด</button>
    </div>
  `, 'ส่งออกรายงาน', 'approval'),

  'hr-42': () => UI.renderLayout(`
    <div class="success-screen">
      <i class="ph-fill ph-file-xls success-icon" style="color:var(--success)"></i>
      <h2 class="success-title">ส่งออกรายงานสำเร็จ</h2>
      <p class="success-desc">ไฟล์ Approved_Plans_SUT_05_2569.xlsx พร้อมใช้งาน</p>
      <button class="btn btn-primary" onclick="Router.navigate('hr-38')"><i class="ph ph-arrow-left"></i> ปิด</button>
    </div>
  `, 'ดาวน์โหลดสำเร็จ', 'approval'),

  /* ─────────────────────────────────────────
     P9.0 ออกจากระบบ
  ───────────────────────────────────────── */
  'hr-43': () => {
    setTimeout(() => {
      UI.showModal('ยืนยันออกจากระบบ',
        'คุณต้องการออกจากระบบบริหารศักยภาพและอัตรากำลังใช่หรือไม่?<br><span style="font-size:0.85rem;color:var(--text-muted);">ข้อมูลการทำงานของคุณได้ถูกบันทึกในเซสชันล่าสุดแล้ว</span>',
        'ออกจากระบบ', () => { Router.navigate('hr-44'); });
    }, 100);
    return PagesHR['hr-04']();
  },

  'hr-44': () => `
    <div class="success-screen" style="min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;background:linear-gradient(135deg,var(--primary-dark),var(--primary));">
      <i class="ph-fill ph-sign-out" style="font-size:5rem;color:rgba(255,255,255,0.7);margin-bottom:20px;"></i>
      <h2 style="color:#fff;font-size:1.6rem;font-weight:800;margin-bottom:8px;">ออกจากระบบสำเร็จ</h2>
      <p style="color:rgba(255,255,255,0.65);margin-bottom:28px;">ขอบคุณที่ใช้งานระบบบริหารภาระงานอัจฉริยะ มหาวิทยาลัย</p>
      <button class="btn btn-outline" style="border-color:rgba(255,255,255,0.5);color:#fff;" onclick="Router.navigate('login')"><i class="ph ph-sign-in"></i> กลับสู่หน้าเข้าสู่ระบบ</button>
    </div>
  `,

  /* ─────────────────────────────────────────
     หน้าจอสนับสนุน: โปรไฟล์ & ผู้ใช้
  ───────────────────────────────────────── */
  'hr-45': () => UI.renderLayout(`
    <div class="page-hero">
      <div class="page-hero-icon"><i class="ph-fill ph-user-circle"></i></div>
      <div>
        <h2>โปรไฟล์ของฉัน</h2>
        <p>จัดการข้อมูลส่วนตัวและรหัสผ่าน</p>
      </div>
    </div>
    <div class="card" style="max-width:600px;">
      <div class="text-center mb-4">
        <div style="width:90px;height:90px;background:linear-gradient(135deg,var(--primary),var(--info));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:40px;margin:0 auto 14px;color:#fff;box-shadow:0 8px 24px rgba(26,35,126,0.3);">
          <i class="ph-fill ph-user"></i>
        </div>
        <h3 style="font-size:1.2rem;font-weight:800;color:var(--primary);">นางสาวจันทิมา อ่อนละมุน</h3>
        <p style="color:var(--text-muted);font-size:0.85rem;">กองบริหารทรัพยากรบุคคล — มหาวิทยาลัยเทคโนโลยีสุรนารี</p>
      </div>
      <div class="input-group">
        <label class="input-label">ชื่อ-นามสกุล</label>
        <input type="text" class="input-field" value="นางสาวจันทิมา อ่อนละมุน" disabled>
      </div>
      <div class="input-group">
        <label class="input-label">อีเมลมหาวิทยาลัย</label>
        <input type="text" class="input-field" value="jantima.on@sut.ac.th" disabled>
      </div>
      <div class="input-group">
        <label class="input-label">เบอร์โทรศัพท์ภายใน</label>
        <input type="text" class="input-field" value="02-549-3000 ต่อ 1001" disabled>
      </div>
      <div style="border-top:1px solid var(--border);margin:20px 0;padding-top:20px;">
        <button class="btn btn-primary" style="width:100%;" onclick="Router.navigate('hr-46')"><i class="ph ph-pencil-simple"></i> แก้ไขข้อมูลส่วนตัว</button>
      </div>
    </div>
  `, 'โปรไฟล์ของฉัน', 'dashboard'),

  'hr-46': () => UI.renderLayout(`
    <div class="card" style="max-width:600px;">
      <div class="card-header"><h3 class="card-title">แก้ไขโปรไฟล์</h3></div>
      <div class="input-group">
        <label class="input-label">ชื่อ-นามสกุล</label>
        <input type="text" class="input-field" value="นางสาวจันทิมา อ่อนละมุน">
      </div>
      <div class="input-group">
        <label class="input-label">รหัสผ่านใหม่ (เว้นว่างหากไม่ต้องการเปลี่ยน)</label>
        <input type="password" class="input-field" placeholder="••••••••">
      </div>
      <div class="flex gap-2 mt-4">
        <button class="btn btn-primary" onclick="Router.navigate('hr-47')"><i class="ph ph-floppy-disk"></i> บันทึกการแก้ไข</button>
        <button class="btn btn-outline" onclick="Router.goBack()">ยกเลิก</button>
      </div>
    </div>
  `, 'แก้ไขข้อมูลส่วนตัว', 'dashboard'),

  'hr-47': () => UI.renderLayout(`
    <div class="success-screen">
      <i class="ph-fill ph-check-circle success-icon"></i>
      <h2 class="success-title">อัปเดตโปรไฟล์สำเร็จ</h2>
      <button class="btn btn-primary" onclick="Router.navigate('hr-45')"><i class="ph ph-arrow-left"></i> กลับหน้าโปรไฟล์</button>
    </div>
  `, 'อัปเดตสำเร็จ', 'dashboard'),

  'hr-48': () => UI.renderLayout(`
    <div class="card">
      <div class="card-header">
        <h3 class="card-title"><i class="ph-fill ph-users"></i> จัดการบัญชีผู้ใช้งานระบบ (D0)</h3>
        <button class="btn btn-primary" onclick="Router.navigate('hr-49')"><i class="ph ph-plus"></i> เพิ่มผู้ใช้ใหม่</button>
      </div>
      <table>
        <tr><th>ชื่อผู้ใช้</th><th>ชื่อ-สกุล</th><th>บทบาท</th><th>กอง/สังกัด</th><th>สถานะ</th><th>จัดการ</th></tr>
        <tr>
          <td><code>hr</code></td>
          <td>นางสาวจันทิมา อ่อนละมุน</td>
          <td><span class="badge badge-info">HR</span></td>
          <td>กองบริหารทรัพยากรบุคคล</td>
          <td><span class="badge badge-success">ใช้งานอยู่</span></td>
          <td><button class="btn btn-outline" style="padding:4px 10px;font-size:0.78rem;" onclick="Router.navigate('hr-51')"><i class="ph ph-gear"></i> สิทธิ์</button></td>
        </tr>
        <tr>
          <td><code>dh</code></td>
          <td>นายวีระพงศ์ ตันติวิทยา</td>
          <td><span class="badge badge-muted">DH</span></td>
          <td>กองเทคโนโลยีสารสนเทศ</td>
          <td><span class="badge badge-success">ใช้งานอยู่</span></td>
          <td><button class="btn btn-outline" style="padding:4px 10px;font-size:0.78rem;" onclick="Router.navigate('hr-51')"><i class="ph ph-gear"></i> สิทธิ์</button></td>
        </tr>
      </table>
    </div>
  `, 'จัดการผู้ใช้งานระบบ', 'users'),

  'hr-49': () => UI.renderLayout(`
    <div class="card" style="max-width:600px;">
      <div class="card-header"><h3 class="card-title">สร้างบัญชีผู้ใช้งานใหม่</h3></div>
      <div class="input-group">
        <label class="input-label">ชื่อผู้ใช้งาน (Username)</label>
        <input type="text" class="input-field" placeholder="เช่น dh_finance">
      </div>
      <div class="input-group">
        <label class="input-label">ชื่อ-สกุล</label>
        <input type="text" class="input-field" placeholder="ชื่อ-นามสกุล ผู้ใช้งาน">
      </div>
      <div class="input-group">
        <label class="input-label">บทบาทในระบบ</label>
        <select class="input-field">
          <option>DH — หัวหน้าหน่วยงาน</option>
          <option>HR — เจ้าหน้าที่ฝ่ายบุคคล</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">กอง/สังกัด</label>
        <select class="input-field">
          <option>กองเทคโนโลยีสารสนเทศ</option>
          <option>กองบริหารทรัพยากรบุคคล</option>
          <option>กองการเงินและบัญชี</option>
          <option>กองแผนงาน</option>
        </select>
      </div>
      <button class="btn btn-primary mt-4" onclick="Router.navigate('hr-50')"><i class="ph ph-user-plus"></i> สร้างบัญชี</button>
    </div>
  `, 'สร้างบัญชีผู้ใช้ใหม่', 'users'),

  'hr-50': () => UI.renderLayout(`
    <div class="success-screen">
      <i class="ph-fill ph-user-check success-icon"></i>
      <h2 class="success-title">สร้างบัญชีสำเร็จ</h2>
      <p class="success-desc">บัญชีผู้ใช้งานใหม่ถูกสร้างและบันทึกลงระบบเรียบร้อยแล้ว</p>
      <button class="btn btn-primary" onclick="Router.navigate('hr-48')"><i class="ph ph-arrow-left"></i> กลับรายการผู้ใช้</button>
    </div>
  `, 'สร้างบัญชีสำเร็จ', 'users'),

  'hr-51': () => UI.renderLayout(`
    <div class="card" style="max-width:600px;">
      <div class="card-header">
        <h3 class="card-title">กำหนดสิทธิ์การใช้งาน</h3>
        <button class="btn btn-outline" onclick="Router.goBack()"><i class="ph ph-arrow-left"></i> กลับ</button>
      </div>
      <p class="mb-4" style="color:var(--text-muted);">ผู้ใช้: <b>นายวีระพงศ์ ตันติวิทยา</b> (dh) — กองเทคโนโลยีสารสนเทศ</p>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <label style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--border);border-radius:8px;cursor:pointer;">
          <input type="checkbox" checked style="accent-color:var(--primary);width:16px;height:16px;">
          <div><div style="font-weight:600;font-size:0.88rem;">P2 — ดึงข้อมูลบุคลากรและศักยภาพ</div><div style="font-size:0.78rem;color:var(--text-muted);">บันทึกผลการประเมินสมรรถนะ</div></div>
        </label>
        <label style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--border);border-radius:8px;cursor:pointer;">
          <input type="checkbox" checked style="accent-color:var(--primary);width:16px;height:16px;">
          <div><div style="font-weight:600;font-size:0.88rem;">P3 — วิเคราะห์อัตรากำลังปัจจุบัน</div><div style="font-size:0.78rem;color:var(--text-muted);">ดูและแก้ไขข้อมูลอัตรากำลัง</div></div>
        </label>
        <label style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--border);border-radius:8px;cursor:pointer;background:#f8fafc;">
          <input type="checkbox" style="accent-color:var(--primary);width:16px;height:16px;">
          <div><div style="font-weight:600;font-size:0.88rem;">P8 — อนุมัติแผน (เฉพาะ HR เท่านั้น)</div><div style="font-size:0.78rem;color:var(--text-muted);">ไม่อนุญาตให้ DH เข้าถึง</div></div>
        </label>
      </div>
      <button class="btn btn-primary mt-4" onclick="Router.navigate('hr-52')"><i class="ph ph-floppy-disk"></i> บันทึกสิทธิ์</button>
    </div>
  `, 'กำหนดสิทธิ์การใช้งาน', 'users'),

  'hr-52': () => UI.renderLayout(`
    <div class="success-screen">
      <i class="ph-fill ph-check-circle success-icon"></i>
      <h2 class="success-title">ปรับปรุงสิทธิ์สำเร็จ</h2>
      <p class="success-desc">อัปเดตสิทธิ์การใช้งานระบบเรียบร้อยแล้ว</p>
      <button class="btn btn-primary" onclick="Router.navigate('hr-48')"><i class="ph ph-arrow-left"></i> กลับรายการผู้ใช้</button>
    </div>
  `, 'ปรับปรุงสิทธิ์สำเร็จ', 'users')
};
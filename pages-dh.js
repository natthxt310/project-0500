/**
 * pages-dh.js - DH Role Screens (58 Screens)
 */

const PagesDH = {
  // --- P1.0 เข้าสู่ระบบ ---
  // DH-01, DH-02, DH-03 handled by Login component

  'dh-04': () => {
    const dhUser = DB.get('users').find(u => u.role === 'DH') || { name: 'DH Admin' };
    const dhFirstName = dhUser.name.replace(/^(นาย|นาง|นางสาว)\s*/, '').split(' ')[0];
    const allReqs = DB.get('requests').filter(r => r.dept === 'กองเทคโนโลยีสารสนเทศ');
    const pendingReqs = allReqs.filter(r => r.status === 'รออนุมัติ');
    const approvedReqs = allReqs.filter(r => r.status === 'อนุมัติแล้ว');
    const rejectedReqs = allReqs.filter(r => r.status === 'ไม่อนุมัติ');
    const hasNewResult = approvedReqs.length > 0 || rejectedReqs.length > 0;
    return UI.renderLayout(`
    <div class="page-hero" style="background:linear-gradient(135deg,#7c3aed 0%,#1a237e 100%);">
      <div class="page-hero-icon"><i class="ph-fill ph-buildings"></i></div>
      <div>
        <h2>ยินดีต้อนรับ, ${dhFirstName}</h2>
        <p>ภาพรวมกองเทคโนโลยีสารสนเทศ — ${new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
    </div>
    ${hasNewResult ? `
    <div class="ai-box ${approvedReqs.length > 0 ? 'ai-box-success' : 'ai-box-warn'}" style="cursor:pointer;" onclick="Router.navigate('dh-52')">
      <i class="ph-fill ${approvedReqs.length > 0 ? 'ph-bell-ringing' : 'ph-x-circle'} ai-box-icon"></i>
      <div>
        <strong>🔔 มีผลการพิจารณาใหม่</strong>
        ${approvedReqs.map(r => `คำขอ <b>${r.id}</b> (${r.type}) — <span style="color:var(--success);font-weight:700;">อนุมัติแล้ว ✓</span>`).join(' | ')}
        ${rejectedReqs.map(r => `คำขอ <b>${r.id}</b> (${r.type}) — <span style="color:var(--danger);font-weight:700;">ไม่อนุมัติ ✗</span>`).join(' | ')}
        — <u>คลิกเพื่อดูรายละเอียด</u>
      </div>
    </div>` : ''}
    <div class="grid-3">
      <div class="stat-card" onclick="Router.navigate('dh-05')" style="cursor:pointer;border-top:3px solid #7c3aed;">
        <span class="stat-label">บุคลากรในสังกัด (IT) <span class="trend-up">✓</span></span>
        <span class="stat-value">${DB.get('employees').filter(e => e.dept === 'กองเทคโนโลยีสารสนเทศ').length}</span>
        <i class="ph-fill ph-users stat-icon"></i>
      </div>
      <div class="stat-card" style="border-top:3px solid var(--danger);">
        <span class="stat-label">ตำแหน่งว่างที่ต้องสรรหาและคัดเลือก <span class="trend-down">⚠ ด่วน</span></span>
        <span class="stat-value text-danger">2</span>
        <i class="ph-fill ph-user-plus stat-icon"></i>
      </div>
      <div class="stat-card" onclick="Router.navigate('dh-52')" style="cursor:pointer;border-top:3px solid ${pendingReqs.length > 0 ? '#f59e0b' : 'var(--success)'};">
        <span class="stat-label">
          ${hasNewResult
        ? `มีผลการพิจารณา <span class="trend-${approvedReqs.length > 0 ? 'up' : 'down'}">${approvedReqs.length > 0 ? '✓ อนุมัติ' : '✗ ไม่อนุมัติ'}</span>`
        : `แผนที่รออนุมัติ${pendingReqs.length > 0 ? ' <span class="trend-down">⚠</span>' : ''}`
      }
        </span>
        <span class="stat-value ${hasNewResult ? (approvedReqs.length > 0 ? 'text-success' : 'text-danger') : (pendingReqs.length > 0 ? 'text-warning' : '')}">${pendingReqs.length + approvedReqs.length + rejectedReqs.length}</span>
        <i class="ph-fill ph-${hasNewResult ? 'bell-ringing' : 'clock'} stat-icon"></i>
      </div>
    </div>
    <div class="ai-box">
      <i class="ph-fill ph-robot ai-box-icon"></i>
      <div><strong>🤖 AI Insight — ภาพรวมกองเทคโนโลยีสารสนเทศ</strong>
        ปริมาณงานสูงกว่ามาตรฐาน 33% | ขาดอัตรากำลัง 2 อัตรา | บุคลากร 1 คนต้องพัฒนาทักษะระบบคลาวด์ — ควรส่งคำขอโดยเร็ว
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3 class="card-title">เมนูด่วน</h3></div>
      <div class="grid-3">
        <button class="btn btn-primary" style="padding:18px;flex-direction:column;gap:8px;height:auto;" onclick="Router.navigate('dh-05')">
          <i class="ph-fill ph-star" style="font-size:1.5rem;"></i>
          ประเมินทักษะบุคลากร
        </button>
        <button class="btn btn-secondary" style="padding:18px;flex-direction:column;gap:8px;height:auto;" onclick="Router.navigate('dh-17')">
          <i class="ph-fill ph-users-three" style="font-size:1.5rem;"></i>
          รายงานอัตรากำลัง
        </button>
        <button class="btn btn-outline" style="padding:18px;flex-direction:column;gap:8px;height:auto;border-color:var(--primary);color:var(--primary);" onclick="Router.navigate('dh-62')">
          <i class="ph-fill ph-paper-plane-right" style="font-size:1.5rem;"></i>
          ส่งคำขอใหม่
        </button>
      </div>
    </div>
  `, 'ภาพรวมกองเทคโนโลยีสารสนเทศ', 'dashboard');
  },

  // --- P2.0 ดึงข้อมูลบุคลากรและศักยภาพ ---
  'dh-05': () => {
    const emps = DB.get('employees').filter(e => e.dept === 'กองเทคโนโลยีสารสนเทศ');
    const evals = DB.get('evaluations');
    return UI.renderLayout(`
      <div class="card">
        <div class="ai-box" style="margin-bottom:16px;"><i class="ph-fill ph-robot ai-box-icon"></i><div><strong>🤖 AI แนะนำ</strong> ประเมินทีมกองIT ให้ครบก่อนสิ้นเดือน — ข้อมูลจะถูกวิเคราะห์ ช่องว่างทักษะ โดย HR อัตโนมัติ (P4.0 วิเคราะห์ทักษะ)</div></div>
          <div class="card-header">
          <h3 class="card-title">รายชื่อบุคลากรเพื่อประเมินศักยภาพ</h3>
          <button class="btn btn-outline" onclick="Router.navigate('dh-14')"><i class="ph ph-clock-counter-clockwise"></i> ดูประวัติย้อนหลัง</button>
        </div>
        <table>
          <tr><th>รหัส</th><th>ชื่อ-สกุล</th><th>ตำแหน่ง</th><th>สถานะประเมิน</th><th>จัดการ</th></tr>
          ${emps.map(e => {
      const hasEval = evals.find(ev => ev.empId === e.id);
      return `
              <tr class="clickable-row" onclick="Router.navigate('dh-06')">
                <td>${e.id}</td>
                <td>${e.name}</td>
                <td>${e.role}</td>
                <td><span class="badge ${hasEval ? 'badge-success' : 'badge-warning'}">${hasEval ? 'ประเมินแล้ว' : 'รอประเมิน'}</span></td>
                <td onclick="event.stopPropagation()">
                  ${hasEval
          ? `<button class="btn btn-outline" style="padding: 4px 8px; font-size:12px;" onclick="Router.navigate('dh-08')">แก้ไขผล</button>`
          : `<button class="btn btn-primary" style="padding: 4px 8px; font-size:12px;" onclick="Router.navigate('dh-07')">ประเมิน</button>`
        }
                </td>
              </tr>
            `;
    }).join('')}
        </table>
      </div>
    `, 'ประเมินบุคลากร', 'eval');
  },

  'dh-06': () => UI.renderLayout(`
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">ข้อมูลบุคลากร: นายอรรถพล มีชัยภูมิ</h3>
        <button class="btn btn-outline" onclick="Router.goBack()">กลับ</button>
      </div>
      <div class="grid-3 mb-4">
        <div><strong>รหัสบุคลากร:</strong> E003</div>
        <div><strong>ตำแหน่ง:</strong> นักพัฒนาระบบสารสนเทศ</div>
        <div><strong>อายุงาน:</strong> 2 ปี 4 เดือน</div>
      </div>
      <div class="mb-4">
        <button class="btn btn-primary" onclick="Router.navigate('dh-07')">เริ่มประเมินทักษะรอบปัจจุบัน</button>
      </div>
    </div>
  `, 'รายละเอียดบุคลากร', 'eval'),

  'dh-07': () => UI.renderLayout(`
    <div class="card" style="max-width:800px;">
      <div class="card-header"><h3 class="card-title">ฟอร์มประเมินทักษะ (E003)</h3></div>
      <p class="text-muted mb-4">โปรดประเมินทักษะตามพฤติกรรมที่สังเกตได้จริง (1=ต่ำสุด, 5=สูงสุด)</p>
      
      <h4 class="mb-2 text-primary">ทักษะหลัก (Core Competency)</h4>
      <div class="input-group" style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--border); padding-bottom:8px;">
        <label style="flex:1">SK01 — การสื่อสารและการประสานงาน <span style="font-size:0.78rem;color:var(--text-muted);">(เกณฑ์: ระดับ 3)</span></label>
        <select id="sk01" class="input-field" style="width:200px;"><option value="">-- เลือก --</option><option value="1">ระดับ 1</option><option value="2">ระดับ 2</option><option value="3">ระดับ 3</option><option value="4">ระดับ 4</option><option value="5">ระดับ 5</option></select>
      </div>
      <div class="input-group" style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--border); padding-bottom:8px; margin-top:8px;">
        <label style="flex:1">SK04 — การวิเคราะห์ข้อมูลและจัดทำรายงาน <span style="font-size:0.78rem;color:var(--text-muted);">(เกณฑ์: ระดับ 3)</span></label>
        <select id="sk04" class="input-field" style="width:200px;"><option value="">-- เลือก --</option><option value="1">ระดับ 1</option><option value="2">ระดับ 2</option><option value="3">ระดับ 3</option><option value="4">ระดับ 4</option><option value="5">ระดับ 5</option></select>
      </div>

      <h4 class="mb-2 text-primary mt-4">ทักษะเฉพาะด้าน (Functional Competency)</h4>
      <div class="input-group" style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--border); padding-bottom:8px;">
        <label style="flex:1">SK02 — การพัฒนาระบบสารสนเทศ <span style="font-size:0.78rem;color:var(--text-muted);">(เกณฑ์: ระดับ 4)</span></label>
        <select id="sk02" class="input-field" style="width:200px;"><option value="">-- เลือก --</option><option value="1">ระดับ 1</option><option value="2">ระดับ 2</option><option value="3">ระดับ 3</option><option value="4">ระดับ 4</option><option value="5">ระดับ 5</option></select>
      </div>
      <div class="input-group" style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--border); padding-bottom:8px; margin-top:8px;">
        <label style="flex:1">SK03 — ความมั่นคงปลอดภัยทางไซเบอร์ <span style="font-size:0.78rem;color:var(--text-muted);">(เกณฑ์: ระดับ 4)</span></label>
        <select id="sk03" class="input-field" style="width:200px;"><option value="">-- เลือก --</option><option value="1">ระดับ 1</option><option value="2">ระดับ 2</option><option value="3">ระดับ 3</option><option value="4">ระดับ 4</option><option value="5">ระดับ 5</option></select>
      </div>

      <div class="flex gap-2 mt-4 justify-between">
        <button class="btn btn-outline" onclick="Router.navigate('dh-09')">ตรวจสอบความครบถ้วนก่อนส่ง</button>
        <div>
          <button class="btn btn-outline" onclick="Router.goBack()">ยกเลิก</button>
        </div>
      </div>
    </div>
  `, 'กรอกผลประเมิน', 'eval'),

  'dh-08': () => {
    // Similar to 07 but filled data
    const content = PagesDH['dh-07']().replace('<option value="">-- เลือก --</option>', '').replace('<option value="3">ระดับ 3</option>', '<option value="3" selected>ระดับ 3</option>');
    return content.replace('ฟอร์มประเมินทักษะ', 'แก้ไขฟอร์มประเมินทักษะ').replace('ตรวจสอบความครบถ้วนก่อนส่ง', 'ตรวจสอบก่อนบันทึกแก้ไข');
  },

  'dh-09': () => {
    // Validation กระบวนการ
    setTimeout(() => {
      // Simulate validation error (not full)
      Router.navigate('dh-10');
    }, 800);
    return UI.renderLayout(`
      <div class="card text-center" style="padding:60px;">
        <i class="ph ph-spinner ph-spin" style="font-size:64px; color:var(--primary)"></i>
        <h3 class="mt-4">ระบบกำลังคัดกรองความครบถ้วน (P 2.2)...</h3>
      </div>
    `, 'กำลังตรวจสอบ', 'eval');
  },

  'dh-10': () => UI.renderLayout(`
    <div class="card" style="max-width:600px; border-top: 4px solid var(--danger);">
      <h3 class="card-title text-danger mb-4"><i class="ph-fill ph-warning-circle"></i> ตรวจพบข้อมูลไม่ครบถ้วน</h3>
      <p class="mb-4">คุณยังไม่ได้ประเมินทักษะดังต่อไปนี้:</p>
      <ul style="margin-left: 24px; margin-bottom: 24px;">
        <li>พัฒนาระบบสารสนเทศ (ยังไม่ระบุระดับคะแนน)</li>
      </ul>
      <button class="btn btn-primary" onclick="Router.navigate('dh-11')">กลับไปแก้ไข</button>
    </div>
  `, 'แจ้งเตือนข้อผิดพลาด', 'eval'),

  'dh-11': () => {
    // Returns to form with dummy highlight
    const content = PagesDH['dh-07']().replace('style="width:200px;"', 'style="width:200px; border-color:var(--danger); box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);"').replace("onclick=\"Router.navigate('dh-09')\"", "onclick=\"Router.navigate('dh-12')\"");
    return content;
  },

  'dh-12': () => {
    setTimeout(() => {
      UI.showModal('ยืนยันจัดเก็บข้อมูล', 'ข้อมูลครบถ้วน ยืนยันบันทึกผลการประเมินนี้ลงในฐาน<span class="tooltip" data-tooltip="ตารางข้อมูล D2: ผลการประเมินทักษะของบุคลากรรายบุคคล">ข้อมูลศักยภาพ (D2) <i class="ph-fill ph-question"></i></span>?', 'บันทึก', () => {
        DB.insert('evaluations', { empId: 'E003', date: new Date().toISOString().split('T')[0], scores: { 'SK01': 4, 'SK02': 4 } });
        Router.navigate('dh-13');
      });
    }, 100);
    return PagesDH['dh-07'](); // Show behind modal
  },

  'dh-13': () => UI.renderLayout(`
    <div class="success-screen">
      <i class="ph-fill ph-check-circle success-icon"></i>
      <h2 class="success-title">บันทึกประเมินสำเร็จ</h2>
      <p class="success-desc">ผลประเมินถูกเก็บลงใน D2 เรียบร้อยแล้ว ระบบ HR จะนำไปวิเคราะห์ต่อไป</p>
      <button class="btn btn-primary" onclick="Router.navigate('dh-05')">กลับหน้ารายชื่อ</button>
    </div>
  `, 'สำเร็จ', 'eval'),

  'dh-14': () => UI.renderLayout(`
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">ประวัติการประเมินย้อนหลัง</h3>
        <button class="btn btn-secondary" onclick="Router.navigate('dh-16')"><i class="ph ph-chart-bar"></i> ดูภาพรวมศักยภาพ</button>
      </div>
      <table>
        <tr><th>รอบประเมิน</th><th>ผู้ถูกประเมิน</th><th>วันที่บันทึก</th><th>สถานะ</th></tr>
        <tr class="clickable-row" onclick="Router.navigate('dh-15')"><td>H1/2026</td><td>นายธนากร วงศ์ประเสริฐ</td><td>01/05/2026</td><td><span class="badge badge-success">สมบูรณ์</span></td></tr>
      </table>
    </div>
  `, 'ประวัติประเมิน', 'eval'),

  'dh-15': () => {
    const dhUser = DB.get('users').find(u => u.role === 'DH');
    const evaluatorName = dhUser ? dhUser.name : (AppState.currentUser || 'ไม่ระบุ');
    return UI.renderLayout(`
    <div class="card">
      <div class="card-header"><h3 class="card-title">ผลการประเมินรอบ H1/2026</h3><button class="btn btn-outline" onclick="Router.goBack()">กลับ</button></div>
      <p>บุคลากร: นายธนากร วงศ์ประเสริฐ</p>
      <p>ประเมินโดย: ${evaluatorName}</p>
      <hr style="margin:16px 0;">
      <p>การสื่อสารและการประสานงาน: 4/5</p>
      <p>การพัฒนาระบบสารสนเทศ: 5/5</p>
    </div>
  `, 'รายละเอียดผลย้อนหลัง', 'eval');
  },

  'dh-16': () => {
    UI.renderChart('chart-dh-16', 'bar',
      ['การสื่อสารและประสานงาน', 'การพัฒนาระบบสารสนเทศ', 'ความมั่นคงปลอดภัยไซเบอร์', 'การวิเคราะห์ข้อมูล'],
      [
        { label: 'ระดับทักษะเฉลี่ย', data: [4.2, 3.8, 3.0, 3.5], backgroundColor: '#1e3a8a', borderRadius: 4 }
      ],
      { scales: { y: { min: 0, max: 5 } } }
    );
    return UI.renderLayout(`
      <div class="card">
        <div class="card-header"><h3 class="card-title">ภาพรวมศักยภาพทีมกองเทคโนโลยีสารสนเทศ</h3><button class="btn btn-outline" onclick="Router.goBack()">กลับ</button></div>
        <div style="height:300px; width:100%; margin: 20px auto;">
          <canvas id="chart-dh-16"></canvas>
        </div>
        <p class="text-center text-muted mt-4">ทักษะเฉลี่ยของคนในทีมทั้งหมด (เต็ม 5)</p>
      </div>
    `, 'ภาพรวมศักยภาพบุคลากร', 'eval');
  },

  // --- P3.0 วิเคราะห์อัตรากำลังปัจจุบัน ---
  'dh-17': () => UI.renderLayout(`
    <div class="card" style="max-width:600px;">
      <div class="card-header"><h3 class="card-title">รายงานจำนวนบุคลากรปัจจุบัน (P 3.1)</h3></div>
      <p class="text-muted mb-4">รายงานยอดอัตรากำลังและปริมาณงานในหน่วยงานของคุณ</p>
      <div class="input-group">
        <label class="input-label">หน่วยงาน</label>
        <input type="text" class="input-field" value="กองเทคโนโลยีสารสนเทศ" disabled>
      </div>
      <div class="input-group">
        <label class="input-label">จำนวนโปรเจกต์ที่รับผิดชอบ</label>
        <input type="number" class="input-field" placeholder="เช่น 12">
      </div>
      <div class="input-group">
        <label class="input-label">ชั่วโมงทำงานรวมเฉลี่ย/สัปดาห์</label>
        <input type="number" class="input-field" placeholder="เช่น 160">
      </div>
      <button class="btn btn-primary mt-4" onclick="Router.navigate('dh-18')">ตรวจสอบข้อมูล</button>
    </div>
  `, 'ฟอร์มรายงานกำลังคน', 'workforce'),

  'dh-18': () => UI.renderLayout(`
    <div class="card" style="max-width:600px;">
      <div class="card-header"><h3 class="card-title">ตรวจสอบข้อมูลก่อนส่ง</h3></div>
      <div style="background:var(--bg-color); padding:16px; border-radius:6px; margin-bottom:16px;">
        <p><strong>หน่วยงาน:</strong> กองเทคโนโลยีสารสนเทศ</p>
        <p><strong>จำนวนโปรเจกต์:</strong> 12 โครงการ</p>
        <p><strong>ชั่วโมงทำงานรวม:</strong> 160 ชม./สัปดาห์</p>
        <p class="text-danger mt-2"><i class="ph-fill ph-info"></i> ปริมาณงานระดับ: <strong>สูงมาก (งานล้นอัตรากำลัง)</strong></p>
      </div>
      <div style="padding:12px 16px;background:#fef3c7;border-radius:8px;margin-bottom:16px;font-size:0.85rem;color:#92400e;display:flex;align-items:center;gap:8px;">
        <i class="ph-fill ph-robot" style="font-size:1.2rem;"></i>
        <span><strong>AI วิเคราะห์:</strong> ชม.เฉลี่ย/คน = 53 ชม. (เกินมาตรฐาน 40 ชม.) → ระบบแนะนำ: ควรขออัตรากำลังเพิ่ม — ความน่าจะเป็นอนุมัติ: <b>88%</b></span>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-primary" onclick="Router.navigate('dh-20')">ยืนยันความถูกต้อง</button>
        <button class="btn btn-outline" onclick="Router.navigate('dh-19')">มีข้อผิดพลาด (จำลองแจ้งเตือน)</button>
      </div>
    </div>
  `, 'รีวิวข้อมูล', 'workforce'),

  'dh-19': () => UI.renderLayout(`
    <div class="card" style="max-width:600px; border-left:4px solid var(--warning);">
      <h3 class="card-title text-warning mb-4"><i class="ph-fill ph-warning"></i> แจ้งเตือน: ชั่วโมงทำงานผิดปกติ</h3>
      <p>ชั่วโมงทำงาน 160 ชม. เมื่อเทียบกับจำนวนคน 3 คน เฉลี่ยตกคนละ 53 ชม./สัปดาห์ (เกินมาตรฐาน 40 ชม.) โปรดตรวจสอบตัวเลขอีกครั้ง</p>
      <button class="btn btn-primary mt-4" onclick="Router.goBack()">กลับไปแก้ไข</button>
    </div>
  `, 'แจ้งเตือนความถูกต้อง', 'workforce'),

  'dh-20': () => {
    const emps = DB.get('employees').filter(e => e.dept === 'กองเทคโนโลยีสารสนเทศ');
    return UI.renderLayout(`
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">จำแนกตามโครงสร้างหน่วยงาน (P 3.2)</h3>
          <button class="btn btn-secondary" onclick="Router.navigate('dh-21')"><i class="ph ph-tree-structure"></i> ดูแผนผัง</button>
        </div>
        <table>
          <tr><th>พนักงาน</th><th>ตำแหน่ง (Role)</th><th>ประเภทงาน</th></tr>
          ${emps.map(e => `
            <tr class="clickable-row" onclick="Router.navigate('dh-22')">
              <td>${e.name}</td>
              <td>${e.role}</td>
              <td><span class="badge badge-info">ปฏิบัติการ</span></td>
            </tr>
          `).join('')}
        </table>
        <div class="mt-4 text-center">
          <button class="btn btn-primary" onclick="Router.navigate('dh-23')">จัดเก็บข้อมูลลงระบบ (D3)</button>
        </div>
      </div>
    `, 'จำแนกโครงสร้าง', 'workforce');
  },

  'dh-21': () => UI.renderLayout(`
    <div class="card">
      <div class="card-header"><h3 class="card-title">แผนผังองค์กรกองเทคโนโลยีสารสนเทศ</h3><button class="btn btn-outline" onclick="Router.goBack()">กลับ</button></div>
      <div style="text-align:center; padding:40px; background:var(--bg-color); border-radius:8px;">
        <div style="padding:16px; background:var(--primary); color:white; border-radius:8px; display:inline-block; margin-bottom:24px;">นายวีระพงศ์ ตันติวิทยา<br><small style="opacity:0.8;">หัวหน้ากองเทคโนโลยีสารสนเทศ</small></div>
        <div style="display:flex; justify-content:center; gap:32px;">
          <div style="padding:16px; background:white; border:1px solid var(--border); border-radius:8px;">นักวิเคราะห์ระบบ<br>(1 อัตรา)</div>
          <div style="padding:16px; background:white; border:1px solid var(--border); border-radius:8px;">นักพัฒนาระบบสารสนเทศ<br>(1 อัตรา)</div>
          <div style="padding:16px; background:white; border:1px solid var(--border); border-radius:8px;">ผู้ดูแลระบบเครือข่าย<br>(1 อัตรา)</div>
        </div>
      </div>
    </div>
  `, 'แผนผังองค์กร', 'workforce'),

  'dh-22': () => UI.renderLayout(`
    <div class="card">
      <div class="card-header"><h3 class="card-title">รายละเอียดตำแหน่ง นักพัฒนาระบบสารสนเทศ</h3><button class="btn btn-outline" onclick="Router.goBack()">กลับ</button></div>
      <p><strong>สายงาน:</strong> ปฏิบัติการหลัก</p>
      <p><strong>ผู้ดำรงตำแหน่ง:</strong> นายอรรถพล มีชัยภูมิ</p>
      <p><strong>ระดับความสำคัญต่อแผนก:</strong> สูงมาก</p>
    </div>
  `, 'รายละเอียดตำแหน่ง', 'workforce'),

  'dh-23': () => {
    setTimeout(() => {
      UI.showModal('ยืนยันบันทึก', 'จัดเก็บข้อมูลอัตรากำลัง 3 อัตรา และปริมาณงานของกองเทคโนโลยีสารสนเทศ ลงในฐานข้อมูล D3?', 'ตกลง', () => {
        DB.update('workforce', 'dept', 'กองเทคโนโลยีสารสนเทศ', { current: 3, workload: 'งานล้นอัตรากำลัง' });
        Router.navigate('dh-24');
      });
    }, 100);
    return PagesDH['dh-20']();
  },

  'dh-24': () => UI.renderLayout(`
    <div class="success-screen">
      <i class="ph-fill ph-hard-drives success-icon"></i>
      <h2 class="success-title">จัดเก็บอัตรากำลังสำเร็จ</h2>
      <p class="success-desc">ข้อมูลถูกบันทึกใน D3 พร้อมเข้าสู่กระบวนการวิเคราะห์อัตรากำลังแล้ว</p>
      <button class="btn btn-primary" onclick="Router.navigate('dh-25')">ดูภาพรวมอัตรากำลัง</button>
    </div>
  `, 'สำเร็จ', 'workforce'),

  'dh-25': () => UI.renderLayout(`
    <div class="grid-3 mb-4">
      <div class="stat-card">
        <span class="stat-label">พนักงานปัจจุบัน</span>
        <span class="stat-value">3 คน</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">เป้าหมายตามโครงสร้าง</span>
        <span class="stat-value text-primary">5 คน</span>
      </div>
      <div class="stat-card" style="border-left-color:var(--danger)">
        <span class="stat-label">สถานะปริมาณงาน</span>
        <span class="stat-value text-danger">งานล้นอัตรากำลัง</span>
      </div>
    </div>
        <div class="card">
      <div class="card-header"><h3 class="card-title">สถานะอัตรากำลัง (Visual)</h3></div>
      <div class="skill-bar-row">
        <span class="skill-bar-label">กำลังคนปัจจุบัน</span>
        <div class="skill-bar-track"><div class="skill-bar-fill" style="width:60%;background:linear-gradient(90deg,#f59e0b,#fbbf24);"></div></div>
        <span class="skill-bar-value">3 / 5 คน</span>
      </div>
      <div class="skill-bar-row">
        <span class="skill-bar-label">ความพร้อมรับงาน</span>
        <div class="skill-bar-track"><div class="skill-bar-fill" style="width:40%;background:linear-gradient(90deg,#ef4444,#f87171);"></div></div>
        <span class="skill-bar-value">40%</span>
      </div>
      <div class="skill-bar-row">
        <span class="skill-bar-label">ทักษะเฉลี่ยทีม</span>
        <div class="skill-bar-track"><div class="skill-bar-fill" style="width:76%;background:linear-gradient(90deg,#3b82f6,#60a5fa);"></div></div>
        <span class="skill-bar-value">3.8 / 5</span>
      </div>
    </div><div class="card text-center">
      <button class="btn btn-primary" onclick="Router.navigate('dh-26')">ดำเนินการวิเคราะห์ช่องว่างอัตรากำลัง (P5)</button>
    </div>
  `, 'ภาพรวม อัตรากำลัง', 'workforce'),

  // --- P5.0 ระบุหน่วยงานที่ขาดหรือเกินอัตรากำลัง ---
  'dh-26': () => {
    const it = DB.get('workforce').find(w => w.dept === 'กองเทคโนโลยีสารสนเทศ');
    return UI.renderLayout(`
      <div class="card">
        <div class="card-header"><h3 class="card-title">ดึงข้อมูลอัตรากำลัง (P 5.1)</h3></div>
        <table>
          <tr><th>หน่วยงาน</th><th>อัตราปัจจุบัน</th><th>เป้าหมาย</th><th>ปริมาณงาน (ชั่วโมง)</th></tr>
          <tr><td>${it.dept}</td><td>${it.current}</td><td>${it.target}</td><td><span class="badge badge-danger">${it.workload}</span></td></tr>
        </table>
        <button class="btn btn-primary mt-4" onclick="Router.navigate('dh-27')">คำนวณส่วนต่างอัตรากำลัง (5.2)</button>
      </div>
    `, 'ข้อมูลเพื่อการวิเคราะห์', 'gap');
  },

  'dh-27': () => UI.renderLayout(`
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">ผลคำนวณส่วนต่างกำลังคน</h3>
        <button class="btn btn-outline" onclick="Router.navigate('dh-28')"><i class="ph ph-chart-bar"></i> ดูกราฟเปรียบเทียบ</button>
      </div>
      <table class="mb-4">
        <tr><th>ตำแหน่ง</th><th>มีอยู่</th><th>ต้องการ (อัตรากำลังเต็มเวลา)</th><th>ส่วนต่าง</th></tr>
        <tr><td>นักวิเคราะห์ระบบ</td><td>1</td><td>1.5</td><td><span class="text-danger">-0.5</span></td></tr>
        <tr><td>นักพัฒนาระบบสารสนเทศ</td><td>1</td><td>2.5</td><td><span class="text-danger">-1.5</span></td></tr>
        <tr><td>ผู้ดูแลระบบเครือข่าย</td><td>1</td><td>1.0</td><td><span class="text-success">พอดี</span></td></tr>
        <tr style="background:#fef3c7; font-weight:bold;"><td>รวมทั้งหน่วยงาน</td><td>3</td><td>5.0</td><td><span class="text-danger">-2.0 (ขาดคน)</span></td></tr>
      </table>
      <button class="btn btn-primary" onclick="Router.navigate('dh-29')">สรุปสถานะหน่วยงาน (5.3)</button>
    </div>
  `, 'วิเคราะห์ส่วนต่างกำลังคน', 'gap'),

  'dh-28': () => {
    UI.renderChart('chart-dh-28', 'bar',
      ['นักวิเคราะห์ระบบ', 'นักพัฒนาระบบสารสนเทศ', 'ผู้ดูแลระบบเครือข่าย'],
      [
        { label: 'อัตราปัจจุบัน', data: [1, 1, 1], backgroundColor: '#f59e0b', borderRadius: 4 },
        { label: 'อัตราเป้าหมาย (อัตรากำลังเต็มเวลา)', data: [1.5, 2.5, 1.0], backgroundColor: '#1e3a8a', borderRadius: 4 }
      ]
    );
    return UI.renderLayout(`
      <div class="card">
        <div class="card-header"><h3 class="card-title">กราฟเปรียบเทียบอัตรากำลัง</h3><button class="btn btn-outline" onclick="Router.goBack()">กลับ</button></div>
        <div style="height:300px; width:100%; margin: 20px auto;">
          <canvas id="chart-dh-28"></canvas>
        </div>
      </div>
    `, 'กราฟเปรียบเทียบกำลังคน', 'gap');
  },

  'dh-29': () => UI.renderLayout(`
    <div class="card" style="border-top:4px solid var(--danger)">
      <div class="card-header"><h3 class="card-title text-danger">สรุปสถานะ: ขาดอัตรากำลังระดับรุนแรง</h3></div>
      <p class="mb-4">กองเทคโนโลยีสารสนเทศ มีปริมาณงานที่เกินกว่ากำลังคนจะรับมือได้ (งานล้นอัตรากำลัง) ขาดอัตรากำลังอย่างน้อย 2 อัตรา</p>
            <div class="ai-box ai-box-warn" style="margin-top:16px;margin-bottom:16px;">
        <i class="ph-fill ph-warning ai-box-icon"></i>
        <div><strong>🤖 AI วิเคราะห์ P5.0 อัตรากำลัง</strong>
          อัตรากำลังเต็มเวลา ที่ต้องการ = 5.0 อัตรา | มีจริง 3 อัตรา | ช่องว่าง = <b>-2.0</b> — ระบบแนะนำส่งคำขอเร่งด่วน
        </div>
      </div><div class="flex gap-4">
        <button class="btn btn-outline" onclick="Router.navigate('dh-30')">ดูรายละเอียดการขาด</button>
        <button class="btn btn-outline" onclick="Router.navigate('dh-31')">กรณีศึกษาถ้าบุคลากรเกิน</button>
      </div>
      <hr style="margin:24px 0; border:0; border-top:1px solid var(--border);">
      <p class="text-muted mb-2">คำแนะนำ: ควรนำผลนี้ไปตั้งเป็นคำขอในกระบวนการ P7.0 ต่อไป</p>
      <button class="btn btn-primary" onclick="Router.navigate('dh-43')">ไปหน้าวางแผนหน่วยงาน (P7)</button>
    </div>
  `, 'สรุปสถานะองค์กร', 'gap'),

  'dh-30': () => UI.renderLayout(`
    <div class="card" style="border-top:4px solid var(--danger); max-width: 800px;">
      <div class="card-header">
        <h3 class="card-title text-danger"><i class="ph-fill ph-warning-circle"></i> รายละเอียดอัตรากำลังที่ขาด (Shortage)</h3>
        <button class="btn btn-outline" onclick="Router.goBack()">กลับ</button>
      </div>
      <div style="background:#fef2f2; padding:15px; border-radius:6px; margin-bottom:20px; color: #991b1b;">
        <strong>ผลการวิเคราะห์ส่วนต่าง (Gap Analysis):</strong> ขาดแคลนบุคลากรสาย IT รวม 1.5 อัตรา เพื่อให้สอดคล้องกับภาระงานจริง
      </div>
      <table style="width:100%; text-align:left; border-collapse:collapse;">
        <tr style="background:#f8fafc;">
          <th style="padding:12px; border-bottom:2px solid #cbd5e1;">ตำแหน่งที่ต้องการเพิ่ม</th>
          <th style="padding:12px; border-bottom:2px solid #cbd5e1;">จำนวนที่ขาด (อัตรา)</th>
          <th style="padding:12px; border-bottom:2px solid #cbd5e1;">แนวทางแก้ไขที่แนะนำ</th>
        </tr>
        <tr>
          <td style="padding:12px; border-bottom:1px solid #e2e8f0; font-weight:bold;">นักพัฒนาระบบสารสนเทศ</td>
          <td style="padding:12px; border-bottom:1px solid #e2e8f0; color:var(--danger); font-weight:bold;">1.0</td>
          <td style="padding:12px; border-bottom:1px solid #e2e8f0;">ขอเปิดสรรหาบุคลากรใหม่ประจำ (Full-time)</td>
        </tr>
        <tr>
          <td style="padding:12px; border-bottom:1px solid #e2e8f0; font-weight:bold;">นักวิเคราะห์ระบบ (SA)</td>
          <td style="padding:12px; border-bottom:1px solid #e2e8f0; color:var(--danger); font-weight:bold;">0.5</td>
          <td style="padding:12px; border-bottom:1px solid #e2e8f0;">จ้างเหมาบริการ / สัญญาจ้างชั่วคราว (Part-time)</td>
        </tr>
      </table>
      <div class="mt-4 flex gap-2">
        <button class="btn btn-primary" onclick="Router.navigate('dh-62')">สร้างคำขออัตรากำลังเพิ่ม (ไปยัง P7)</button>
      </div>
    </div>
  `, 'รายละเอียดส่วนที่ขาด', 'gap'),

  'dh-31': () => UI.renderLayout(`
    <div class="card" style="border-top:4px solid var(--success); max-width: 800px;">
      <div class="card-header">
        <h3 class="card-title text-success"><i class="ph-fill ph-users-three"></i> กรณีศึกษา: บุคลากรเกินอัตรา (Surplus)</h3>
        <button class="btn btn-outline" onclick="Router.goBack()">กลับ</button>
      </div>
      <div style="background:#f0fdf4; padding:15px; border-radius:6px; margin-bottom:20px; color: #166534;">
        <strong>ผลการวิเคราะห์ส่วนต่าง (Gap Analysis):</strong> หากคำนวณแล้ว ภาระงานจริง (FTE = 1.5) น้อยกว่า บุคลากรที่มีอยู่ (3 คน) สถานะจะถือว่า "เกินอัตรากำลัง"
      </div>
      <table style="width:100%; text-align:left; border-collapse:collapse;">
        <tr style="background:#f8fafc;">
          <th style="padding:12px; border-bottom:2px solid #cbd5e1;">กลุ่มงาน / ตำแหน่ง</th>
          <th style="padding:12px; border-bottom:2px solid #cbd5e1;">อัตราที่มีอยู่</th>
          <th style="padding:12px; border-bottom:2px solid #cbd5e1;">ภาระงานจริง (FTE)</th>
          <th style="padding:12px; border-bottom:2px solid #cbd5e1;">ส่วนเกิน</th>
        </tr>
        <tr>
          <td style="padding:12px; border-bottom:1px solid #e2e8f0;">นักวิชาการคอมพิวเตอร์</td>
          <td style="padding:12px; border-bottom:1px solid #e2e8f0; text-align:center;">3</td>
          <td style="padding:12px; border-bottom:1px solid #e2e8f0; text-align:center;">1.5</td>
          <td style="padding:12px; border-bottom:1px solid #e2e8f0; color:var(--success); font-weight:bold; text-align:center;">+ 1.5</td>
        </tr>
      </table>
      <div class="ai-box mt-4">
        <i class="ph-fill ph-lightbulb ai-box-icon"></i>
        <div>
          <strong>ข้อเสนอแนะเชิงบริหาร:</strong> ควรพิจารณาเกลี่ยอัตรากำลัง (Re-deployment) ไปยังหน่วยงานอื่นที่ขาดแคลน หรือมอบหมายภารกิจโครงการใหม่เพื่อเพิ่มประสิทธิภาพการทำงานสูงสุด
        </div>
      </div>
    </div>
  `, 'ตัวอย่างส่วนที่เกิน', 'gap'),

  // --- P6.0 กำหนดแผนพัฒนาศักยภาพรายบุคคล ---
  'dh-32': () => UI.renderLayout(`
    <div class="card">
      <div class="card-header"><h3 class="card-title">รายชื่อบุคลากรที่มีช่องว่างทักษะ</h3></div>
      <p class="text-muted mb-4">ดึงข้อมูลจากผลวิเคราะห์ (D5) ของ HR</p>
      <table>
        <tr><th>ชื่อ-สกุล</th><th>คะแนนประเมิน</th><th>สถานะ Gap</th><th>จัดการ</th></tr>
        <tr class="clickable-row" onclick="Router.navigate('dh-33')"><td>นางสาวณัฐธิดา รุ่งเรือง</td><td>8/12</td><td><span class="badge badge-danger">ต้องพัฒนา</span></td><td><button class="btn btn-primary" style="padding: 4px 8px; font-size:12px;" onclick="Router.navigate('dh-35')">สร้างแผน</button></td></tr>
      </table>
    </div>
  `, 'ดึงข้อมูลช่องว่างทักษะ', 'dev-plan'),

  'dh-33': () => UI.renderLayout(`
    <div class="card">
      <div class="card-header"><h3 class="card-title">รายละเอียดช่องว่าง: นางสาวณัฐธิดา รุ่งเรือง</h3><button class="btn btn-outline" onclick="Router.goBack()">กลับ</button></div>
      <p>ขาดทักษะ <b>การพัฒนาระบบสารสนเทศ</b> ระดับ 4 (ทำได้แค่ระดับ 2)</p>
      <button class="btn btn-secondary mt-4" onclick="Router.navigate('dh-34')">ดูกราฟเปรียบเทียบ</button>
    </div>
  `, 'รายละเอียดส่วนต่าง', 'dev-plan'),

  'dh-34': () => {
    UI.renderChart('chart-dh-34', 'radar',
      ['การสื่อสาร', 'การพัฒนาระบบสารสนเทศ', 'สถาปัตยกรรมระบบคลาวด์', 'การแก้ปัญหา', 'การทำงานเป็นทีม'],
      [
        { label: 'ระดับเป้าหมาย (ต้องการ)', data: [3, 4, 3, 3, 3], backgroundColor: 'rgba(30, 58, 138, 0.2)', borderColor: 'rgba(30, 58, 138, 1)', pointBackgroundColor: 'rgba(30, 58, 138, 1)' },
        { label: 'ระดับปัจจุบัน (ทำได้)', data: [4, 4, 2, 4, 5], backgroundColor: 'rgba(239, 68, 68, 0.2)', borderColor: 'rgba(239, 68, 68, 1)', pointBackgroundColor: 'rgba(239, 68, 68, 1)' }
      ],
      { scales: { r: { min: 0, max: 5 } } }
    );
    return UI.renderLayout(`
      <div class="card">
        <div class="card-header"><h3 class="card-title">กราฟทักษะ (ช่องว่างทักษะ)</h3><button class="btn btn-outline" onclick="Router.goBack()">กลับ</button></div>
        <div style="height:350px; width:100%; margin: 20px auto;">
          <canvas id="chart-dh-34"></canvas>
        </div>
      </div>
    `, 'กราฟทักษะ', 'dev-plan');
  },

  'dh-35': () => UI.renderLayout(`
    <div class="card" style="max-width:600px;">
      <div class="card-header"><h3 class="card-title">ระบุหัวข้อการพัฒนารายบุคคล</h3></div>
      <p class="mb-4">สำหรับ: <b>นางสาวณัฐธิดา รุ่งเรือง</b> (ลด Gap ทักษะ การพัฒนาระบบสารสนเทศ)</p>
      <div class="input-group">
        <label class="input-label">ชื่อหลักสูตร/หัวข้อ</label>
        <input type="text" class="input-field" value="การพัฒนาระบบสารสนเทศแบบครบวงจร สำหรับระบบสารสนเทศมหาวิทยาลัย">
      </div>
      <button class="btn btn-primary" onclick="Router.navigate('dh-36')">ถัดไป</button>
    </div>
  `, 'ระบุหัวข้อพัฒนา', 'dev-plan'),

  'dh-36': () => UI.renderLayout(`
    <div class="card" style="max-width:600px;">
      <div class="card-header"><h3 class="card-title">เลือกรูปแบบการพัฒนา</h3></div>
      <div class="input-group">
        <label style="display:block; padding:16px; border:1px solid var(--border); border-radius:6px; margin-bottom:8px; cursor:pointer;">
          <input type="radio" name="devType" checked> ส่งเข้ารับการอบรมภายนอก (อบรม)
        </label>
        <label style="display:block; padding:16px; border:1px solid var(--border); border-radius:6px; margin-bottom:8px; cursor:pointer;">
          <input type="radio" name="devType"> สอนงานโดยพี่เลี้ยง (พี่เลี้ยง / ฝึกปฏิบัติงาน)
        </label>
        <label style="display:block; padding:16px; border:1px solid var(--border); border-radius:6px; cursor:pointer;">
          <input type="radio" name="devType"> เรียนรู้ด้วยตนเองผ่าน เรียนรู้ออนไลน์
        </label>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-primary" onclick="Router.navigate('dh-37')">สร้างร่างแผน</button>
        <button class="btn btn-outline" onclick="Router.goBack()">กลับ</button>
      </div>
    </div>
  `, 'เลือกประเภทการพัฒนา', 'dev-plan'),

  'dh-37': () => UI.renderLayout(`
    <div class="card" style="max-width:600px;">
      <div class="card-header"><h3 class="card-title">ร่างแผนพัฒนาศักยภาพ (P 6.3)</h3></div>
      <div class="input-group">
        <label class="input-label">เป้าหมายหลังพัฒนา</label>
        <textarea class="input-field" rows="2">สามารถพัฒนาระบบสารสนเทศแบบครบวงจรได้อย่างอิสระ (ระดับ 4)</textarea>
      </div>
      <div class="input-group">
        <label class="input-label">ช่วงเวลาดำเนินการ</label>
        <input type="month" class="input-field" value="2026-06">
      </div>
      <div class="input-group">
        <label class="input-label">งบประมาณโดยประมาณ (บาท)</label>
        <input type="number" class="input-field" value="15000">
      </div>
      <button class="btn btn-primary" onclick="Router.navigate('dh-38')">บันทึกแผนส่วนบุคคล</button>
    </div>
  `, 'สร้างแผนพัฒนาบุคคล', 'dev-plan'),

  'dh-38': () => UI.renderLayout(`
    <div class="card" style="max-width:600px;">
      <div class="card-header"><h3 class="card-title">ตรวจสอบร่างแผนพัฒนา</h3></div>
      <div style="background:var(--bg-color); padding:16px; border-radius:6px; margin-bottom:16px;">
        <p><strong>ผู้รับการพัฒนา:</strong> นางสาวณัฐธิดา รุ่งเรือง</p>
        <p><strong>หัวข้อ:</strong> การพัฒนาระบบสารสนเทศ (แบบครบวงจร)</p>
        <p><strong>วิธี:</strong> อบรมภายนอก + ฝึกปฏิบัติจริง</p>
        <p><strong>งบประมาณ:</strong> 15,000 บาท</p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-primary" onclick="Router.navigate('dh-39')">ยืนยันถูกต้อง</button>
        <button class="btn btn-outline" onclick="Router.goBack()">แก้ไข</button>
      </div>
    </div>
  `, 'รีวิวแผนพัฒนา', 'dev-plan'),

  'dh-39': () => {
    setTimeout(() => {
      UI.showModal('ยืนยันจัดเก็บแผน', 'แผนพัฒนารายบุคคลจะถูกนำไปรวมกับคำขอของหน่วยงานใน D6 เพื่อส่งให้ HR อนุมัติ ยืนยันดำเนินการ?', 'ตกลง', () => {
        Router.navigate('dh-40');
      });
    }, 100);
    return PagesDH['dh-38']();
  },

  'dh-40': () => UI.renderLayout(`
    <div class="success-screen">
      <i class="ph-fill ph-student success-icon"></i>
      <h2 class="success-title">สร้างแผนพัฒนาส่วนบุคคลสำเร็จ</h2>
      <p class="success-desc">บันทึกร่างแผนเรียบร้อยแล้ว รอการนำไปรวมในแผนพัฒนาองค์รวม (P7)</p>
      <button class="btn btn-primary" onclick="Router.navigate('dh-41')">ดูรายการแผนทั้งหมด</button>
    </div>
  `, 'สำเร็จ', 'dev-plan'),

  'dh-41': () => UI.renderLayout(`
    <div class="card">
      <div class="card-header"><h3 class="card-title">รายการแผนพัฒนารายบุคคลในหน่วยงาน</h3></div>
      <table>
        <tr><th>ผู้รับการพัฒนา</th><th>หัวข้อ</th><th>สถานะการส่ง</th></tr>
        <tr class="clickable-row" onclick="Router.navigate('dh-42')"><td>นางสาวณัฐธิดา รุ่งเรือง</td><td>การพัฒนาระบบสารสนเทศ (แบบครบวงจร)</td><td><span class="badge badge-warning">ร่าง</span></td></tr>
      </table>
      <div class="mt-4 text-center">
        <button class="btn btn-primary" onclick="Router.navigate('dh-43')">นำไปรวบรวมแผนภาพรวม (P7)</button>
      </div>
    </div>
  `, 'รายการแผนส่วนบุคคล', 'dev-plan'),

  'dh-42': () => UI.renderLayout(`
    <div class="card">
      <div class="card-header"><h3 class="card-title">รายละเอียดแผนพัฒนา</h3><button class="btn btn-outline" onclick="Router.goBack()">กลับ</button></div>
      <p>ผู้รับการพัฒนา: <b>นางสาวณัฐธิดา รุ่งเรือง</b> | งบประมาณ 15,000 บาท | ฝึกปฏิบัติงานพัฒนาระบบสารสนเทศแบบครบวงจร ช่วงเดือน มิ.ย.–ธ.ค. 2569</p>
    </div>
  `, 'รายละเอียดแผน', 'dev-plan'),

  // --- P7.0 วางแผนพัฒนาบุคลากร (ระดับหน่วยงาน) ---
  'dh-43': () => {
    const reqs = DB.get('requests').filter(r => r.dept === 'กองเทคโนโลยีสารสนเทศ' || r.dept === 'IT');
    const pending = reqs.filter(r => r.status === 'รออนุมัติ').length;
    const approved = reqs.filter(r => r.status === 'อนุมัติแล้ว').length;
    return UI.renderLayout(`
    <div class="page-hero" style="background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);">
      <div class="page-hero-icon"><i class="ph-fill ph-buildings"></i></div>
      <div>
        <h2>แผนพัฒนาหน่วยงาน (P7)</h2>
        <p>รวมแผนอัตรากำลังและแผนพัฒนาบุคลากรของกองเทคโนโลยีสารสนเทศ</p>
      </div>
    </div>
    <div class="grid-3">
      <div class="stat-card" style="border-top:3px solid #f59e0b;">
        <span class="stat-label">คำขอทั้งหมด</span>
        <span class="stat-value">${reqs.length}</span>
        <i class="ph-fill ph-files stat-icon"></i>
      </div>
      <div class="stat-card" style="border-top:3px solid var(--warning);">
        <span class="stat-label">รออนุมัติ</span>
        <span class="stat-value text-warning">${pending}</span>
        <i class="ph-fill ph-clock stat-icon"></i>
      </div>
      <div class="stat-card" style="border-top:3px solid var(--success);">
        <span class="stat-label">อนุมัติแล้ว</span>
        <span class="stat-value text-success">${approved}</span>
        <i class="ph-fill ph-check-circle stat-icon"></i>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3 class="card-title">ดำเนินการ</h3></div>
      <div class="grid-3">
        <button class="btn btn-primary" style="padding:18px;flex-direction:column;gap:8px;height:auto;" onclick="Router.navigate('dh-62')">
          <i class="ph-fill ph-plus-circle" style="font-size:1.5rem;"></i>
          สร้างคำขอใหม่
        </button>
        <button class="btn btn-secondary" style="padding:18px;flex-direction:column;gap:8px;height:auto;" onclick="Router.navigate('dh-52')">
          <i class="ph-fill ph-list-checks" style="font-size:1.5rem;"></i>
          ติดตามสถานะ
        </button>
        <button class="btn btn-outline" style="padding:18px;flex-direction:column;gap:8px;height:auto;border-color:var(--primary);color:var(--primary);" onclick="Router.navigate('dh-46')">
          <i class="ph-fill ph-chart-pie" style="font-size:1.5rem;"></i>
          ดูแผนภาพรวม
        </button>
      </div>
    </div>
  `, 'แผนพัฒนาหน่วยงาน', 'unit-plan');
  },

  'dh-62': () => UI.renderLayout(`
    <div class="card" style="max-width:600px;">
      <div class="card-header"><h3 class="card-title">ฟอร์มรายงานความต้องการภาพรวมหน่วยงาน (7.1)</h3></div>
      <p class="text-muted mb-4">รวมข้อมูลทั้งความต้องการคนเพิ่ม (P5) และการพัฒนาคน (P6)</p>
      <div style="padding:12px 16px;background:#eff6ff;border-radius:8px;margin-bottom:16px;font-size:0.85rem;color:#1e40af;display:flex;align-items:center;gap:8px;">
        <i class="ph-fill ph-lightbulb" style="font-size:1.2rem;"></i>
        <span>ระบบดึงข้อมูลจาก P5 (ขาด 2 อัตรา) และ P6 (แผนอบรม AWS) มากรอกล่วงหน้าให้อัตโนมัติ — ประหยัดเวลา 80% ✓</span>
      </div>
      <div class="input-group">
        <label class="input-label">ประเภทความต้องการ</label>
        <select class="input-field">
          <option>ขออัตรากำลังเพิ่ม (สรรหาบุคลากร)</option>
          <option>ขออนุมัติแผนฝึกอบรม (อบรม)</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">เหตุผลความจำเป็นหลัก</label>
        <textarea class="input-field" rows="3">รองรับการพัฒนาระบบสารสนเทศมหาวิทยาลัย บุคลากรขาด 2 อัตรา</textarea>
      </div>
      <button class="btn btn-primary" onclick="Router.navigate('dh-44')">ถัดไป</button>
    </div>
  `, 'กรอกคำขอใหม่', 'unit-plan'),

  'dh-44': () => UI.renderLayout(`
    <div class="card" style="max-width:600px;">
      <div class="card-header"><h3 class="card-title">ระบุลำดับความสำคัญ</h3></div>
      <div class="input-group">
        <label class="input-label">ความเร่งด่วน</label>
        <select class="input-field">
          <option>เร่งด่วนมาก (ภายใน Q3)</option>
          <option>ปกติ (ภายในปีงบประมาณ)</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">ผลกระทบหากไม่อนุมัติ</label>
        <textarea class="input-field" rows="2">โปรเจกต์อาจล่าช้ากว่ากำหนด 30%</textarea>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-primary" onclick="Router.navigate('dh-45')">บันทึกความต้องการ</button>
        <button class="btn btn-outline" onclick="Router.goBack()">กลับ</button>
      </div>
    </div>
  `, 'ระบุความสำคัญ', 'unit-plan'),

  'dh-45': () => UI.renderLayout(`
    <div class="success-screen" style="padding:40px 20px;">
      <i class="ph-fill ph-check-circle success-icon"></i>
      <h3 class="success-title">บันทึกความต้องการสำเร็จ</h3>
      <button class="btn btn-primary mt-4" onclick="Router.navigate('dh-46')">ดูแผนภาพรวม</button>
    </div>
  `, 'สำเร็จ', 'unit-plan'),

  'dh-46': () => UI.renderLayout(`
    <div class="card">
      <div class="card-header"><h3 class="card-title">ภาพรวมแผนรวบรวมระดับมหาวิทยาลัย (7.2)</h3></div>
      <div class="grid-3 mb-4">
        <div class="stat-card"><span class="stat-label">งบที่ร้องขอรวม</span><span class="stat-value">5,000฿</span></div>
        <div class="stat-card"><span class="stat-label">ตำแหน่งที่ขอเพิ่ม</span><span class="stat-value">2 อัตรา</span></div>
      </div>
      <button class="btn btn-outline" onclick="Router.navigate('dh-47')">ดูตารางเปรียบเทียบกับภาพรวม</button>
      <button class="btn btn-primary" onclick="Router.navigate('dh-48')">ร่างคำขอฉบับรวม (7.3)</button>
    </div>
  `, 'รวบรวมแผน', 'unit-plan'),

  'dh-47': () => UI.renderLayout(`
    <div class="card" style="max-width:900px;">
      <div class="card-header">
        <h3 class="card-title">เปรียบเทียบแผน vs นโยบายองค์กร (มหาวิทยาลัย)</h3>
        <button class="btn btn-outline" onclick="Router.goBack()"><i class="ph ph-arrow-left"></i> กลับ</button>
      </div>
      
      <div class="ai-box ai-box-success" style="margin-bottom: 20px;">
        <i class="ph-fill ph-check-circle ai-box-icon"></i>
        <div>
          <strong>AI Analysis: มีโอกาสได้รับอนุมัติสูงมาก (95%)</strong><br>
          การขอคนไอทีเพิ่มและการขออบรมทักษะ สอดคล้องกับนโยบาย "การเปลี่ยนแปลงสู่ดิจิทัล (Digital Transformation)" ของมหาวิทยาลัย
        </div>
      </div>

      <table style="width: 100%; text-align: left; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f1f5f9;">
            <th style="padding: 12px; border-bottom: 2px solid #cbd5e1;">ประเด็นพิจารณา</th>
            <th style="padding: 12px; border-bottom: 2px solid #cbd5e1;">แผนงานที่เสนอ (กอง IT)</th>
            <th style="padding: 12px; border-bottom: 2px solid #cbd5e1;">ยุทธศาสตร์มหาวิทยาลัย</th>
            <th style="padding: 12px; border-bottom: 2px solid #cbd5e1; text-align: center;">ความสอดคล้อง</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">การขออัตรากำลังเพิ่ม</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">ขอตำแหน่ง "นักพัฒนาระบบสารสนเทศ" เพิ่ม 1-2 อัตรา</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">แผนพัฒนาบุคลากรดิจิทัลเพื่อรองรับ Smart University</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center;"><span class="badge" style="background-color: var(--success); color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.85rem;">สอดคล้องสูงมาก</span></td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">แผนพัฒนาบุคคล (IDP)</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">ส่งบุคลากรอบรม "การพัฒนาระบบสารสนเทศบน Cloud"</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">นโยบายยกระดับทักษะบุคลากร (Reskill/Upskill) สู่สากล</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center;"><span class="badge" style="background-color: var(--success); color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.85rem;">สอดคล้อง</span></td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">กรอบงบประมาณ</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">ของบประมาณสนับสนุนรวม 15,000 - 20,000 บาท</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">จัดสรรงบประมาณประจำปีเพื่อการพัฒนาสายสนับสนุน</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center;"><span class="badge" style="background-color: var(--primary); color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.85rem;">อยู่ในเกณฑ์</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `, 'เปรียบเทียบแผน', 'unit-plan'),

  'dh-48': () => UI.renderLayout(`
    <div class="card" style="max-width:700px;">
      <div class="card-header"><h3 class="card-title">ร่างแผนพัฒนาบุคลากรและอัตรากำลัง (7.3)</h3></div>
      <p class="mb-4">สรุปเอกสารเพื่อส่งเข้าคิว (D6) ให้ HR อนุมัติ</p>
      <div style="border:1px solid var(--border); border-radius:6px; padding:16px; margin-bottom:16px;">
        <h4 class="mb-2">รายการที่ 1: ขออัตรากำลังเพิ่ม</h4>
        <p>นักพัฒนาระบบสารสนเทศ 1 อัตรา, SA 0.5 อัตรา</p>
        <hr style="margin:12px 0;">
        <h4 class="mb-2">รายการที่ 2: แผนพัฒนาส่วนบุคคล</h4>
        <p>ส่ง <b>นางสาวณัฐธิดา รุ่งเรือง</b> เข้าอบรม การพัฒนาระบบสารสนเทศ (แบบครบวงจร) — งบประมาณ 15,000 บาท</p>
      </div>
      <button class="btn btn-primary" onclick="Router.navigate('dh-49')">ตรวจสอบและยืนยันส่งเอกสาร</button>
    </div>
  `, 'ร่างแผนรวม', 'unit-plan'),

  'dh-49': () => UI.renderLayout(`
    <div class="card" style="max-width:700px; background:#f9fafb;">
      <div class="card-header"><h3 class="card-title">ตรวจสอบก่อนกดส่ง</h3></div>
      <p class="mb-4">กรุณาตรวจสอบว่าข้อมูลถูกต้อง หากส่งแล้วจะเข้าสู่สถานะ "รออนุมัติ"</p>
      <div class="flex gap-2">
        <button class="btn btn-primary" onclick="Router.navigate('dh-50')">ส่งแผนให้ฝ่ายบริหารทรัพยากรบุคคล</button>
        <button class="btn btn-outline" onclick="Router.goBack()">กลับไปแก้ไข</button>
      </div>
    </div>
  `, 'ตรวจสอบขั้นสุดท้าย', 'unit-plan'),

  'dh-50': () => {
    setTimeout(() => {
      UI.showModal('ยืนยันส่งแผนงาน', 'บันทึกคำขออัตรากำลังและแผนพัฒนาลงฐานข้อมูล D6 เพื่อให้ HR (P8.0 อนุมัติ) พิจารณา?', 'ยืนยัน', () => {
        const newId = 'REQ-' + Math.floor(Math.random() * 900 + 100);
        DB.insert('requests', { id: newId, dept: 'กองเทคโนโลยีสารสนเทศ', type: 'พัฒนา+อัตรากำลัง', reason: 'รองรับนโยบายดิจิทัลของมหาวิทยาลัย', status: 'รออนุมัติ', date: new Date().toISOString().split('T')[0] });
        Router.navigate('dh-51');
      });
    }, 100);
    return PagesDH['dh-49']();
  },

  'dh-51': () => UI.renderLayout(`
    <div class="success-screen">
      <i class="ph-fill ph-paper-plane-right success-icon" style="color:var(--primary)"></i>
      <h2 class="success-title">ส่งคำขอสำเร็จ</h2>
      <p class="success-desc">แผนถูกส่งเข้า กล่องรับงาน ของฝ่ายบริหารทรัพยากรบุคคลเรียบร้อย (เลขที่อ้างอิง: REQ-001)</p>
      <button class="btn btn-primary" onclick="Router.navigate('dh-52')">ไปหน้าติดตามสถานะ</button>
    </div>
  `, 'ส่งข้อมูลสำเร็จ', 'unit-plan'),

  'dh-52': () => {
    const reqs = DB.get('requests').filter(r => r.dept === 'กองเทคโนโลยีสารสนเทศ');
    const approved = reqs.filter(r => r.status === 'อนุมัติแล้ว').length;
    const pending = reqs.filter(r => r.status === 'รออนุมัติ').length;
    const rejected = reqs.filter(r => r.status === 'ไม่อนุมัติ').length;
    return UI.renderLayout(`
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">ติดตามสถานะคำขอที่ส่งไปแล้ว</h3>
          <button class="btn btn-primary" onclick="Router.navigate('dh-62')"><i class="ph ph-plus"></i> ส่งคำขอใหม่</button>
        </div>
        ${approved > 0 ? `
        <div class="ai-box ai-box-success" style="margin-bottom:16px;">
          <i class="ph-fill ph-bell-ringing ai-box-icon"></i>
          <div><strong>แจ้งเตือน:</strong> มีคำขอที่ได้รับการ <b>อนุมัติแล้ว ${approved} รายการ</b> — คลิก "ดูผล" เพื่อดูรายละเอียด</div>
        </div>` : ''}
        ${pending > 0 ? `
        <div class="ai-box ai-box-warn" style="margin-bottom:16px;">
          <i class="ph-fill ph-clock ai-box-icon"></i>
          <div><strong>รอดำเนินการ:</strong> มีคำขอ <b>รออนุมัติ ${pending} รายการ</b> อยู่ระหว่างการพิจารณาของกองบริหารทรัพยากรบุคคล</div>
        </div>` : ''}
        <table>
          <tr><th>เลขที่</th><th>ประเภท</th><th>วันที่ส่ง</th><th>สถานะ</th><th>จัดการ</th></tr>
          ${reqs.length === 0 ? '<tr><td colspan="5" style="text-align:center;padding:32px;color:var(--text-muted);">ยังไม่มีคำขอ</td></tr>' : ''}
          ${reqs.map(r => {
      const isDone = r.status === 'อนุมัติแล้ว' || r.status === 'ไม่อนุมัติ';
      const badgeClass = r.status === 'อนุมัติแล้ว' ? 'badge-success' : r.status === 'ไม่อนุมัติ' ? 'badge-danger' : 'badge-warning';
      return `
              <tr>
                <td><span class="badge badge-muted">${r.id}</span></td>
                <td>${r.type}</td>
                <td style="font-size:0.82rem;">${r.date}</td>
                <td><span class="badge ${badgeClass}">${r.status}</span></td>
                <td>
                  <button class="btn ${isDone ? 'btn-primary' : 'btn-outline'}" style="padding:4px 10px;font-size:0.78rem;"
                    onclick="sessionStorage.setItem('selectedReqId','${r.id}'); Router.navigate('${isDone ? 'dh-54' : 'dh-53'}')">
                    ${isDone ? '<i class="ph ph-eye"></i> ดูผล' : '<i class="ph ph-clock"></i> ติดตาม'}
                  </button>
                </td>
              </tr>`;
    }).join('')}
        </table>
      </div>
    `, 'ติดตามสถานะคำขอ', 'unit-plan');
  },

  'dh-53': () => {
    const reqId = sessionStorage.getItem('selectedReqId') || 'REQ-001';
    const req = DB.get('requests').find(r => r.id === reqId) || DB.get('requests').find(r => r.status === 'รออนุมัติ');
    if (!req) return PagesDH['dh-52']();
    const submittedDate = req.date;
    const today = new Date();
    const submitted = new Date(submittedDate);
    const diffDays = Math.max(0, Math.floor((today - submitted) / 86400000));
    const remaining = Math.max(0, 3 - diffDays);
    return UI.renderLayout(`
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">ติดตามสถานะ — ${req.id}</h3>
          <button class="btn btn-outline" onclick="Router.goBack()">กลับ</button>
        </div>
        <div class="grid-3 mb-4">
          <div><strong style="font-size:0.78rem;color:var(--text-muted);">ประเภทคำขอ</strong><br>${req.type}</div>
          <div><strong style="font-size:0.78rem;color:var(--text-muted);">ส่งโดย</strong><br>${req.submitter || 'นายวีระพงศ์ ตันติวิทยา'}</div>
          <div><strong style="font-size:0.78rem;color:var(--text-muted);">วันที่ส่ง</strong><br>${req.date}</div>
        </div>
        <div style="padding:16px;background:var(--info-bg);border-radius:8px;margin-bottom:16px;border:1px solid #bfdbfe;">
          <p style="font-size:0.85rem;color:var(--primary);margin-bottom:4px;"><strong>สถานะปัจจุบัน:</strong> <span class="badge badge-warning">${req.status}</span></p>
          <p style="font-size:0.85rem;color:var(--primary);">คิวพิจารณา: ภายใน 3 วันทำการ — ผ่านมา ${diffDays} วัน${remaining > 0 ? ` (คาดว่าอีก ${remaining} วัน)` : ' (เกินกำหนด)'}</p>
        </div>
        <div style="padding:12px 16px;background:var(--bg-color);border-radius:8px;border-left:3px solid var(--border);margin-bottom:16px;">
          <p style="font-size:0.85rem;line-height:1.7;color:var(--text-muted);">${req.reason}</p>
        </div>
        <button class="btn btn-outline" onclick="Router.navigate('dh-52')">กลับรายการคำขอ</button>
      </div>
    `, 'ติดตามสถานะคำขอ', 'unit-plan');
  },

  // --- P8.0 รับผลการอนุมัติ ---
  'dh-54': () => {
    const reqId = sessionStorage.getItem('selectedReqId') || 'REQ-001';
    const req = DB.get('requests').find(r => r.id === reqId)
      || DB.get('requests').find(r => r.status === 'อนุมัติแล้ว' || r.status === 'ไม่อนุมัติ');
    if (!req) return PagesDH['dh-52']();

    const isApproved = req.status === 'อนุมัติแล้ว';
    const borderColor = isApproved ? 'var(--success)' : 'var(--danger)';
    const icon = isApproved ? 'ph-bell-ringing' : 'ph-x-circle';
    const titleColor = isApproved ? 'text-success' : 'text-danger';
    const titleText = isApproved ? 'ผลการพิจารณา: อนุมัติแล้ว' : 'ผลการพิจารณา: ไม่อนุมัติ';
    const bgColor = isApproved ? '#d1fae5' : '#fee2e2';
    const textColor = isApproved ? '#065f46' : '#991b1b';
    const resultLabel = isApproved ? 'อนุมัติ ✓' : 'ไม่อนุมัติ ✗';
    const approvedBy = req.approvedBy || 'กองบริหารทรัพยากรบุคคล';
    const approvedDate = req.approvedDate || '-';
    const defaultRemark = isApproved
      ? 'สอดคล้องกับเป้าหมายมหาวิทยาลัย ให้ดำเนินการแจ้งสรรหาและคัดเลือกได้ทันที'
      : 'งบประมาณปีนี้เต็มแล้ว ขอให้เลื่อนเป็นปีหน้า';
    const remark = req.remark || defaultRemark;

    return UI.renderLayout(`
      <div class="card" style="border-left:4px solid ${borderColor};">
        <div class="card-header">
          <h3 class="card-title ${titleColor}"><i class="ph-fill ${icon}"></i> ${titleText}</h3>
          <button class="btn btn-outline" onclick="Router.navigate('dh-52')">กลับรายการ</button>
        </div>
        <div class="grid-3 mb-4">
          <div><strong style="font-size:0.78rem;color:var(--text-muted);">เลขที่คำขอ</strong><br><span class="badge badge-muted">${req.id}</span></div>
          <div><strong style="font-size:0.78rem;color:var(--text-muted);">ประเภท</strong><br>${req.type}</div>
          <div><strong style="font-size:0.78rem;color:var(--text-muted);">วันที่พิจารณา</strong><br>${approvedDate}</div>
        </div>
        <div class="mb-4">
          <strong style="font-size:0.78rem;color:var(--text-muted);">รายละเอียดคำขอ</strong>
          <p style="font-size:0.85rem;line-height:1.7;color:var(--text-muted);margin-top:4px;">${req.reason}</p>
        </div>
        <div style="background:${bgColor}; padding:16px; border-radius:8px; color:${textColor}; margin-bottom:16px;">
          <strong>ผลการพิจารณา: ${resultLabel}</strong><br>
          <span style="font-size:0.85rem;">พิจารณาโดย: ${approvedBy}</span><br>
          <span style="font-size:0.85rem;">ความเห็น: "${remark}"</span>
        </div>
        ${isApproved ? `
        <div class="ai-box ai-box-success">
          <i class="ph-fill ph-robot ai-box-icon"></i>
          <div><strong>🤖 ขั้นตอนถัดไปที่แนะนำ</strong>
            ติดต่อกองบริหารทรัพยากรบุคคลเพื่อเปิดรับสมัคร — จัดทำ Job Description สำหรับตำแหน่ง "นักพัฒนาระบบสารสนเทศ" 2 อัตรา
          </div>
        </div>` : `
        <div class="ai-box ai-box-warn">
          <i class="ph-fill ph-robot ai-box-icon"></i>
          <div><strong>🤖 ขั้นตอนถัดไปที่แนะนำ</strong>
            สามารถส่งคำขอใหม่ได้ในรอบงบประมาณถัดไป — หรือพิจารณาแนวทางทดแทนเช่น การจ้างนักศึกษาฝึกงาน / ปรับ Workload ภายใน
          </div>
        </div>`}
        <div class="flex gap-2 mt-4">
          <button class="btn btn-outline" onclick="Router.navigate('dh-52')"><i class="ph ph-arrow-left"></i> กลับรายการ</button>
          ${isApproved ? '' : `<button class="btn btn-primary" onclick="Router.navigate('dh-62')"><i class="ph ph-paper-plane-right"></i> ส่งคำขอใหม่</button>`}
        </div>
      </div>
    `, 'รายละเอียดผลการพิจารณา', 'unit-plan');
  },

  'dh-55': () => {
    sessionStorage.setItem('selectedReqId', 'REQ-001');
    return PagesDH['dh-54']();
  },

  'dh-56': () => {
    sessionStorage.setItem('selectedReqId', 'REQ-002');
    return PagesDH['dh-54']();
  },

  // --- P9.0 ออกจากระบบ ---
  'dh-57': () => {
    setTimeout(() => {
      UI.showModal('ยืนยันออกจากระบบ', 'คุณต้องการออกจากระบบหรือไม่?', 'ออกจากระบบ', () => {
        Router.navigate('dh-58');
      });
    }, 100);
    return PagesDH['dh-04']();
  },

  'dh-58': () => `
    <div class="success-screen" style="min-height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; background:var(--bg-color);">
      <i class="ph-fill ph-sign-out success-icon" style="color:var(--primary)"></i>
      <h2 class="success-title text-main">ออกจากระบบสำเร็จ</h2>
      <button class="btn btn-primary" onclick="Router.navigate('login')">กลับสู่หน้าเข้าสู่ระบบ</button>
    </div>
  `,

  // --- หน้าจอสนับสนุน DH ---
  'dh-59': () => {
    const dhUser = DB.get('users').find(u => u.role === 'DH') || { name: 'นายวีระพงศ์ ตันติวิทยา', dept: 'กองเทคโนโลยีสารสนเทศ', email: 'weerapong.ta@sut.ac.th' };
    return UI.renderLayout(`
    <div class="page-hero" style="background:linear-gradient(135deg,#7c3aed 0%,#1a237e 100%);">
      <div class="page-hero-icon"><i class="ph-fill ph-user-circle"></i></div>
      <div>
        <h2>โปรไฟล์ของฉัน</h2>
        <p>จัดการข้อมูลส่วนตัวและรหัสผ่าน</p>
      </div>
    </div>
    <div class="card" style="max-width:600px; margin:0 auto;">
      <div class="text-center mb-4">
        <div style="width:100px; height:100px; background:var(--bg); border:4px solid var(--white); box-shadow:var(--shadow-sm); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:48px; margin:0 auto; color:var(--primary); overflow:hidden;">
          <i class="ph-fill ph-user"></i>
        </div>
        <h3 class="mt-4" style="font-size:1.4rem; font-weight:800; color:var(--text);">${dhUser.name}</h3>
        <p class="text-muted">สังกัด: ${dhUser.dept || 'กองเทคโนโลยีสารสนเทศ'}</p>
      </div>
      
      <div class="input-group">
        <label class="input-label">ชื่อ-นามสกุล</label>
        <input type="text" class="input-field" value="${dhUser.name}" disabled>
      </div>
      <div class="input-group">
        <label class="input-label">อีเมลติดต่อ</label>
        <input type="text" class="input-field" value="${dhUser.email || 'weerapong.ta@sut.ac.th'}" disabled>
      </div>

      <div style="border-top:1px solid var(--border); margin:24px 0; padding-top:24px;">
        <button class="btn btn-primary" style="width:100%;" onclick="Router.navigate('dh-60')"><i class="ph ph-pencil-simple"></i> แก้ไขข้อมูลส่วนตัว</button>
      </div>
    </div>
  `, 'โปรไฟล์ของฉัน', 'dashboard');
  },

  'dh-60': () => UI.renderLayout(`
    <div class="card" style="max-width:600px; margin:0 auto;">
      <div class="card-header"><h3 class="card-title">แก้ไขโปรไฟล์</h3></div>
      <div class="input-group">
        <label class="input-label">ชื่อ-นามสกุล</label>
        <input type="text" class="input-field" value="นายวีระพงศ์ ตันติวิทยา">
      </div>
      <div class="input-group">
        <label class="input-label">รหัสผ่านใหม่</label>
        <input type="password" class="input-field" placeholder="เว้นว่างไว้หากไม่ต้องการเปลี่ยน">
      </div>
      <div class="flex gap-2 mt-4">
        <button class="btn btn-primary" style="flex:1;" onclick="Router.navigate('dh-61')">บันทึกการแก้ไข</button>
        <button class="btn btn-outline" style="flex:1;" onclick="Router.goBack()">ยกเลิก</button>
      </div>
    </div>
  `, 'แก้ไขข้อมูล', 'dashboard'),

  'dh-61': () => UI.renderLayout(`
    <div class="success-screen">
      <i class="ph-fill ph-check-circle success-icon"></i>
      <h2 class="success-title">อัปเดตโปรไฟล์สำเร็จ</h2>
      <button class="btn btn-primary" onclick="Router.navigate('dh-59')">กลับสู่หน้าโปรไฟล์</button>
    </div>
  `, 'อัปเดตสำเร็จ', 'dashboard')
};
